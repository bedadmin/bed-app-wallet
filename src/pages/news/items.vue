<style lang="scss" scoped>
.news-items {
  height: calc(100vh - 88px);
  .mint-loadmore {
    height: 100%;
  }
  .list-enter-active {
    transition: all 1s;
  }
  .list-leave-active {
    transition: all 0.2s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .news-content {
    padding: 0 15px 15px;
  }
  .bottomLoad {
    text-align: center;
    color: #999;
    font-size: 12px;
    div {
      line-height: 40px;
    }
  }
}
</style>

<template>
  <div class="news-items" :class="value" v-infinite-scroll="loadBottom" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">

    <mt-loadmore :top-method="loadTop" :distance="isSwiper" :auto-fill="false" :topPullText="$t('main.refresh')" :topDropText="$t('main.refresh')" :topLoadingText="$t('main.loading')" ref="loadmore">
        
      <div class="text-center f666" v-if="!items.length" style="height: 60vh">
        <img class="nodata" src="https://lbtc.io/wallet/static/img/nodata.png">
        {{$t('main.noData')}}
      </div>

      <div class="news-content" v-if="items.length" is="transition-group" name="list">
        <div class="news-item" v-for="(item, index) in items" :key="index" @click="open_detail(item)">
          <div class="item-img" :style="item.cover" v-if="item.cover"></div>
          <div class="item-content">
            <div class="item-tittle">
              <div class="ellipsis-2">
                {{item.title}}
              </div>
            </div>
          </div>
          <div class="item-info">
            <div class="info-time">
              {{item.date}}
            </div>
            <div class="info-author">
              {{item.author.name}}
            </div>
          </div>
        </div>
      </div>

      <div class="bottomLoad" v-if="items.length">
        <div class="bottomLoading" v-show='bottomLoading'>{{$t('main.loading')}}</div>
        <div class="bottomLoadNoData" v-if='bottomNoData'>{{$t('main.noMoreData')}}</div>
      </div>
        
    </mt-loadmore>

  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: ''
  },
  data() {
    return {
      items: [],
      params: {},
      bottomLock: false,      
      bottomLoading: true,    
      bottomNoData: false,     
    };
  },
  computed: {
    isSwiper() {
      return this.$store.state.news.isSwiper;
    },
    indexAction() {
      return this.$store.state.news.indexAction;
    },
    newsIndexAction() {
      return this.$store.state.news.newsIndexAction;
    },
    lbtcIndexAction() {
      return this.$store.state.news.lbtcIndexAction;
    },
    indexLocation() {
      return this.$store.state.news.indexLocation;
    },
    newsClassContent() {
      return this.$store.state.news.newsClassContent;
    },
    newsClassPage() {
      return this.$store.state.news.newsClassPage;
    }
  },
  created() {
    this.newsInit();
  },
  mounted() {
    
  },
  activated() {
    
  },
  methods: {
    newsInit() {
      this.params = this.typeParams();
      if (this.newsClassContent['news_' + this.value].length) {
        this.items = this.newsClassContent['news_' + this.value];
        this.checkLength(this.newsClassContent['news_' + this.value]);
        this.handleLocaltion('get');
        return false
      } else {
        this.localforage.getItem('news_' + this.value).then( res => {
          if (res) {
            this.items = res;
            this.checkLength(res);
            this.handleLocaltion('get')
          } else {
            this.getList(this.params).then( list => {
              this.items = list;
              this.checkLength(list);
              this.localforage.setItem('news_' + this.value, this.items);
              this.newsClassContent['news_' + this.value] = this.items;
              this.newsClassPage['news_' + this.value] = 1;
              this.$store.commit('setNewsClassContent', this.newsClassContent);
              this.$store.commit('setNewsClassPage', this.newsClassPage);
            });
          }
          this.items.length
        });
      }
    },

    loadTop() {
      this.bottomLock = false;
      if (this.value == 'collection') {
        this.localforage.getItem('news_collection').then( list => {
          this.items = list;
          this.$refs.loadmore.onTopLoaded();
        })
      } else {
        this.params = this.typeParams();
        this.getList(this.params).then( list => {
          this.items = list;
          this.checkLength(list);
          this.newsClassContent['news_' + this.value] = this.items;
          this.newsClassPage['news_' + this.value] = 1;
          this.$store.commit('setNewsClassContent', this.newsClassContent);
          this.$store.commit('setNewsClassPage', this.newsClassPage);
          this.localforage.setItem('news_' + this.value, this.items).then( res => {
            this.$refs.loadmore.onTopLoaded();
          })
        });
      }
    },

    loadBottom() {
      this.bottomLock = true;
      if (this.value == 'collection') {
        return false
      }
      this.params = this.typeParams();
      this.newsClassPage['news_' + this.value] = this.newsClassPage['news_' + this.value] + 1;
      this.params.page = this.newsClassPage['news_' + this.value];
      
      this.getList(this.params).then( list => {
        if (list.length) {
          this.items.push(...list);
          this.newsClassContent['news_' + this.value] = this.items;
          this.$store.commit('setNewsClassContent', this.newsClassContent);
        } else {
          this.newsClassPage['news_' + this.value] = this.newsClassPage['news_' + this.value] - 1;
        }
        this.checkLength(list);
        this.$store.commit('setNewsClassPage', this.newsClassPage);
      })
    },

    open_detail(param) {
      this.handleLocaltion('set');
      this.$router.push({
        path: "/news-detail",
        query: { content: JSON.stringify(param) }
      });
    },

    getList(params) {
      let currentContent = [];
      if (params.tag == 'collection') {
        return Promise.resolve(currentContent);
      }
      return Promise.resolve(
        // this.$http.get(this.$api.api.getNewsList2, params).then(res => {
        this.$http.get('http://47.75.150.5:8080/mgetnews2', params).then(res => {
          if (res.error) {
            currentContent = [];
          } else {
            currentContent = res.msg;
          }
          if (currentContent.length) {
            currentContent.forEach((item, index) => {
              if (item.comments.length && item.comments[0].content) {
                item.cover = this.catchImgSrc(item.comments[0].content);
              }
            });
          }
          return Promise.resolve(currentContent);
        }).catch(e => {
            currentContent = [];
            return Promise.resolve(currentContent);
        })
      )
    },

    handleLocaltion(type) {
      if (this.lbtcIndexAction.name === this.value || this.newsIndexAction.name === this.value) {
        if (type === 'get') {
          this.$nextTick(() => {
            document.querySelector(`.news-items.${this.value}`).parentNode.scrollTop = this.indexLocation['news_' + this.value];
          })
        } else if (type === 'set') {
          let scrollTop = document.querySelector(`.news-items.${this.value}`).parentNode.scrollTop;
          if (scrollTop >= 0) {
            this.indexLocation['news_' + this.value] = scrollTop;
            this.$store.commit('setIndexLocation', this.indexLocation);
          }
        }
      }
    },

    typeParams() {
      let params = {};
      switch (this.value) {
        case 'report':
          params = { cate: 'lbtc', tag: 'report'}
          break;
        case 'tutorial':
          params = { cate: 'lbtc', tag: 'tutorial'}
          break;
        case 'article':
          params = { cate: 'lbtc', tag: 'article'}
          break;
        case 'collection':
          params = { cate: 'news', tag: 'collection'}
          break;
        default:
          break;
      }
      return params
    },

    // typeParams() {
    //   let params = {};
    //   if (this.indexAction) { // lbtc
    //     switch (this.value) {
    //       case 'lbtcAll':
    //         params = { cate: 'lbtc'}
    //         break;
    //       case 'report':
    //         params = { cate: 'lbtc', tag: 'report'}
    //         break;
    //       case 'announcement':
    //         params = { cate: 'lbtc', tag: 'announcement'}
    //         break;
    //       case 'tutorial':
    //         params = { cate: 'lbtc', tag: 'tutorial'}
    //         break;
    //       case 'article':
    //         params = { cate: 'lbtc', tag: 'article'}
    //         break;
    //       default:
    //         break;
    //     }
    //   } else {                // newslbtc
    //     switch (this.value) {
    //       case 'newsAll':
    //         params = { cate: 'news'}
    //         break;
    //       case 'lbtcnews':
    //         params = { cate: 'news', tag: 'lbtcnews'}
    //         break;
    //       case 'information':
    //         params = { cate: 'news', tag: 'information'}
    //         break;
    //       case 'collection':
    //         params = { cate: 'news', tag: 'collection'}
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    //   return params
    // },

    checkLength(list) {
      if (list.length && list.length >= 10) {
        this.bottomLoading = true;
        this.bottomNoData = false;
      } else {
        this.bottomLoading = false;
        this.bottomNoData = true;
      }
      this.bottomLock = false;
    },

    catchImgSrc(tag) {
      tag = String(tag)
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let src = tag.match(srcReg);
      let res = 'background-image:url(' + src[1] + ');';
      return res
    }

  }
};
</script>