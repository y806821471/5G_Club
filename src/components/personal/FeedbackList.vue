<template>
  <div class="NoticeList">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="反馈列表" @click-left="routerBack" />
    <ul class="content">
      <li v-for="(item,index) in feedbackList" :key="index">
        <div class="content_hd">
          <div class="subject">{{item.content}}</div>
          <div class="time">{{item.created_at |filterDate}}</div>
        </div>
        <div class="content_bd">
          <div class="title">回复内容</div>
          <div class="content_text" v-if="item.child">{{item.child.content}}</div>
          <div class="time" v-if="item.child">{{item.child.created_at | filterDate}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbackList: []
    };
  },
  created() {
    this.getFeedback();
  },
  filters: {
    filterDate(date) {
      return date.substring(0, 10);
    }
  },
  methods: {
    // 反馈列表
    getFeedback() {
      this.$http("/System/issue").then(response => {
        const res = response.data.data;
        // console.log(res);
        this.feedbackList = res;
      });
    },
    routerBack() {
      this.$router.push("/Feedback");
    }
  }
};
</script>

<style scoped>
.content {
  margin: 15px;
}
.content li {
  border: 1px solid #0e3b75;
  border-radius: 8px;
  background: linear-gradient(to right, #101b36, #0e3b75);
  margin-bottom: 14px;
}
.content_hd {
  padding: 0 14px;
}

.time {
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  color: #7da3bf;
  margin-bottom: 5px;
}
.subject {
  margin: 14px 0;
  color: #7da3bf;
  font-size: 12px;
}
.content_bd {
  border-top: 1px solid #0c4586;
  padding: 0 17px;
}
.title {
  font-size: 14px;
  color: #00b1ff;
  margin: 15px 0;
}
.content_text {
  color: #7da3bf;
}
</style>