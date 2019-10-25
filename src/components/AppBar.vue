<template>
  <!-- 底部 -->
  <van-tabbar route active-color="#2AA4E9" inactive-color="#085C9E" safe-area-inset-bottom>
    <van-tabbar-item replace name="home" to="/Home">
      <span class="icon">&#xe640;</span>
      首页
    </van-tabbar-item>
    <van-tabbar-item replace name="use" to="/Apply">
      <span class="icon">&#xe662;</span>
      应用
    </van-tabbar-item>
    <van-tabbar-item replace name="my" to="/Personal">
      <span class="icon">&#xe7d5;</span>
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
