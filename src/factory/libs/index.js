import Vue from "vue";
import http from "./http";
import api from "./api.js";
import lib from "./lib";
import localforage from "localforage";
import calc from "calculatorjs";
import bign from "big-number";
import decimal from "decimal.js";
import moment from "moment";
import store from "store";

Vue.prototype.$http = http;
Vue.prototype.$api = api;
Vue.prototype.localforage = localforage;
Vue.prototype.calc = calc;
Vue.prototype.bign = bign;
Vue.prototype.decimal = decimal;
Vue.prototype.localStore = store;

Object.keys(lib).map(key => {
  if (lib[key] instanceof Function) {
    Vue.prototype[key] = lib[key];
  }
});

Vue.filter("formatHash", function(value) {
  if (!value) {
    return "";
  }
  let len = value.length;
  if (len > 20) {
    return value.slice(0, 8) + "..." + value.slice(-8);
  } else {
    return value;
  }
});

Vue.filter("formatTime", function(value, type) {
  if (String(value).length == 10) {
    switch (type) {
      case 1:
        return moment(value * 1000).format("YYYY/MM/DD");
      case 2:
        return moment(value * 1000).format("YYYY/MM/DD HH:mm:ss");
    }
  } else if (String(value).length == 13) {
    switch (type) {
      case 1:
        return moment(value).format("YYYY/MM/DD");
      case 2:
        return moment(value).format("YYYY/MM/DD HH:mm:ss");
    }
  }
});
