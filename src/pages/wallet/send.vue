<style lang="scss" scoped>
#wallet-send {
  height: 100vh;
  .addrs-add {
    padding: 40px 0;
    font-size: 14px;
  }
  .qr-code {
    width: 20px;
    height: 20px;
    position: relative;
    top: 4px;
  }
  .input-group {
    .input-balance {
      bottom: 10px;
    }
  }
  > .van-popup--bottom {
    max-height: 80%;
  }
  .with-drop {
    display: block;
  }
  .drop {
    position: relative;
    background-color: #fff;
    flex: 1;
    font-size: 12px;
    padding: 2px 0px 2px 10px;
    display: flex;
    word-break: keep-all;
    align-items: center;
    .van-icon {
      position: relative;
      margin-left: 6px;
      top: 1px;
    }
    .drop-menu {
      position: absolute;
      padding: 5px 0;
      z-index: 999;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      border-width: 7px 7px 7px 0;
      border-right-color: hsla(0, 0%, 85%, 0.5);
      left: -1px;
      top: 35px;
      li {
        padding: 8px 25px 8px 12px;
        text-align: left;
        line-height: 2;
        &:first-child {
          border-bottom: 1px solid #eee;
          border-bottom-width: 80%;
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
<template>
  <div id="wallet-send" @click="closeAll">
    <van-nav-bar :z-index="1000" :title="$t('wallet.send.navTitle')" @click-left="onClickLeft" @click-right="toQrCode" left-arrow fixed>
      <img class="qr-code" v-if="isplusReady" slot="right" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABcklEQVRYR+3Xu0odURQG4M8LpLLwAkkhgYAWprGy0ioEQqwkaGz0DSL4Anb2gopvoIRA0piEWOsDKF4CKqgBFVTsBUVZcR8R5MDBgZlTzG5mz2av9f/7n7VnrdXgfnzAFHrQltZu8BVj6f25jyV8RlNycIkdTGOlAR/xu4r3Y3Q+FznZnaOjio/3QWAVA2nDPxyk+RVm8CcjgTjgJF4kP2/wOs3XgsAF2rGP7oxgtZrvJqyLIHCbrL5juFYPGfcF1qfArgsCp3iFeUxkPFmt5t8wgutQoB99iMWTWj1k3DeOWfwMAoWOkkCpQF0o0IJeNOd8Ha6xHgrsoStn8ArcVhDYxtuCCGwGgSI/wUZdBGFB6t/DlgqUCoQCixjElzTPIyijIJnDchCIBqQxVUSjeaAnrIeSrKyKK43J3xxzQiUB/m9MHrdmRzhMcRDp8gcWMsZFBPfQo3T/pDWLG/CrCsgZXmYkEN1waxUf7yo/osLa8zup8VDzDyqz/gAAAABJRU5ErkJggg==" />
    </van-nav-bar>

    <tx-component ref="myLBTC" v-model="targets" :isOPRETURN="false" :callBack.sync="callBackObj">
      <div class="container fixed-container container-lengthen-half">

        <form>
          <div class="input-group">
            <div class="input-item" :class="{'input-item-warn': count.msg}">
              <label for="value" class="input-label">{{$t('wallet.send.payMoney')}}</label>
              <input type="number" id="value" :placeholder="$t('wallet.send.moneyInputPlaceholder')" v-model="count.value" @change="checkCount"/>
              <span class="input-balance" @click="sendAll()">{{$t('wallet.send.balance')}}:{{walletDB.accounts[walletDB.current].balance/100000000}} BED</span>
              <span class="input-warn" v-if="count.msg">{{count.msg}}</span>
            </div>

            <div class="input-item">
              <label for="fromAddr" class="input-label" >{{$t('wallet.send.payAddr')}}</label>
              <input type="text" id="fromAddr" class="hash" v-model="walletDB.current" readonly>
            </div>

            <div class="input-item with-drop" :class="{'input-item-warn': toAccount.msg}">
              <label for="toAccount" class="input-label" >{{$t('wallet.send.payee')}}</label>
              <div class="flex">
                <!-- <div class="drop" @click.stop="selectSendStatus = !selectSendStatus">
                  <span>{{sendTypeActions[0].name}}</span>
                  <van-icon name="arrow" />
                  <transition name="fade">
                    <div class="drop-menu" v-if="selectSendStatus">
                      <ul>
                        <li v-for="(item ,index) in sendTypeActions" :key="item + index" @click.stop="selectSendType(item)">{{item.name}}</li>
                      </ul>
                    </div>
                  </transition>
                </div> -->
                <input type="text" id="toAccount" class="hash" v-model="toAccount.value" :placeholder="sendTypeActions[0].inputPlaceholder" v-model.trim="toAccount.value" @change="checktoAccount"/>
                <svg @click="openAddrs =! openAddrs" t="1595431312563" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2126" width="32" height="32"><path d="M686.464 371.904c0 100.608-81.536 182.1696-182.1696 182.1696-100.5824 0-182.1824-81.5872-182.1824-182.1696 0-100.5952 81.6-182.1824 182.1824-182.1824 100.6464 0 182.1824 81.5616 182.1824 182.1824z m-41.664 0c0-77.6064-62.8864-140.5056-140.5056-140.5056-77.568 0-140.4928 62.9376-140.4928 140.5056 0 77.568 62.9248 140.4928 140.4928 140.4928 77.6192 0 140.5056-62.8992 140.5056-140.4928z" p-id="2127"></path><path d="M458.368 513.1648c-164.7232 46.0032-277.4272 165.12-277.4272 302.4128a20.8384 20.8384 0 1 0 41.6896 0c0-116.48 98.7648-220.8896 246.9376-262.272a20.8384 20.8384 0 0 0-11.2128-40.1408zM595.0464 606.5152h222.7584a20.8384 20.8384 0 0 0 0-41.6768H595.0464a20.8384 20.8384 0 0 0 0 41.6768zM645.4656 703.7696h172.3392a20.8384 20.8384 0 1 0 0-41.6896H645.4656a20.8384 20.8384 0 0 0 0 41.6896zM705.9712 807.9616h111.8336a20.8384 20.8384 0 0 0 0-41.6768h-111.8336a20.8384 20.8384 0 1 0 0 41.6768z" p-id="2128"></path></svg>
                <span class="input-warn" v-if="toAccount.msg">{{toAccount.msg}}</span>
              </div>
            </div>

            <!-- If enter the address, the nickname is displayed -->
            <!-- <div class="input-item" v-if="toAddrShow">
              <label for="toAddr" class="input-label">{{$t('wallet.send.payeeAddress')}}</label>
              <input type="text" id="toAddr" :placeholder="$t('wallet.send.moneyInputPlaceholder')" v-model="toAddr" readonly/>
            </div> -->

            <!-- If enter the nickname, the address is displayed -->
            <!-- <div class="input-item" v-if="toNicknameShow">
              <label for="toNickname" class="input-label">{{$t('wallet.send.payeeNickname')}}</label>
              <input type="text" id="toNickname" :placeholder="$t('wallet.send.moneyInputPlaceholder')" v-model="toNickname" readonly/>
            </div> -->

          </div>
        </form>

        <div class="button default-button" @click="next">{{$t('wallet.send.next')}}</div>

      </div>
    </tx-component>

    <van-popup v-model="openAddrs" position="bottom">
      <div class="container">
        <div class="popup-title">{{$t('wallet.send.selectionAddr')}}</div>
        <div class="addrs-content" v-if="addrs">
          <div class="addrs-item" v-for="(item, index) in addrs" @click="selectAddr(item.addr)">
            <div class="addrs-item-name">{{item.name}}</div>
            <div class="addrs-item-addr hash">{{item.addr}}</div>
            <div class="addrs-item-other">{{item.other}}</div>
          </div>
        </div>
        <div class="text-center addrs-add" >
          <span v-if="!addrs">{{$t('wallet.send.noAddrContent')}} </span>
          <a @click="toAddrInfo">{{$t('wallet.send.noAddrAddAddr')}}</a>
        </div>
      </div> 
    </van-popup>

  </div>
</template>

<script>
import { Toast } from "vant";
import { setTimeout } from "timers";
export default {
  components: {},
  props: {},
  data() {
    return {
      callBackObj: {
        type: "",
        content: ""
      },
      selectSendStatus: false,
      sendTypeIndex: 0,
      sendTypeActions: [
        {
          index: 0,
          name: this.$t("wallet.send.address"),
          inputPlaceholder: this.$t("wallet.send.payeeAddressPlaceholder")
        },
        {
          index: 1,
          name: this.$t("wallet.send.nickname"),
          inputPlaceholder: this.$t("wallet.send.payeeNicknamePlaceholder")
        }
      ],
      toAccount: {
        value: "",
        msg: "",
        status: false
      },
      toAddr: "",
      toAddrShow: false,
      toNickname: "",
      toNicknameShow: false,
      count: {
        value: "",
        msg: "",
        status: false
      },
      openAddrs: false,
      addrs: []
    };
  },
  computed: {
    targets() {
      return [
        {
          address: this.toAddr,
          value: this.decimal(this.count.value || 0)
            .mul(this.wConfig.point)
            .toNumber(),
          nickname: this.toNickname
        }
      ];
    }
  },
  created() {
    this.sendInit();
  },
  mounted() {},
  methods: {
    sendInit() {
      window.setTimeout(() => {
        Toast.clear();
      }, 1000);
      this.localforage.getItem("addrs").then(addrs => {
        this.addrs = addrs;
      });
      if (this.$route.query.toaddr) {
        this.toAccount.value = this.$route.query.toaddr;
      }
    },

    onClickLeft() {
      this.$router.push({ path: "/main-index/wallet" });
    },

    closeAll() {
      this.selectSendStatus = false;
    },

    selectSendType(n) {
      if (this.sendTypeIndex == n.index) {
        this.selectSendStatus = false;
        return;
      }
      this.sendTypeIndex = n.index;
      this.checktoAccount();
      this.selectSendStatus = false;
    },

    selectAddr(param) {
      this.toAccount.value = param;
      this.openAddrs = false;
      this.checktoAccount();
    },

    checktoAccount() {
      if (this.toAccount.value == "") {
        this.toAccount.msg = this.$t("wallet.send.cannotBeEmpty");
        this.toAccount.status = false;
        this.toAddr = "";
        this.toNickname = "";
        this.toAddrShow = false;
        this.toNicknameShow = false;
        resolve(true);
      } else if (this.sendTypeIndex == 0) {
        //  to Address
        if (!this.isAddress(this.toAccount.value)) {
          this.toAccount.msg = this.$t("wallet.send.addressWrong");
          this.toAccount.status = false;
          this.toAddrShow = false;
          this.toNicknameShow = false;
          this.toAddr = "";
          resolve(true);
        } else if (this.toAccount.value == this.walletDB.current) {
          this.toAccount.msg = this.$t("wallet.send.diffAddress");
          this.toAccount.status = false;
          this.toAddrShow = false;
          this.toNicknameShow = false;
          this.toAddr = "";
          resolve(true);
        } else {
          this.toAccount.status = true;
          this.toAccount.msg = "";
          this.toAddr = this.toAccount.value;
          // this.$http
          //   .get(this.$api.api.getUsername, {
          //     param: this.toAccount.value,
          //     isHide: 1
          //   })
          //   .then(r => {
          //     if (r.error) {
          //       this.toNickname = "";
          //       this.toAddrShow = false;
          //       this.toNicknameShow = false;
          //     } else {
          //       this.toNickname = r.msg;
          //       this.toAddrShow = false;
          //       this.toNicknameShow = true;
          //     }
          //     this.toAddr = this.toAccount.value;
          //     resolve(true);
          //   })
          //   .catch(e => {
          //     this.toNickname = "";
          //     this.toAddr = this.toAccount.value;
          //     this.toAddrShow = false;
          //     this.toNicknameShow = false;
          //     resolve(true);
          //   });
        }
      } else if (this.sendTypeIndex == 1) {
        // to Nickname
        // this.toNickname = "";
        // if (!this.isNickname(this.toAccount.value)) {
        //   this.toAccount.msg = this.$t("wallet.send.nicknameWrong");
        //   this.toAccount.status = false;
        //   this.toAddr = "";
        //   this.toAddrShow = false;
        //   this.toNicknameShow = false;
        // } else {
        //   this.$http
        //     .get(this.$api.api.getAddress, {
        //       param: this.toAccount.value,
        //       isHide: 1
        //     })
        //     .then(r => {
        //       if (r.error) {
        //         this.toAccount.msg = this.$t("wallet.send.nicknameWrong");
        //         this.toAccount.status = false;
        //         this.toAddr = "";
        //         this.toAddrShow = false;
        //         this.toNicknameShow = false;
        //       } else {
        //         this.toAccount.msg = "";
        //         this.toAccount.status = true;
        //         this.toNickname = this.toAccount.value;
        //         this.toAddr = r.msg;
        //         this.toAddrShow = true;
        //         this.toNicknameShow = false;
        //       }
        //       resolve(true);
        //     })
        //     .catch(e => {
        //       this.toAccount.msg = this.$t("wallet.send.nicknameWrong");
        //       this.toAccount.status = false;
        //       this.toAddr = "";
        //       this.toAddrShow = false;
        //       this.toNicknameShow = false;
        //       resolve(true);
        //     });
        // }
      }
      // return new Promise(resolve => {
      // });
    },

    checkCount() {
      if (!this.count.value && Number(this.count.value) == 0) {
        this.count.msg = this.$t("wallet.send.invalidAmount");
        this.count.status = false;
      } else if (Number(this.count.value) <= 0) {
        this.count.msg = this.$t("wallet.send.invalidAmount");
        this.count.status = false;
      } else if (
        Number(this.count.value) >
        this.walletDB.accounts[this.walletDB.current].balance
      ) {
        this.count.msg = this.$t("wallet.send.excessOfBalance");
        this.count.status = false;
      } else if (Number(this.count.value) < 0.000005) {
        this.count.msg = this.$t("wallet.send.amountTooSmall");
        this.count.status = false;
      } else if (
        String(this.count.value).indexOf(".") >= 0 &&
        String(this.count.value).split(".")[1].length > 8
      ) {
        this.count.msg = this.$t("wallet.send.more8decimal");
        this.count.status = false;
      } else {
        this.count.msg = "";
        this.count.status = true;
      }
    },

    next() {
      this.checktoAccount();
      this.checkCount();
      if (this.toAccount.status && this.count.status) {
        this.$refs.myLBTC.toTXcontent(this.targets);
      }
    },

    sendAll() {
      this.$refs.myLBTC.sendAll();
    },

    toQrCode() {
      this.$router.push({ path: "/qr" });
    },

    toAddrInfo() {
      this.$router.push({ path: "/mine-addrInfo", query: { fromSend: true } });
    }
  },
  destroyed() {},
  watch: {
    callBackObj(val) {
      if (val.type == 0) {
        this.count.msg = val.content;
        this.count.status = false;
      }
      if (val.type == 1) {
        this.count.value = val.content;
        this.count.status = true;
      }
    }
  }
};
</script>
