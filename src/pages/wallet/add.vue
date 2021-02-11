<style lang="scss" scoped>
#wallet-add {
  .cell-group {
    .label {
      font-size: 12px;
      color: #999;
    }
    .cell-function {
      flex: 0;
    }
  }
}
</style>
<template>
  <div id="wallet-add">
    <van-nav-bar :z-index="1000" 
      :title="$t('wallet.add.navTitle')"
      left-arrow
      fixed
      @click-left="$router.goBack()"
    />
    <div class="container fixed-container">
      <div class="cell-group">
        <div class="cell-item underline" v-for="(item, index) in saveTokenList">
          <img class="cell-logo" :src="'https://lbtc.io/wallet/static/img/coin-olbtc.png'">
          <div class="cell-content">
            <div class="title">{{item.tokenSymbol}}</div>
            <div class="label">{{item.tokenName}}</div>
            <div class="label">{{item.tokenAddress | formatHash}}</div>
          </div>
          <div class="cell-function">
            <van-switch
              :value="saveOwnToken[item.tokenAddress]"
              :loading="item.loading"
              size="24px"
              active-color="#1D5AA3"
              inactive-color="#fff"
              @input="onInput(index, item.tokenAddress)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Dialog } from "vant";

export default {
  components: {},
  props: {},
  data() {
    return {
      current_wallet: "",
      myToken: {},
      token: []
    };
  },
  computed: {
    saveCurrentWallet() {
      return this.$store.state.wallet.saveCurrentWallet;
    },
    saveTokenList() {
      return this.$store.state.wallet.saveTokenList;
    },
    saveOwnToken() {
      return this.$store.state.wallet.saveOwnToken;
    }
  },
  created() {
    this.walletAddInit();
  },
  mounted() {},
  methods: {
    walletAddInit() {
      this.$http.get(this.$api.api.gettokeninfo).then(list => {
        if (!list.error) {
          if (JSON.stringify(list.msg) != JSON.stringify(this.saveTokenList) || !this.saveTokenList) {
            list.msg.forEach((item, index) => {
              item.loading = false;
            });
            this.$store.dispatch("localTokenList", list.msg);
          }
        }
      });
    },

    onInput(index, tokenAddress) {
      if (!this.saveTokenList[index].loading) {
        this.saveTokenList[index].loading = true;
        window.setTimeout( () => {
          if (this.saveOwnToken[tokenAddress]) {
            delete this.saveOwnToken[tokenAddress]
          } else {
            this.saveOwnToken[tokenAddress] = true;
          }
          this.$store.dispatch('localOwnToken', {
            current: this.saveCurrentWallet,
            ownToken: this.saveOwnToken
          })
          this.saveTokenList[index].loading = false;
        }, 200)
      }
    }
  },
  destroyed() {},
  watch: {
    $route: function(to, from) {}
  }
};
</script>