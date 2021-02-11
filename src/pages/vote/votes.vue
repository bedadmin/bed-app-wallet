<style lang="scss" scoped>
#vote-votes {
  .content {
    padding: 15px 0;
    font-size: 12px;
    color: #666;
    overflow: auto;
    .tag {
      margin: 2px 4px;
      float: left;
      height: 24px;
      line-height: 24px;
    }
  }
}
</style>
<template>
  <div id="vote-votes">
    <van-nav-bar :z-index="1000" :title="$t('vote.votes.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="container fixed-container">
      <div class="content">
        <div class="tag" v-for="item in votesList">
          {{item.name ? item.name : item.address}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { Toast } from "vant";
export default {
  components: {
    QrcodeVue
  },
  props: {},
  data() {
    return {
      showNum: false,
      votesList: []
    };
  },
  computed: {},
  created() {
    this.votesInit();
  },
  mounted() {},
  methods: {
    votesInit() {
      this.votesList = JSON.parse(this.$route.query.votes);
    }
  }
};
</script>