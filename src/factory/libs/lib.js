import wConfig from "../wallet/config";


let lib = {
  appClipbordText: function(textValue) {
    if(!window.plus) return Promise.reject(true);
    textValue = String(textValue);
    if(plus.os.name == 'Android') {
      let Context = plus.android.importClass("android.content.Context");
      let main = plus.android.runtimeMainActivity();
      let clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
      plus.android.invoke(clip,"setText",textValue);
      return Promise.resolve(true)
    } else if (plus.os.name == 'iOS') {
      let UIPasteboard = plus.ios.importClass("UIPasteboard");
      let generalPasteboard = UIPasteboard.generalPasteboard();
      generalPasteboard.setValueforPasteboardType(textValue,"public.utf8-plain-text");
      return Promise.resolve(true)
    } else {
      return Promise.reject(true)
    }
  },

  returnToSuperior: function () {
    window.history.back();
  },

  isEmptyObject: function (e) {
    for (let i in e) return false;
    return true;
  },

  isEmptyString: function (e) {
    let len = e.toString().trim().length;
    if (len == 0) {
        return false;
    } else {
        return true;
    }
  },

  isAddress: function (e) {
    let a = {
        //'bitcoin': /^1{1}[A-Za-z0-9]{25,33}$/,
        'bitcoin': /(bc1|1)[A-Za-z0-9]{25,39}$/,
        'testnet': /^(m|n){1}[A-Za-z0-9]{25,33}$/
    }
    let re = a[wConfig.network];
    if (re.test(e)) {
        return true
    } else {
        return false
    }
  },

  isNickname: function (e) {
    let re = /^[A-Za-z0-9]{1}[A-Za-z0-9\:\-\_\.\@\&\#]{0,15}$/;
    if (re.test(e)) {
      return true
    } else {
      return false
    }
  },

  isPc: function () {
    let userAgentInfo = window.navigator.userAgent;
    const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
    ];
    let flag = true;
    for (let v = 0, len = Agents.length; v < len; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
  },

  isArray: function (e) {
    return e instanceof Array
  },

  Xreplace: function (str, length, reversed) {
    let re = new RegExp("\\w{1," + length + "}", "g");
    let ma = str.match(re);
    if (reversed) ma.reverse();
    for (let i = 0; i < ma.length; i++) {
        ma[i] = parseInt('0x' + ma[i]);
    }
    return ma;
  },

  stringToHex: function (str) {
    let val = "";
    for (let i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return val;
  },

  hexToString: function (hex) {
    let val = "";
    let arr = hex.split(",");
    for (let i = 0; i < arr.length; i++) {　　
        val += String.fromCharCode(parseInt(arr[i], 16));
    }
    return val;
  },

  randArr: function (a) {
    let len = a.length;
    for (let i = 0; i < len; i++) {
        let end = len - 1;
        let index = (Math.random() * (end + 1)) >> 0;
        let t = a[end];
        a[end] = a[index];
        a[index] = t;
    }
    return a;
  },

  chunkArry: function (array, size) {
    const length = array.length
    if (!length || !size || size < 1) {
      return []
    }
    let index = 0 
    let resIndex = 0 
  
    let result = new Array(Math.ceil(length / size))
    while (index < length) {
      result[resIndex++] = array.slice(index, (index += size))
    }
    return result
  },

  versionCompare: function(a, b) {
    let _a = this.versionToNum(a), _b = this.versionToNum(b);   
    if(_a == _b) {
        return false;
    } else if(_a > _b) {
        return true;
    } else {
        return false;
    }
  },

  versionToNum: function (a) {
    a = a.toString();
    let c = a.split(/\./);// or： let c = a.split('.');
    let num_place = ["","0","00","000","0000"], r = num_place.reverse();
    for (let i = 0; i< c.length; i++){ 
        let len = c[i].length;       
        c[i] = r[len] + c[i];  
    } 
    let res = c.join(''); 
    return res;
  }
}


export default lib;
