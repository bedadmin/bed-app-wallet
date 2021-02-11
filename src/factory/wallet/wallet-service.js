import bip38 from "bip38";
import bip39 from "bip39";
import bitcoin from "bitcoinjs-lib";
import coinselect from "coinselect";
import calc from "calculatorjs";
import decimal from "decimal.js";
import wConfig from "./config";

import http from "../libs/http";
import api from "../libs/api";

var Wallet = {};
var Tool = {};
var net = wConfig.network;

Wallet.generateMnemonic = function() {
  return bip39.generateMnemonic();
};

Wallet.getSeedHex = function(mnemonic) {
  return Promise.resolve(bip39.mnemonicToSeedHex(mnemonic));
};

Wallet.HDNodefromSeedHex = function(seedHex) {
  return Promise.resolve(
    bitcoin.HDNode.fromSeedHex(seedHex, bitcoin.networks[net])
  );
};

Wallet.createWalletFromMnemonic = function(mnemonicWord) {
  let seed = bip39.mnemonicToSeed(mnemonicWord),
    root = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks[net]),
    child0 = root.derivePath("m/44'/0'/0'/0/0"),
    privateKey = child0.keyPair.toWIF(),
    address = child0.getAddress();
  let walletInfo = {
    mnemonicWord: mnemonicWord,
    privateKey: privateKey,
    address: address,
    network: net,
    avatar: Math.floor(Math.random() * 8 + 1)
  };
  return walletInfo;
};

Wallet.createWalletFromPrv = function(privateKey) {
  let ecPair = bitcoin.ECPair.fromWIF(privateKey, bitcoin.networks[net]),
    address = ecPair.getAddress();
  let walletInfo = {
    mnemonicWord: "",
    privateKey: privateKey,
    address: address,
    network: net,
    avatar: Math.floor(Math.random() * 8 + 1)
  };
  return walletInfo;
};

Wallet.ecPairFromWIF = function(prv, network) {
  let result = bitcoin.ECPair.fromWIF(prv, bitcoin.networks[net]);
  return result;
};

Wallet.newTransactionSync = function() {
  let setVersion = wConfig.txSetVersion;
  let newTx = new bitcoin.TransactionBuilder(bitcoin.networks[net]);
  newTx.setVersion(Number(setVersion));
  return newTx;
};

Wallet.coinselect = function(utxos, targets) {
  console.log(utxos);
  console.log(targets);

  let feeRate = wConfig.feeRate;
  let { inputs, outputs, fee } = coinselect(utxos, targets, feeRate);
  return {
    inputs: inputs,
    outputs: outputs,
    fee: fee
  };
};

Wallet.otherTxCoinselect = function(fee, listUnspent, address) {
  let sum = 0,
    inputs = [],
    outputs = [];
  fee = fee * wConfig.point;
  for (let i = 0; i < listUnspent.length; i++) {
    sum = sum + listUnspent[i].value;
    inputs.push(listUnspent[i]);
    if (sum >= fee) {
      break;
    }
  }
  if (sum < fee) {
    return false;
  }
  outputs[0] = {
    address: "OP_RETURN",
    value: 0
  };
  if (sum != fee) {
    outputs[1] = {
      address: address,
      value: decimal(sum)
        .sub(fee)
        .toNumber()
    };
  }
  return {
    inputs: inputs,
    outputs: outputs,
    fee: fee
  };
};

Wallet.makeTransaction = function(walletInfo, inputs, outputs) {
  console.log(walletInfo, inputs, outputs);
  let txb = Wallet.newTransactionSync();
  let keyPair = Wallet.ecPairFromWIF(walletInfo.privateKey);

  inputs.forEach((item, index) => {
    txb.addInput(item.txId, item.vout);
  });

  outputs.forEach((item, index) => {
    if (item.address) {
      txb.addOutput(item.address, item.value);
    } else {
      txb.addOutput(walletInfo.address, item.value);
    }
  });

  console.log(txb);

  for (let index = 0; index < inputs.length; index++) {
    txb.sign(index, keyPair);
  }

  return txb.build().toHex();
};

Wallet.makeOPreturnTransaction = function(
  privateKey,
  inputs,
  outputs,
  OP_RETURN
) {
  let txb = Wallet.newTransactionSync();
  let keyPair = Wallet.ecPairFromWIF(privateKey),
    arryyyy = Tool.Xreplace(OP_RETURN, 2),
    dataaaa = Buffer.from(arryyyy),
    embeddd = bitcoin.payments.embed({ data: [dataaaa] });

  inputs.forEach((item, index) => {
    txb.addInput(item.txId, item.vout);
  });

  txb.addOutput(embeddd.output, 0);
  if (outputs[1]) {
    txb.addOutput(outputs[1].address, outputs[1].value);
  }

  inputs.forEach((item, index) => {
    txb.sign(index, keyPair);
  });
  return txb.build().toHex();
};

Wallet.queue = function(tx_list, current_wallet, data = []) {
  return new Promise(resolve => {
    if (tx_list.length > 0) {
      let txItem = tx_list.shift();
      return new Promise(resolve => {
        let proAllList = [];
        txItem.forEach((item, index) => {
          proAllList.push(
            http.get(api.api.gettxinfo, {
              param: item.txid
              //addr: current_wallet
            })
          );
        });
        Promise.all(proAllList).then(list => {
          let deList = [];
          deList = Wallet.parseListTx(list, current_wallet);
          resolve(deList);
        });
      }).then(res => {
        data = data.concat(res);
        resolve(Wallet.queue(tx_list, current_wallet, data));
      });
    } else {
      resolve(data);
    }
  });
};

Wallet.parseListTx = function(listTX, current_wallet) {
  let txsList = [];
  listTX.forEach((item, index) => {
    let vin,
      vout,
      value,
      type,
      iscoinbase = false,
      fee = 0;
    txsList[index] = item;
    //console.log('wdy='+listTX);
    //console.log('wdy='+listTX);
    for (let i = 0; i < txsList[index].vin.length; i++) {
      fee = decimal(fee)
        .plus(txsList[index].vin[i].value)
        .toNumber();
      if (JSON.stringify(txsList[index].vin[i]).indexOf(current_wallet) >= 0) {
        vin = true;
      }
    }
    for (let o = 0; o < txsList[index].vout.length; o++) {
      fee = decimal(fee)
        .minus(txsList[index].vout[o].value)
        .toNumber();
      if (JSON.stringify(txsList[index].vout[o]).indexOf(current_wallet) >= 0) {
        vout = true;
      }
    }
    if (JSON.stringify(txsList[index].vin).indexOf("coinbase") >= 0) {
      iscoinbase = true;
    }
    if (vin) {
      type = "s";
      let flag = true;
      for (let v = 0; v < txsList[index].vout.length; v++) {
        if (
          JSON.stringify(txsList[index].vout[v]).indexOf(current_wallet) < 0
        ) {
          value = txsList[index].vout[v].value;
          flag = false;
        }
      }
      if (flag) {
        value = txsList[index].vout[0].value;
      }
    }
    if (!vin && vout) {
      type = "r";
      for (let v = 0; v < txsList[index].vout.length; v++) {
        if (
          JSON.stringify(txsList[index].vout[v]).indexOf(current_wallet) >= 0
        ) {
          value = txsList[index].vout[v].value;
        }
      }
    }
    txsList[index].iscoinbase = iscoinbase;
    txsList[index].type = type;
    txsList[index].value = value;
    txsList[index].fee = fee;
  });

  return txsList;
};

Wallet.makeTxDetail = function(
  hash,
  currentAddr,
  inputs,
  outputs,
  fee,
  time,
  type
) {
  if (!hash || !currentAddr || !outputs.length || !inputs.length) {
    return false;
  }
  inputs.forEach((item, index) => {
    item.addr = item.address;
  });
  let tx = {
    hash: hash,
    fromaddress: currentAddr,
    toaddress: outputs[0].address,
    value: decimal(outputs[0].value)
      .div(wConfig.point)
      .toNumber(),
    vin: inputs,
    type: type ? type : "s",
    fee: fee,
    time: time,
    iscoinbase: false
  };
  outputs.forEach((item, index) => {
    item.value = decimal(item.value)
      .div(wConfig.point)
      .toNumber();
    item.n = index;
    if (item.address) {
      item.scriptPubKey = {
        addresses: [item.address]
      };
    } else {
      item.scriptPubKey = {
        addresses: [currentAddr]
      };
    }
  });
  tx.vout = outputs;
  return tx;
};

// Wallet.listUnSpent = function(listTX, current_wallet, total_height) {
//   let unSpent = [];
//   listTX.forEach((item, index) => {
//     for (let i = 0; i < item.vout.length; i++) {
//       let obj = {};
//       if (item.vout[i].address) {
//         if (item.vout[i].address == current_wallet) {
//           obj.height = item.height;
//           obj.txId = item.txid;
//           obj.vout = item.vout[i].n;
//           obj.iscoinbase = item.iscoinbase;
//           obj.address = item.vout[i].address;
//           obj.scriptPubKey = item.vout[i].hex;
//           obj.value = decimal(item.vout[i].value)
//             .mul(wConfig.point)
//             .toNumber();

//           unSpent.push(obj);
//         }
//       }
//     }
//   });

//   listTX.forEach((item, index) => {
//     item.vin.forEach((item_v, index_v) => {
//       let txid = item_v.txid;
//       let vout = item_v.vout;
//       for (let i = 0; i < unSpent.length; i++) {
//         if (unSpent[i].txId == txid && unSpent[i].vout == vout) {
//           unSpent.splice(i, 1);
//           break;
//         }
//       }
//     });
//   });

//   let availableTxs = [];
//   let unavailableTxs = [];
//   let availableBalance = 0;
//   let unavailableBalance = 0;

//   unSpent.forEach((item, index) => {
//     if (item.iscoinbase) {
//       if (total_height - item.height > 100) {
//         availableTxs.push(item);
//         availableBalance = calc.add(availableBalance, item.value);
//       } else {
//         unavailableTxs.push(item);
//         unavailableBalance = calc.add(unavailableBalance, item.value);
//       }
//     } else {
//       availableTxs.push(item);
//       availableBalance = calc.add(availableBalance, item.value);
//     }
//   });

//   let res = {
//     availableTxs: availableTxs,
//     availableBalance: decimal(availableBalance)
//       .div(wConfig.point)
//       .toNumber(),
//     unavailableTxs: unavailableTxs,
//     unavailableBalance: decimal(unavailableBalance)
//       .div(wConfig.point)
//       .toNumber()
//   };
//   res.totalbalance = calc.add(res.availableBalance, res.unavailableBalance);
//   return res;
// };

// Wallet.addListUnSpent = function(
//   listTX,
//   current_wallet,
//   total_height,
//   UnSpent
// ) {
//   if (UnSpent.unavailableTxs.length) {
//     for (let i = 0; i < UnSpent.unavailableTxs.length; i++) {
//       const item = UnSpent.unavailableTxs[i];
//       if (total_height - item.height > 100) {
//         UnSpent.availableTxs.push(item);
//         UnSpent.unavailableTxs.splice(i, 1);
//         i = i - 1;
//       }
//     }
//   }

//   listTX.forEach((item, index) => {
//     item.vin.forEach((item_v, index_v) => {
//       let txid = item_v.txid;
//       let vout = item_v.vout;

//       for (let i = 0; i < UnSpent.availableTxs.length; i++) {
//         if (
//           UnSpent.availableTxs[i].txId == txid &&
//           UnSpent.availableTxs[i].vout == vout
//         ) {
//           UnSpent.availableTxs.splice(i, 1);
//           break;
//         }
//       }
//       for (let i = 0; i < UnSpent.unavailableTxs.length; i++) {
//         if (
//           UnSpent.unavailableTxs[i].txId == txid &&
//           UnSpent.unavailableTxs[i].vout == vout
//         ) {
//           UnSpent.unavailableTxs.splice(i, 1);
//           break;
//         }
//       }
//     });
//   });

//   let availableBalance = 0;
//   UnSpent.availableTxs.forEach(item => {
//     availableBalance = calc.add(availableBalance, item.value);
//   });
//   UnSpent.availableBalance = decimal(availableBalance)
//     .div(wConfig.point)
//     .toNumber();

//   let unavailableBalance = 0;
//   UnSpent.unavailableTxs.forEach(item => {
//     unavailableBalance = calc.add(unavailableBalance, item.value);
//   });
//   UnSpent.unavailableBalance = decimal(unavailableBalance)
//     .div(wConfig.point)
//     .toNumber();

//   let addUnSpent = Wallet.listUnSpent(listTX, current_wallet, total_height);

//   let newavailable = addUnSpent.availableTxs.concat(UnSpent.availableTxs);
//   let newavailablebalance = calc.add(
//     addUnSpent.availableBalance,
//     UnSpent.availableBalance
//   );
//   let newunavailable = addUnSpent.unavailableTxs.concat(UnSpent.unavailableTxs);
//   let newunavailablebalance = calc.add(
//     addUnSpent.unavailableBalance,
//     UnSpent.unavailableBalance
//   );

//   let res = {
//     availableTxs: newavailable,
//     availableBalance: newavailablebalance,
//     unavailableTxs: newunavailable,
//     unavailableBalance: newunavailablebalance
//   };
//   return res;
// };

Tool.getFullNum = function(num) {
  if (isNaN(num)) {
    return num;
  }
  var str = "" + num;
  if (!/e/i.test(str)) {
    return num;
  }
  return num.toFixed(18).replace(/\.?0+$/, "");
};

Tool.accMul = function(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
};

Tool.Xreplace = function Xreplace(str, length, reversed) {
  var re = new RegExp("\\w{1," + length + "}", "g");
  var ma = str.match(re);
  if (reversed) ma.reverse();
  for (let i = 0; i < ma.length; i++) {
    ma[i] = parseInt("0x" + ma[i]);
  }
  return ma;
};

export default {
  Wallet,
  bip38,
  bip39,
  bitcoin
};
