<style lang="scss" scoped>
#wallet-receive{
  height: 100vh;
  background-color: #252B35;
  color: #fff;
  overflow: hidden;
  .container {
    padding-top: 60px;
  }
  .addr-title {
    margin-top: 15px;
    font-size: 17px;
  }
  .addr-addr {
    margin-top: 10px;
    font-size: 14px;
    word-break: break-word;
    padding: 10px 15px;
    background-color: #131A28;
    border-radius: 15px;
    color: #ccc;
  }
  .addr-qr {
    width: 180px;
    height: 180px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 15px;
  }
  .copy-button {
    padding: 60px;
  }
  .qr-hide {
    opacity: 0;
    transition: all 0.2s;
  }
  .qr-show {
    opacity: 1; 
  }
}
</style>
<template>
  <div id="wallet-receive">
    <van-nav-bar :z-index="1000" 
      :title="$t('wallet.receive.navTitle')"
      left-arrow
      @click-left="$router.goBack()"
    />
    <div class="container">
      <div class="addr-qr qr-hide" :class="walletDB.current ? 'qr-show': ''">
        <qrcode-vue style="width: 150px; height: 150px;" :value="walletDB.current" size="150" level="H" v-if="walletDB.current"></qrcode-vue>
      </div>
      <div class="addr-title text-center">{{$t('wallet.receive.title')}}</div>
      <div class="addr-addr text-center">{{walletDB.current}}</div>
      <div class="copy-button">
        <div class="button default-button" @click="doCopy(walletDB.current)">{{$t('wallet.receive.copyToClipboard')}}</div>
      </div>


    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { Toast } from 'vant';

export default {
  components:{
    QrcodeVue
  },
  props:{},
  data(){
    return {}
  },
  computed:{},
  created(){},
  mounted(){},
  methods:{
    onClickRight() {
      return
    },

    doCopy(e) {
      // is ios
      if (window.plus && this.isplusReady) {
        this.appClipbordText(e).then( r => {
          Toast.success({
            duration: 1500,
            message: this.$t('mine.txHisInfo.title7')
          });
        }, err => {
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.txHisInfo.title8')
          });
        })
      // is other
      } else {
        this.$copyText(e).then( r => {
          Toast.success({
            duration: 1500,
            message: this.$t('mine.txHisInfo.title7')
          });
        }, err => {
          Toast.fail({
            duration: 1500,
            message: this.$t('mine.txHisInfo.title8')
          });
        })
      }
    },

    onCopy(e) {
      Toast.success({
        duration: 1500,
        message: this.$t('wallet.receive.msg1')
      });
    },
    onError(e) {
      Toast.fail({
        duration: 1500,
        message: this.$t('wallet.receive.msg2')
      });
    }
  }
}
</script>