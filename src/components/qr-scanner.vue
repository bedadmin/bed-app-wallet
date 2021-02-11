<style lang="scss">
#qr-scanner {
  background-color: #1D1D1D;
  height: 100vh;
  .van-nav-bar {
    background-color: transparent;
    .van-icon {
      color: #ffffff;
    }
    .van-nav-bar__title {
      color: #ffffff;
    }
    .van-nav-bar__text {
      color: #ffffff;
    }
    .van-nav-bar__text:active {
      background-color: transparent;
    }
  }
  #bcid {
    width: 100%;
    position: absolute;
    top: 42px;
    bottom: 0px;
    text-align: center;
    z-index: 0;
    background-color: transparent;
    .tip {
      color: #ffffff;
    }
  }
  .res {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0px;
    padding: 30px;
    color: #ddd;
    div {
      word-break: break-word;
    }
  }
}
</style>

<template>
  <div id="qr-scanner">
    <van-nav-bar :z-index="9999" :title="$t('commom.tx.scan')" left-arrow @click-left="$router.goBack()" />

    <div id="bcid" style="">
      <div style="height:35%"></div>
      <p class="tip" v-if="warn">{{warn}}</p>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'vant';

let scan = null;
let that = this;

export default {
  data() {
    return {
      type: 'QR',
      res: '',
      warn: ''
    };
  },
  computed: {
    ...mapState({
      isplusReady: state => state.isplusReady
    })
  },
  created() {
    
  },
  mounted() {
    this.startRecognize();
  },
  methods: {
    startRecognize() {
      if (!this.checkPlusReady(1)) {
        this.warn = this.$t('commom.tx.qrWarn');
        return
      }
      try {
        scan = new plus.barcode.Barcode('bcid');
        scan.onmarked = this.onmarked
        this.startScan();
      } catch (error) {
        this.warn = this.$t('commom.tx.qrWarn');
      }
    },

    // success callback
    onmarked(type, result){
      result = result.replace(/\n/g, '');
      this.type = type;
      this.res = result;
      let warnMsg = '';

      if (this.type != 0) {
        warnMsg = this.$t('commom.tx.noQrcode');
      } else {
        if (this.isAddress(this.res)) {
          warnMsg = '';
        } else {
          warnMsg = this.$t('wallet.send.checkWarnMsg2');
        }
      }
      if (warnMsg) {
        Toast.fail({
          duration: 2000,
          message: warnMsg
        });
      }
      this.closeScan();
      this.$router.replace({ path: '/wallet-send', query: { toaddr: this.res}});
    },

    // start
    startScan() {
      if (!window.plus) return
      scan.start()
    },

    // close
    closeScan() {
      if (!this.checkPlusReady()) {
        return
      }
      scan.close()
    },

    // scanPicture() {
    //   Toast({
    //     duration: 1500,
    //     message: this.$t('commom.tx.openGallery')
    //   });
    //   if (!this.checkPlusReady()) {
    //     return
    //   }
    //   plus.gallery.pick(
    //     function(path) {
    //       plus.barcode.scan(path, that.onmarked, function(error) {
    //         Toast.fail({
    //           duration: 2000,
    //           message: this.$t('commom.tx.unablePic')
    //         });
    //       });
    //     },
    //     function(err) {
    //       Toast(err.message)
    //     }
    //   );
    // },

    checkPlusReady(type) {
      if (!window.plus && !this.isplusReady) {
        if (type) {
          Toast.fail({
            duration: 2000,
            message: this.$t('commom.tx.qrWarn')
          });
        }
        return false
      } else {
        return true
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.closeScan();
    next();
  }
};
</script>
