<style lang="scss" scoped>
#mine-tx-hisInfo {
  .hisInfo-header {
    background-color: #252b35;
    color: #fff;
    padding: 20px 0 65px;
    .hisInfo-icon {
      height: 115px;
    }
    .hisInfo-value {
      font-size: 22px;
      height: 36px;
      line-height: 36px;
    }
  }
  .hisInfo-content {
    position: relative;
    bottom: 50px;
    font-size: 14px;
    .hisInfo-block {
      margin-bottom: 15px;
      padding: 15px;
      background-color: #fff;
      border-radius: 15px;
    }
    .hisInfo-item {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
    }
    .hisInfo-item-title {
      padding-right: 4px;
      color: #3a4054;
      font-weight: bold;
      width: 80px;
    }
    .hisInfo-item-content {
      flex: 1;
      align-items: center;
      font-size: 12px;
      color: #666;
      display: flex;
      align-items: center;
      .hisInfo-addr-item {
        width: 100%;
        word-break: break-all;
        padding-top: 6px;
        &:first-child {
          padding-top: 0;
        }
      }
    }
    .copy-botton {
      background-color: #e8e8e8;
      text-align: center;
      padding: 10px 20px;
      color: #3a4054;
      border-radius: 5px;
    }
  }
}
</style>
<template>
  <div id="mine-tx-hisInfo">
    <van-nav-bar :z-index="1000" :title="$t('mine.txHisInfo.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="fixed-container">
      <div class="hisInfo-header text-center">
        <img class="hisInfo-icon" src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/tx.png">
        <div class="hisInfo-value">
          {{txInfo.type == 's' ? '-' : '+'}}{{txInfo.value/100000000}} BED 
        </div>
      </div>
      <div class="container hisInfo-content">

        <div class="hisInfo-block">
          <div class="hisInfo-item">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title1')}}
            </div>
            <div class="hisInfo-item-content">

              <div>
                <div class="hisInfo-addr-item" v-for="(i, index) in txInfo.vin" v-if="index < 3">
                  <!-- <div v-if="i.coinbase">
                    Coinbase
                  </div> -->
                  <div v-if="i.isAddress" class="hash" @click="doCopy(i.address)">
                    {{i.addresses[0]}}
                  </div>
                  <div v-else>
                    {{'Unknown'}}
                  </div>
                  <div class="hisInfo-item-content text-center" v-if="txInfo.vin.length >= 3">
                    ~
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="hisInfo-item">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title2')}}
            </div>
            <div class="hisInfo-item-content">

              <div>
                <div class="hisInfo-addr-item" v-for="i in txInfo.vout">
                  <div v-if="i.isAddress" @click="doCopy(i.address)">
                    {{i.addresses[0]}}
                  </div>
                  <div v-else>
                    {{'Unknown'}}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="hisInfo-item" v-if="txInfo.fee">
            <div class="hisInfo-item-title">
              Fe
            </div>
            <div class="hisInfo-item-content">
              {{txInfo.fee/100000000}}
            </div>
          </div>
        </div>

        <div class="hisInfo-block">
          <div class="hisInfo-item">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title3')}}
            </div>
            <div class="hisInfo-item-content hash" @click="doCopy(txInfo.txid)">
              <!-- {{txInfo.txid}} -->
              {{txInfo.txid | formatHash}}
            </div>
          </div>

          <div class="hisInfo-item" v-if="txInfo.blockHeight">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title4')}}
            </div>
            <div class="hisInfo-item-content hash" @click="doCopy(txInfo.blockhash)">
              {{txInfo.blockHeight}}
            </div>
          </div>

          <div class="hisInfo-item" v-if="txInfo.blockTime">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title5')}}
            </div>
            <div class="hisInfo-item-content">
              {{txInfo.blockTime | formatTime(2)}}
            </div>
          </div>

          <div class="hisInfo-item">
            <div class="hisInfo-item-title" style="width:100px;">
              <qrcode-vue :value="'http://101.132.148.176:8000/transinfo?param=' + txInfo.hash" size="100" level="H" class="qrcode"></qrcode-vue>
            </div>
            <div class="hisInfo-item-content text-center" style="justify-content: flex-end;" @click="doCopy('http://101.132.148.176:8000/transinfo?param=' + txInfo.hash)">
              <div class="copy-botton">{{$t('mine.txHisInfo.title6')}}</div>
            </div>
          </div>
        </div>

      </div>
      <!-- <div class="hisInfo-content flex">
        <div class="left">
          <div class="hisInfo-item">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title3')}}
            </div>
            <div class="hisInfo-item-content hash" @click="doCopy(txInfo.hash)">
              {{txInfo.hash | formatHash}}
            </div>
          </div>
          <div class="hisInfo-item" v-if="txInfo.height">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title4')}}
            </div>
            <div class="hisInfo-item-content hash" @click="doCopy(txInfo.blockhash)">
              {{txInfo.height}}
            </div>
          </div>
          <div class="hisInfo-item">
            <div class="hisInfo-item-title">
              {{$t('mine.txHisInfo.title5')}}
            </div>
            <div class="hisInfo-item-content">
              {{txInfo.time | formatTime(2)}}
            </div>
          </div>
        </div>
        <div class="right">
          <qrcode-vue :value="'http://101.132.148.176:8000/transinfo?param=' + txInfo.hash" size="100" level="H" class="qrcode"></qrcode-vue>
          <div class="copy-botton" @click="doCopy('http://101.132.148.176:8000/transinfo?param=' + txInfo.hash)">
            {{$t('mine.txHisInfo.title6')}}
          </div>
        </div>
      </div> -->
    </div> 

  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { Toast } from "vant";
export default {
  components: {
    QrcodeVue
  },
  props: {},
  data() {
    return {
      isLoading: false,
      txInfo: {}
    };
  },
  computed: {},
  created() {
    this.hisInit();
  },
  mounted() {},
  methods: {
    hisInit() {
      if (this.$route.query) {
        this.txInfo = JSON.parse(this.$route.query.txInfo);
        console.log('wdy='+this.txInfo);
      } else {
        this.$router.back();
      }
    },

    doCopy(e) {
      // is app
      if (window.plus && this.isplusReady) {
        this.appClipbordText(e).then(
          r => {
            Toast.success({
              duration: 1500,
              message: this.$t("mine.txHisInfo.title7")
            });
          },
          err => {
            Toast.fail({
              duration: 1500,
              message: this.$t("mine.txHisInfo.title8")
            });
          }
        );
        // is h5
      } else {
        this.$copyText(e).then(
          r => {
            Toast.success({
              duration: 1500,
              message: this.$t("mine.txHisInfo.title7")
            });
          },
          err => {
            Toast.fail({
              duration: 1500,
              message: this.$t("mine.txHisInfo.title8")
            });
          }
        );
      }
    }

    // onCopy() {
    //     Toast.success({
    //       duration: 1500,
    //       message: this.$t('mine.txHisInfo.title7')
    //     });
    // },

    // onError() {
    //   Toast.fail({
    //     duration: 1500,
    //     message: this.$t('mine.txHisInfo.title8')
    //   });
    // }

    // setClipbordText(txt) {
    //   if(!window.plus) return;
    //   if(plus.os.android) {
    //     var Context = plus.android.importClass("android.content.Context");
    //     var main = plus.android.runtimeMainActivity();
    //     var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
    //     plus.android.invoke(clip,"setText",txt);
    //   } else {
    //     var UIPasteboard = plus.ios.importClass("UIPasteboard");
    //     var generalPasteboard = UIPasteboard.generalPasteboard();
    //     generalPasteboard.setValueforPasteboardType(txt,"public.utf8-plain-text");
    //   }
    //   mui.toast('网址复制成功');
    // }
  }
};
</script>
