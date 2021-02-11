<style lang="scss" scoped>
#mine-addrInfo {
  .button {
    margin-top: 15px;
  }
  .input-label {
    min-width: 60px;
  }
}
</style>
<template>
  <div id="mine-addrInfo">
    <van-nav-bar :z-index="1000" 
      :title="$t('mine.addrInfo.navTitle')"
      fixed 
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="container fixed-container container-lengthen-half">

      <form>
        <div class="input-group">
          <div class="input-item">
            <label for="name" class="input-label" >{{$t('wallet0.nickname')}}</label>
            <input type="text" id="name" :placeholder="$t('placeholder.nickname')" v-model.trim="name"  @change="checkNickname">
          </div>

          <div class="input-item" :class="{'input-item-warn': msg}">
            <label for="address" class="input-label">{{$t('wallet0.address')}}</label>
            <input type="text" id="address" :placeholder="$t('placeholder.address')" v-model.trim="addr" @change="checktoAddr">
            <span class="input-warn" v-if="msg">{{msg}}</span>
          </div>

          <div class="input-item">
            <label for="memo" class="input-label">{{$t('wallet0.memo')}}</label>
            <input type="text" id="memo" :placeholder="$t('placeholder.memo')" v-model.trim="other">
          </div>
        </div>

        <div style="padding-top: 20px;">
          <div class="button default-button" @click="saveAddr">{{bottonContent}}</div>
          <div class="button white-button" @click="deleAddr" v-if="buttonType == 2">{{$t('wallet0.delete')}}</div>
        </div>
      </form>
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
      buttonType: 1,
      bottonContent: "",
      addrs: [],
      id: "",
      addr: "",
      name: "",
      other: "",
      msg: "",
      isFromSend: false
    };
  },
  computed: {},

  created() {
    this.addrInfoInit();
  },
  mounted() {},
  methods: {
    onClickLeft() {
      if (this.isFromSend) {
        this.$router.replace({ path: "/wallet-send" });
      } else {
        this.$router.replace({ path: "/mine-addrs" });
      }
    },

    addrInfoInit() {
      this.localforage.getItem("addrs").then(addrs => {
        if (addrs) {
          this.addrs = addrs;
        } else {
          this.addrs = [];
        }
      });
      if (this.isEmptyObject(this.$route.query)) {
        this.name = "";
        this.addr = "";
        this.other = "";
        this.buttonType = 1;
        this.bottonContent = this.$t("mine.addrInfo.bottonContent1");
      } else {
        if (this.$route.query.fromSend) {
          this.isFromSend = this.$route.query.fromSend;
          this.buttonType = 1;
          this.bottonContent = this.$t("mine.addrInfo.bottonContent1");
        } else {
          this.id = this.$route.query.id;
          this.addr = this.$route.query.addr;
          this.name = this.$route.query.name;
          this.other = this.$route.query.other;
          this.buttonType = 2;
          this.bottonContent = this.$t("mine.addrInfo.bottonContent2");
        }
      }
    },

    checktoAddr() {
      if (this.addr == "") {
        this.msg = this.$t("mine.addrInfo.msg2");
      } else if (!this.isAddress(this.addr)) {
        this.msg = this.$t("mine.addrInfo.msg3");
      } else {
        this.msg = "";
        // this.$http.get(this.$api.api.getUsername, { param: this.addr, isHide: 1 }).then( r => {
        //   if (r.error) {
        //     if (!this.id) {
        //       this.id = this.getID();
        //     }
        //     this.name = 'Nickname_' + this.id;
        //   } else {
        //     this.name = r.msg;
        //   }
        //   this.msg = '';
        //   resolve(true)
        // }).catch( e => {
        //   if (!this.id) {
        //     this.id = this.getID();
        //   }
        //   this.name = 'Nickname_' + this.id;
        //   this.msg = '';
        //   resolve(true)
        // })
      }
      // return new Promise((resolve) => {
      // })
    },

    checkNickname() {
      return new Promise(resolve => {
        if (this.isNickname(this.name)) {
          this.$http
            .get(this.$api.api.getAddress, { param: this.name, isHide: 1 })
            .then(r => {
              if (r.error) {
                this.addr = "";
              } else {
                this.addr = r.msg;
              }
              resolve(true);
            })
            .catch(e => {
              this.addr = "";
              resolve(true);
            });
        } else {
          this.addr = "";
        }
      });
    },

    saveAddr() {
      this.checktoAddr();
      if (this.msg) {
        Toast.clear();
        return;
      }

      if (this.buttonType == 1) {
        // Add
        if (!this.id) {
          this.id = this.getID();
        }
        this.addrs.push({
          id: this.id,
          addr: this.addr,
          name: this.name,
          other: this.other
        });
      }

      if (this.buttonType == 2) {
        // Modify
        for (let i = 0; i < this.addrs.length; i++) {
          const element = this.addrs[i];
          if (this.id == element.id) {
            console.log(element);
            element.addr = this.addr;
            element.name = this.name;
            element.other = this.other;
          }
        }
      }

      this.localforage
        .setItem("addrs", this.addrs)
        .then(res => {
          if (res) {
            if (this.buttonType == 1) {
              // Save addr
              Toast.success({
                duration: 1500,
                message: this.$t("mine.addrInfo.msg4")
              });
            }
            if (this.buttonType == 2) {
              // Modify Addr
              Toast.success({
                duration: 1500,
                message: this.$t("mine.addrInfo.msg6")
              });
            }
            if (this.isFromSend) {
              this.$router.replace({
                path: "/wallet-send",
                query: { toaddr: this.addr }
              });
              return false;
            } else {
              this.$router.replace({ path: "/mine-addrs" });
              return false;
            }
          }
        })
        .catch(error => {
          if (this.buttonType == 1) {
            // Save addr
            Toast.fail({
              duration: 1500,
              message: this.$t("mine.addrInfo.msg5")
            });
          }

          if (this.buttonType == 2) {
            // Modify Addr
            Toast.fail({
              duration: 1500,
              message: this.$t("mine.addrInfo.msg7")
            });
          }
        });
    },

    deleAddr() {
      this.$dialog
        .confirm({
          title: this.$t("mine.addrInfo.dialogTitle"),
          message: this.$t("mine.addrInfo.dialogContent"),
          confirmButtonText: this.$t("create.packup.confirmButtonText"),
          cancelButtonText: this.$t("create.packup.cancelButtonText")
        })
        .then(() => {
          for (let i = 0; i < this.addrs.length; i++) {
            const element = this.addrs[i];
            if (this.id == element.id) {
              this.addrs.splice(i, 1);
              break;
            }
          }
          this.localforage
            .setItem("addrs", this.addrs)
            .then(res => {
              if (res) {
                Toast.success({
                  duration: 1500,
                  message: this.$t("mine.addrInfo.msg8")
                });
                if (this.isFromSend) {
                  this.$router.replace({ path: "/wallet-send" });
                  return false;
                } else {
                  this.$router.replace({ path: "/mine-addrs" });
                  return false;
                }
              }
            })
            .catch(error => {
              Toast.fail({
                duration: 1500,
                message: this.$t("mine.addrInfo.msg9")
              });
            });
        })
        .catch(() => {
          return false;
        });
    },

    getID() {
      return Number(
        Math.floor(Math.random() * 10 + 1).toString() +
          (Date.parse(new Date()) / 1000).toString()
      ).toString(36);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$dialog.close();
    next();
  }
};
</script>
