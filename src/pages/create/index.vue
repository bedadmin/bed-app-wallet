<style lang="scss" scoped>
#create-index {
  height: 100vh;
  background: linear-gradient(left top, #2d3440, #222832);
  .container {
    text-align: center;
    position: inherit;
    .logo {
      margin-top: 6vh;
      width: 200px;
      height: auto;
    }
    .changeLang {
      font-size: 14px;
      padding-top: 10px;
      text-align: right;
      color: #fff;
      a {
        color: #fff;
      }
      .net {
        float: left;
        color: #666;
        letter-spacing: 0;
      }
    }
    .title {
      color: #fff;
      font-size: 25px;
      letter-spacing: 0px;
    }
    .to-wallet {
      position: fixed;
      bottom: 20px;
      left: 15px;
      right: 15px;
    }
    .white-button {
      background-color: transparent;
      color: #fff;
    }
  }
}
</style>
<template>
  <div id="create-index" v-if="showCreate">
    <div class="container">
      <div class="changeLang">
        <span class="net">{{wConfig.network == 'bitcoin' ? 'Mainnet' : 'Testnet'}}</span>
        <a @click="changeLang('zh')">中文</a>
        |
        <a @click="changeLang('en')">EN</a>
      </div>
      <img class="logo" src="http://explorer.bed-coin.com/bed-logo.png" alt>
      <p class="title">BED</p>
      <div class="to-wallet">
        <div class="button default-button" @click="toCreateCreate">{{$t("wallet0.createWallet")}}</div>
        <div class="button white-button" @click="toInportIndex">{{$t("wallet0.importWallet")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {},
  data() {
    return {
      showCreate: true
    };
  },
  computed: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.localforage.getItem("wallet_list").then(l => {
        if (l) {
          Toast.loading({
            duration: 0,
            message: this.$t("commom.tx.merginWallet")
          });
          Object.keys(l).map(key => {
            this.WalletDB.insertaccount(
              key,
              l[key].photo,
              l[key].name,
              l[key].psw,
              l[key].mnemonic,
              l[key].prv,
              l[key].network,
              l[key].ispackup,
              1
            );
            this.localforage.removeItem("news_lbtcnews");
            this.localforage.removeItem(key + "+confirmingTx");
            this.localforage.removeItem(key + "+ownToken");
            this.localforage.removeItem(key + "+txsDetails");
            this.localforage.removeItem(key + "+unspent");
          });

          this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
            Toast.clear();
            localStorage.setItem("isMerge", true);
            this.$router.push({ path: "/main-index/wallet" });
          });
        }
      });
    }, 200);
  },
  methods: {
    toCreateCreate() {
      this.$router.push({ path: "/create-create" });
    },
    toInportIndex() {
      this.$router.push({ path: "/import-index" });
    },
    changeLang(e) {
      let locale = this.$i18n.locale;
      if (locale != e) {
        this.$i18n.locale = e;
        localStorage.setItem("locale", e);
      }
    }
  }
};
</script>
