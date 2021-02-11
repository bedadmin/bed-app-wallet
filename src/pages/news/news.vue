<style lang="scss" scoped>
#news-news {
  position: relative;
  .news-nav {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    box-shadow: 0px 3px 6px -1px rgba(29, 90, 163, 0.23);
    background: #fff;
    padding: 0 6px;
    .news-nav-item {
      flex: 1;
      line-height: 32px;
      font-size: 14px;
      text-align: center;
      color: #999;
    }
    .news-nav-item-action {
      color: #333;
      font-weight: bold;
    }
  }
  .swiper-box {
    width: 100%;
    height: 100%;
    z-index: 0;
    padding-top: 32px;
    .swiper-slide {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .content {
    padding: 0 20px 14px;
  }
}
</style>

<template>
  <div id="news-news">

    <div class="news-nav">
      <div class="news-nav-item" v-for="(c, index) in newsChannels" :class="{'news-nav-item-action' : newsIndexAction.name == c.class}" :title="c.name" :key="c.name"  @click.stop="newsNavClick(c.class, index)">{{c.name, index}}</div>
    </div>

    <swiper :options="swiperOption" class="swiper-box" ref="myNewsSwiper">
      <swiper-slide v-for='(item, index) in newsChannels' :key='index'>
          <component is="items" v-model="item.class"></component>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>
import Items from "./items.vue";
export default {
  components: {
    Items
  },
  props: {},
  data() {
    return {
      newsActive: 0,
      newsChannels: [],
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        resistanceRatio: 0.65,
        on: {
          sliderMove: () => {
            this.$store.commit('setIsSwiper', true);
          },
          touchEnd: () => {
            this.$store.commit('setIsSwiper', false);
          },
          slideChange: () => {
            this.$store.commit("setNewsIndexAction", {
              name: this.newsChannels[
                this.$refs.myNewsSwiper.swiper.activeIndex
              ].class,
              index: this.$refs.myNewsSwiper.swiper.activeIndex
            });
          },
        }
      }
    };
  },
  computed: {
    newsIndexAction() {
      return this.$store.state.news.newsIndexAction;
    }
  },
  created() {
    this.newsInit();
  },
  mounted() {
    this.slideTo(this.newsIndexAction.index, 0);
  },
  activated() {},
  methods: {
    newsInit() {
      this.newsChannels = this.$t("news.secondLevelChannel.news");
    },

    newsNavClick(name, index) {
      this.$store.commit("setNewsIndexAction", {
        name: name,
        index: index
      });
      this.slideTo(index, 300);
    },

    slideTo(index, second) {
      this.$refs.myNewsSwiper.swiper.slideTo(index, second, true); 
    }
  }
};
</script>