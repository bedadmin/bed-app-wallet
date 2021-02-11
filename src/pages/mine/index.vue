<style lang="scss" scoped>
#mine-index {
  height: 100vh;
  background-color: #fff;
  .mine-header {
    padding: 0 20px;
    background-color: #252b35;
    background-image: url("https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/mine-banner.png");
    background-size: cover;
    position: relative;
    color: #fff;
    .mine-top {
      display: flex;
      align-items: center;
      padding: 30px 0;
      .mine-photo {
        height: 48px;
        width: 48px;
        img {
          height: 100%;
        }
      }
      .mine-name {
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 50vw;
        padding: 0 20px 0 10px;
      }
    }
    .mine-action {
      display: flex;
      align-items: center;
      padding: 10px 0 28px;
      font-size: 14px;
      a {
        color: #fff;
      }
      img {
        height: 32px;
        margin-bottom: 2px;
      }
      .action-middle {
        height: 20px;
        width: 1px;
        margin: 0 30px;
        background-color: #666;
      }
    }
  }
  .mine-content {
    padding-top: 10px;
  }
  .cell-group {
    font-size: 14px;
    .cell-item {
      color: #666;
      display: flex;
      align-items: center;
      .cell-content {
        flex: 1;
      }
      .cell-link {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
<template>
  <div id="mine-index" v-if="walletDB && walletDB.current">
    <div class="mine-header">

      <div class="mine-top" @click="toWalletInfo">
        <div class="mine-photo">
          <img :src="'https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/avatar/' + walletDB.accounts[walletDB.current].avatar + '.png'">
        </div>
        <div class="mine-name">{{walletDB.accounts[walletDB.current].name}}</div>
        <div>
          <van-icon name="arrow" style="top: 3px;" />
        </div>
      </div>
      <div class="mine-action">
        <div class="action-left">
          <router-link to="/mine-manage">
            <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/wallet-manage.png">
            <div>{{$t('mine.index.manager')}}</div>
          </router-link>
        </div>

        <div class="action-middle"></div>

        <div class="action-right">
          <router-link :to="{path: '/wallet-coin-history', query: { coin: 'BED'}}">
            <img src="https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/wallet-history.png">
            <div>{{$t('mine.index.his')}}</div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="mine-content container">
      <div class="cell-group">
        <router-link to="/mine-addrs">
          <div class="cell-item underline">
            <div class="cell-content">{{$t('wallet0.addressBook')}}</div>
            <div class="cell-link">
              <van-icon name="arrow"/>
            </div>
          </div>
        </router-link>
        <router-link to="/mine-set">
          <div class="cell-item underline">
            <div class="cell-content">{{$t('mine.index.set')}}</div>
            <div class="cell-link">
              <van-icon name="arrow"/>
            </div>
          </div>
        </router-link>
        <router-link to="/mine-help">
          <div class="cell-item underline">
            <div class="cell-content">{{$t('mine.index.help')}}</div>
            <div class="cell-link">
              <van-icon name="arrow"/>
            </div>
          </div>
        </router-link>
        <router-link to="/mine-about">
          <div class="cell-item underline">
            <div class="cell-content">{{$t('mine.index.about')}}</div>
            <div class="cell-link">
              <van-icon name="arrow"/>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toWalletInfo() {
      this.$router.push({
        path: "/mine-manageInfo",
        query: { addr: this.WalletDB.current }
      });
    }
  }
};
</script>
