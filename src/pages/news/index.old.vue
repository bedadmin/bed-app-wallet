<style lang="scss" scoped>
#news-index {
  .content {
    padding: 0 20px 14px;
  }
  .CHeight {
    height: calc(100vh - 98px);
  }
}
</style>

<template>
  <div id="news-index">

    <van-tabs class="oneTag" v-model="action" :line-width="75" sticky :offset-top="0">
      <van-tab :title="$t('news.topLevelChannel.news')">
        <keep-alive>
          <component is="news" class="CHeight"></component>
        </keep-alive>
      </van-tab>

      <van-tab :title="$t('news.topLevelChannel.lbtc')">
        <keep-alive>
          <component is="lbtc" class="CHeight"></component>
        </keep-alive>
      </van-tab>
    </van-tabs>
  
  </div>

</template>

<script>
import News from "./news.vue";
import Lbtc from "./lbtc.vue";
import Items from "./items.vue";
export default {
  components: {
    News,
    Lbtc,
    Items
  },
  props: {},
  data() {
    return {
      action: 0
    };
  },
  computed: {
    indexAction() {
      return this.$store.state.news.indexAction;
    }
  },
  created() {
    this.action = this.indexAction;
  },
  watch: {
    action(newVal, oldVal) {
      this.$store.commit("setIndexAction", {
        type: newVal
      });
    }
  },
};
</script>