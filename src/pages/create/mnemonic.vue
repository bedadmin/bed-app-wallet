<style lang="scss" scoped>
#create-mnemonic {
  .msg-icon {
    margin-top: 50px;
    width: 100px;
  }
  p {
    padding: 0 20px;
  }
  .warnDialog {
    font-size: 14px;
    img {
      width: 40%;
      height: auto;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .warn-text {
      padding: 15px 10px 45px;
    }
    .button {
      margin-bottom: 20px;
    }
  }
  .show-mnemonic {
    background-color: rgba(62, 100, 255, 0.1);
    padding: 20px 15px;
    letter-spacing: 1px;
    -webkit-user-select: text;
    user-select: text;
  }
  .show-mnemonic-click {
    letter-spacing: 1px;
    span {
      width: 30%;
      margin-left: 5%;
      margin-bottom: 10px;
      padding: 5px;
      text-align: center;
      display: inline-block;
      border-radius: 2px;
      transition: all 0.4s;
      &:nth-child(3n + 1) {
        margin-left: 0;
      }
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
      &:nth-last-child(2) {
        margin-bottom: 0;
      }
      &:nth-last-child(3) {
        margin-bottom: 0;
      }
    }
  }
  .show-mnemonic-click1 {
    background-color: rgba(62, 100, 255, 0.1);
    padding: 10px 15px;
    margin-bottom: 15px;
    min-height: 80px;
    span {
      background: #fff;
      border-color: #fff;
    }
  }
  .show-mnemonic-click2 {
    span {
      background: rgba(62, 100, 255, 0.1);
      border-color: rgba(62, 100, 255, 0.1);
    }
  }
  .list-complete-enter,
  .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
}
</style>
<template>
  <div id="create-mnemonic">
    <van-nav-bar :z-index="1000" 
      :title="$t('create.mnemonic.navTitle')"
      left-arrow 
      fixed 
      @click-left="onClickLeft"
    />

    <div class="container fixed-container container-lengthen-half">
      <div v-if="next">
        <div class="input-group">
          <div class="text-center">
            <img class="msg-icon" src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/safe.png">
            <h4>{{$t('create.mnemonic.title1')}}</h4>
          </div>
          <p>{{$t('create.mnemonic.content1')}}</p>
          <div class="show-mnemonic">
            {{mnemonic}}
          </div>
        </div>
        <div class="button default-button" @click="next = false">{{$t("create.mnemonic.next")}}</div>
      </div>

      <div v-if="!next">
        <div class="input-group">
          <div class="text-center">
            <h4>{{$t('create.mnemonic.title2')}}</h4>
          </div>
          <p>{{$t('create.mnemonic.content2')}}</p>
          <div class="show-mnemonic-click show-mnemonic-click1">
            <transition-group name="list-complete" tag="div">
              <span @click="click1(item, index)" v-for="(item, index) in arr1" :key="item">{{item}}</span>
            </transition-group>
          </div>
          <div class="show-mnemonic-click show-mnemonic-click2">
            <transition-group name="list-complete" tag="div">
              <span @click="click2(item, index)" v-for="(item, index) in arr2" :key="item">{{item}}</span>
            </transition-group>
          </div>
        </div>
        <div class="button default-button" @click="confirmMnem">{{$t("create.mnemonic.button")}}</div>
      </div>
    </div>


    <van-popup class="warnDialog" v-model="openWarnDialog" :close-on-click-overlay="false" position="bottom">
      <div class="container">
        <div class="popup-title">{{$t('warn.warn')}}</div>
        <div class="text-center">
          <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/screenshots.png" >
          <div class="warn-text">
            {{$t('create.mnemonic.dialogContent')}}
          </div>
        </div>
        <div class="button default-button" @click="openWarnDialog = false">{{$t('create.mnemonic.dialogButton')}}</div>
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
      deFalse: false,
      openWarnDialog: true,
      next: true,
      clickStatus: true,
      wallet_info: {},
      mnemonic: "",
      arr1: [],
      arr2: []
    };
  },
  computed: {},
  created() {
    if (this.$route.query && this.$route.query.wallet_info) {
      this.wallet_info = JSON.parse(this.$route.query.wallet_info);
    } else {
      this.$router.back();
    }
    this.mnemonic = this.wallet_info.mnemonicWord;
    this.arr2 = this.mnemonic.split(" ");
    this.arr2 = this.randArr(this.arr2);
    this.localforage.getItem("wallet_list").then(list => {
      if (list) {
        this.wallet_list = list;
      }
    });
  },
  mounted() {},
  methods: {
    onClickLeft() {
      if (this.next) {
        this.$router.goBack();
      } else {
        this.arr1 = [];
        this.arr2 = this.mnemonic.split(" ");
        this.arr2 = this.randArr(this.arr2);
        this.next = true;
        this.openWarnDialog = true;
      }
    },

    click1(item, index) {
      if (this.clickStatus) {
        this.clickStatus = false;
        this.arr1.splice(index, 1);
        this.arr2.push(item);
        this.arr2 = this.randArr(this.arr2);
        window.setTimeout(() => {
          this.clickStatus = true;
        }, 600);
      }
    },

    click2(item, index) {
      if (this.clickStatus) {
        this.clickStatus = false;
        this.arr2.splice(index, 1);
        this.arr1.push(item);
        this.arr2 = this.randArr(this.arr2);
        window.setTimeout(() => {
          this.clickStatus = true;
        }, 600);
      }
    },

    confirmMnem() {
      if (this.mnemonic == this.arr1.join(" ")) {
        this.walletDB.accounts[this.wallet_info.address].backupFlag = true;
        this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
          Toast.success({
            duration: 1000,
            message: this.$t("create.mnemonic.msg1")
          });
          setTimeout(() => {
            if (this.$route.query.from == "manageInfo") {
              this.$router.back();
            } else {
              this.$router.push({ path: "/main-index/wallet" });
            }
          }, 400);
        });
      } else {
        Toast.fail({
          duration: 1500,
          message: this.$t("create.mnemonic.msg2")
        });
      }
    }
  }
};
</script>
