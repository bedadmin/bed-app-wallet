<style lang="scss" scoped>
#proposal{
  & > .container {
    height: 100vh;
  }
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
  <div id="proposal">
    <van-nav-bar
      :title="$t('governance.proposal.navTitle')"
      left-arrow
      fixed 
      @click-left="onClickLeft"
    />
    <!-- Content -->
    <div class="container fixed-container">

      <div class="input-with-label-group">
        <div class="input-with-label-item">
          <label for="fromAddr">
            {{$t('governance.proposal.submitAddr')}}
          </label>
          <input type="text" id="fromAddr" v-model="current_wallet" readonly />
        </div>

        <div class="input-with-label-item">
          <label for="value">
            {{$t('governance.proposal.title')}}
          </label>
          <input type="text" id="title" :placeholder="$t('governance.proposal.titlePlaceholder')" v-model.trim="title.value" @change=""/>
          <label for="value" class="error-msg" v-if="title.msg">{{title.msg}}</label>
        </div>

        <div class="input-with-label-item">
          <label for="value">
            {{$t('governance.proposal.detail')}}
          </label>
          <!-- <input type="text" id="detail" :placeholder="$t('governance.proposal.detailPlaceholder')" v-model.trim="detail.value" @change=""/> -->
          <textarea rows="3" cols="20" :placeholder="$t('governance.proposal.detailPlaceholder')" v-model.trim="detail.value" @change=""></textarea>

          <label for="value" class="error-msg" v-if="detail.msg">{{detail.msg}}</label>
        </div>

        <div class="input-with-label-item">
          <label for="value">
            {{$t('governance.proposal.url')}}
          </label>
          <input type="text" id="url" :placeholder="$t('governance.proposal.urlPlaceholder')" v-model.trim="url.value" @change=""/>
          <label for="value" class="error-msg" v-if="url.msg">{{url.msg}}</label>
        </div>

        <div class="input-with-label-item">
          <label for="value">
            {{$t('governance.proposal.time')}}
          </label>
          <div class="flex">
            <input type="number" id="time" :placeholder="$t('governance.proposal.timePlaceholder')" v-model.trim="time.value" @change=""/>
            <input type="text" style="border-bottom: none; width: 50px" id="timeSuffix" v-model="timeSuffix" readonly />
          </div>
          <label for="value" class="error-msg" v-if="time.msg">{{time.msg}}</label>
        </div>

      </div>
      <div class="input-group" style="padding-top: 80px">
        <button class="default" @click="next" :class="{disabled: !unspentStatus}">{{$t('governance.proposal.submitProposal')}}</button>
        <label class="error-msg">{{$t('governance.proposal.feeMsg')}}</label>
      </div>

    </div>

    <!-- Confirm Popup -->
    <!-- <van-popup v-model="openConfirmInfo" position="bottom" :close-on-click-overlay="false">
      <div class="container confirm-info-container">
        <div class="popup-title" style="border:none">
          {{$t('commom.tx.confirmInfoTX')}}
        </div>
        <div class="cancel-button" @click="closeConfirmInfoF">
          <img src="http://lbtc.io/wallet/static/img/close.png" alt="">
        </div>
        <table class="confirm-info-table" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoType')}}:</td>
            <td class="confirm-info-content">{{$t('governance.proposal.confirmInfoTxType')}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoPayaddr')}}:</td>
            <td class="confirm-info-content">{{current_wallet}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoName')}}:</td>
            <td class="confirm-info-content">{{name}}</td>
          </tr>
          <tr class="confirm-info-item">
            <td class="confirm-info-title">{{$t('commom.tx.confirmInfoFees')}}:</td>
            <td class="confirm-info-content">{{fees}}</td>
          </tr>
        </table>
        <div class="input-group">
          <button class="default confirm-info-button" @click="openPassDialog = true" :class="{disabled: !coinselectStatus}">{{$t('commom.tx.dialogConfirm')}}</button>
        </div>
      </div>  
    </van-popup> -->

    <!-- Password Dialog -->
    <!-- <van-dialog
      v-model="openPassDialog"
      show-cancel-button 
      :confirmButtonText="$t('commom.passDialog.confirmButtonText')" 
      :cancelButtonText="$t('commom.passDialog.cancelButtonText')" 
      :before-close="beforePassDialogClose" >
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.passDialog.dialogTitle')}}</div class>
      <div class="dialog-password">
        <input type="password" v-model="psw">
      </div>
    </van-dialog> -->

    <!-- Error Dialog -->
    <!-- <van-dialog v-model="openWarnDialog" confirm-button-text="" :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 28px;">{{$t('commom.tx.dialogError')}}</div class>
      <div class="dialog-content">
        {{errorMsg}}
      </div>
      <div class="dialog-button warn-button text-center" @click="openWarnDialog = false">
        {{$t('commom.tx.dialogConfirm')}}
      </div>
    </van-dialog> -->

    <!-- TX ID Dialog -->
    <!-- <van-dialog v-model="openTxIDDialog" confirm-button-text="" :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 28px;">
        {{$t('commom.tx.dialogTxID')}}
        <img class="dialog-cloes" src="http://lbtc.io/wallet/static/img/close.png" @click="closeTxIDDialog">
      </div>
      <div class="dialog-content">
        <div class="show-mnemonic">
          {{txHash}}
        </div>
      </div>
      <div class="dialog-button default-color text-center" v-clipboard:copy="txHash" v-clipboard:success="onCopy" v-clipboard:error="onError">
        {{$t('commom.tx.dialogCopy')}}
      </div>
    </van-dialog> -->

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      current_wallet: '',
      info: {},
      unspent: {},
      unspentStatus: false,
      timeSuffix: '',

      inputs: [],
      outputs: [],
      point: 100000000,
      coinselectStatus: false,
      fees: 0,
      psw: '',

      title: {
        value: '',
        msg: '',
        status: false
      },
      detail: {
        value: '',
        msg: '',
        status: false
      },
      url: {
        value: '',
        msg: '',
        status: false
      },
      time: {
        value: '',
        msg: '',
        status: false
      },

      openConfirmInfo: false,
      openPassDialog: false,
      openWarnDialog: false,
      errorMsg: '',
      openTxIDDialog: false,
      txHash: ''
    }
  },
  computed:{},
  
  created(){
    this.addrInfoInit();
  },
  mounted(){},
  methods:{
    onClickLeft() {
      this.$router.back();
    },

    addrInfoInit() {
      this.timeSuffix = this.$t('governance.proposal.timeSuffix')
      this.localforage.getItem('current_wallet').then( current_wallet => {
        if (current_wallet) {
          this.current_wallet = current_wallet;
          this.localforage.getItem('wallet_list').then( list => {
            if (list) {
              this.info = list[current_wallet]
            }
          });
          this.localforage.getItem(current_wallet + '+unspent').then( list => {
            if (list) {
              this.unspent = list;
              this.unspentStatus = true;
            }
          })
        }
      })
    },

    nameChange() {
      if (this.name.value == '') {
        this.name.msg = this.$t('commom.tx.msg1');
        this.name.status = false;
      } else if (new Buffer(this.name.value).length > 32) {
        this.name.msg = this.$t('commom.tx.msg2');
        this.name.status = false;
      } else {
        this.name.msg = '';
        this.name.status = true;
      }
    },

    URLChange() {

    },

    next() {
      this.nameChange();
      if (this.status) {
        if (this.otherTxCoinselect(0, this.unspent.available)) {
          this.openConfirmInfo = true;
        } else {
          return false
        }
      }
    },

    register() {
      if (status) {
        Toast.loading({
          mask: true,
          message: this.$t('commom.tx.msg3')
        })
        setTimeout(() => {
          Toast.clear();
        }, 2000)
      }
    },

    closeConfirmInfoF(){
      this.openConfirmInfo = false;
      this.inputs = [];
      this.outputs = [];
      this.coinselectStatus = false;
    },

    otherTxCoinselect(type, listUnspent) {
      let fee, sum = 0, inputs = [], outputs = [];
      switch (type) {
        case 0:
          fee = 1 * this.point
          break;
        case 1:
          fee = 0.01 * this.point
          break;
        case 2:
          fee = 0.01 * this.point
          break;
        default:
          break;
      }
      for (let i = 0; i < listUnspent.length; i++) {
        sum = sum +  listUnspent[i].value;
        inputs.push(listUnspent[i]);
        if (sum > fee) {
          break
        }
      }
      if (sum <= fee) {
        this.msg = this.$t('commom.tx.msg4');
        this.status = false;
        return false
      }
      outputs[0] = {
        'address': 'OP_RETURN',
        'value': 0
      }
      outputs[1] = {
        'value': this.calc.sub(sum, fee)
      }
      this.fees = this.calc.div(fee, this.point);
      this.inputs = inputs;
      this.outputs = outputs;
      this.coinselectStatus = true;
      return true
    },

    beforePassDialogClose(action, done) {
      if (action === 'confirm') {
        if (this.psw == this.info.psw) {
          window.setTimeout(() => {
            this.openConfirmInfo = false;
            done();
            setTimeout(() => {
              this.send();
            }, 100)
          }, 100);
        } else {
          Toast.fail({
            duration: 1500,
            message: this.$t('commom.tx.msg5')
          });
          done(false);
        }
      } else {
        done();
      }
      this.psw = "";
    },

    send() {
      Toast.loading({
        duration: 0,
        mask: true,
        message: this.$t('commom.tx.msg6')
      });
      window.setTimeout( () => {
        this.makeTX(this.current_wallet)
      }, 100)
    },

    makeTX(currentAddr) {
      let prv = this.info.prv;
      let OP_RETURN = this.LBTCtools.RegForgedNode(this.name.value);

      this.Wallet.newTransaction().then(txb => {

        this.inputs.forEach((item, index) => {
          txb.addInput(item.txId, item.vout)
        });

        let arryyy = this.Xreplace(OP_RETURN, 2);
        let dataaaaa = Buffer.from(arryyy);
        const embeddddd = this.bitcoin.payments.embed({ data: [dataaaaa] })

        txb.addOutput(embeddddd.output, 0);
        if (this.outputs[1].value) {
          txb.addOutput(currentAddr, this.outputs[1].value);
        }

        let keyPair = this.Wallet.ecPairFromWIF(prv);
        for (let index = 0; index < this.inputs.length; index++) {
          txb.sign(index, keyPair);
        }
        return Promise.resolve(txb.build().toHex());
      })
      .then(hex => {

        this.sendRq({ param: hex, addr: currentAddr });
        
      })
      .catch(error => {
        Toast.clear();
        this.errorMsg = String(error);
        this.openWarnDialog = true;
      })
    },

    sendRq(params) {
      Toast.loading({
        duration: 0,
        mask: true,
        message: this.$t('commom.tx.msg7')
      });
      this.$http
        .get(this.$api.api.msendrawtransaction, params)
        .then(result => {
          window.setTimeout(() => {
            if (result.error) {
              Toast.fail(result.msg);
            } else {
              this.txHash = result.msg;
              Toast.success({
                duration: 0,
                message: this.$t('commom.tx.msg8')
              });
            }
            window.setTimeout(() => {
              Toast.clear();
              this.openTxIDDialog = true;
            }, 1000)
          }, 2000);
        });
    },

    closeTxIDDialog() {
      this.$store.commit('isFreshInHome', {
        isFreshInHome: true,
      });
      this.$router.push({ path: '/main-index' });
    },

    onCopy() {
      Toast.success({
        duration: 1500,
        message: this.$t('commom.tx.msg9')
      });
    },

    onError() {
      Toast.fail({
        duration: 1500,
        message: this.$t('commom.tx.msg10')
      });
    },

  },
  destroyed(){},
  watch:{
    $route(to, from) {
      
    }
  }
}
</script>