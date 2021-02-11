<style lang="scss" scoped>

</style>
<template>
  <div id="register-index">
    <van-nav-bar :z-index="1000" :title="$t('register.navTitle')" left-arrow fixed @click-left="$router.goBack()"/>

    <div class="container fixed-container container-lengthen-half">
      <tx-component ref="myLBTC" v-model="targets" :isOPRETURN="true" :callBack.sync="callBackObj">
        <div class="notice">
          {{$t('register.warnMsg')}}
        </div>

        <form>
          <div class="input-group">
            <div class="input-item">
              <label for="fromAddr" class="input-label" >{{$t('register.addr')}}</label>
              <input type="text" id="fromAddr" class="hash" v-model="walletDB.current" readonly>
            </div>

            <div class="input-item" :class="{'input-item-warn': nickname.msg}">
              <label for="name" class="input-label">{{$t('register.nickname')}}</label>
              <input type="text" id="name" :placeholder="$t('register.nicknamePlaceholder')" v-model.trim="nickname.value" @change="nameChange" :readonly="nickname.isReg">
              <span class="input-balance">{{$t('wallet0.balance')}}:{{walletDB.accounts[walletDB.current].availableBalance}} LBTC</span>
              <span class="input-warn" v-if="nickname.msg">{{nickname.msg}}</span>
            </div>
          </div>
        </form>

        <div class="button default-button" @click="next" :disabled="nickname.isReg" :class="{'disabled': nickname.isReg}">
          <span v-if="nickname.isReg">{{$t('register.registered')}}</span>
          <span v-else>{{$t('register.register')}}</span>
        </div>

      </tx-component>
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{},
  props:{},
  data(){
    return {
      callBackObj: {
        type: '',
        content: ''
      },
      targets: {},

      nickname: {
        value: '',
        msg: '',
        status: false,
        isReg: false
      },
    }
  },
  computed:{},
  
  created(){},
  mounted(){
    this.addrInfoInit();

  },
  methods:{
    addrInfoInit() {
      this.$http.get(this.$api.api.getUsername, { param: this.walletDB.current, isHide: 1 }).then( r => {
        if (!r.error) {
          this.nickname.value = r.msg;
          this.nickname.isReg = true;
        } else {
          this.nickname.value = '';
        }
      }).catch( e => {
        this.nickname.value = '';
      })
    },

    nameChange() {
      return new Promise((resolve) => {
        if (this.nickname.value == '') {
          this.nickname.msg = this.$t('commom.tx.notEmpty');
          this.nickname.status = false;
          resolve(true)
        } else if (this.isNickname(this.nickname.value)) {
          this.$http.get(this.$api.api.getAddress, { param: this.nickname.value, isHide: 1 }).then( r => {
            if (r.error) {
              this.nickname.msg = '';
              this.nickname.status = true;
            } else {
              this.nickname.msg = this.$t('register.occupied');
              this.nickname.status = false;
            }
            resolve(true)
          })
        } else {
          this.nickname.msg = this.$t('register.nicknameRole');
          this.nickname.status = false;
          resolve(true)
        }
      })
    },

    async next() {
      await this.nameChange();
      if (this.nickname.status) {
        this.$set(this.targets, 'confirmTxType', this.$t('register.confirmInfoTxType'));
        this.$set(this.targets, 'confirmTxName', this.$t('commom.tx.confirmNickname'));
        this.$set(this.targets, 'confirmTxContent', this.nickname.value);
        this.$set(this.targets, 'OP_RETURN', this.LBTCtools.RegNickname(this.nickname.value, ''));
        this.$set(this.targets, 'fee', this.wConfig.fees.regNickname);
        this.$refs.myLBTC.toTXcontent();
      }
    }

  },
  destroyed(){},
  watch:{
    callBackObj(val) {
      if (val.type == 0) {
        this.nickname.msg = val.content;
        this.nickname.status = false;
      }
    }
  }
}
</script>