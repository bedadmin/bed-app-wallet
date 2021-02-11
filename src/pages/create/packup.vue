<style lang="scss" scoped>
  #create-packup {
    .msg-icon {
      margin-top: 50px;
      width: 100px;
    }
    p {
      padding: 0 20px;
    }
  }
</style>
<template>
  <div id="create-packup">
    <van-nav-bar :z-index="1000" 
      :title="$t('create.packup.navTitle')"
      left-arrow 
      fixed
      @click-left="$router.goBack()"
    />

    <div class="container fixed-container container-lengthen-half">
      <div class="input-group">
        <div class="text-center">
          <img class="msg-icon" src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/safe.png">
          <h4>{{$t('create.packup.title')}}</h4>
        </div>
        <p class="text-center">{{$t('create.packup.content')}}</p>
      </div>
    </div>

    <div class="container">

      <div class="button default-button" @click="openPassDialogAction">{{$t("create.packup.button1")}}</div>
      <div class="button white-button">
        <router-link class="f666" to='/main-index/wallet'>{{$t('create.packup.button2')}}</router-link>
      </div>

    </div>

    <van-dialog
      v-model="openPassDialog"
      show-cancel-button 
      :confirmButtonText="$t('create.packup.confirmButtonText')" 
      :cancelButtonText="$t('create.packup.cancelButtonText')" 
      :before-close="beforePassDialogClose"
    >
      <div class="dialog-title" style="margin-top: 28px;">{{$t('create.packup.dialogTitle')}}</div class>
      <div class="dialog-password">
        <input type="password" v-model.trim="psw">
      </div>
    </van-dialog>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components: {},
  props: {},
  data() {
    return {
      addr: '',
      psw: '',
      openPassDialog: false
    };
  },
  computed: {},
  created() {
    if (this.$route.query && this.$route.query.addr) {
      this.addr = this.$route.query.addr;
    } else {
      this.addr = this.walletDB.current;
    }
  },
  mounted() {},
  methods: {
    onClickRight() {
      return false
    },
    openPassDialogAction() {
      this.openPassDialog = true;
    },
    beforePassDialogClose(action, done) {
      if (action === 'confirm') {
        if (this.psw == this.walletDB.accounts[this.addr].password) {
          done();
          this.$router.push({ path: "/create-mnemonic", query: { wallet_info: JSON.stringify(this.walletDB.accounts[this.addr])} });
        } else {
          Toast.fail({
            duration: 1000,
            message: this.$t('create.packup.msg1')
          });
          this.psw = '';
          done(false);
        }
      } else {
        this.psw = '';
        done();
      }
    },
  }
};
</script>