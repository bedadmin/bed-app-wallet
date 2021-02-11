<style lang="scss" scoped>
.vote {
  height: 100vh;
  .fixed-container {
    padding-top: 78px;
  }
  // .listItem {
  //   display: flex;
  //   padding: 5px 15px;
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
  //   top: 42px;
  //   background: #252B35;
  //   color: #fff;
  //   z-index: 1;
  //   height: 36px;
  //   border-bottom: none;
  //   .a {
  //     width: 50px;
  //   }
  //   .d {
  //     width: 100px;
  //   }
  // }
  .searchBox {
    position: fixed;
    top: 41px;
    z-index: 2;
    width: 100%;
    height: 26px;
    padding: 0 20px;
    font-size: 12px;
    input {
      outline: none;
      height: 100%;
      width: 100%;
      border: none;
      box-shadow: 1px 1px 1px 1px rgba(104, 147, 197, 0.35);
      border-radius: 30px;
      padding: 0 40px 0 30px;
        background-color: #f9f9f9;
    }
    .icon {
      z-index: 3;
      position: absolute;
      display: block;
      width: 26px;
      height: 26px;
      top: 0;
      bottom: 0;
      right: 25px;
      color: #1d5aa3;
      font-size: 16px;
      &::before {
        position: absolute;
        top: 5px;
        bottom: 0;
        right: 0;
        left: 0; 
      }
    }
  }
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
  //   background-color: #eee;
  // }
}
</style>
<template>
  <div class="vote">

    <van-nav-bar :z-index="1000" :title="$t('vote.vote.navTitle')" fixed left-arrow @click-left="$router.goBack()" @click-right="onClickRight">
      <van-icon :name="navSearch ? 'close' : 'search'" slot="right" />
    </van-nav-bar>

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

      <div class="searchBox" v-if="navSearch">
        <input type="search" name="search" :placeholder="$t('vote.vote.search')" v-model.trim="searchText" @onsearch="searchData(1)">
        <van-icon class="icon" name="search" @click="searchData(3)" />
      </div>
      
      <scroller class="container fixed-container" :on-refresh="refresh" :refreshText="$t('main.refresh')" :noDataText="$t('main.noMoreData')" ref="myscroller">
        <div>
          <van-checkbox-group v-model="selectList" :max="countSum">
            <van-cell-group is="transition-group" name="list">
              <van-cell v-show="item.isShow" v-for="(item, index) in forgeList" :key="item.address + '-' + index"> 
                <div class="listItem" :class="item.disabled ? 'disabled' : ''">
                  <div class="a">
                    <van-checkbox :name="item" :disabled="item.disabled" ref="checkboxes"  @click.stop="toggle(index)"/>
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
      <div class="a">{{$t('vote.vote.button1')}} ({{ countSum - selectList.length }})</div>
      <div class="b" @click="vote">
        {{$t('vote.vote.button2')}}
      </div>
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
      
      navSearch: false,
      searchText: '',
      clickStop: true,
      countSum: 51,
      selectList: [],
      selectionResArr: []
    };
  },
  computed: {
    forgeList() {
      let res = this.$store.state.vote.forgeList;
      let votesList = this.$store.state.vote.votesList;
      res.forEach((item, index) => {
        item.value = false;
        item.isShow = true;
        item.id = index + 1;
        votesList.forEach((item0, index0) => {
          if (item.address == item0.delegate) {
            item.disabled = true;
          }
        })
      });
      return res
    },
    votesList() {
      let res = this.$store.state.vote.votesList;
      let arr = [];
      res.forEach((item, index) => {
        arr.push(item.delegate)
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
      this.searchText = '';
      this.navSearch = false;
      let arr = [];
      JSON.parse(JSON.stringify(this.votesList)).forEach((item, index) => {
        let obj = {};
        obj.address = item.delegate;
        arr.push(obj);
      });
      this.selectList = arr;

      if (done) {
        Promise.all([this.$http.get(this.$api.api.getListDelegates, {addr: this.walletDB.current}), this.$http.get(this.$api.api.getVoteByAddr, {param: this.walletDB.current, addr: this.walletDB.current})]).then( data => {
          if (data[0].error) {
            this.$store.state.vote.forgeList = [];
          } else {
            this.$store.state.vote.forgeList = data[0].msg;
          }
          if (data[1].error) {
            this.$store.state.vote.votesList = [];
          } else {
            this.$store.state.vote.votesList = data[1].msg;
          }
          done()
        })
      }
    },

    onClickRight() {
      if (this.navSearch) {
        this.searchText = '';
        this.forgeListRes = this.forgeList;
      }
      this.navSearch = !this.navSearch;
    },

    toggle(index) {
      if (this.clickStop) {
        this.clickStop = false;
        if (this.$refs.checkboxes[index].checked) {
          this.$refs.checkboxes[index].toggle();
        } else {
          if (this.countSum - this.selectList.length > 0) {
            this.$refs.checkboxes[index].toggle();
          } else {
            Toast.fail({
              duration: 1500,
              message: this.$t('vote.vote.noMoreThanTotal')
            });
          }
        }
        window.setTimeout(() => {
          this.clickStop = true;
        }, 300)
      }
    },

    refresh(done) {
      this.voteInit(done);
    },

    searchData(e) {
      let keyWord = this.searchText;
      if (keyWord == '') {
        this.forgeList.forEach((item, index) => {
          item.isShow = true;
        });
        return false
      }
      this.forgeList.forEach((item, index) => {
        if (item.name.indexOf(keyWord) >= 0) {
          item.isShow = true;
        } else {
          item.isShow = false;
        }
      })
    },

    vote() {
      let arr = [];
      this.selectList.forEach((item, index) => {
        let flag = true;
        for (let i = 0; i < this.votesList.length; i++) {
          if (this.votesList[i].delegate == item.address) {
            flag = false
            break
          }
        }
        if (flag) {
          arr.push(item)
        }
      });
      this.selectionResArr = arr;

      if (!this.selectionResArr.length) {
        Toast({
          duration: 1500,
          message: this.$t('commom.tx.selectAgent')
        })
        return false
      }

      let addrs = [];
      this.selectionResArr.forEach((item, index) => {
        addrs.push(item.address);
      });

      this.$set(this.targets, 'confirmTxType', this.$t('vote.vote.confirmInfoTxType'));
      this.$set(this.targets, 'confirmTxName', this.$t('commom.tx.confirmInfoName'));
      this.$set(this.targets, 'confirmTxContent', this.selectionResArr);
      this.$set(this.targets, 'OP_RETURN', this.LBTCtools.VoteForgedNode(addrs, "c1"));
      this.$set(this.targets, 'fee', this.wConfig.fees.vote);
      this.$refs.myLBTC.toTXcontent();
    }

  },
  watch: {
    searchText(newVal, oldVal) {
      if (newVal != oldVal) {
        this.searchData();
      }
    },
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