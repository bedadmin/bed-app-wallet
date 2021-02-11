<style lang="scss" scoped>
#vote-voters{
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
  <div id="vote-voters">
    <van-nav-bar :z-index="1000" :title="$t('vote.voters.navTitle')" fixed left-arrow @click-left="$router.goBack()" />

    <div class="container fixed-container">
      <div class="content">
        <div class="tag" v-for="item in list">
          {{item.name ? item.name : item.address}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { Toast } from 'vant';
export default {
  components:{
    QrcodeVue
  },
  props:{},
  data(){
    return {
      showNum: false,
      current_wallet: '',
      votersList: [],
      forgeList: [],
      list: []
    }
  },
  computed:{
    
  },
  created(){
    this.votersInit();
  },
  mounted(){},
  methods:{
    votersInit() {
      this.votersList = JSON.parse(this.$route.query.voters);
      this.forgeList = JSON.parse(this.$route.query.forgeList);
      var arr = [];
      this.votersList.forEach((item, index) => {
        var obj = { address: "", name: "" };
        obj.address = item;
        for (let index = 0; index < this.forgeList.length; index++) {
          if (item == this.forgeList[index].address) {
            obj.name = this.forgeList[index].name;
            break;
          }
        }
        arr.push(obj);
      });
      this.list = arr;
    }
  }
}
</script>