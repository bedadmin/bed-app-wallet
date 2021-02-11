<style lang="scss" scoped>
#vote-index{
  height: 100vh;
  background-color: #fff;
  .vote-content {
    font-size: 0;
    padding-top: 2%;
    .vote-index-item {
      position: relative;
      width: 49%;
      padding-bottom: 36%;
      background-color: #385FFF;
      display: inline-block;
      vertical-align:bottom;
      margin-right: 2%;
      margin-top: 2%;
      border-radius: 5px;
      background-position: right bottom;
      background-size: contain;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:nth-child(1) {
        background-image: url('https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/vote-1.png');
      }
      &:nth-child(2) {
        background-image: url('https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/vote-2.png');
      }
      &:nth-child(3) {
        background-image: url('https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/vote-3.png');
      }
      &:nth-child(4) {
        background-image: url('https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/vote-4.png');
      }
      .item-box {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        font-size: 14px;
        color: #fff;
      }
      .item-title {
        margin: 20px 0 0 15px;
        padding-bottom: 6px;
        position: relative;
        display: flex;
        align-items: center;
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.2);;
        }
        span:first-child {
          margin-right: 6px;
        }
        .icon-arrow {
          display: flex;
        }
      }
      .content {
        font-size: 12px;
        padding-left: 10px;
        padding-top: 8px;
        span {
          padding: 4px 10px;
          border-radius: 10px;
          background-color: rgba(0,0,0,0.1);
          color: rgba(255,255,255,0.8);
          display: inline-block;
        }
      }
    }
  }

  .van-icon-arrow::before {
    transition: .2s linear all;
  }
  .vote-arrow .van-icon-arrow::before {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
<template>
  <div id="vote-index">
    <van-nav-bar :z-index="1000" :title="$t('vote.index.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="container fixed-container">

      <div class="vote-content">
        <div class="vote-index-item">
          <div class="item-box">
            <div class="item-title" @click="openVotesView">
              <span>{{$t('vote.index.item1')}}</span>
              <span class="icon-arrow" :class="showNum ? 'vote-arrow' : ''">
                <van-icon class="" name="arrow" />
              </span>
            </div>
            <transition name="fade">
              <div class="content" v-if="showNum">
                <div @click="toVoters">
                  <span v-if="name">{{$t('vote.index.item1Msg1')}} {{votersList.length}} {{$t('vote.index.votes')}}</span>
                  <span v-else style="color: #ed3f14">{{$t('vote.index.item1Msg3')}}</span>
                </div>
                <div @click="toVotes" style="margin-top: 5px;">
                  <span>{{$t('vote.index.item1Msg2')}} {{votesList.length}} {{$t('vote.index.votes')}}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="vote-index-item">
          <div class="item-box">
            <div class="item-title" @click="toRegister">
              <span v-if="name">{{$t('vote.index.delegateName')}}</span>
              <span v-else>{{$t('vote.index.item2')}}</span>
              <span v-if="!name" class="icon-arrow">
                <van-icon class="" name="arrow" />
              </span>
            </div>
            <div class="content" v-if="name">
              <div>
                <span>
                  {{name}}
                </span>
              </div>
            </div>
          </div>
          
        </div>
        
        <div class="vote-index-item">
          <div class="item-box">
            <div class="item-title" @click="toVote">
              <span>{{$t('vote.index.item3')}}</span>
              <span class="icon-arrow">
                <van-icon class="" name="arrow" />
              </span>
            </div>
            <div class="content">
              <div>
                <span>
                  {{$t('vote.index.item3Msg')}} {{countSum - votesList.length}} {{$t('vote.index.votes')}}
                </span>
              </div>
            </div>
          </div>
          
        </div>

        <div class="vote-index-item">
          <div class="item-box">
            <div class="item-title" @click="toVotecancel">
              <span>{{$t('vote.index.item4')}}</span>
              <span class="icon-arrow">
                <van-icon class="" name="arrow" />
              </span>
            </div>
            
          </div>
          
        </div>
      </div>




      <!-- <div class="tx-item" style="display: block;padding-bottom: 0;">
        <div class="flex" @click="openVotesView">
          <div class="tx-type">
              <img src="https://lbtc.io/wallet/static/img/vote-1.png">
          </div>
          <div class="tx-info">
            <div class="tx-id">{{$t('vote.index.item1')}}</div>
          </div>
          <div class="tx-value" :class="showNum ? 'vote-arrow' : ''">
            <van-icon class="" name="arrow" />
          </div>
        </div>
        <div class="content" v-if="showNum" :class="">
          <div @click="toVoters">
            <span v-if="name">{{$t('vote.index.item1Msg1')}} {{votersList.length}} {{$t('vote.index.votes')}}</span>
            <span v-if="!name" style="color: #ed3f14">{{$t('vote.index.item1Msg3')}}</span>
          </div>
          <div @click="toVotes" style="text-align: right;">
            {{$t('vote.index.item1Msg2')}} {{votesList.length}} {{$t('vote.index.votes')}}
          </div>
        </div>
      </div>

      <div class="tx-item" @click="toRegister">
        <div class="tx-type">
            <img src="https://lbtc.io/wallet/static/img/vote-2.png">
        </div>
        <div class="tx-info">
          <div class="tx-id" v-if="!name">{{$t('vote.index.item2')}}</div>
          <div class="tx-id" v-if="name">{{$t('vote.index.delegateName')}} <span style="font-size: 12px;">{{name}}</span></div>
        </div>
      </div>

      <div class="tx-item" @click="toVote">
        <div class="tx-type">
            <img src="https://lbtc.io/wallet/static/img/vote-3.png">
        </div>
        <div class="tx-info">
          <div class="tx-id">{{$t('vote.index.item3')}}</div>
        </div>
        <div class="tx-value">
          {{$t('vote.index.item3Msg')}} {{countSum - votesList.length}} {{$t('vote.index.votes')}}
        </div>
      </div>

      <div class="tx-item" @click="toVotecancel">
        <div class="tx-type">
            <img src="https://lbtc.io/wallet/static/img/vote-4.png">
        </div>
        <div class="tx-info">
          <div class="tx-id">{{$t('vote.index.item4')}}</div>
        </div>
      </div> -->
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
      showNum: false,
      forgeList: [],
      votersList: [],
      votesList: [],
      countSum: 51,
      name: ''
    }
  },
  computed:{
    
  },
  created(){
    this.hisInit();
  },
  mounted(){
    
  },
  methods:{
    hisInit() {
      Promise.all([this.$http.get(this.$api.api.getListDelegates, {addr: this.walletDB.current}), this.$http.get(this.$api.api.getVoteByAddr, {param: this.walletDB.current, addr: this.walletDB.current})]).then( data => {
        if (data[0].error) {
          this.forgeList = [];
        } else {
          this.forgeList = data[0].msg;
        }
        if (data[1].error) {
          this.votesList = [];
        } else {
          this.votesList = data[1].msg;
        }
        let name = '';
        for (let i = 0; i < this.forgeList.length; i++) {
          if (this.forgeList[i].address == this.walletDB.current) {
            name = this.forgeList[i].name;
            this.name = this.forgeList[i].name;
            break
          }
        }
        if(name) {
          this.$http.get(this.$api.api.getVotersByAddr, {addr: this.walletDB.current, name: name}).then( r => {
            this.votersList = r.msg;
          }).catch( e => {
            Toast({
              duration: 15000,
              message: e
            })
          })
        }
      })
    },
    
    openVotesView() {
      this.showNum = !this.showNum
    },

    toRegister() {
      if (this.name) {
        Toast.fail({
          duration: 1500,
          message: this.$t('vote.index.toastMsg1')
        });
      } else {
        this.$router.push({ path:'/vote-register' });
      }
    },

    toVoters() {
      if (this.name) {
        if (this.votersList.length) {
          this.$router.push({ path:'/vote-voters',query: { voters: JSON.stringify(this.votersList), forgeList: JSON.stringify(this.forgeList)}});
        } else {
          Toast.fail({
            duration: 1500,
            message: this.$t('vote.index.toastMsg2')
          });
        }
      } else {
        Toast.fail({
          duration: 1500,
          message: this.$t('vote.index.item1Msg3')
        });
      }
    },

    toVotes() {
      if (this.votesList.length) {
        this.$router.push({ path:'/vote-votes',query: { votes: JSON.stringify(this.votesList)}});
      } else {
        Toast.fail({
          duration: 1500,
          message: this.$t('vote.index.toastMsg2')
        });
      }
    },

    toVote() {
        this.$store.commit('saveVoteData', {
          forgeList: this.forgeList,
          votesList: this.votesList
        });
        this.$router.push({ path:'/vote-vote'});
    },

    toVotecancel() {
      if (this.votesList.length) {
        this.$store.commit('saveVoteData', {
          forgeList: this.forgeList,
          votesList: this.votesList
        });
        this.$router.push({ path:'/vote-votecancel'});
      } else {
        Toast.fail({
          duration: 1500,
          message: this.$t('vote.index.toastMsg3')
        });
      }
    }
  }
}
</script>