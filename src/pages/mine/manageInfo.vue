<style lang="scss" scoped>
#mine-manageInfo {
  height: 100vh;
  position: relative;
  background-color: #fff;
  .manage-header {
    color: #242a34;
    text-align: center;
    padding: 0 20px;
    background-color: #252b35;
    .header-box {
      position: relative;
      background-color: #fff;
      top: 60px;
      height: 150px;
      width: 100%;
      border-radius: 10px;
      box-shadow: 0px 10px 15px 0px rgba(51, 51, 51, 0.3);
    }
    .header-box-position {
      position: relative;
      top: -34px;
    }
    .info-photo {
      height: 68px;
    }
  }
  .info-content {
    margin-top: 60px;
    padding-top: 25px;
    .white-button {
      background: #f4f4f4;
    }
  }
  .info-balance {
    font-size: 20px;
    font-weight: 600;
    height: 36px;
    line-height: 36px;
    position: relative;
    .more-balance-content {
      padding: 15px 10px;
      width: 50%;
      position: absolute;
      font-size: 10px;
      text-align: left;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      overflow: visible;
      background-color: #eee;
      line-height: 1.5em;
    }
  }
  .more {
    font-size: 10px;
    .van-icon-arrow::before {
      transition: 0.3s;
    }
  }
  .show-more-balance {
    .van-icon-arrow::before {
      transform: rotate(90deg);
    }
  }
  .info-addr {
    padding: 5px 40px;
    color: #666;
    word-break: break-all;
    font-size: 14px;
  }
  .input-with-label-item {
    padding-left: 15px;
    padding-right: 15px;
    position: relative;
    input {
      border: none;
      color: #999;
    }
    &::after {
      content: "";
      position: absolute;
      left: 15px;
      right: 0;
      bottom: 0;
      width: auto;
      transform: scale(1, 0.5);
      transform-origin: 0 0;
      pointer-events: none;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .van-hairline--top-bottom::after {
    border-width: 0 0;
  }
  .van-popup--right .content {
    width: 100vw;
    height: 100vh;
  }
  .dialog-content-box {
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
  .input-label {
    width: 100px;
  }
  .avatarContent {
    border-radius: 10px;
    background-color: #f1f1f1;
    width: 300px;
    font-size: 14px;
    .avatarTitle {
      padding: 15px;
      color: #242a34;
    }
    .avatars {
      display: flex;
      flex-wrap: wrap;
      width: 240px;
      margin: 0 auto;
      justify-content: space-between;
      padding: 15px 0;
      .avatar {
        position: relative;
      }
      .checked {
        position: absolute;
        top: 0;
        right: 0;
        color: #385fff;
      }
      img {
        width: 50px;
      }
    }
    .avatarConfirm {
      border-top: 1px solid #ddd;
      padding: 10px;
      color: #385fff;
    }
  }
}
</style>
<template>
  <div id="mine-manageInfo" @click="showMoreBalance = false" v-if="walletDB.accounts[addr]">

    <van-nav-bar :z-index="1000" 
      :title="walletDB.accounts[addr].name"
      left-text=""
      fixed 
      left-arrow
      @click-left="$router.goBack()"
    />

    <div class="fixed-container">
      <div class="manage-header">
        <div class="header-box">
          <div class="header-box-position">
            <img class="info-photo" @click="openSelectAvatar = true" :src="'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/avatar/' + walletDB.accounts[addr].avatar + '.png'">
            <div class="info-balance" :class="showMoreBalance ? 'show-more-balance' : ''">
              <span @click.stop="moreBalance">
                {{walletDB.accounts[addr].balance/100000000}} BED 
                <!-- {{decimal(walletDB.accounts[addr].availableBalance).plus(walletDB.accounts[addr].unavailableBalance).toNumber()}} LBTC -->
              </span>
              <!-- <span @click.stop="moreBalance" class="more" v-if="walletDB.accounts[addr].unavailableBalance">
                <van-icon name="arrow" />
              </span> -->
              <!-- <div class="more-balance-content" v-if="showMoreBalance">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>{{$t('mine.manageInfo.availablebalance')}}:</td>
                    <td><span>{{walletDB.accounts[addr].availableBalance}} </span><span class="sign">LBTC</span></td>
                  </tr>
                  <tr>
                    <td>{{$t('mine.manageInfo.unavailablebalance')}}:</td>
                    <td><span>{{walletDB.accounts[addr].unavailableBalance}} </span><span class="sign">LBTC</span></td>
                  </tr>
                </table>
              </div> -->
            </div>
            <div class="info-addr">
              {{addr}}
            </div>
          </div>
        </div>
      </div>
      
      <div class="container info-content">
        <van-cell-group>
          <van-cell :title="$t('wallet0.walletName')" is-link :value="walletDB.accounts[addr].name" @click="openChangeNameDialog = true"/>
          <van-cell :title="$t('wallet0.changePass')" is-link @click="openChangePsw = true"/>
          <van-cell :title="$t('wallet0.exportPrivateKey')" is-link @click="itemClick('prv')"/>
          <van-cell :title="$t('wallet0.resync')" is-link @click="resyncData(addr)"/>
        </van-cell-group>

        <div class="input-group">
          <div class="button default-button" v-if="walletDB.accounts[addr].mnemonicWord" @click="itemClick('mnemonic')">{{$t("wallet0.backupWold")}}</div>
          <div class="button white-button" @click="itemClick('delete')">{{$t('wallet0.deleWallet')}}</div>
        </div>
      </div>
    </div>

    <van-dialog v-model="openChangeNameDialog"
      show-cancel-button 
      :confirmButtonText="$t('action.confirm')" 
      :cancelButtonText="$t('action.cancel')" 
      :before-close="onSave">
      <div class="dialog-title" style="margin-top: 28px;">{{$t('placeholder.walletName')}}</div>
      <div class="dialog-password">
        <input type="text" v-model.trim="wallet_name">
      </div>
    </van-dialog>

    <van-dialog v-model="openPassDialog"
      show-cancel-button 
      :confirmButtonText="$t('action.confirm')" 
      :cancelButtonText="$t('action.cancel')" 
      :before-close="beforePassDialogClose">
      <div class="dialog-title" style="margin-top: 28px;">{{$t('placeholder.password')}}</div>
      <div class="dialog-password">
        <input type="password" v-model.trim="psw">
      </div>
    </van-dialog>

    <van-dialog v-model="openExportDialog" 
      confirm-button-text="" 
      :show-confirm-button="false" >
      <div class="dialog-title" style="margin-top: 20px;">
        {{$t('mine.manageInfo.exportPrv')}}
        <img class="dialog-cloes" src="https://lbtc.io/wallet/static/img/close.png" @click="closeExportDialog">
      </div>
      <div class="dialog-content">
        <div class="dialog-content-box">
          {{content}}
        </div>
      </div>
      <div class="dialog-button default-color text-center" @click="doCopy(content)">
        {{$t('mine.manageInfo.copy')}}
      </div>
    </van-dialog>

    <van-popup v-model="openChangePsw" position="right">
      <div class="content">
        <van-nav-bar :z-index="1000" 
          :title="$t('mine.manageInfo.changePass')"
          fixed 
          left-arrow 
          @click-left="cloesChangePsw" 
        />
        <div class="container fixed-container container-lengthen-half">
          <div class="input-group">

            <div class="input-item" :class="{'input-item-warn': oldPsw.msg}">
              <label for="password" class="input-label" >{{$t('mine.manageInfo.oldPass')}}</label>
              <input type="password" id="password" :placeholder="$t('mine.manageInfo.oldPass')" v-model.trim="oldPsw.value" @change="oldPswChange()">
              <span class="input-warn" v-if="oldPsw.msg">{{oldPsw.msg}}</span>
            </div>

            <div class="input-item" :class="{'input-item-warn': newPsw.msg}">
              <label for="newpassword" class="input-label" >{{$t('mine.manageInfo.newPass')}}</label>
              <input type="password" id="newpassword" :placeholder="$t('mine.manageInfo.newPass')" v-model.trim="newPsw.value" @change="newPswChange()">
              <span class="input-warn" v-if="newPsw.msg">{{newPsw.msg}}</span>
            </div>

            <div class="input-item" :class="{'input-item-warn': reNewPsw.msg}">
              <label for="renewpassword" class="input-label" >{{$t('mine.manageInfo.reNewPass')}}</label>
              <input type="password" id="renewpassword" :placeholder="$t('mine.manageInfo.reNewPass')" v-model.trim="reNewPsw.value" @change="reNewPswChange()">
              <span class="input-warn" v-if="reNewPsw.msg">{{reNewPsw.msg}}</span>
            </div>
          </div>

          <div class="button default-button" @click="confirmChangePsw">{{$t('mine.manageInfo.confirmChange')}}</div>
        </div>
      </div> 
    </van-popup>

    <van-popup v-model="openSelectAvatar" class="avatarContent">
      <div>
        <div class="avatarTitle text-center">
          {{$t('mine.manageInfo.selectAvatar')}}
        </div>
        <div class="avatars">
          <div class="avatar" v-for=" i in 8" @click="avatar = i">
            <img :src="'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/avatar/' + i + '.png'">
            <van-icon class="checked" v-if="avatar == i" name="checked" />
          </div>
        </div>
        <div class="avatarConfirm text-center" @click="saveSelectAvatar">
          {{$t('action.confirm')}}
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {},
  data() {
    return {
      isLoading: false,
      showButton: true,
      addr: "",
      showMoreBalance: false,
      wallet_name: "",
      openChangeNameDialog: false,
      openPassDialog: false,
      psw: "",

      openExportDialog: false,
      type: "",
      content: "",

      openChangePsw: false,
      oldPsw: {
        value: "",
        msg: "",
        status: false
      },
      newPsw: {
        value: "",
        msg: "",
        status: false
      },
      reNewPsw: {
        value: "",
        msg: "",
        status: false
      },
      avatar: 1,
      openSelectAvatar: false
    };
  },
  computed: {},
  created() {
    this.manageInfoInit();
  },
  mounted() {},
  methods: {
    manageInfoInit() {
      this.addr = this.$route.query.addr;
      this.avatar = this.walletDB.accounts[this.addr].avatar;
      this.wallet_name = this.walletDB.accounts[this.addr].name;
    },

    onSave(action, done) {
      if (action == "confirm") {
        if (this.wallet_name == "") {
          Toast({
            duration: 1500,
            message: this.$t("warn.noEmpty")
          });
          done();
          this.wallet_name = this.walletDB.accounts[this.addr].name;
        } else if (this.wallet_name == this.walletDB.accounts[this.addr].name) {
          Toast({
            duration: 1500,
            message: this.$t("warn.noSame")
          });
          done();
          this.wallet_name = this.walletDB.accounts[this.addr].name;
        } else {
          this.WalletDB.changeName(this.addr, this.wallet_name);
          this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
            this.manageInfoInit();
            Toast.success({
              duration: 1500,
              message: this.$t("mine.manageInfo.msg1")
            });
            done();
          });
        }
      } else {
        done();
        this.wallet_name = this.walletDB.accounts[this.addr].name;
      }
    },

    itemClick(type) {
      this.openPassDialog = true;
      this.type = type;
    },

    beforePassDialogClose(action, done) {
      if (action == "confirm") {
        if (this.psw == this.walletDB.accounts[this.addr].password) {
          if (this.type == "prv") {
            this.content = this.walletDB.accounts[this.addr].privateKey;
            done();
            this.openExportDialog = true;
          } else if (this.type == "mnemonic") {
            done();
            this.$router.push({
              path: "/create-mnemonic",
              query: {
                wallet_info: JSON.stringify(this.walletDB.accounts[this.addr]),
                from: "manageInfo"
              }
            });
          } else if (this.type == "delete") {
            this.WalletDB.deleteaccount(this.addr);
            Toast.success({
              duration: 1500,
              message: this.$t("mine.manageInfo.msg2")
            });
            this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
              if (this.walletDB.current) {
                this.$router.push({ path: "/mine-manage" });
              } else {
                this.$router.push({ path: "/create-index" });
              }
            });
          }
          this.psw = "";
        } else {
          Toast.fail({
            duration: 1000,
            message: this.$t("mine.manageInfo.msg3")
          });
          this.psw = "";
          done(false);
        }
      } else {
        this.psw = "";
        done();
      }
    },

    closeExportDialog() {
      this.openExportDialog = false;
      this.content = "";
    },

    awaitT() {
      return new Promise(resolve => {
        this.$http.get(this.$api.api.getHeight).then(r => {
          resolve(r.height);
        });
      });
    },

    resyncData(address) {
      this.$dialog
        .confirm({
          title: this.$t("mine.manageInfo.confirmResync"),
          cancelButtonText: this.$t("action.cancel"),
          confirmButtonText: this.$t("action.confirm")
        })
        .then(() => {
          // on confirm
          this.$store.commit("setUpdataStatus", false);
          Toast.loading({
            duration: 0,
            mask: true,
            message: this.$t("import.msg3")
          });

          this.$store
            .dispatch("getWalletTxs", {
              address: address,
              currentHeight: 1
            })
            .then(data => {
              this.WalletDB.accounts[address].history = [];
              this.WalletDB.accounts[address].availableTxs = [];
              this.WalletDB.accounts[address].availableBalance = 0;
              this.WalletDB.accounts[address].unavailableTxs = [];
              this.WalletDB.accounts[address].unavailableBalance = 0;

              this.WalletDB.insertHistroy(address, data);
              this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
                Toast.clear();
                this.$store.commit("setUpdataStatus", true);
              });
            });
        })
        .catch(() => {
          // on cancel
        });
    },

    doCopy(e) {
      // is app
      if (window.plus && this.isplusReady) {
        this.appClipbordText(e).then(
          r => {
            Toast.success({
              duration: 1500,
              message: this.$t("mine.txHisInfo.title7")
            });
          },
          err => {
            Toast.fail({
              duration: 1500,
              message: this.$t("mine.txHisInfo.title8")
            });
          }
        );
        // is h5
      } else {
        this.$copyText(e).then(
          r => {
            Toast.success({
              duration: 1500,
              message: this.$t("mine.txHisInfo.title7")
            });
          },
          err => {
            Toast.fail({
              duration: 1500,
              message: this.$t("mine.txHisInfo.title8")
            });
          }
        );
      }
    },

    cloesChangePsw() {
      this.openChangePsw = false;
      this.oldPsw = {
        value: "",
        msg: "",
        status: false
      };
      this.newPsw = {
        value: "",
        msg: "",
        status: false
      };
      this.reNewPsw = {
        value: "",
        msg: "",
        status: false
      };
    },

    oldPswChange() {
      if (this.oldPsw.value == "") {
        this.oldPsw.msg = this.$t("mine.manageInfo.msg6");
        this.oldPsw.status = false;
      } else {
        this.oldPsw.msg = "";
        this.oldPsw.status = true;
      }
    },

    newPswChange() {
      var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/);
      if (this.newPsw.value == "") {
        this.newPsw.msg = this.$t("create.create.walletPasswordMsg1");
        this.newPsw.status = false;
      } else if (reg.test(this.newPsw.value)) {
        this.newPsw.msg = "";
        this.newPsw.status = true;
      } else {
        this.newPsw.msg = this.$t("create.create.walletPasswordMsg2");
        this.newPsw.status = false;
      }
      this.reNewPswChange();
    },

    reNewPswChange() {
      if (this.newPsw.value == this.reNewPsw.value) {
        this.reNewPsw.msg = "";
        this.reNewPsw.status = true;
      } else {
        this.reNewPsw.msg = this.$t("create.create.reWalletPasswordMsg");
        this.reNewPsw.status = false;
      }
    },

    confirmChangePsw() {
      this.oldPswChange();
      this.newPswChange();
      this.reNewPswChange();
      if (!this.oldPsw.status || !this.newPsw.status || !this.reNewPsw.status) {
        return false;
      }
      if (this.oldPsw.value != this.walletDB.accounts[this.addr].password) {
        Toast.fail({
          duration: 1500,
          message: this.$t("mine.manageInfo.msg9")
        });
        return false;
      }
      if (this.newPsw.value == this.walletDB.accounts[this.addr].password) {
        Toast.fail({
          duration: 1500,
          message: this.$t("mine.manageInfo.msg10")
        });
        return false;
      }
      this.WalletDB.changePassword(this.addr, this.newPsw.value);
      this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
        this.manageInfoInit();
        Toast.success({
          duration: 1500,
          message: this.$t("mine.manageInfo.msg11")
        });
        setTimeout(() => {
          this.cloesChangePsw();
        }, 500);
      });
    },

    moreBalance() {
      if (this.walletDB.accounts[this.addr].unavailableBalance) {
        this.showMoreBalance = !this.showMoreBalance;
      } else {
        return false;
      }
    },

    saveSelectAvatar() {
      if (this.avatar == this.walletDB.accounts[this.addr].avatar) {
        this.openSelectAvatar = false;
        return false;
      }
      this.WalletDB.changeAvatar(this.addr, this.avatar);
      this.$store.dispatch("saveWalletDB", this.WalletDB).then(r => {
        this.manageInfoInit();
        this.openSelectAvatar = false;
        Toast.success({
          duration: 1500,
          message: this.$t("mine.manageInfo.msg1")
        });
      });
    }
  },
  destroyed() {},
  beforeRouteLeave(to, from, next) {
    this.$dialog.close();
    next();
  }
};
</script>
