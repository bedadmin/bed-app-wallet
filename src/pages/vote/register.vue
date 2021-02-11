<style lang="scss" scoped>

</style>
<template>
  <div id="vote-register">
    <van-nav-bar :z-index="1000" :title="$t('vote.register.navTitle')" left-arrow fixed @click-left="$router.goBack()"/>

    <div class="container fixed-container container-lengthen-half">
      <tx-component ref="myLBTC" v-model="targets" :isOPRETURN="true" :callBack.sync="callBackObj">
        
        <div class="notice">
          {{$t('vote.register.warnMsg')}}
        </div>

        <form>
          <div class="input-group">
            <div class="input-item">
              <label for="fromAddr" class="input-label" >{{$t('vote.register.addr')}}</label>
              <input type="text" id="fromAddr" class="hash" v-model="walletDB.current" readonly>
            </div>

            <div class="input-item" :class="{'input-item-warn': msg}">
              <label for="name" class="input-label">{{$t('vote.register.name')}}</label>
              <input type="text" id="name" :placeholder="$t('vote.register.namePlaceholder')" v-model.trim="name" @change="nameChange">
              <span class="input-balance">{{$t('wallet0.balance')}}:{{walletDB.accounts[walletDB.current].availableBalance}} LBTC</span>
              <span class="input-warn" v-if="msg">{{msg}}</span>
            </div>
          </div>
        </form>

        <div class="button default-button" @click="next">{{$t('vote.register.next')}}</div>

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
      name: '',
      msg: '',
      status: false
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

    addrInfoInit() {},

    nameChange() {
      if (this.name == '') {
        this.msg = this.$t('commom.tx.notEmpty');
        this.status = false;
      } else if (new Buffer(this.name).length > 32) {
        this.msg = this.$t('commom.tx.tooLong32');
        this.status = false;
      } else {
        this.msg = '';
        this.status = true;
      }
    },

    next() {
      this.nameChange();
      if (this.status) {
        this.$set(this.targets, 'confirmTxType', this.$t('vote.register.confirmInfoTxType'));
        this.$set(this.targets, 'confirmTxName', this.$t('commom.tx.confirmInfoName'));
        this.$set(this.targets, 'confirmTxContent', this.name);
        this.$set(this.targets, 'OP_RETURN', this.LBTCtools.RegForgedNode(this.name));
        this.$set(this.targets, 'fee', this.wConfig.fees.regDelegate);
        this.$refs.myLBTC.toTXcontent();
      }
    }
  },
  destroyed(){},
  watch:{
    callBackObj(val) {
      if (val.type == 0) {
        this.msg = val.content;
        this.status = false;
      }
    }
  }
}
</script>