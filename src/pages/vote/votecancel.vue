<style lang="scss" scoped>
.vote {
  height: 100vh;
  .fixed-container {
    padding-top: 70px;
  }
  // .listItem {
  //   display: flex;
  //   padding: 5px 0;
  //   width: 100%;
  //   align-items: center;
  //   font-size: 12px;
  //   & > * {
  //     padding: 5px;
  //   }
  //   .a {
  //     flex: 0;
  //   }
  //   .b {
  //     flex: 1;
  //     word-break: break-all;
  //     line-height: 1.4;
  //   }
  //   .c {
  //     flex: 2;
  //     word-break: break-all;
  //   }
  //   .d {
  //     flex: 0;
  //   }
  // }
  // .listItemTitle {
  //   padding: 0 15px;
  //   height: 36px;
  //   position: fixed;
  //   top: 36px;
  //   background: #fff;
  //   z-index: 1;
  //   height: 36px;
  //   box-shadow: 0px 1px 1px 0px rgba(104, 147, 197, 0.35);
  //   border-bottom: none;
  //   .a {
  //     width: 50px;
  //   }
  //   .d {
  //     width: 100px;
  //   }
  // }
  // .buttom-button {
  //   position: fixed;
  //   bottom: -1px;
  //   left: 0;
  //   right: 0;
  //   display: flex;
  //   font-size: 14px;
  //   box-shadow: 1px 1px 1px 1px rgba(104, 147, 197, .35);
  //   & > div {
  //     height: 40px;
  //     line-height: 40px;
  //     text-align: center;
  //   }
  //   .a {
  //     flex: 1;
  //     background-color: #fff;
  //   }
  //   .b {
  //     flex: 2;
      
  //   }
  // }
  // .disabled {
  //   pointer-events: none;
  //   cursor: default;
  //   opacity: 0.6;
  // }
  // .tag {
  //   float: left;
  //   background-color: rgba(29, 90, 163, 0.11);
  //   margin: 2px;
  //   padding: 2px 4px;
  //   font-size: 12px;
  // }
  // .nodes-content {
  //   max-height: 100px;
  //   overflow-y: auto;
  // }
}
</style>
<template>
  <div class="vote">

    <van-nav-bar :z-index="1000" :title="$t('vote.votecancel.navTitle')" fixed left-arrow @click-left="$router.goBack()"></van-nav-bar>

    <tx-component ref="myLBTC" v-model="targets" :isOPRETURN="true" :callBack.sync="callBackObj">

      <div class="listItem listItemTitle">
        <div class="a">
          <van-checkbox style="opacity: 0;"></van-checkbox>
        </div>
        <div class="b">
          {{$t('vote.vote.thead.td1')}}
        </div>
        <div class="c">
          {{$t('vote.vote.thead.td2')}}
        </div>
        <div class="d">
          #
        </div>
      </div>
      
      <scroller class="container fixed-container" :on-refresh="refresh" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">
        <div>
          <van-checkbox-group v-model="selectList">
            <van-cell-group is="transition-group" name="list">
              <van-cell v-show="item.isShow" v-for="(item, index) in votesList" :key="item.delegate + '-' + index"> 
                <div class="listItem">
                  <div class="a">
                    <van-checkbox :name="item" :disabled="item.disabled" ref="checkboxes" />
                  </div>
                  <div class="b" @click="toggle(index)">
                    {{item.name}}
                  </div>
                  <div class="c" @click="toggle(index)">
                    {{item.count}}
                  </div>
                  <div class="d" @click="toggle(index)">
                    {{item.id}}
                  </div>
                </div>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </scroller>

    </tx-component>

    <div class="buttom-button">
      <div class="a">{{$t('vote.votecancel.button1')}} ({{ selectList.length }})</div>
      <div class="b" @click="vote">{{$t('vote.votecancel.button2')}}</div>
    </div>

  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {},
  data() {
    return {
      callBackObj: {
        type: '',
        content: ''
      },
      targets: {},

      selectList: [],
    };
  },
  computed: {
    votesList() {
      let res = this.$store.state.vote.votesList;
      res.forEach((item, index) => {
        item.value = false;
        item.id = index + 1;
        item.isShow = true;
      });
      return res
    },
  },
  created() {
    this.voteInit();
  },
  mounted() {},
  methods: {
    voteInit(done) {
      if (done) {
        this.$http.get(this.$api.api.getVoteByAddr, {param: this.walletDB.current, addr: this.walletDB.current}).then( res => {
          if (res.error) {
            this.$store.state.vote.votesList = []
          } else {
            this.$store.state.vote.votesList = res.msg
          }
        })
        done()
      }
    },

    toggle(index) {
      if (this.$refs.checkboxes[index].checked) {
        this.$refs.checkboxes[index].toggle();
      } else {
        this.$refs.checkboxes[index].toggle();
      }
    },

    refresh(done) {
      this.voteInit(done);
    },

    vote() {
      if (!this.selectList.length) {
        Toast({
          duration: 1500,
          message: this.$t('commom.tx.selectAgent')
        })
        return false
      }

      let addrs = [];
      this.selectList.forEach((item, index) => {
        addrs.push(item.delegate);
      });
      let OP_RETURN = this.LBTCtools.VoteForgedNode(addrs, "c2");
      
      this.$set(this.targets, 'confirmTxType', this.$t('vote.votecancel.confirmInfoTxType'));
      this.$set(this.targets, 'confirmTxName', this.$t('commom.tx.confirmInfoName'));
      this.$set(this.targets, 'confirmTxContent', this.selectList);
      this.$set(this.targets, 'OP_RETURN', this.LBTCtools.VoteForgedNode(addrs, "c2"));
      this.$set(this.targets, 'fee', this.wConfig.fees.vote);
      this.$refs.myLBTC.toTXcontent();
    }

  },
  watch: {
    callBackObj(val) {
      if (val.type == 0) {
        Toast({
          duration: 2000,
          message: val.content
        })
      }
    }
  }
};
</script>