<style lang="scss" scoped>
#mine-help {
}
</style>
<template>
  <div id="mine-help">
    <van-nav-bar :z-index="1000" :title="$t('mine.help.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="fixed-container">
      <!-- <van-collapse v-model="activeName">
        <van-collapse-item v-for="(item, index) in items" :title="item.title" :name="item.id" :key="item.title">
          {{item.content}}
        </van-collapse-item>
      </van-collapse> -->
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      activeName: [1],
      items: []
    };
  },
  computed: {},
  created() {
    this.items = this.$t("mine.help.items");
  }
};
</script>
