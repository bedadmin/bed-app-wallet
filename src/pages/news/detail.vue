<style lang="scss" scoped>
#news-detail{
  > * {
    word-wrap: break-word;
    word-break: normal;
  }
  .news-title {
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
  .content {
    p {
      img{
        width: 100%;
      }
    }
  }
  .author {
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
    .name {
      color: #1D5AA3;
    }
    .time {
      color: #999;
    }
  }
  .detail-detail {
    -webkit-user-select: text;
    user-select: text;
  }
  .right-icon {
    vertical-align: middle;
    text-align: center;
    img {
      vertical-align:middle;
      width: 22px;
    }
    .collection {
      margin-right: 8px;
    }
  }
}
</style>
<template>
  <div id="news-detail">
    <van-nav-bar :z-index="1000" fixed left-arrow :title="info.title" @click-left="$router.goBack()">
      <div slot="right" class="right-icon">
        <img class="collection" @click="collection" :src="likeStatus ? 'https://lbtc.io/wallet/static/img/like-o.png' : 'https://lbtc.io/wallet/static/img/like.png' " alt="">
        <!-- <img class="share" src="https://lbtc.io/wallet/static/img/share.png" alt=""> -->
      </div>
    </van-nav-bar>
    <div class="container fixed-container">
    
      <p class="news-title">{{info.title}}</p>
      <div class="author">
        <span class="name">{{info.author.name}}</span>
        <span class="time">{{info.date}}</span>
      </div>
    
      <div class="detail-detail" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      info: {},
      newsLikeList: [],
      likeStatus: false,
      likeClickStatus: false
    }
  },
  computed:{},
  created(){
    this.detailInit()
  },
  mounted(){},
  methods:{
    detailInit() {
      this.info = JSON.parse(this.$route.query.content);
      let reg = new RegExp('<img', 'ig');
      this.info.content = this.info.content.replace( reg, '<img style="width: 100%;"');

      this.newsLikeList = this.localStore.get('news_like_list');

      this.localforage.getItem('news_collection').then( res => {
        if (res) {
          this.newsLikeList = res;
          for (let i = 0; i < this.newsLikeList.length; i++) {
            const item = this.newsLikeList[i];
            if (item.id == this.info.id) {
              this.likeStatus = true;
              break;
            }
          }
        } else {
          this.newsLikeList = [];
        }
        this.likeClickStatus = true;
      });
    },

    collection() {
      if (this.likeClickStatus) {
        this.likeClickStatus = false;
        if (this.likeStatus) {
          for (let i = 0; i < this.newsLikeList.length; i++) {
            const item = this.newsLikeList[i];
            if (item.id == this.info.id) {
              this.newsLikeList.splice(i, 1);
              this.likeStatus = false;
            }
          }
        } else {
          this.newsLikeList.push(this.info);
          this.likeStatus = true;
        }
        this.localforage.setItem('news_collection', this.newsLikeList).then( res => {
          this.likeClickStatus = true;
        })
      }
    }
  },
  destroyed(){
    this.info = {};
  }
}
</script>