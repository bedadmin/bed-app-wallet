<style lang="scss" scoped>
.mine-set {
  height: 100vh;
  background-color: #fff;
}
</style>
<template>
  <div class="mine-set">
    <van-nav-bar :z-index="1000" :title="$t('mine.set.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="container fixed-container">
      <van-cell-group>
        <van-cell :title="$t('mine.set.lang')" :value="$t('mine.set.langType')" @click="openLang = true" />
      </van-cell-group>
      <van-cell-group>
        <van-cell :title="$t('mine.set.server')" :value="baseurl" @click="openSetServer = true" />
      </van-cell-group>
    </div>

    <van-actionsheet
      v-model="openLang"
      :actions="langActions"
      @select="onSelect"
    />

    <van-dialog v-model="openSetServer"
      show-cancel-button 
      :confirmButtonText="$t('action.confirm')" 
      :cancelButtonText="$t('action.cancel')" 
      :before-close="setServerOnClose">
      <div class="dialog-title" style="margin-top: 28px;">{{$t('placeholder.server')}}</div>
      <div class="dialog-password">
        <input type="text" v-model.trim="setServerInput">
      </div>
    </van-dialog>

  </div>
</template>

<script>
import $api from "../../factory/libs/api";
import QrcodeVue from "qrcode.vue";
import { Toast } from "vant";
export default {
  components: {
    QrcodeVue
  },
  props: {},
  data() {
    return {
      openLang: false,
      current_lang: "",
      langActions: [
        {
          name: "中文",
          type: "zh"
        },
        {
          name: "English",
          type: "en"
        }
      ],
      openSetServer: false,
      setServerInput: "",
      baseurl: ""
    };
  },
  computed: {
    currentHisAddress() {
      return this.$store.state.currentHisAddress;
    }
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.baseurl = localStorage.getItem("baseUrl") || $api.baseURL;
      this.setServerInput = this.baseurl;
    },

    onSelect(item) {
      let locale = this.$i18n.locale;
      if (locale != item.type) {
        this.$i18n.locale = item.type;
        localStorage.setItem("locale", item.type);
      }
      this.openLang = false;
    },

    setServerOnClose(action, done) {
      if (action == "confirm") {
        localStorage.setItem("baseUrl", this.setServerInput);
        this.init();
        this.setServerInput = "";
        this.openSetServer = false;
        window.location.reload();
      } else {
        done();
      }
    }
  }
};
</script>
