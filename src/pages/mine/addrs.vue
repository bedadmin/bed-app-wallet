<style lang="scss" scoped>
#mine-addrs {
  height: 100vh;
  background-color: #fff;
  .addrs-title {
    padding: 12px 0;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid #999;
  }

  /* addrs */
  .addr-cell-group {
    .cell-item {
      padding: 20px 15px 15px;
      .cell-logo {
        width: 38px;
        height: 38px;
      }
      .label {
        color: #3A4054;
        margin-top: 6px
      }
    }
  }
}
</style>
<template>
  <div id="mine-addrs">
    <van-nav-bar
      :z-index="1000"
      :title="$t('wallet0.addressBook')"
      fixed
      left-text
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/addr-add.png" slot="right">
    </van-nav-bar>

    <scroller
      class="fixed-container"
      :on-refresh="refresh"
      :refreshText="$t('main.refresh')"
      :noDataText="$t('main.noMoreData')"
      ref="myscroller"
    >
      <div class="text-center f666 nodata" style="font-size: 14px;" v-if="noAddrs">
        <img class="nodata" src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/noaddr.png" />
        {{$t('msg.noaddr')}}
      </div>

      <div class="cell-group addr-cell-group" v-if="!noAddrs">
        <div class="cell-item underline" v-for="(item, index) in addrs" @click="toAddrInfo(item)">
          <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/position.png" class="cell-logo" />
          <div class="cell-content">
            <div class="title ellipsis">{{item.name}}</div>
            <div class="label ellipsis hash">{{item.addr}}</div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {},
  data() {
    return {
      address: "",
      noAddrs: false,
      showAddrs: false,
      showConfirmInfo: false,
      addrs: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.addrsInit();
  },
  methods: {
    addrsInit() {
      setTimeout(() => {
        Toast.clear();
      }, 1000);
      this.localforage.getItem("addrs").then(addrs => {
        if (addrs && addrs.length > 0) {
          this.addrs = addrs;
          this.noAddrs = false;
        } else {
          this.addrs = [];
          this.noAddrs = true;
        }
      });
    },

    onClickLeft() {
      this.$router.replace({ path: "/main-index/mine" });
    },

    onClickRight() {
      this.$router.push({ path: "/mine-addrInfo" });
    },

    toAddrInfo(params) {
      this.$router.push({
        path: "/mine-addrInfo",
        query: { id: params.id, name: params.name, addr: params.addr, other: params.other }
      });
    },

    refresh(done) {
      this.addrsInit();
      setTimeout(() => {
        done();
      }, 1000);
    }
  }
};
</script>