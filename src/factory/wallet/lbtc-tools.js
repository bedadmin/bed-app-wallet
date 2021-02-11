var bs58check = require('bs58check');
var iconv = require('iconv-lite');
var ProtoBuf = require("protobufjs");
var Long = require('long');
var protoRoot = require('../../proto/proto');

var LBTCtools = {};

/** Tools **/
LBTCtools.StringtoHex = function (str) {
  var val = "";
  for (var i = 0; i < str.length; i++) {
    if (val == "") {
      val = str.charCodeAt(i).toString(16);
    } else {
      val += str.charCodeAt(i).toString(16);
    }
  }
  return val;
}

LBTCtools.StringLengthProcess = function (str) {
  if (typeof (str) !== "string") {
    return false
  }

  let OP_PUSHDATA1 = '4c';
  let OP_PUSHDATA2 = '4d';

  let strLen = str.length;

  if (strLen < 0x4c) {
    let resLen = strLen;
    resLen = resLen.toString(16);

    if (resLen.length === 1) {
      resLen = '0' + resLen
    }
    return resLen;

  } else if (strLen <= 0xff) {
    let resLen = strLen;
    resLen = resLen.toString(16);

    if (resLen.length === 1) {
      resLen = '0' + resLen;
    }

    resLen = OP_PUSHDATA1 + resLen;
    return resLen;

  } else if (strLen <= 0xffff) {
    let resLen = strLen;
    resLen = resLen.toString(16);

    if (resLen.length === 3) {
      resLen = '0' + resLen;
    }

    resLen =resLen.slice(2) + resLen.slice(0,2)

    resLen = OP_PUSHDATA2 + resLen;
    return resLen;
  }
}

LBTCtools.ProBillTool = function (param) {
    param = iconv.encode(param, 'utf8');

    let tempParam = ''
    for (let p of param) {
        tempParam += p.toString(16)
    }

    let paramSub = tempParam.slice(0, tempParam.length / 2)

    let paramLen = LBTCtools.StringLengthProcess(paramSub);

    if (paramLen.length === 1 || paramLen.length === 3) {
        paramLen = '0' + paramLen
    }

    let paramRes = paramLen + tempParam;

    return paramRes
}

LBTCtools.BufferRegisteNameMsg = function(opid,name){
    // var root = ProtoBuf.loadSync("./lbtc.proto");
    // var textMessage = root.lookupType("LbtcPbMsg.RegisteNameMsg");
    var textMessage = protoRoot.lookup("LbtcPbMsg.RegisteNameMsg");
    var payload = {
        opid: opid,
        name:name
    };

    var errMsg = textMessage.verify(payload);
    if (errMsg) throw Error(errMsg);

    var message = textMessage.create(payload); // or use .fromObject if conversion is necessary
    var buffer = textMessage.encode(message).finish();

    let tempParam = '';
    for (let p of buffer) {
        let s = p.toString(16)
        if(s.length == 1){
            s = '0' + s;
        }
        tempParam += s
    }

    let bufPre = "00000000";
    return bufPre + tempParam;
}

LBTCtools.BufferCreateTokenMsg = function(opid,tokenaddress,name,symbol,totalamount,digits){
    // var root = ProtoBuf.loadSync("./lbtc.proto");
    // var textMessage = root.lookupType("LbtcPbMsg.CreateTokenMsg");
    var textMessage = protoRoot.lookup("LbtcPbMsg.CreateTokenMsg");
    var payload = {
        opid: opid,
        tokenaddress:tokenaddress,
        name:name,
        symbol : symbol,
        totalamount: Long.fromValue(totalamount),
        digits : digits
    };

    var errMsg = textMessage.verify(payload);
    if (errMsg) throw Error(errMsg);

    var message = textMessage.create(payload); // or use .fromObject if conversion is necessary
    var buffer = textMessage.encode(message).finish();

    let tempParam = '';
    for (let p of buffer) {
        let s = p.toString(16)
        if(s.length == 1){
            s = '0' + s;
        }
        tempParam += s
    }

    let bufPre = "00000001";
    return bufPre + tempParam;
}

LBTCtools.BufferTransferTokenMsg = function(opid,dstAddress,tokenid,amount,comment){
    // var root = ProtoBuf.loadSync("./lbtc.proto");
    // var textMessage = root.lookupType("LbtcPbMsg.TransferTokenMsg");
    var textMessage = protoRoot.lookup("LbtcPbMsg.TransferTokenMsg");
    var payload = {
        opid: opid,
        dstAddress:dstAddress,
        tokenid:tokenid,
        amount : Long.fromValue(amount),
        comment : comment
    };

    var errMsg = textMessage.verify(payload);
    if (errMsg) throw Error(errMsg);

    var message = textMessage.create(payload); // or use .fromObject if conversion is necessary
    var buffer = textMessage.encode(message).finish();

    let tempParam = '';
    for (let p of buffer) {
        let s = p.toString(16)
        if(s.length == 1){
            s = '0' + s;
        }
        tempParam += s
    }

    let bufPre = "00000001";
    return bufPre + tempParam;
}

LBTCtools.BufferLockTokenMsg = function(opid,dstAddress,tokenid,amount,comment,expiryheight){
    // var root = ProtoBuf.loadSync("./lbtc.proto");
    // var textMessage = root.lookupType("LbtcPbMsg.LockTokenMsg");
    var textMessage = protoRoot.lookup("LbtcPbMsg.LockTokenMsg");
    var payload = {
        opid: opid,
        dstAddress:dstAddress,
        tokenid:tokenid,
        amount : Long.fromValue(amount),
        comment : comment,
        expiryheight : Long.fromValue(expiryheight)
    };

    var errMsg = textMessage.verify(payload);
    if (errMsg) throw Error(errMsg);

    var message = textMessage.create(payload); // or use .fromObject if conversion is necessary
    var buffer = textMessage.encode(message).finish();

    let tempParam = '';
    for (let p of buffer) {
        let s = p.toString(16)
        if(s.length == 1){
            s = '0' + s;
        }
        tempParam += s
    }

    let bufPre = "00000001";
    return bufPre + tempParam;
}


/** Function **/
// Reg Forged Node
LBTCtools.RegForgedNode = function (name) {
  let prefix = "00000000";
  let op_code = "c0";

  name = iconv.encode(name, 'utf8');

  let temp = ''
  for (let n of name) {
    temp += n.toString(16)
  }

  let lenStr = temp.slice(0, temp.length / 2)

  let nameLen = LBTCtools.StringLengthProcess(lenStr);

  if (nameLen === false) {
    return "param is not string";
  }

  let res = nameLen + temp;

  let op_return = prefix + op_code + res;
  return op_return;
}


// Vote Forged Node (c1) or cancel (c2)
LBTCtools.VoteForgedNode = function (addrs,opCode) {
  if (!(addrs instanceof Array)) {
    return "param is not array";
  }
  
  if (opCode !== "c1" && opCode !== "c2"){
    return "opcode != c1 or c2";
  }

  let prefix = "00000000";
  let op_code = opCode;

  let addrCount = addrs.length;

  addrCount = addrCount.toString(16)

  if (addrCount.length === 1) {
    addrCount = '0' + addrCount;
  }

  let sLen = 40
  let Vres = "";
  for (let addr of addrs) {
    let resStr = ""
    let pubKey = bs58check.decode(addr).toString('hex').replace(/\b(0+)/gi, "");
    let pubkeyLen = pubKey.length;

    let tempLen = sLen - pubkeyLen;
    if(tempLen > 0){
        for (let i=1; i<=tempLen; i++){
            pubKey = '0' + pubKey
        }
        pubkeyLen = pubkeyLen + tempLen;
    } else {
      pubKey = pubKey.slice(-sLen);
      pubkeyLen = pubKey.length
    }

    let resLen = LBTCtools.StringLengthProcess(pubKey.slice(0, pubkeyLen / 2));

    if (resLen === false) {
      return 'array element is not string';
    }

    if (resLen.length === 1 || resLen.length === 3) {
      resLen = '0' + resLen
    }

    resStr = resLen + pubKey;
    Vres += resStr;
  }

  let fRes = prefix + op_code + addrCount + Vres;
  return fRes
}


// Reg Board Members (Not tested)
LBTCtools.RegNickname = function (name,url) {
    if (arguments.length !== 2){
        return "arguments error!";
    }

    let prefix = "00000000";
    let op_code = "c3";

    //name
    name = iconv.encode(name, 'utf8');

    let temp = ''

    for (let n of name) {
        temp += n.toString(16)
    }

    let lenStr = temp.slice(0, temp.length / 2)

    let nameLen = LBTCtools.StringLengthProcess(lenStr);

    if (nameLen === false) {
        return "name is not string";
    }

    let res = nameLen + temp;

    //url
    url = iconv.encode(url, 'utf8');

    let temp2 = ''
    for (let n2 of url) {
        temp2 += n2.toString(16)
    }

    let lenStr2 = temp2.slice(0, temp2.length / 2)

    let urlLen = LBTCtools.StringLengthProcess(lenStr2);

    if (urlLen === false) {
        return "url is not string";
    }

    let res2 = urlLen + temp2;

    let op_return = prefix + op_code + res + res2;
    return op_return;
}


// Vote Board Members (c4) or Cancel (c5)  (Not tested)
LBTCtools.VoteBoardMembers = function (addr,opCode) {
    if (opCode !== "c4" && opCode !== "c5"){
        return "opcode != c4 or c5";
    }

    let prefix = "00000000";
    let op_code = opCode;

    let pubKey = bs58check.decode(addr).toString('hex').replace(/\b(0+)/gi, "");
    let pubkeyLen = pubKey.length

    let sLen = 40
    let tempLen = sLen - pubkeyLen
    if(tempLen > 0){
        for (let i=1;i<=tempLen;i++){
            pubKey = '0' + pubKey
        }
        pubkeyLen = pubkeyLen + tempLen
    } else {
      pubKey = pubKey.slice(-sLen);
      pubkeyLen = pubKey.length
    }

    let resLen = LBTCtools.StringLengthProcess(pubKey.slice(0, pubkeyLen / 2));
    if (resLen === false) {
        return 'array element is not string';
    }
    if (resLen.length === 1 || resLen.length === 3) {
        resLen = '0' + resLen
    }

    let resStr = resLen + pubKey;

    let fRes = prefix + op_code + resStr
    return fRes
}


// table the bill, param: options | array (Not tested)
LBTCtools.TableTheBill = function (title,detail,url,endtime,options) {
    let prefix = "00000000";
    let op_code = 'c6';

    let titleBill = LBTCtools.ProBillTool(title)
    let detailBill = LBTCtools.ProBillTool(detail)
    let urlBill = LBTCtools.ProBillTool(url)

    let tiemstamp = (Date.now().toString().slice(0,-3))
    endtime = parseInt(tiemstamp) + 3600 * 24 * parseInt(endtime)
    let endtimeBill = LBTCtools.ProBillTool(endtime.toString())

    //options array length
    let optionsCount = options.length;
    optionsCount = optionsCount.toString(16)
    if (optionsCount.length === 1) {
        optionsCount = '0' + optionsCount;
    }

    let tempOptions = ''
    for (let o of options){
        let oStr = LBTCtools.ProBillTool(o)
        tempOptions += oStr
    }

    let fRes = prefix + op_code + titleBill + detailBill + urlBill + endtimeBill + optionsCount + tempOptions
    return fRes
}


// Vote To Bill (Not tested)
LBTCtools.VoteToBill = function (billId,option) {
    let prefix = "00000000";
    let op_code = 'c7';
    let billIdLen = '28'

    billId = LBTCtools.StringtoHex(billId)
    option = '0' + option

    let fRes = prefix + op_code + billIdLen + billId + option
    return fRes
}


/** Class Token**/
// Registe Name (Not tested)
LBTCtools.RegisteName = function(opid,name){
    // token pf
    let createTokenBuf = LBTCtools.BufferRegisteNameMsg(opid,name);
    let prefix = "00000000";
    let op_code = "01";

    let lenStr = createTokenBuf.slice(0,createTokenBuf.length/2);
    let bufLen = LBTCtools.StringLengthProcess(lenStr);
    let res = bufLen + createTokenBuf;

    let op_return = prefix + op_code + res;
    return op_return;
}


// Create Token. (Not tested)
LBTCtools.CreateToken = function(opid,tokenaddress,name,symbol,totalamount,digits){
    // token pf 
    let createTokenBuf = LBTCtools.BufferCreateTokenMsg(opid,tokenaddress,name,symbol,totalamount,digits);

    let prefix = "00000000";
    let op_code = "01";

    let lenStr = createTokenBuf.slice(0,createTokenBuf.length/2);
    let bufLen = LBTCtools.StringLengthProcess(lenStr);
    let res = bufLen + createTokenBuf;

    let op_return = prefix + op_code + res;
    return op_return;
}


// Transfer Token (Not tested)
LBTCtools.TransferToken = function(opid,dstAddress,tokenid,amount,comment){
    // token pf 
    let createTokenBuf = LBTCtools.BufferTransferTokenMsg(opid,dstAddress,tokenid,amount,comment);

    let prefix = "00000000";
    let op_code = "01";

    let lenStr = createTokenBuf.slice(0,createTokenBuf.length/2);
    let bufLen = LBTCtools.StringLengthProcess(lenStr);
    let res = bufLen + createTokenBuf;

    let op_return = prefix + op_code + res;
    return op_return;
}


//Lock Token (Not tested)
LBTCtools.TransferToken = function(opid,dstAddress,tokenid,amount,comment,expiryheight){
    //token pf 
    let createTokenBuf = LBTCtools.BufferLockTokenMsg(opid,dstAddress,tokenid,amount,comment,expiryheight);

    let prefix = "00000000";
    let op_code = "01";

    let lenStr = createTokenBuf.slice(0,createTokenBuf.length/2);
    let bufLen = LBTCtools.StringLengthProcess(lenStr);
    let res = bufLen + createTokenBuf;

    let op_return = prefix + op_code + res;
    return op_return;
}



export default {
    LBTCtools
}