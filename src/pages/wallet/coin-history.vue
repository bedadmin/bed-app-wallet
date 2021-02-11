<style lang="scss" scoped>
#mine-tx-his {
  height: 100vh;
  .container-lengthen-half::before {
    height: 80vh;
  }
  .wallet-header {
    padding: 10px 20px 30px 20px;
    position: relative;
    background-color: #252b35;
    z-index: 1;
    &::before {
      content: "";
      height: 50%;
      width: 100%;
      background-color: #fff;
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      z-index: -1;
    }
    .header-content {
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0px 10px 15px 0px rgba(51, 51, 51, 0.3);
      background-color: #fff;
    }
    .header-logo {
      width: 70px;
      height: auto;
    }
    .header-balance {
      font-size: 20px;
      font-weight: 600;
      color: #43495c;
      position: relative;
      margin-top: 4px;
      .more-balance-content {
        padding: 15px 10px;
        width: 80%;
        position: absolute;
        font-size: 10px;
        text-align: left;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        overflow: visible;
        background-color: #eee;
        z-index: 1;
      }
    }
    .sign {
      font-size: 14px;
      font-weight: 400;
    }
    .note {
      font-size: 12px;
      border: 1px solid #d36800;
      border-radius: 2px;
      color: #d36800;
      padding: 0px 2px;
      margin-left: 4px;
    }
    .more {
      font-size: 10px;
      .van-icon-arrow::before {
        transition: 0.3s;
      }
    }
    .show-more-balance {
      .van-icon-arrow::before {
        transform: rotate(90deg);
      }
    }
  }
  .history {
    background-color: #fff;
  }
  .history-title {
    font-size: 12px;
    letter-spacing: 0px;
    padding: 12px 24px;
    background-color: #f4f4f4;
    position: relative;
    &::before {
      content: "";
      height: 10px;
      width: 4px;
      background-color: #999;
      position: absolute;
      left: 15px;
      top: 15px;
      border-radius: 4px;
    }
  }
  .cell-group {
    .cell-logo {
      width: 38px;
      height: 38px;
    }
    .title {
      font-size: 14px;
    }
    .label {
      font-size: 12px;
      color: #999;
    }
    .cell-function {
      font-size: 12px;
    }
  }
  .buttom-button {
    position: fixed;
    background-color: #fff;
    box-shadow: 0px -10px 15px 2px rgba(51, 51, 51, 0.1);
    bottom: -1px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    color: #3a4054;
    img {
      height: 24px;
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
    .buttom-button-item {
      flex: 1;
      height: 48px;
      line-height: 48px;
      text-align: center;
      align-items: center;
    }
    .buttom-button-middle {
      height: 16px;
      width: 1px;
      border-color: #e5e5e5;
      background-color: #e5e5e5;
    }
  }
}
</style>
<template>
  <div id="mine-tx-his" @click="showMoreBalance = false">
    <van-nav-bar :z-index="1000" :title="coin" fixed left-arrow @click-left="isBack()" />

    <scroller class="fixed-container" :on-refresh="refresh" :on-infinite="infinite" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">

      <div class="wallet-header text-center">
        <div class="header-content">
          <img class="header-logo" src="http://explorer.bed-coin.com/bed-logo.png">
          <div class="header-balance" :class="showMoreBalance ? 'show-more-balance' : ''">
            <span @click.stop="moreBalance" class="balance">
              {{walletDB.accounts[walletDB.current].balance/100000000}} BED
              <!-- {{decimal(availableBalance).plus(unavailableBalance).toNumber()}} BED -->
            </span>
            <!-- <span @click.stop="moreBalance" class="more" v-if="unavailableBalance">
              <van-icon name="arrow" />
            </span>
            <div class="more-balance-content" v-if="showMoreBalance">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>{{$t('wallet.index.availablebalance')}}:</td>
                  <td><span>{{availableBalance}} </span><span class="sign">BED</span></td>
                </tr>
                <tr>
                  <td>{{$t('wallet.index.unavailablebalance')}}:</td>
                  <td><span>{{unavailableBalance}} </span><span class="sign">BED</span></td>
                </tr>
              </table>
            </div>     -->
          </div>
        </div>
      </div>

      <div class="history">
        
        <!-- <div class="history-title" v-if="Object.keys(walletDB.accounts[walletDB.current].confirmingTx).length">{{$t('mine.txHis.confirming')}}</div> -->
        <!-- <div class="container cell-group" v-if="Object.keys(walletDB.accounts[walletDB.current].confirmingTx).length">
          <div class="cell-item underline" @click="toHisInfo(walletDB.accounts[walletDB.current].confirmingTx)">
            <img class="cell-logo" :src="walletDB.accounts[walletDB.current].confirmingTx.type ? 'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/history-' + walletDB.accounts[walletDB.current].confirmingTx.type + '.png' : 'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/history-r.png'">
            <div class="cell-content">
              <div class="title hash">{{walletDB.accounts[walletDB.current].confirmingTx.hash | formatHash}}</div>
              <div class="label" style="word-break:keep-all;">{{walletDB.accounts[walletDB.current].confirmingTx.time | formatTime(1)}}</div>
            </div>
            <div class="cell-function" :class="walletDB.accounts[walletDB.current].confirmingTx.type == 's' ? 'send' : 're' ">
              {{walletDB.accounts[walletDB.current].confirmingTx.type == 's' ? '-' : '+'}}{{walletDB.accounts[walletDB.current].confirmingTx.value}} LBTC
            </div>
          </div>
        </div> -->

        <div class="history-title">{{$t('mine.txHis.title')}}</div>
        <div class="container cell-group">
          <div class="cell-item underline" v-for="(item, index) in walletDB.accounts[walletDB.current].history.slice(0, page * pageCount)" @click="toHisInfo(item)" :key="item.txid + index">
            <img class="cell-logo" :src="item.type ? 'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/history-' + item.type + '.png' : 'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/history-r.png'">
            <div class="cell-content">
              <div class="title hash">{{item.txid | formatHash}}</div>
              <div class="label" style="word-break:keep-all;">{{item.blockTime | formatTime(2)}}</div>
            </div>
            <div class="cell-function" :class="item.type == 's' ? 'send' : 're' ">
              {{item.type == 's' ? '-' : '+'}}{{item.value/100000000}} BED 
            </div>
          </div>
        </div>
      </div>

    </scroller>

    <div class="buttom-button">
      <div class="buttom-button-item fyellow" @click="toSend">
        <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/history-button-s.png" alt="">
          {{$t('wallet.index.tabSend')}}
      </div>
      <div class="buttom-button-middle"></div>
      <div class="buttom-button-item fblue" @click="toReceive">
        <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/history-button-r.png" alt="">
        {{$t('wallet.index.tabReceive')}}
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
      availableBalance: 0,
      unavailableBalance: 0,
      coin: "",
      showTxs: [],
      showMoreBalance: false,
      pageCount: 50,
      page: 1,
      totalPage: 0,
      infiniteStatus: true
    };
  },
  computed: {
    historyLocation() {
      return this.$store.state.historyLocation;
    }
  },
  created() {},
  mounted() {
    this.hisInit();
  },
  methods: {
    isBack() {
      this.$store.commit("setHistoryLocation", {
        left: 0,
        top: 0,
        page: 1
      });
      this.$router.goBack();
    },

    hisInit() {
      this.coin = this.$route.query.coin;
      this.totalPage = Math.ceil(
        this.walletDB.accounts[this.walletDB.current].history.length /
          this.pageCount
      );
      setTimeout(() => {
        this.$refs.myscroller.scrollTo(
          this.historyLocation.left,
          this.historyLocation.top
        );
      }, 100);
    },

    refresh() {
      if (this.walletDB.updataStatus) {
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
              this.page = 1;
              this.totalPage = Math.ceil(
                this.walletDB.accounts[this.walletDB.current].history.length /
                  this.pageCount
              );
              this.$refs.myscroller.finishPullToRefresh();
              this.$store.commit("setUpdataStatus", true);
            });
          })
          .catch(error => {
            Toast({
              duration: 2000,
              message: error
            });
            this.$store.commit("setUpdataStatus", true);
            this.$refs.myscroller.finishPullToRefresh();
          });
      } else {
        this.$refs.myscroller.finishPullToRefresh();
      }
    },

    infinite(done) {
      // Trigger
      if (this.page >= this.totalPage) {
        this.$refs.myscroller.finishInfinite(2);
        return;
      }
      // Action
      if (this.infiniteStatus) {
        this.infiniteStatus = false;
        window.setTimeout(() => {
          this.page = this.page + 1;
          done();
          this.infiniteStatus = true;
        }, 1500);
      }
    },

    toHisInfo(param) {
      let { left, top } = this.$refs.myscroller.getPosition();
      this.$store.commit("setHistoryLocation", {
        left: left,
        top: top,
        page: this.page
      });
      this.$router.push({
        path: "/mine-tx-hisInfo",
        query: { txInfo: JSON.stringify(param) }
      });
    },

    moreBalance() {
      if (this.walletDB.accounts[this.walletDB.current].unavailableBalance) {
        this.showMoreBalance = !this.showMoreBalance;
      } else {
        return false;
      }
    },

    toSend() {
      this.$router.push({ path: "/wallet-send" });
    },

    toReceive() {
      this.$router.push({ path: "/wallet-receive" });
    },

    onCopy() {
      Toast.success({
        duration: 1500,
        message: this.$t("commom.tx.copied")
      });
    },

    onError() {
      Toast.fail({
        duration: 1500,
        message: this.$t("commom.tx.copyError")
      });
    }
  },
  watch: {
    walletDB: {
      handler(newVal, oldVal) {
        this.availableBalance =
          newVal.accounts[newVal.current].availableBalance;
        this.unavailableBalance =
          newVal.accounts[newVal.current].unavailableBalance;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
