<style lang="scss" scoped>
#governance-index{
  .tx-item {
    padding: 15px 10px;
  }
}
</style>
<template>
  <div id="governance-index">
    <van-nav-bar :title="$t('governance.index.navTitle')" fixed left-arrow @click-left="onClickLeft" />

    <div class="container fixed-container">

      <router-link to="/governance-committeeRegister">
        <div class="tx-item">
          <div class="tx-type">
              <img src="http://lbtc.io/wallet/static/img/governance-res.png">
          </div>
          <div class="tx-info">
            <div class="tx-id">{{$t('governance.index.itemResCommittee')}}</div>
          </div>
        </div>
      </router-link>

      <router-link to="/">
        <div class="tx-item">
          <div class="tx-type">
              <img src="http://lbtc.io/wallet/static/img/governance-voteCommittee.png">
          </div>
          <div class="tx-info">
            <div class="tx-id">{{$t('governance.index.itemVoteCommittee')}}</div>
          </div>
        </div>
      </router-link>

      <router-link to="/">
        <div class="tx-item">
          <div class="tx-type">
              <img src="http://lbtc.io/wallet/static/img/governance-cancelVoteCommittee.png">
          </div>
          <div class="tx-info">
            <div class="tx-id">{{$t('governance.index.itemCancelCommittee')}}</div>
          </div>
        </div>
      </router-link>

      <router-link to="/governance-proposal">
        <div class="tx-item">
          <div class="tx-type">
              <img src="http://lbtc.io/wallet/static/img/governance-sub.png">
          </div>
          <div class="tx-info">
            <div class="tx-id">{{$t('governance.index.itemProposal')}}</div>
          </div>
        </div>
      </router-link>

      <router-link to="/">
        <div class="tx-item">
          <div class="tx-type">
              <img src="http://lbtc.io/wallet/static/img/governance-voteProposal.png">
          </div>
          <div class="tx-info">
            <div class="tx-id">{{$t('governance.index.itemVoteProposal')}}</div>
          </div>
        </div>
      </router-link>

    </div>


  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  components:{
    
  },
  props:{},
  data(){
    return {
      
    }
  },
  computed:{
    
  },
  created(){
    
  },
  mounted(){
    
  },
  methods:{
    onClickLeft() {
      this.$router.back();
    }
  },
  destroyed(){},
  watch:{

  },
}
</script>