<style lang="scss" scoped>
#wallet-index {
  .container-lengthen-half::before {
    height: 130px;
  }
  .wallet-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: #fff;
    .wallet-header-top {
      color: #fff;
      .header-top-nav {
        background-color: #252b35;
        height: 52px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        .drawer {
          display: flex;
          align-items: center;
          height: 30px;
          padding: 0 10px;
          background-color: #171c26;
          border-radius: 15px;
        }
        .wap-nav {
          position: relative;
          height: 2px;
          width: 10px;
          margin-right: 5px;
          background-color: #fff;
          border-radius: 1px;
          &::after {
            content: "";
            position: absolute;
            height: 2px;
            width: 80%;
            background-color: #fff;
            top: -4px;
            left: 0;
            border-radius: 1px;
          }
          &::before {
            content: "";
            position: absolute;
            height: 2px;
            width: 120%;
            background-color: #fff;
            bottom: -4px;
            left: 0;
            border-radius: 1px;
          }
        }
        .name {
          font-size: 14px;
        }
        .flex-space {
          flex: 1;
        }
        img {
          width: 24px;
          height: 24px;
          margin: 10px 5px;
        }
      }
      .header-top-assets {
        .assets-content {
          width: 100%;
          height: 160px;
          background-image: url("https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/wallet-assets.png");
          background-size: 100% 100%;
          padding: 20px 40px;
        }
        .title {
          letter-spacing: 1px;
        }
        .balance {
          margin-top: 20px;
          font-size: 34px;
          font-weight: bold;
          position: relative;
          &::before {
            content: "";
            width: 15px;
            height: 5px;
            background-color: #fff;
            position: absolute;
            bottom: -10px;
          }
        }
      }
    }
    .wallet-bottom-entrance {
      height: 80px;
      display: flex;
      align-items: center;
      .bottom-entrance-item {
        flex: 1;
        font-size: 13px;
        color: #43495c;
        img {
          height: 36px;
          width: auto;
        }
      }
    }
  }

  .backup {
    font-size: 12px;
    padding: 2px 4px;
    background-color: #fff;
    color: #385fff;
    border-radius: 3px;
  }

  .wallet-index-fixed {
    height: calc(100vh - 300px);
    margin-top: 300px;
    padding-bottom: 50px;
    z-index: 0;
    background-color: #fff;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .my-coin {
    height: calc(100vh - 350px);
    color: #2e354a;
    a {
      color: #2e354a;
    }
    .cell-function {
      font-weight: bold;
    }
  }

  .van-popup--left {
    height: 100vh;
    width: 75vw;
    background-color: #29303b;
    color: #fff;

    .wallet-list-title {
      padding: 25px 18px 15px;
      font-weight: 600;
      font-size: 18px;
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      z-index: 2000;
    }
    .container {
      padding: 60px 0 130px 0;
      height: 100%;
      overflow-y: auto;
    }
    .action {
      background-color: #171c25;
      position: relative;
      &::before {
        content: "";
        height: 15px;
        width: 5px;
        border-radius: 5px;
        position: absolute;
        left: 0;
        top: 35%;
        background-color: #385fff;
      }
    }
    .wallet-list-item {
      display: flex;
      padding: 10px 18px;
      align-items: center;
      .wallet-photo {
        flex: 0;
        height: 30px;
        margin-right: 5px;
        vertical-align: middle;
      }
      .wallet-name {
        flex: 1;
        font-size: 14px;
        .wallet-address {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .bottom-button {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px 0 25px;
      border-top: 1px solid #171c25;
      z-index: 2000;
      display: flex;
      align-items: center;
      .wallet-list-item {
        padding: 0 10px;
        flex: 1;
        justify-content: center;
        > div {
          display: flex;
        }
      }
      .wallet-photo {
        height: 16px;
        width: auto;
      }
      .wallet-name {
        color: #fefffe;
        font-size: 13px;
      }
    }
  }
}
</style>
<template>
  <div id="wallet-index" v-if="walletDB && walletDB.current">
    <div class="wallet-header container-lengthen-half">
      <div class="wallet-header-top">
        <div class="header-top-nav">
          <div class="drawer" @click="showWalletList = true">
            <span class="wap-nav"></span>
            <span class="name">{{walletDB.accounts[walletDB.current].name}}</span>
          </div>
          <span class="flex-space"></span>
          <img class="avatar"  @click="toWalletInfo" src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/user.png">
          <img class="qr-code" @click="toQrCode" src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/qr-icon.png" v-if="isplusReady">
        </div>
        <div class="header-top-assets">
          <div class="assets-content">
            <div class="title">
              {{$t('wallet.index.myAssets')}}(BED)
              <span v-if="!walletDB.accounts[walletDB.current].backupFlag" class="backup" @click="toWalletInfo">{{$t('wallet.index.backup')}}</span>
            </div>
            <div class="balance" @click="toSend">{{walletDB.accounts[walletDB.current].balance/100000000}}</div>
          </div>
        </div>
      </div>
      <div class="wallet-bottom-entrance">
        <div class="bottom-entrance-item text-center" @click="toSend">
          <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/send.png">
          <div>{{$t('wallet.index.tabSend')}}</div>
        </div>
        <div class="bottom-entrance-item text-center" @click="toReceive">
          <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/receive.png">
          <div>{{$t('wallet.index.tabReceive')}}</div>
        </div>
        <!-- <div class="bottom-entrance-item text-center" @click="toVote">
          <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/node.png">
          <div>{{$t('wallet.index.tabNode')}}</div>
        </div>
        <div class="bottom-entrance-item text-center" @click="toRegister">
          <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/node.png">
          <div>{{$t('wallet.index.tabRegister')}}</div>
        </div> -->
      </div>
    </div>

    <div class="wallet-index-fixed">
      <mt-loadmore
        style="overflow: visible;"
        :top-method="refresh"
        :auto-fill="false"
        :topPullText="$t('main.refresh')"
        :topDropText="$t('main.refresh')"
        :topLoadingText="$t('main.loading')"
        ref="loadmore"
      >
        <div class="my-coin container">
          <div class="top-title">
            <span>{{$t('wallet.index.assets')}}</span>
          </div>
          <div class="cell-group">
            <router-link :to="{path: '/wallet-coin-history', query: { coin: 'BED'}}">
              <div class="cell-item underline">
                <img class="cell-logo" src="http://explorer.bed-coin.com/bed-logo.png" />
                <div class="cell-content">
                  <div class="title">BED</div>
                  <div class="label">BED</div>
                </div>
                <div class="cell-function">{{walletDB.accounts[walletDB.current].balance/100000000}}</div>
              </div>
            </router-link>
          </div>
        </div>
      </mt-loadmore>
    </div>

    <!-- Wallet List -->
    <van-popup v-model="showWalletList" position="left">
      <div class="wallet-list-title">{{$t('wallet.index.walletListTitle')}}</div>
      <div class="container">
        <div
          class="wallet-list-item"
          :class="item == walletDB.current ? 'action' : ''"
          v-for="(item, index) in walletDB.addresses"
          :key="item"
          @click="selectWallet(item)"
        >
          <img
            class="wallet-photo"
            :src="'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/avatar/' + walletDB.accounts[item].avatar + '.png'"
          />
          <div class="wallet-name ellipsis">
            <div>{{walletDB.accounts[item].name}}</div>
            <div class="wallet-address hash">{{walletDB.accounts[item].address | formatHash}}</div>
          </div>
        </div>
      </div>

      <div class="bottom-button">
        <div class="wallet-list-item" @click="toImport">
          <div>
            <img class="wallet-photo" src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/white-import-wallet.png" />
            <div class="wallet-name ellipsis">{{$t('create.index.importWallet')}}</div>
          </div>
        </div>
        <div style="color: #171C25">|</div>
        <div class="wallet-list-item" @click="toCreate">
          <div>
            <img class="wallet-photo" src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/white-careat-wallet.png" />
            <div class="wallet-name ellipsis">{{$t('create.index.createWallet')}}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {},
  data() {
    return {
      showWalletList: false,
      availableBalance: 0
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.walletIndexInit();
  },
  methods: {
    walletIndexInit() {
      if (this.$store.state.isFreshWallet) {
        this.$store.commit("isFreshWallet", false);
        window.setTimeout(() => {
          this.refresh();
        }, 500);
      }
    },

    refresh() {
      if (this.walletDB.updataStatus) {
        // await this.$store.dispatch('checkSync',this.walletDB.current)
        this.$store.commit("setUpdataStatus", false);
        this.$store
          .dispatch("getWalletTxs", {
            address: this.walletDB.current
          })
          .then(data => {
            this.WalletDB.insertHistroy(this.walletDB.current, data);
            this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
              if (data.currentHistory.length) {
                Toast({
                  duration: 2000,
                  message: this.$t("mine.txHis.msg2")
                });
              } else {
                Toast({
                  duration: 2000,
                  message: this.$t("mine.txHis.msg3")
                });
              }
              this.$store.commit("setUpdataStatus", true);
              this.$refs.loadmore.onTopLoaded();
            });
          })
          .catch(error => {
            /*
            Toast({
              duration: 2000,
              message: error
            });
            */
            this.$store.commit("setUpdataStatus", true);
            this.$refs.loadmore.onTopLoaded();
          });
      } else {
        this.$refs.loadmore.onTopLoaded();
      }
    },

    selectWallet(param) {
      if (param != this.walletDB.current && this.walletDB.updataStatus) {
        this.WalletDB.selectWallet(param);
        this.showWalletList = false;
        this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
          this.refresh();
        });
      }
    },

    toSend() {
      this.$router.push({ path: "/wallet-send" });
    },

    toReceive() {
      this.$router.push({ path: "/wallet-receive" });
    },

    toVote() {
      this.$router.push({ path: "/vote-index" });
    },

    toGovernance() {
      this.$router.push({ path: "/governance-index" });
    },

    toRegister() {
      this.$router.push({ path: "/register-index" });
    },

    toToken() {
      this.$router.push({ path: "/token-index" });
    },

    toCreate() {
      this.$router.push({ path: "/create-create" });
    },

    toImport() {
      this.$router.push({ path: "/import-index" });
    },

    toHisInfo(param) {
      this.$router.push({
        path: "/mine-tx-hisInfo",
        query: { txInfo: JSON.stringify(param) }
      });
    },

    toWalletInfo() {
      this.$router.push({
        path: "/mine-manageInfo",
        query: { addr: this.WalletDB.current }
      });
    },

    toAddCoin() {
      this.$router.push({ path: "/wallet-add" });
    },

    toQrCode() {
      this.$router.push({ path: "/qr" });
    }
  },
  watch: {
    walletDB: {
      handler(newVal, oldVal) {
        this.availableBalance =
          newVal.accounts[newVal.current].availableBalance;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
