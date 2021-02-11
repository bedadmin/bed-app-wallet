import axios from "axios";
import qs from "qs";
import api from "./api";
import key from "./key";
import md5 from "crypto-js/md5";
import { Toast } from "vant";

axios.defaults.baseURL = localStorage.getItem("baseUrl") || api.baseURL;

let localeLang = localStorage.getItem("locale")
  ? localStorage.getItem("locale")
  : "en";
let lang = {
  en: {
    requestError: "Request Error",
    networkError: "Network Error",
    connectionError: "Connection Error"
  },
  zh: {
    requestError: "请求错误",
    networkError: "网络错误",
    connectionError: "连接错误"
  }
};

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // if (config.params) {
    //     var timestamp = Date.parse(new Date()) * 0.001;
    //     config.params['token'] = md5(key + '-' + config.params.addr + '-' + timestamp).toString();
    // }
    return config;
  },
  error => {
    error = JSON.stringify(error);
    saveLogToLocale(error, 1);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    if (response.data.error) {
      if (!response.config.params.isHide) {
        Toast({
          duration: 2000,
          message: response.data.msg
        });
        return Promise.reject(response.data.msg);
      }
      saveLogToLocale(JSON.stringify(response), 2);
    }
    return response;
  },
  error => {
    error.message = "Error";
    if (error && error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        error.message = lang[localeLang].requestError;
      } else if (error.response.status >= 500 && error.response.status < 600) {
        error.message = lang[localeLang].networkError;
      } else {
        error.message = lang[localeLang].connectionError;
      }
    }
    Toast({
      duration: 2000,
      message: error.message
    });
    saveLogToLocale(JSON.stringify(error), 3);
    return Promise.reject(error.message);
  }
);

function saveLogToLocale(e, n) {
  e = JSON.parse(e);
  let myDate = new Date();
  let localeLog = localStorage.getItem("Log")
    ? JSON.parse(localStorage.getItem("Log"))
    : [];
  let logObj = {
    number: n,
    timestamp: myDate.getTime(),
    time: myDate.toLocaleString(),
    msg: JSON.stringify(e)
  };
  if (e.config && e.config.url) {
    logObj.url = e.config.url;
  }
  if (e.request && e.request.status && e.request.statusText) {
    logObj.status = e.request.status;
    logObj.statusText = e.request.statusText;
  }
  if (e.response) {
    logObj.status = e.response.status;
    logObj.statusText = e.response.statusText;
  }
  if (localeLog.length >= 50) {
    localeLog.shift();
  }
  localeLog.push(logObj);
  localStorage.setItem("Log", JSON.stringify(localeLog));
}

export default {
  get(url, params, headers, callback) {
    return axios
      .get(url, {
        params: params,
        headers: headers
      })
      .then(res => {
        if (res.status === 200 && callback) {
          callback(res.data);
        } else if (res.status === 200) return Promise.resolve(res.data);
        else return Promise;
      });
  },

  post(url, params, callback) {
    params.options = params.options || {};
    var config = {
      method: "post",
      url: url,
      data: qs.stringify(params.data)
    };

    Object.keys(params.options).map(key => {
      config[key] = params.options[key];
    });

    return axios(config).then(res => {
      if (res.status === 200 && callback) {
        callback(res.data);
      } else if (res.status === 200) return Promise.resolve(res.data);
      else return Promise;
    });
  }
};
