<style lang="scss" scoped>
</style>
<template>
  <div id="create-create">
    <van-nav-bar :z-index="1000" 
      :title='$t("wallet0.createWallet")'
      left-arrow 
      fixed 
      @click-left="$router.goBack()"
    />

    <div class="container fixed-container container-lengthen">
      <div class="notice">
        {{$t('create.create.msg')}}
      </div>
      <form>
        <div class="input-group">
          <div class="input-item" :class="{'input-item-warn': name.msg}">
            <label for="name" class="input-label" >{{$t('create.create.walletName')}}</label>
            <input type="text" id="name" :placeholder="$t('create.create.walletName')" v-model.trim="name.value" @change="nameChange(name)">
            <span class="input-warn" v-if="name.msg">{{name.msg}}</span>
          </div>

          <div class="input-item" :class="{'input-item-warn': password.msg}">
            <label for="password" class="input-label">{{$t('create.create.walletPassword')}}</label>
            <input type="password" id="password" :placeholder="$t('create.create.walletPassword')" v-model.trim="password.value" @change="passChange(password)">
            <span class="input-warn" v-if="password.msg">{{password.msg}}</span>
          </div>

          <div class="input-item" :class="{'input-item-warn': repass.msg}">
            <label for="repass" class="input-label">{{$t('create.create.reWalletPassword')}}</label>
            <input type="password" id="repass" :placeholder="$t('create.create.reWalletPassword')" v-model="repass.value" @change="repassChange(repass)">
            <span class="input-warn" v-if="repass.msg">{{repass.msg}}</span>
          </div>
        </div>
        
        <div class="input-item" style="border: none;">
          <van-checkbox v-model="checked.value" @change="checkboxChange(checked)">{{$t('create.create.checkbox1')}}<a href="javascript:;" @click.stop="openTerms = true"> {{$t('create.create.checkbox2')}}</a></van-checkbox>
          <span class="input-warn" v-if="checked.msg">{{checked.msg}}</span>
        </div>

        <div style="padding-top: 20px;">
          <div class="button default-button" @click="createWallet">{{$t("wallet0.createWallet")}}</div>
        </div>

      </form>
    </div>
    
    <van-popup v-model="openTerms" position="right">
      <van-nav-bar :z-index="1000" 
        :title="$t('create.create.termTitle')"
        left-arrow
        fixed 
        @click-left="openTerms = false"
      />
      <div class="fixed-container term-content">
        <term />
      </div>
    </van-popup>

  </div>
</template>

<script>
import term from "../../components/term.vue";
import { Toast } from "vant";

export default {
  components: {
    term
  },
  props: {},
  data() {
    return {
      termContent: "",
      wallet_list: {},
      openTerms: false,
      network: {},
      walletInfo: {},
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
    };
  },
  computed: {},
  created() {
    this.createInit();
  },
  mounted() {},
  methods: {
    createInit() {
      this.termContent = this.wConfig.terms;
      this.localforage.getItem("wallet_list").then(res => {
        if (res) {
          this.wallet_list = res;
        } else {
          this.wallet_list = {};
        }
      });
    },

    nameChange(e) {
      if (e.value == "") {
        this.name.msg = this.$t("create.create.walletNameMsg");
        this.name.status = false;
      } else {
        this.name.msg = "";
        this.name.status = true;
      }
    },

    passChange(e) {
      var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/);
      if (e.value == "") {
        this.password.msg = this.$t("create.create.walletPasswordMsg1");
        this.password.status = false;
      } else if (reg.test(e.value)) {
        this.password.msg = "";
        this.password.status = true;
      } else {
        this.password.msg = this.$t("create.create.walletPasswordMsg2");
        this.password.status = false;
      }
      this.repassChange(this.repass);
    },

    repassChange(e) {
      if (this.password.value == this.repass.value) {
        this.repass.msg = "";
        this.repass.status = true;
      } else {
        this.repass.msg = this.$t("create.create.reWalletPasswordMsg");
        this.repass.status = false;
      }
    },

    checkboxChange(e) {
      if (!e.value) {
        this.checked.msg = this.$t("create.create.checkboxMsg");
        this.checked.status = false;
      } else {
        this.checked.msg = "";
        this.checked.status = true;
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

    createWallet() {
      if (!this.checkWalletListLen()) {
        return false;
      }
      this.nameChange(this.name);
      this.passChange(this.password);
      this.repassChange(this.repass);
      this.checkboxChange(this.checked);
      if (
        this.name.status &&
        this.password.status &&
        this.repass.status &&
        this.checked.status
      ) {
        Toast.loading({
          mask: true,
          message: this.$t("create.create.createMsg")
        });
        window.setTimeout(() => {
          let mnemonic = this.Wallet.generateMnemonic();
          let walletInfo = this.Wallet.createWalletFromMnemonic(mnemonic);

          this.WalletDB.insertaccount(
            walletInfo.address,
            walletInfo.avatar,
            this.name.value,
            this.password.value,
            walletInfo.mnemonicWord,
            walletInfo.privateKey,
            walletInfo.network,
            false,
            1
          );

          this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
            Toast.clear();
            this.$router.push({
              path: "/create-packup",
              query: { addr: walletInfo.address }
            });
          });
        }, 200);
      }
    }
  }
};
</script>
