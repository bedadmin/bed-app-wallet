<style lang="scss" scoped>
#mine-about {
  .about-header {
    text-align: center;
    padding-top: 30px;
    img {
      height: 100px;
    }
    .version {
      color: #666;
      font-size: 14px;
      font-weight: 600;
      padding: 5px 0;
    }
    .about-introduction {
      color: #999;
      font-size: 13px;
      padding: 5px 30px 30px;
    }
  }
  .van-popup--right {
    width: 100%;
    height: 100%;
  }
  .term-content {
    p {
      font-size: 12px;
      letter-spacing: 0.5px;
    }
  }
  .version-content,
  .term-content {
    height: 100vh;
    overflow-y: auto;
  }
  .version-content {
    p {
      font-size: 14px;
      letter-spacing: 0.5px;
      font-weight: bold;
    }
    ul {
      margin-left: 30px;
      list-style-type: disc;
      color: #333;
      font-size: 14px;
      li {
        word-break: break-all;
      }
    }
  }

  .about-logo {
    height: 120px;
    background-color: #252b35;
    background-image: url("https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/icons/about.png");
    background-size: 100% 100%;
    img {
      height: 120px;
      width: auto;
      position: relative;
      top: 65px;
    }
  }
  .about-content {
    padding: 60px 20px 20px;
    margin-bottom: 10px;
    background-color: #fff;
    color: #3a4054;
    font-size: 14px;
    .top-title {
      font-size: 15px;
    }
  }
}
</style>
<template>
  <div id="mine-about">
    <van-nav-bar :z-index="1000" :title="$t('mine.about.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="fixed-container">

      <div class="about-logo">
        <img src="http://explorer.bed-coin.com/bed-logo.png" alt="">
      </div>

      <div class="about-content">
        <div class="top-title">
          <span>{{$t('mine.about.currentVersion')}} v{{currrntVersion}}</span>
        </div>
        <div>
          {{$t('mine.about.about')}}
        </div>
      </div>

      <van-cell-group>
        <van-cell :title="$t('mine.about.term')" is-link @click="openTerms = true"/>
        <van-cell :title="$t('mine.about.versionLog')" is-link @click="openVersionLog = true"/>
        <!-- <van-cell :title="$t('mine.about.errorLog')" is-link @click="openErrorLog = true"/> -->
        <!-- <van-cell :title="$t('mine.about.network')" :value="wConfig.network == 'bitcoin' ? 'Mainnet' : 'Testnet'" /> -->
        <!-- <van-cell :title="$t('mine.about.checkVersion')" @click="checkVersion" is-link :value="'v' + currrntVersion"/> -->
      </van-cell-group>
    </div>

    <!-- Term -->
    <van-popup v-model="openTerms" position="right">
      <van-nav-bar :z-index="1000" 
        :title="$t('create.create.termTitle')"
        left-arrow
        fixed 
        @click-left="openTerms = false"
      />
      <div class="fixed-container term-content">
        <term />
      </div>
    </van-popup>

    <!-- Version Log -->
    <van-popup v-model="openVersionLog" position="right">
      <van-nav-bar :z-index="1000" 
        :title="$t('mine.about.versionLog')"
        left-arrow
        fixed 
        @click-left="openVersionLog = false"
      />
      <div class="container fixed-container version-content">
        <div v-for="item in logContent">
          <p>{{item.version}}</p>
          <ul>
            <li v-for="l in item.content">{{l}}</li>
          </ul>
        </div>
        <br>
      </div>
    </van-popup>

    <!-- Error Log -->
    <van-popup v-model="openErrorLog" position="right">
      <van-nav-bar :z-index="1000" 
        :title="$t('mine.about.errorLog')"
        left-arrow
        fixed 
        @click-left="openErrorLog = false"
      />
      <div class="container fixed-container version-content">
        <div v-for="item in localeLog" v-if="localeLog.length">
          <p>{{item.time}}</p>
          <ul>
            <li v-if="item.number">Number: {{item.number}}</li>
            <li v-if="item.status">Status: {{item.status}}</li>
            <li v-if="item.statusText">StatusText: {{item.statusText}}</li>
            <li v-if="item.url">URL: {{item.url}}</li>
            <li v-if="item.msg">Msg: {{item.msg}}</li>
          </ul>
        </div>
        <div class="text-center f666" v-if="!localeLog.length">
          <img class="nodata" src="https://lbtc.io/wallet/static/img/nodata.png">
          {{$t('main.noData')}}
        </div>
        <br>
      </div>
    </van-popup>

  </div>
</template>

<script>
import term from "../../components/term.vue";
import { Toast } from "vant";

export default {
  components: {
    term
  },
  props: {},
  data() {
    return {
      currrntVersion: "",
      termContent: "",
      logContent: "",
      localeLog: "",
      activeName: 0,
      openTerms: false,
      openVersionLog: false,
      openErrorLog: false
    };
  },
  computed: {},
  created() {
    this.currrntVersion = this.wConfig.version;
    this.termContent = this.wConfig.terms;
    this.logContent = this.$t("versionLog");
    this.localeLog = localStorage.getItem("Log")
      ? JSON.parse(localStorage.getItem("Log")).reverse()
      : [];
  },
  mounted() {},
  methods: {
    checkVersion() {
      Toast.loading({
        mask: true,
        message: this.$t("mine.about.checkVersionLoading")
      });
      this.$http
        .get(this.$api.api.getversion, {
          param: "getversion"
        })
        .then(res => {
          this.vData = res;
          if (this.versionCompare(this.vData.version, this.wConfig.version)) {
            this.openDialog();
          } else {
            window.setTimeout(() => {
              Toast({
                duration: 1500,
                message: this.$t("mine.about.checkVersionMsg1")
              });
            }, 500);
          }
        });
    },

    openDialog() {
      this.$dialog
        .confirm({
          title: this.$t("main.updataTitle"),
          message: this.$t("main.updataMessage"),
          confirmButtonText: this.$t("main.confirmButtonText"),
          cancelButtonText: this.$t("main.cancelButtonText")
        })
        .then(() => {
          // on confirm
          plus.runtime.openURL("https://lbtc.io/m-download.html");
          plus.runtime.quit();
        })
        .catch(() => {
          if (this.vData.flag == "1") {
            plus.runtime.quit();
          }
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
