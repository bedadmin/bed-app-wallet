import wallet_service from "./wallet-service";

let Wallet = wallet_service.Wallet;

class WalletDB {
  constructor(current, addresses, accounts) {
    (this.current = current),
      (this.addresses = addresses),
      (this.accounts = accounts);
  }

  insertaccount(
    address,
    avatar,
    name,
    password,
    mnemonicWord,
    privateKey,
    network,
    backupFlag,
    source
  ) {
    let wallet = {
      address: address,
      avatar: avatar,
      name: name,
      password: password,
      mnemonicWord: mnemonicWord,
      privateKey: privateKey,
      network: network,
      currentHeight: 0,
      history: [],
      balance: 0,
      UTXO: [],
      availableTxs: [],
      availableBalance: 0,
      unavailableTxs: [],
      unavailableBalance: 0,
      confirmingTx: {},
      backupFlag: backupFlag,
      source: source,
      state: "N"
    };
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i] == address) {
        this.addresses.splice(i, 1);
        break;
      }
    }
    this.current = address;
    this.addresses[this.addresses.length] = address;
    this.accounts[address] = wallet;
  }

  deleteaccount(address) {
    if (this.accounts[address]) {
      delete this.accounts[address];
    }
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i] == address) {
        this.addresses.splice(i, 1);
        break;
      }
    }

    if (this.addresses.length) {
      if (this.current == address) {
        this.current = this.addresses[0];
      }
    } else {
      this.current = "";
    }
  }

  deleteUtxo(address, del_arr) {
    var utxo=this.accounts[address].UTXO
    if (utxo.length) {
      for(var i=0; i<utxo.length; i++){
        for(var j=0; j<del_arr.length; j++){
          //console.log(utxo[i])
          //console.log(del_arr[j])
          if(utxo[i].txid===del_arr[j].txid && utxo[i].vout===del_arr[j].vout){
            console.log("in");
            utxo.splice(i,1);
          }
        }
      }      
    }

  }

  insertHistroy(address, data) {
    let currentHeight = data.currentHeight;
    let currentHistory = data.currentHistory;
    this.accounts[address].currentHeight = currentHeight;
    this.accounts[address].balance = data.currentBalance;
    this.accounts[address].UTXO = data.currentUTXO;

    if (currentHistory.length) {
      if (Object.keys(this.accounts[address].confirmingTx).length) {
        for (let i = 0; i < currentHistory.length; i++) {
          const item = currentHistory[i];
          if (item.txid == this.accounts[address].confirmingTx.txid) {
            this.accounts[address].confirmingTx = {};
            break;
          }
        }
      }

      if (currentHistory.length && this.accounts[address].history.length) {
        for (let index1 = 0; index1 < currentHistory.length; index1++) {
          const item1 = currentHistory[index1];
          for (
            let index2 = 0;
            index2 < this.accounts[address].history.length;
            index2++
          ) {
            const item2 = this.accounts[address].history[index2];
            if (item2.txid == item1.txid) {
              currentHistory.splice(index1, 1);
              index1 = index1 - 1;
            }
          }
        }
      }

      currentHistory.reverse();

      this.accounts[address].history = currentHistory.concat(
        this.accounts[address].history
      );

      // let unSpent = Wallet.addListUnSpent(currentHistory, address, currentHeight, {
      //   availableTxs: this.accounts[address].availableTxs,
      //   availableBalance: this.accounts[address].availableBalance,
      //   unavailableTxs: this.accounts[address].unavailableTxs,
      //   unavailableBalance: this.accounts[address].unavailableBalance
      // });

      // this.accounts[address].availableTxs = unSpent.availableTxs;
      // this.accounts[address].availableBalance = unSpent.availableBalance;
      // this.accounts[address].unavailableTxs = unSpent.unavailableTxs;
      // this.accounts[address].unavailableBalance = unSpent.unavailableBalance;
    }
  }

  setBalance(address, balance) {
    this.accounts[address].balance = balance;
  }

  setUTXO(address, UTXO) {
    this.accounts[address].UTXO = UTXO;
  }

  selectWallet(address) {
    this.current = address;
  }

  changePassword(address, password) {
    this.accounts[address].password = password;
  }

  changeName(address, name) {
    this.accounts[address].name = name;
  }

  insertConfirmingTx(address, tx) {
    this.accounts[address].confirmingTx = tx;
  }

  changeAvatar(address, avatar) {
    this.accounts[address].avatar = avatar;
  }
}

export default WalletDB;
