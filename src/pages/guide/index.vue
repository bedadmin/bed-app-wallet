<style lang="scss" scoped>
.swiper-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(left top, #2D3440, #222832);
  .swiper-slide {
    text-align: center;
    .swiper-content {
      width: 100%;
      margin-top: 80px;
    }
    .title {
      color:rgba(249,210,177,1);
      margin-bottom: 6px;
      font-size: 30px;
    }
    .dec {
      width: 70vw;
      margin: 0 auto 72px;
      color: #D6A779;
      font-size: 17px;
    }
    .img {
      width: 85vw;
      height: 85vw;
      margin: 0 auto;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .to-main {
    position: absolute;
    left: 0;
    right: 0;
    width: 176px;
    height: 50px;
    line-height: 45px;
    margin: 0 auto;
    border-radius: 25px;
    color: rgba(249,210,177,1);
    font-size: 18px;
    border:2px solid rgba(218,177,135,1);
    bottom: 100px;
  }
}

</style>

<template>
  <!-- Swiper -->
  <div class="swiper-container">
    <swiper :options="swiperOption">
      <swiper-slide>
        <div class="swiper-content">
          <div class="title">快如闪电</div>
          <div class="dec">区块间隔短至3秒，彻底解决 网络拥堵问题</div>
          <div class="img" style="background-image: url('https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/guide/1.png');"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-content">
          <div class="title">去中心化</div>
          <div class="dec">共识机制采用DPoS，投票权和记帐权分开，真正去中心化</div>
          <div class="img" style="background-image: url('https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/guide/2.png');"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-content">
          <div class="title">费用低廉</div>
          <div class="dec">挖矿门槛低，交易速度快，使手续费保持合理低廉</div>
          <div class="img" style="background-image: url('https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/guide/3.png');"></div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-content">
          <div class="title">社区自治</div>
          <div class="dec">高度民主的链上治理系统，任何人都可以参与决策</div>
          <div class="img" style="background-image: url('https://qcloudtest-1253476014.cos.ap-guangzhou.myqcloud.com/LBTCBank-app/guide/4.png');"></div>
        </div>
        <div class="to-main" @click="toMain">
          {{$t('commom0.experiencNow')}}
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          bulletClass: 'my-swiper-pagination-bullet',
          bulletActiveClass: 'my-swiper-pagination-bullet-active'
        }
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    localStorage.setItem("guide", true);
  },
  activated() {},
  methods: {
    toMain() {
      if (this.walletDB.current) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.push({ path: "/create-index" });
      }
    }
  }
};
</script>