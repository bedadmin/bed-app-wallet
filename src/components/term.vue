<template>
  <div class="term">
    <div class="term-header">
      <div class="term-title">BED <br> 服务协议 </div>
    </div>
    <div class="container" v-html="termContent"></div>
  </div>
</template>

<script>
export default {
  name: "Term",
  data() {
    return {
      termContent: ""
    };
  },
  created() {
    this.termContent = this.wConfig.terms;
  }
};
</script>

<style>
</style>
