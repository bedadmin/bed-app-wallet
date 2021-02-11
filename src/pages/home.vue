<style lang="scss" scoped>
#home {
  touch-action: none;
}
</style>
<template>
  <transition name="fade" mode="out-in">
    <keep-alive include="main-index">
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: "home",
  created() {
    localStorage.setItem("guide", true);
    let ifGuide = localStorage.getItem("guide");
    let toURL = "";
    if (ifGuide) {
      toURL = "/";
    } else {
      toURL = "/guide";
    }
    this.$router.push({ path: toURL });
  }
};
</script>
