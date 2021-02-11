<style lang="scss" scoped>
  .tabbar {
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    &::before {
      content: ' ';
      position: absolute;
      pointer-events: none;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      transform: scale(.5);
      border: 1px solid #ebedf0;
      border-width: 1px 0;
    }
    .tabbar-item {
      flex: 1;
      display: flex;
      line-height: 1;
      font-size: 12px;
      color: #7d7e80;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 0 40px;
      .tabbar-item-text {
        transition: 0s all;
      }
    }
    .tabbar-item-active {
      color: #2E354A;
    }
    .tabbar-item-icon {
      img {
        height: 18px;
      }
    }
    .tabbar-custom {
      width: 42px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 24px;
      color: #fff;
      background: rgba(56,95,255,1);
      border-radius: 5px;
    }
  }
</style>
<template>
  <div id="main-index" v-if="walletDB && walletDB.current">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

    <div class="tabbar">
      <div class="tabbar-item" :class="active == '/main-index/wallet' ? 'tabbar-item-active' : ''" @click.stop="swithTabbar('/main-index/wallet')">
        <div class="tabbar-item-icon">
          <img :src="active == '/main-index/wallet' ? 'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/tabbar-active-wallet.png' : 'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/tabbar-wallet.png'">
        </div>
        <div class="tabbar-item-text">{{$t('main.wallet')}}</div>
      </div>

      <!-- <div class="tabbar-item">
        <div class="tabbar-custom">+</div>
      </div> -->

      <div class="tabbar-item" :class="active == '/main-index/mine' ? 'tabbar-item-active' : ''" @click.stop="swithTabbar('/main-index/mine')">
        <div class="tabbar-item-icon">
          <img :src="active == '/main-index/mine' ? 'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/tabbar-active-my.png' : 'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/tabbar-my.png'">
        </div>
        <div class="tabbar-item-text">{{$t('main.mine')}}</div>
      </div>
    </div>


    <!-- <van-tabbar v-model="active">
      <van-tabbar-item to="/main-index/wallet">
        <span>{{$t('main.wallet')}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="active == 0 ? icon.active + '0.png' : icon.normal + '0.png'"
        >
      </van-tabbar-item>
      
      <van-tabbar-item to="/main-index/mine">
        <span>{{$t('main.mine')}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="active == 1 ? icon.active + '2.png' : icon.normal + '2.png'"
        >
      </van-tabbar-item>
    </van-tabbar> -->


  </div>
</template>

<script>
import { Toast } from "vant";
import Wallet from "../wallet/index.vue";
import News from "../news/index.vue";
import Mine from "../mine/index.vue";
export default {
  components: {
    Wallet,
    Mine,
    News
  },
  props: {},
  data() {
    return {
      active: '/main-index/wallet',
      icon: {
        normal: "https://lbtc.io/wallet/static/img/main-0-",
        active: "https://lbtc.io/wallet/static/img/main-0-a-"
      },
      vData: {}
    };
  },
  computed: {},
  beforeCreate() {},
  created() {
    window.setTimeout(() => {
      if (!this.walletDB.current) {
        this.$router.push({ path: "/create-index" });
      }
    }, 200)
    // this.swithPath(this.$route.path);
    this.swithTabbar(this.$route.path);
  },
  mounted() {
    /*
    this.$http
      .get(this.$api.api.getversion, {
        param: "getversion"
      })
      .then(res => {
        this.vData = res;
        if (this.versionCompare(this.vData.version, this.wConfig.version)) {
          this.openDialog();
        } else {
          return;
        }
      });
   */
  },
  methods: {
    openDialog() {
      this.$dialog.confirm({
        title: this.$t("main.updataTitle"),
        message: this.$t("main.updataMessage"),
        confirmButtonText: this.$t("main.confirmButtonText"),
        cancelButtonText: this.$t("main.cancelButtonText")
      })
      .then(() => {
        // on confirm
        plus.runtime.openURL("https://lbtc.io/m-download.html");
        plus.runtime.quit();
      })
      .catch(() => {
        if (this.vData.flag == "1") {
          plus.runtime.quit();
        }
      });
    },

    swithTabbar(path) {
      this.active = path;
      this.$router.push({path: path});
    },

    // swithPath(path) {
    //   switch (path) {
    //     case "/main-index/wallet":
    //       this.active = 0;
    //       break;
    //     case "/main-index/mine":
    //       this.active = 1;
    //       break;
    //     default:
    //       break;
    //   }
    // }
  },
  destroyed() {},
  beforeRouteLeave (to, from, next) {
    this.$dialog.close();
    next();
  },
  watch: {
    active(newVal, oldVal) {
      this.$store.state.mainAction = newVal;
      this.$store.commit("saveMainAction", {
        mainAction: newVal
      });
    }
  }
};
</script>
