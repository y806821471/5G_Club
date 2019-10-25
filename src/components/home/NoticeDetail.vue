<template>
  <div class="notice">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="公告" @click-left="routerBack" />
    <div class="content" >
      <h2>{{notice.title}}</h2>
      <div class="time">{{notice.created_at}}</div>
      <div class="subject" v-html="notice.details">
        <!-- {{notice.details}} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice:JSON.parse(this.$route.query.item),
    };
  },

  methods:{
    routerBack(){
      this.$router.push('/NoticeList')
    }
  }
};
</script>

<style scoped>
.content {
  margin: 15px;
  text-align: center;
  border:1px solid #0e3b75;
  border-radius: 8px;
  height: 100%;
  background: linear-gradient(to right, #101b36, #0e3b75);
}
.time{
  color:#7DA3BF;
}
.subject{
  padding: 15px;
  color: #7DA3BF;
  font-size: 13px;
  text-align: left;
}
</style>