<style lang="scss" scoped>
#tx-content{
  .warn-button {
    color: #fff;
    background-color: #e51313;  
  }
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
  .show-mnemonic {
    background-color: rgba(29, 90, 163, 0.11);
    padding: 20px 15px;
    letter-spacing: 0;
    margin: 10px 0;
    word-break: break-all;
  }
  .dialog-title {
    position: relative;
  }
  .dialog-cloes {
    position: absolute;
    right: 15px;
    top: 2px;
    height: 80%;
  }
}
</style>
<template>
  <div id="tx-content">
    <slot></slot>
    <van-dialog
      v-model="openPassDialog0"
      show-cancel-button 
      :confirmButtonText="$t('commom.passDialog.confirmButtonText')" 
      :cancelButtonText="$t('commom.passDialog.cancelButtonText')" 
      :before-close="beforePassDialogClose">
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.passDialog.dialogTitle')}}</div>
      <div class="dialog-password">
        <input type="password" v-model.trim="psw">
      </div>
    </van-dialog>

    <van-dialog
      v-model="openWarnDialog"
      confirm-button-text="" 
      :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 28px;">
        {{$t('commom.tx.dialogError')}}
      </div>
      <div class="dialog-content">
        <div class="show-mnemonic">
          {{sendError}}
        </div>
      </div>
      <div class="dialog-button warn-button text-center" @click="openWarnDialog = false">
        {{$t('commom.tx.dialogConfirm')}}
      </div>
    </van-dialog>

    <van-dialog 
      v-model="openTxIDDialog" 
      confirm-button-text="" 
      :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 28px;">
        {{$t('commom.tx.dialogTxID')}}
        <img class="dialog-cloes" src="http://lbtc.io/wallet/static/img/close.png" @click="closeTxIDDialog">
      </div>
      <div class="dialog-content">
        <div class="show-mnemonic">
          {{sendSuccess}}
        </div>
      </div>
      <div class="dialog-button default-color text-center" 
        v-clipboard:copy="sendSuccess" 
        v-clipboard:success="onCopy" 
        v-clipboard:error="onError">
        {{$t('commom.tx.dialogCopy')}}
      </div>
    </van-dialog>

  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { Toast } from "vant";
export default {
  components:{},
  name: '',
  props:{
    value: '',
    isOPRETURN: Boolean,
    address: '',
    inputs: Array,
    outputs: Array,
    openPassDialog: false,
  },
  data(){
    return {
      openPassDialog0: false,
      openWarnDialog: false,
      openTxIDDialog: false,
      sendError: '',
      sendSuccess: '',

      wallet_list: {},
      wallet_info: {},

      psw: '',
      coinselectStatus: false
    }
  },
  computed:{},
  created(){
    this.openPassDialog0 = this.openPassDialog;
  },
  mounted(){
  },
  methods:{
    txContentInit() {
      if (this.address) {
        this.localforage.getItem('wallet_list').then( list => {
          if (list) {
            this.wallet_list = list
            this.wallet_info = list[this.address]
          }
        });
      }
    },
    
    beforePassDialogClose(action, done) {
      if (action === 'confirm') {
        if (this.wallet_info.psw == this.psw) {
          window.setTimeout(() => {
            this.$emit('update:openPassDialog', false);
            done();
            setTimeout(() => {
              this.send();
            }, 100)
          }, 100);
        } else {
          Toast.fail({
            duration: 1000,
            message: this.$t('commom.tx.incorrect')
          });
          done(false);
        }
      } else {
        this.$emit('update:openPassDialog', false);
        done();
      }
      this.psw = '';
    },

    send() {
      if (this.isEmptyObject(this.wallet_info)) {
        this.txContentInit();
      }
      Toast.loading({
        duration: 0,
        mask: true,
        message: this.$t('commom.tx.packing')
      });

      window.setTimeout( () => {
        this.Wallet.makeOpreturnTransaction(this.wallet_info.prv, this.inputs, this.outputs, this.value.OP_RETURN).then( hex => {
          Toast.loading({
            duration: 0,
            mask: true,
            message: this.$t('commom.tx.sending')
          });
          this.$http.get(this.$api.api.msendrawtransaction, {param: hex}).then(result => {                                                      
            window.setTimeout(() => {
              if (result.error) {
                Toast.clear();
                this.sendError = result.error.message;
                this.openWarnDialog = true;
              } else {
                this.sendSuccess = result.result;
                Toast.success({
                  duration: 0,
                  message: this.$t('commom.tx.success')
                });
                window.setTimeout(() => {
                  Toast.clear();
                  this.openTxIDDialog = true;
                }, 1000)
              }
            }, 3500);
          });
        }).catch(error => {
          Toast.clear();
          this.errorMsg = String(error);
          this.openWarnDialog = true;
        });

      }, 100)
    },

    closePassDialog() {
      this.$emit('update:openWarnDialog', false);
    },

    closeTxIDDialog() {
      this.openTxIDDialog = false;
      this.$router.push({ path: '/main-index/wallet'});
    },

    onCopy() {
      Toast.success({
        duration: 1500,
        message: this.$t('commom.tx.copied')
      });
    },

    onError() {
      Toast.fail({
        duration: 1500,
        message: this.$t('commom.tx.copyError')
      });
    },

  },
  destroyed(){},
  watch:{
    openPassDialog(newVal, oldVal) {
      this.openPassDialog0 = newVal;
    },

    address(newVal, oldVal) {
      this.txContentInit();
    }
  },
}
</script>
