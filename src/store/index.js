import Vue from "vue";
import Vuex from "vuex";
import localforage from "localforage";
import $http from "../factory/libs/http";
import $api from "../factory/libs/api";
import decimal from "decimal.js";
import wConfig from "../factory/wallet/config";

import wallet_service from "../factory/wallet/wallet-service";
import { Toast } from "vant";

const Wallet = wallet_service.Wallet;
let localeLang = localStorage.getItem("locale")
  ? localStorage.getItem("locale")
  : "en";
let lang = {
  zh: {
    nodata: "无更多数据",
    success: "获取成功",
    error: "获取错误"
  },
  en: {
    nodata: "No more data",
    success: "Completed",
    error: "Error"
  }
};

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    walletDB: {
      current: "",
      addresses: [],
      accounts: {},
      isRefreshShowMsg: false,
      updataStatus: true
    },
    isplusReady: false,
    isFreshWallet: true,
    mainAction: 0,
    currentHisAddress: "",
    vote: {
      forgeList: [],
      votesList: []
    },
    news: {
      indexAction: 0,
      isSwiper: false,
      newsIndexAction: {
        name: "report",
        index: 0
      },
      lbtcIndexAction: {
        name: "lbtcAll",
        index: 0
      },
      indexLocation: {
        news_lbtcAll: 0,
        news_report: 0,
        news_announcement: 0,
        news_tutorial: 0,
        news_article: 0,
        news_newsAll: 0,
        news_lbtcnews: 0,
        news_information: 0,
        news_collection: 0
      },
      newsClassContent: {
        news_lbtcAll: [],
        news_report: [],
        news_announcement: [],
        news_tutorial: [],
        news_article: [],
        news_newsAll: [],
        news_lbtcnews: [],
        news_information: [],
        news_collection: []
      },
      newsClassPage: {
        news_lbtcAll: 1,
        news_report: 1,
        news_announcement: 1,
        news_tutorial: 1,
        news_article: 1,
        news_newsAll: 1,
        news_lbtcnews: 1,
        news_information: 1,
        news_collection: 1
      }
    },
    historyLocation: {
      left: 0,
      top: 0,
      page: 1
    }
  },

  mutations: {
    saveMainAction(state, data) {
      state.mainAction = data.mainAction;
    },
    saveVoteData(state, data) {
      state.vote.forgeList = data.forgeList;
      state.vote.votesList = data.votesList;
    },

    isFreshWallet(state, data) {
      state.isFreshWallet = data;
    },

    // wallet
    setWalletDB(state, data) {
      (state.walletDB.current = data.current),
        (state.walletDB.addresses = data.addresses),
        (state.walletDB.accounts = data.accounts);
    },

    setIsRefreshShowMsg(state, data) {
      state.walletDB.isRefreshShowMsg = data;
    },

    setUpdataStatus(state, data) {
      state.walletDB.updataStatus = data;
    },

    // News
    setIsSwiper(state, obj) {
      state.news.isSwiper = obj;
    },
    setIndexAction(state, data) {
      state.news.indexAction = data.type;
    },
    setNewsIndexAction(state, data) {
      state.news.newsIndexAction.name = data.name;
      state.news.newsIndexAction.index = data.index;
    },
    setlbtcIndexAction(state, data) {
      state.news.lbtcIndexAction.name = data.name;
      state.news.lbtcIndexAction.index = data.index;
    },
    setIndexLocation(state, obj) {
      state.news.indexLocation = obj;
    },
    setNewsClassContent(state, obj) {
      state.news.newsClassContent = obj;
    },
    setNewsClassPage(state, obj) {
      state.news.newsClassPage = obj;
    },

    // History
    setHistoryLocation(state, obj) {
      state.historyLocation = obj;
    }
  },

  actions: {
    saveWalletDB({ dispatch, commit, state }, data) {
      commit("setWalletDB", {
        current: data.current,
        addresses: data.addresses,
        accounts: data.accounts
      });
      return Promise.resolve(
        localforage.setItem("walletDB", data).then(r => {
          return Promise.resolve(true);
        })
      );
    },

    getWalletTxs({ dispatch, commit, state }, data) {
      let n_h, c_h;
      return Promise.resolve(
        $http
          .get($api.api.getHeight)
          .then(h => {
            n_h = h.height;
            if (data.currentHeight) {
              c_h = 0;
            } else {
              c_h = state.walletDB.accounts[data.address].currentHeight;
            }
            return Promise.resolve(
              $http
                .get($api.api.getTxByAddr, {
                  address: data.address,
                  from: c_h,
                  to: n_h
                })
                .then(l => {
                  if(l.txs) {
                    return Promise.resolve(l.transactions);
                  } else {
                    return Promise.resolve([]);
                  }
                })
            );
          })
          .then(l => {
            if (l.length) {
              let txGroup = chunkArry(l, 50);
              return Promise.resolve(
                Wallet.queue(txGroup, data.address).then(txs => {
                  return Promise.resolve(txs);
                })
              );
            } else {
              return Promise.resolve([]);
            }
          })

          .then(r => {
            return Promise.resolve(
              $http
                .get($api.api.getBalance, {param: data.address})
                .then(b => {
                  return Promise.resolve({
                    currentHeight: n_h,
                    currentHistory: r,
                    currentBalance: parseInt(b.balance)
                  });
                })
            );
          })
          .then(r => {
            return Promise.resolve(
              $http.get($api.api.getUTXO, {param: data.address, confirmed: true}).then(UTXO => {
                UTXO.forEach(item => {
                  item.value = decimal(parseInt(item.value))
                    //.mul(wConfig.point)
                    .toNumber();
                });
                r.currentUTXO = UTXO;
                console.log(r);
                return Promise.resolve(r);
              })
            );
          })
      );
    },

    checkSync({ dispatch, commit, state }, address) {
      if (state.walletDB.accounts[address].history.length) {
        let latestTxs = state.walletDB.accounts[address].history.slice(0, 3);
        console.log(latestTxs);
        let hashObj = {};
        let hash = [];
        latestTxs.forEach((item, index) => {
          hashObj[item.hash] = {
            height: item.height,
            blockhash: item.blockhash
          };
          hash.push(item.hash);
        });
        let param = hash.join(",");
        let flag = false;

        return new Promise(resolve => {
          $http
            //.get($api.api.gettxinfo, { param: param, addr: address })
            .get($api.api.gettxinfo, {param: param})
            .then(r => {
              //for (let i = 0; i < r.msg.length; i++) {
                const item = r;
                if (item.blockHeight && item.blockHash) {
                  flag = false;
                } else {
                  flag = true;
                  //break;
                }
              //}
              if (flag) {
                resolve(false);
              } else {
                resolve(true);
              }
            });
        });
      }
    }
  }
});

function chunkArry(array, size) {
  const length = array.length;
  if (!length || !size || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;

  let result = new Array(Math.ceil(length / size));
  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}

export default store;
