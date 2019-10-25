<template>
  <div id="app">
    <!-- router-view -->
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  mounted () {
  },
  methods: {

  }
};
</script>

<style>
.router-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
body {
  font-family: PingFangSC-Regular, sans-serif;
}
</style>
