<style lang="scss" scoped>
#mine-manage {
  height: 100vh;
  background-color: #fff;
  .content {
    padding-top: 8px;
  }
  .wallet-item {
    margin: 8px 1px;
    padding: 0 15px;
    font-size: 14px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    color: #333;
    background-color: #fff;
    .wallet-item-top {
      display: flex;
      padding: 20px 0 15px;
      border-bottom: 1px solid #eee;
      .wallet-photo {
        margin-right: 10px;
        height: 48px;
        width: 48px;
        img {
          height: 100%;
        }
      }
      .wallet-content {
        max-width: 80%;
        flex: 1;
      }
      .wallet-name {
        width: 100%;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
        font-size: 15px;
      }
      .wallet-addr {
        word-break: break-all;
        color: #999;
      }
    }
    .wallet-item-bottom {
      text-align: right;
      padding: 10px 0;
      color: #666;
    }
  }
  .buttom-button {
    position: fixed;
    background-color: #fff;
    box-shadow: 0px 1px 9px 0px rgba(29, 90, 163, 0.33);
    bottom: -1px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    img {
      height: 20px;
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
      height: 36px;
      width: 1px;
      border-color: #e5e5e5;
      background-color: #e5e5e5;
    }
  }
}
</style>
<template>
  <div id="mine-manage">
    <van-nav-bar :z-index="1000" :title="$t('mine.manage.navTitle')" fixed left-arrow @click-left="goBack()" />

    <scroller class="container fixed-container" :on-refresh="refresh" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">

      <div class="content">

        <div class="wallet-item" v-for="(item, index) in walletDB.addresses" :v-for="item" @click="toManageInfo(item)">
          <div class="wallet-item-top">
            <div class="wallet-photo">
              <img :src="'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/avatar/' + walletDB.accounts[item].avatar + '.png'" alt="">
            </div>
            <div class="wallet-content">
              <div class="wallet-name">
                <span>{{walletDB.accounts[item].name}}</span>
                <van-icon name="arrow" style="top: 3px;float: right;" />
              </div>
              <div class="wallet-addr hash">{{walletDB.accounts[item].address}}</div>
            </div>
          </div>
          <div class="wallet-item-bottom">{{walletDB.accounts[item].balance/100000000}} BED</div>
        </div>

      </div>

    </scroller>

    <div class="buttom-button">
      <div class="buttom-button-item fyellow" @click="toImport">
        <img src="https://lbtc.io/wallet/static/img/manager-import.png" alt="">
          {{$t('create.index.importWallet')}}
      </div>
      <div class="buttom-button-middle"></div>
      <div class="buttom-button-item fblue" @click="toCreate">
        <img src="https://lbtc.io/wallet/static/img/manager-create.png" alt="">
        {{$t('create.index.createWallet')}}
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
      allLoaded: true
    };
  },
  computed: {},
  created() {
    this.hisInit();
  },
  mounted() {},
  methods: {
    hisInit() {
      setTimeout(() => {
        Toast.clear();
      }, 500);
    },

    goBack() {
      this.$router.push({ path: "/main-index/mine" });
    },

    toManageInfo(key) {
      this.$router.push({ path: "/mine-manageInfo", query: { addr: key } });
    },

    toCreate() {
      this.$router.push({ path: "/create-create" });
    },

    toImport() {
      this.$router.push({ path: "/import-index" });
    },

    infinite(done) {
      setTimeout(() => {
        if (this.num < this.items.length) {
          this.num = this.num + 10;
          done();
        } else {
          this.$refs.myscroller.finishInfinite(true);
        }
      }, 1000);
    },

    refresh(done) {
      this.hisInit();
      setTimeout(() => {
        done();
      }, 1000);
    }
  }
};
</script>
