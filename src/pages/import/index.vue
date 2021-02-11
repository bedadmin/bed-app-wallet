<style lang="scss" scoped>
#import-index {
  & > .container {
    height: 100vh;
  }
  .van-popup--right {
    width: 100%;
    height: 100%;
  }
  .notice {
    margin-top: 15px;
  }
}
</style>
<template>
  <div id="import-index">
    <van-nav-bar :z-index="1000" 
      :title="$t('import.navTitle')"
      left-arrow 
      fixed 
      @click-left="$router.goBack()"
    />

    <div class="fixed-container container-lengthen">

      <van-tabs v-model="tabsIndex" @click="tabsOnClick" swipeable animated :line-width='lineWidth'>
        <van-tab :title="$t('import.tabTitle1')">
          <div slot="title">
            {{$t('import.tabTitle1')}}
          </div>
          <div class="container">

            <div class="notice">
              {{$t('create.create.msg')}}
            </div>

            <form>
              <div class="input-group">
                <div class="input-item" :class="{'input-item-warn': mnem.mnem.msg}">
                  <label for="mnem" class="input-label" >{{$t('import.tabTitle1')}}</label>
                  <textarea id="mnem" rows="3" cols="20" :placeholder="$t('import.mnemTextarea')" v-model.trim="mnem.mnem.value"></textarea>
                  <span class="input-warn" v-if="mnem.mnem.msg">{{mnem.mnem.msg}}</span>
                </div>

                <div class="input-item" :class="{'input-item-warn': mnem.name.msg}">
                  <label for="name" class="input-label" >{{$t('create.create.walletName')}}</label>
                  <input type="text" id="name" :placeholder="$t('create.create.walletName')" v-model.trim="mnem.name.value" @change="nameChange(mnem.name, 'mnem')">
                  <span class="input-warn" v-if="mnem.name.msg">{{mnem.name.msg}}</span>
                </div>

                <div class="input-item" :class="{'input-item-warn': mnem.password.msg}">
                  <label for="password" class="input-label" >{{$t('create.create.walletPassword')}}</label>
                  <input type="password" id="password" :placeholder="$t('create.create.walletPassword')" v-model.trim="mnem.password.value" @change="passChange(mnem.password, 'mnem')">
                  <span class="input-warn" v-if="mnem.password.msg">{{mnem.password.msg}}</span>
                </div>

                <div class="input-item" :class="{'input-item-warn': mnem.repass.msg}">
                  <label for="repass" class="input-label" >{{$t('create.create.reWalletPassword')}}</label>
                  <input type="password" id="repass" :placeholder="$t('create.create.reWalletPassword')" v-model.trim="mnem.repass.value" @change="repassChange(mnem.repass, 'mnem')">
                  <span class="input-warn" v-if="mnem.repass.msg">{{mnem.repass.msg}}</span>
                </div>
              </div>

              <div class="input-item" style="border: none;">
                <van-checkbox v-model="mnem.checked.value" @change="checkboxChange(mnem.checked, 'mnem')">{{$t('create.create.checkbox1')}}<a href="javascript:;" @click.stop="openTerms = true"> {{$t('create.create.checkbox2')}}</a></van-checkbox>
                <span class="input-warn" v-if="mnem.checked.msg">{{mnem.checked.msg}}</span>
              </div>

              <div style="padding-top: 20px;">
                <div class="button default-button" @click="importMnem">{{$t('import.importMnem')}}</div>
              </div>
            </form>
          </div>
        </van-tab>

        <van-tab :title="$t('import.tabTitle2')">
          <div slot="title">
            {{$t('import.tabTitle2')}}
          </div>
          <div class="container">

            <div class="notice">
              {{$t('create.create.msg')}}
            </div>

            <form>
              <div class="input-group">
                <div class="input-item" :class="{'input-item-warn': prv.prv.msg}">
                  <label for="prv" class="input-label" >{{$t('import.tabTitle2')}}</label>
                  <textarea id="prv" rows="3" cols="20" :placeholder="$t('import.prvTextarea')" v-model.trim="prv.prv.value"></textarea>
                  <span class="input-warn" v-if="prv.prv.msg">{{prv.prv.msg}}</span>
                </div>

                <div class="input-item" :class="{'input-item-warn': prv.name.msg}">
                  <label for="name" class="input-label" >{{$t('create.create.walletName')}}</label>
                  <input type="text" id="name" :placeholder="$t('create.create.walletName')" v-model.trim="prv.name.value" @change="nameChange(mnem.name, 'mnem')">
                  <span class="input-warn" v-if="prv.name.msg">{{prv.name.msg}}</span>
                </div>

                <div class="input-item" :class="{'input-item-warn': prv.password.msg}">
                  <label for="password" class="input-label" >{{$t('create.create.walletPassword')}}</label>
                  <input type="password" id="password" :placeholder="$t('create.create.walletPassword')" v-model.trim="prv.password.value" @change="passChange(mnem.password, 'mnem')">
                  <span class="input-warn" v-if="prv.password.msg">{{prv.password.msg}}</span>
                </div>

                <div class="input-item" :class="{'input-item-warn': prv.repass.msg}">
                  <label for="repass" class="input-label" >{{$t('create.create.reWalletPassword')}}</label>
                  <input type="password" id="repass" :placeholder="$t('create.create.reWalletPassword')" v-model.trim="prv.repass.value" @change="repassChange(mnem.repass, 'mnem')">
                  <span class="input-warn" v-if="prv.repass.msg">{{prv.repass.msg}}</span>
                </div>
              </div>

              <div class="input-item" style="border: none;">
                <van-checkbox v-model="prv.checked.value" @change="checkboxChange(prv.checked, 'prv')">{{$t('create.create.checkbox1')}}<a href="javascript:;" @click.stop="openTerms = true"> {{$t('create.create.checkbox2')}}</a></van-checkbox>
                <span class="input-warn" v-if="prv.checked.msg">{{prv.checked.msg}}</span>
              </div>

              <div style="padding-top: 20px;">
                <div class="button default-button" @click="importPrv">{{$t('import.importPrv')}}</div>
              </div>

            </form>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <van-popup v-model="openTerms" position="right">
      <van-nav-bar :z-index="1000" 
        :title="$t('create.create.termTitle')"
        left-arrow
        fixed 
        @click-left="openTerms = false"
      />
      <div class="container fixed-container term-content" v-html="termContent">
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
      termContent: "",
      wallet_list: {},

      deFalse: false,
      openSuccessDialog: false,
      openFailDialog: false,
      openTerms: false,
      clickStatus: true,
      tabsIndex: 0,
      lineWidth: 30,
      checked1: false,
      checked2: false,
      network: {},
      mnem: {
        mnem: {
          value: "",
          msg: "",
          status: false
        },
        name: {
          value: "",
          msg: "",
          status: false
        },
        password: {
          value: "",
          msg: "",
          status: false
        },
        repass: {
          value: "",
          msg: "",
          status: false
        },
        checked: {
          value: false,
          msg: "",
          status: false
        }
      },
      prv: {
        prv: {
          value: "",
          msg: "",
          status: false
        },
        name: {
          value: "",
          msg: "",
          status: false
        },
        password: {
          value: "",
          msg: "",
          status: false
        },
        repass: {
          value: "",
          msg: "",
          status: false
        },
        checked: {
          value: false,
          msg: "",
          status: false
        }
      }
    };
  },
  computed: {},
  created() {
    this.inportInit();
  },
  mounted() {},
  methods: {
    inportInit() {
      this.termContent = this.wConfig.terms;
      this.localforage.getItem("wallet_list").then(res => {
        if (res) {
          this.wallet_list = res;
        } else {
          this.wallet_list = {};
        }
      });
    },

    tabsOnClick(index, title) {},

    nameChange(e, type) {
      if (e.value == "") {
        this[type].name.msg = this.$t("create.create.walletNameMsg");
        this[type].name.status = false;
      } else {
        this[type].name.msg = "";
        this[type].name.status = true;
      }
    },

    passChange(e, type) {
      var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/);
      if (e.value == "") {
        this[type].password.msg = this.$t("create.create.walletPasswordMsg1");
        this[type].password.status = false;
      } else if (reg.test(e.value)) {
        this[type].password.msg = "";
        this[type].password.status = true;
      } else {
        this[type].password.msg = this.$t("create.create.walletPasswordMsg2");
        this[type].password.status = false;
      }
      this.repassChange(this[type].repass, type);
    },

    repassChange(e, type) {
      if (this[type].password.value == this[type].repass.value) {
        this[type].repass.msg = "";
        this[type].repass.status = true;
      } else {
        this[type].repass.msg = this.$t("create.create.reWalletPasswordMsg");
        this[type].repass.status = false;
      }
    },

    checkboxChange(e, type) {
      if (!e.value) {
        this[type].checked.msg = this.$t("create.create.checkboxMsg");
        this[type].checked.status = false;
      } else {
        this[type].checked.msg = "";
        this[type].checked.status = true;
      }
    },

    checkWalletListLen() {
      if (this.walletDB.addresses.length > 4) {
        Toast.fail({
          duration: 1500,
          message: this.$t("create.create.sumMsg")
        });
        return false;
      } else {
        return true;
      }
    },

    // Import Mnem
    importMnem() {
      if (!this.checkWalletListLen) {
        return false;
      }
      this.nameChange(this.mnem.name, "mnem");
      this.passChange(this.mnem.password, "mnem");
      this.repassChange(this.mnem.repass, "mnem");
      this.checkboxChange(this.mnem.checked, "mnem");
      if (
        this.mnem.name.status &&
        this.mnem.password.status &&
        this.mnem.repass.status &&
        this.mnem.checked.status
      ) {
        if (!this.bip39.validateMnemonic(this.mnem.mnem.value)) {
          Toast({
            duration: 1500,
            message: this.$t("import.msg1")
          });
          return false;
        }

        Toast.loading({
          duration: 0,
          mask: true,
          message: this.$t("import.msg2")
        });

        window.setTimeout(() => {
          let walletInfo = this.Wallet.createWalletFromMnemonic(
            this.mnem.mnem.value
          );
          this.syncData(
            walletInfo,
            this.mnem.name.value,
            this.mnem.password.value
          );
        }, 200);
      }
    },

    // Import Prv
    importPrv() {
      if (!this.checkWalletListLen) {
        return false;
      }
      this.nameChange(this.prv.name, "prv");
      this.passChange(this.prv.password, "prv");
      this.repassChange(this.prv.repass, "prv");
      this.checkboxChange(this.prv.checked, "prv");
      if (
        this.prv.name.status &&
        this.prv.password.status &&
        this.prv.repass.status &&
        this.prv.checked.status
      ) {
        let net = this.wConfig.network;
        try {
          this.bitcoin.ECPair.fromWIF(
            this.prv.prv.value,
            this.bitcoin.networks[net]
          );
        } catch (error) {
          Toast.fail({
            duration: 1500,
            message: this.$t("import.msg4")
          });
          return false;
        }

        Toast.loading({
          duration: 0,
          mask: true,
          message: this.$t("import.msg2")
        });

        window.setTimeout(() => {
          let walletInfo = this.Wallet.createWalletFromPrv(this.prv.prv.value);
          this.syncData(
            walletInfo,
            this.prv.name.value,
            this.prv.password.value
          );
        }, 200);
      }
    },

    syncData(walletInfo, name, password) {
      this.$store.commit("setUpdataStatus", false);
      Toast.loading({
        duration: 0,
        mask: true,
        message: this.$t("import.msg3")
      });

      this.$store
        .dispatch("getWalletTxs", {
          address: walletInfo.address,
          currentHeight: 1
        })
        .then(data => {
          this.WalletDB.insertaccount(
            walletInfo.address,
            walletInfo.avatar,
            name,
            password,
            walletInfo.mnemonicWord,
            walletInfo.privateKey,
            walletInfo.network,
            true,
            2
          );
          this.WalletDB.insertHistroy(walletInfo.address, data);
          this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
            Toast.clear();
            this.$store.commit("setUpdataStatus", true);
            this.$router.push({ path: "/main-index/wallet" });
          });
        });
    }
  }
};
</script>
