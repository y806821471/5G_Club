<template>
  <div class="NoticeList">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="公告" @click-left="routerBack" />
    <ul class="content">
      <router-link :to="{path:'/NoticeDetail',query:{item: JSON.stringify(item)}}" tag="li" v-for='(item,index) in tradeList' :key="index">
      
        <div class="content_hd">
          <div class="title">{{item.title}}</div>
          <div class="subject">{{item.brief}}</div>
          <div class="time">{{item.created_at | filterDate}}</div>
        </div>
        <div class="content_bd">
          <div>查看详情</div>
          <div class="icon">&#xe695;</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tradeList: []
    };
  },
  created() {
    this.getNotices();
  },
  filters: {
    filterDate(date) {
      return date.substring(0, 10);
    }
  },
  methods: {
    // 公告
    getNotices() {
      this.$http("/System/notice", {
        params: {
          type: 1
        }
      }).then(response => {
        // console.log("公告", response.data.data);
        const res = response.data.data;
        
        if (res.length > 0) {
          this.tradeList = res;
        }
      });
    },
    routerBack(){
      this.$router.push('/Home')
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
.title {
  margin-top: 20px;
  font-size: 15px;
}
.time {
  display: flex;
  justify-content: flex-end;
  color: #7da3bf;
  margin-bottom: 5px;
}
.subject {
  margin: 14px 0;
  color: #7da3bf;
  font-size: 13px;
}
.content_bd {
  border-top: 1px solid #0c4586;
  height: 50px;
  line-height: 50px;
  padding: 0 14px;
  color: #00b1ff;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
</style>