/**
 * Api
 */

import wConfig from "../wallet/config";
import $http from "./http";

const baseURLObj = {
  bitcoin: "http://api.bed-coin.com/",
  testnet: "http://47.75.150.5:8822/"
};
const baseURL = baseURLObj[wConfig.network];
const api = {
  getversion:          "/api/BED/mainnet/block/newest/mgetversion",
  getHeight:           "/api/BED/mainnet/block/newest/mgetblockcount",
  getTxByAddr:         "/api/BED/mainnet/block/newest/mgettxbyaddr",
  gettxinfo:           "/api/BED/mainnet/block/newest/mgettxinfo",
  msendrawtransaction: "/api/BED/mainnet/block/newest/msendtx",
  getBalance:          "/api/BED/mainnet/block/newest/mgetaddrbalance",
  getUTXO:             "/api/BED/mainnet/block/newest/mgetaddrutxo"

};

const getversion = () =>
  $http({
    method: "get",
    url: api.api.getversion,
    params: {}
  });

const getHeight = () =>
  $http({
    method: "get",
    url: api.api.getHeight,
    params: {}
  });

const getTxByAddr = () =>
  $http({
    method: "get",
    url: api.api.getTxByAddr,
    params: {}
  });

const gettxinfo = () =>
  $http({
    method: "get",
    url: api.api.gettxinfo,
    params: {}
  });

const msendrawtransaction = () =>
  $http({
    method: "get",
    url: api.api.msendrawtransaction,
    params: {}
  });

const getBalance = address =>
  $http({
    method: "get",
    url: api.api.getBalance + address + "/balance",
    params: {}
  });

const getUTXO = address =>
  $http({
    method: "get",
    url: api.api.getUTXO + address,
    params: {}
  });

export default {
  baseURL,
  api,
  getversion,
  getHeight,
  getTxByAddr,
  gettxinfo,
  msendrawtransaction,
  getBalance,
  getUTXO
};
