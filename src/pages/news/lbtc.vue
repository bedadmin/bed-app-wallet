<style lang="scss" scoped>
#news-lbtc {
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
      -webkit-overflow-scrolling: touch;
      overflow-y: scroll;
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
  <div id="news-lbtc">
    
    <div class="news-nav">
      <div class="news-nav-item" v-for="(c, index) in lbtcChannels" :class="{'news-nav-item-action' : lbtcIndexAction.name == c.class}" :title="c.name" :key="c.name"  @click.stop="newsNavClick(c.class, index)">{{c.name, index}}</div>
    </div>

    <swiper :options="swiperOption" class="swiper-box" ref="myLbtcSwiper">
      <swiper-slide v-for='(item, index) in lbtcChannels' :key='index'>
          <component class="items" is="items" v-model="item.class"></component>
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
      lbtcAction: 0,
      lbtcChannels: [],
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        resistanceRatio: 0.65,
        on: {
          sliderMove: () => {
            this.$store.commit('setIsSwiper', true)
          },
          touchEnd: () => {
            this.$store.commit('setIsSwiper', false);
          },
          slideChange: () => {
            this.$store.commit("setlbtcIndexAction", {
              name: this.lbtcChannels[
                this.$refs.myLbtcSwiper.swiper.activeIndex
              ].class,
              index: this.$refs.myLbtcSwiper.swiper.activeIndex
            });
          }
        }
      }
    };
  },
  computed: {
    lbtcIndexAction() {
      return this.$store.state.news.lbtcIndexAction;
    }
  },
  created() {
    this.lbtcInit();
  },
  mounted() {
    this.slideTo(this.lbtcIndexAction.index, 0);
  },
  activated() {},
  watch: {
    lbtcIndexAction(newVal, oldVal) {}
  },
  methods: {
    lbtcInit() {
      this.lbtcChannels = this.$t("news.secondLevelChannel.lbtc");
    },

    newsNavClick(name, index) {
      this.$store.commit("setlbtcIndexAction", {
        name: name,
        index: index
      });
      this.slideTo(index, 300);
    },

    slideTo(index, second) {
      this.$refs.myLbtcSwiper.swiper.slideTo(index, second, true);
    }
  },

  beforeDestroy() {}
};
</script>