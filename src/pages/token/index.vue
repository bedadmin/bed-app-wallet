<style lang="scss" scoped>
#governance-index{
  .tx-item {
    padding: 15px 10px;
  }
  .warn-help {
    font-size: 14px;
    color: #1D5AA3;
  }
  .warn-fees {
    font-size: 14px;
    color: #D0021B;
    float: right;
  }
  .confirm-info-container .confirm-info-item td {
    padding: 10px;
  }
  
}
</style>
<template>
  <div id="governance-index">

    <van-nav-bar :z-index="1000" :title="$t('token.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <tx-content 
      v-model="data" 
      :isOPRETURN="isOPRETURN" 
      :address="current_wallet" 
      :openPassDialog.sync="openPassDialog" >

      <div class="container fixed-container">
        <div class="input-with-label-group">
          <div class="input-with-label-item">
            <label for="fromAddr">
              {{$t('token.userName')}}
            </label>
            <input type="text" id="userName" v-model="userName" readonly />
          </div>
          <div class="input-with-label-item">
            <label for="fromAddr">
              {{$t('token.createAddress')}}
            </label>
            <input type="text" id="tokenAddress" v-model="current_wallet" readonly />
          </div>
          <div class="input-with-label-item">
            <label for="value">
              {{$t('token.tokenLongName')}}
            </label>
            <input type="text" id="tokenLongName" :placeholder="$t('token.tokenLongName')" v-model.trim="token.tokenLongName.value" @change=""/>
            <label for="value" class="error-msg" v-if="token.tokenLongName.msg">{{token.tokenLongName.msg}}</label>
          </div>
          <div class="input-with-label-item">
            <label for="value">
              {{$t('token.tokenShortName')}}
            </label>
            <input type="text" id="tokenShortName" :placeholder="$t('token.tokenShortName')" v-model.trim="token.tokenShortName.value" @change=""/>
            <label for="value" class="error-msg" v-if="token.tokenShortName.msg">{{token.tokenShortName.msg}}</label>
          </div>
          <div class="input-with-label-item">
            <label for="value">
              {{$t('token.total')}}
            </label>
            <input type="text" id="total" :placeholder="$t('token.total')" v-model.trim="token.total.value" @change=""/>
            <label for="value" class="error-msg" v-if="token.total.msg">{{token.total.msg}}</label>
          </div>
          <div class="input-with-label-item">
            <label for="value">
              {{$t('token.point')}}
            </label>
            <input type="text" id="point" :placeholder="$t('token.point')" v-model.trim="token.point.value" @change=""/>
            <label for="value" class="error-msg" v-if="token.point.msg">{{token.point.msg}}</label>
          </div>
          <div class="input-with-label-item">
            <label for="value">
              {{$t('token.tokenAddress')}}
            </label>
            <input type="text" id="tokenAddress" :placeholder="$t('token.tokenAddress')" v-model.trim="token.tokenAddress.value" @change=""/>
            <label for="value" class="error-msg" v-if="token.tokenAddress.msg">{{token.tokenAddress.msg}}</label>
          </div>
          <div class="input-with-label-item">
            <label class="warn-help">{{$t('token.warnHelp')}}</label>
            <label class="warn-fees">{{$t('token.warnFees')}}</label>
          </div>
        </div>
        <div class="input-group" style="padding-top: 0px">
          <button class="default" @click="openConfirmInfo = true">{{$t('token.next')}}</button>
        </div>
      </div>
    </tx-content>

    <van-popup v-model="openConfirmInfo" position="bottom" :close-on-click-overlay="false">
      <div class="container confirm-info-container">
        <div class="popup-title" style="border:none">
          {{$t('commom.tx.confirmInfoTX')}}
        </div>
        <div class="cancel-button" @click="openConfirmInfo = false">
          <img src="https://lbtc.io/wallet/static/img/close.png" alt="">
        </div>
        <div class="pane">
          <table class="confirm-info-table" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr class="confirm-info-item">
              <td class="confirm-info-title">{{$t('commom.tx.confirmInfoType')}}:</td>
              <td class="confirm-info-content">{{$t('token.confirmInfoTxType')}}</td>
            </tr>
            <tr class="confirm-info-item">
              <td class="confirm-info-title">{{$t('token.tokenLongName')}}:</td>
              <td class="confirm-info-content">{{token.tokenLongName.value}}</td>
            </tr>
            <tr class="confirm-info-item">
              <td class="confirm-info-title">{{$t('token.tokenShortName')}}:</td>
              <td class="confirm-info-content">{{token.tokenShortName.value}}</td>
            </tr>
            <tr class="confirm-info-item">
              <td class="confirm-info-title">{{$t('token.total')}}:</td>
              <td class="confirm-info-content">{{token.total.value}}</td>
            </tr>
            <tr class="confirm-info-item">
              <td class="confirm-info-title">{{$t('token.point')}}:</td>
              <td class="confirm-info-content">{{token.point.value}}</td>
            </tr>
            <tr class="confirm-info-item">
              <td class="confirm-info-title">{{$t('token.tokenAddress')}}:</td>
              <td class="confirm-info-content">{{token.tokenAddress.value}}</td>
            </tr>
            <tr class="confirm-info-item">
              <td class="confirm-info-title">{{$t('commom.tx.confirmInfoFees')}}:</td>
              <td class="confirm-info-content">{{fees}}</td>
            </tr>
          </table>
        </div>
        <div class="input-group">
          <button class="default confirm-info-button" @click="openPassDialog = true">{{$t('commom.tx.dialogConfirm')}}</button>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      data: {
        address: '1111111111111111111111111111',
        value: 'aaaaaaaaaaaaaaaa'
      },
      isOPRETURN: true,
      current_wallet: '',
      openPassDialog: false,

      userName: '',
      openConfirmInfo: false,

      token: {
        tokenLongName: {
          value: '',
          status: false,
          msg: ''
        },
        tokenShortName: {
          value: '',
          status: false,
          msg: ''
        },
        total: {
          value: '',
          status: false,
          msg: ''
        },
        point: {
          value: '',
          status: false,
          msg: ''
        },
        tokenAddress: {
          value: '',
          status: false,
          msg: ''
        }
      },
      fees: 10
    }
  },
  computed:{
    
  },
  created(){
    this.tokenInit();
  },
  mounted(){
  
  },
  methods:{

    tokenInit() {
      this.localforage.getItem('current_wallet').then( current_wallet => {
        if (current_wallet) {
          this.current_wallet = current_wallet;
        }
      })
    },

    makeReturn() {

    }


  },
  destroyed(){},
  watch:{

  },
}
</script>