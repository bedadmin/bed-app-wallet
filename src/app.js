import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// VueI18n
import VueI18n from "vue-i18n";
import zh from "./factory/lang/zh";
import en from "./factory/lang/en";

// UI
import Vant from "vant";
import "vant/lib/index.css";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";

// Plugin
import lib from "./factory/libs";
import wallet from "./factory/wallet";
import WalletDB from "./factory/wallet/account";

import VueClipboard from "vue-clipboard2";
import VueScroller from "vue-scroller";
import localforage from "localforage";
import VueSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

import FastClick from "fastclick";
FastClick.attach(document.body);

// CSS
import "../static/theme/common.css";
import "../static/theme/transition.css";

// Components
import txcomponent from "./components/tx-component.vue";

Vue.component("tx-component", txcomponent);

Vue.use(VueI18n)
  .use(Vant)
  .use(MintUI)
  .use(VueSwiper)
  .use(VueClipboard)
  .use(VueScroller);

// import Vconsole from "vconsole";
// new Vconsole();

Vue.config.productionTip = false;

let locale = localStorage.getItem("locale")
  ? localStorage.getItem("locale")
  : "en";
localStorage.setItem("locale", locale);
const i18n = new VueI18n({
  locale: locale,
  messages: {
    zh: zh,
    en: en
  }
});

Vue.mixin({
  computed: {
    isplusReady() {
      return store.state.isplusReady;
    },
    walletDB() {
      return store.state.walletDB;
    }
  }
});

const app = new Vue({
  el: "#app",
  router,
  store,
  i18n,
  lib,
  wallet,
  async created() {
    await this.initWalletDB();
  },
  methods: {
    initWalletDB() {
      return new Promise(resolve => {
        localforage.getItem("walletDB").then(r => {
          let walletDB;
          if (r) {
            walletDB = new WalletDB(r.current, r.addresses, r.accounts);
          } else {
            walletDB = new WalletDB("", [], {});
          }
          Vue.prototype.WalletDB = walletDB;
          store.state.walletDB.current = walletDB.current;
          store.state.walletDB.addresses = walletDB.addresses;
          store.state.walletDB.accounts = walletDB.accounts;
          store.state.walletDB.updataStatus = true;
          resolve(true);
        });
      });
    }
  },
  render: h => h(App)
});

document.addEventListener("plusready", function() {
  store.state.isplusReady = true;
  plus.screen.lockOrientation("portrait-primary");
  let now = false;
  let time = null;
  plus.key.addEventListener("backbutton", function() {
    if (
      app.$route.path.indexOf("/main-index") >= 0 ||
      app.$route.path.indexOf("/create-index") >= 0
    ) {
      time = null;
      if (now) {
        now = false;
        plus.runtime.quit();
      } else {
        now = true;
        plus.nativeUI.toast(app.$t("commom.quit"), { duration: "short" });
        time = setTimeout(() => {
          now = false;
        }, 1000);
      }
    } else {
      router.back();
    }
  });
});
