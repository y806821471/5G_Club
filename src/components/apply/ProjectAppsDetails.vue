<template>
  <div class="ProjectAppsDetails">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="项目应用详情" @click-left="routerBack" />
    <div class="box">
      <div class="box_hd">
        <div>{{datas.title}}</div>
        <p>时间：{{datas.created_at | filterDate}}</p>
      </div>
      <div class="box_bd">
        <!-- <img :src="datas.short_imgs" alt /> -->
        <p v-html="datas.details" id="imgstyle"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: {}
    };
  },
  created() {
    this.getDetails();
  },
  // 时间过滤器
  filters: {
    filterDate(date) {
      if (date) {
        return date.substring(0, 10);
      }
    }
  },
  methods: {
    getDetails() {
      var newId = this.$route.query.id;
      this.$http("Apps/details", {
        params: {
          id: newId
        }
      }).then(response => {
        let data = response.data.data;
        this.datas = data;
        console.log("应用详情", data);
      });
    },
    routerBack() {
      this.$router.push("/ProjectApps");
    }
  }
};
</script>

<style scoped>
.box {
  padding: 10px 4%;
}
.box_hd {
  text-align: center;
}
.box_hd div {
  font-size: 15px;
  margin-bottom: 7px;
}
.box_hd p {
  color: #7da3bf;
}
.box_bd img {
  margin-top: 7px;
  width: 100%;
}
.box_bd p {
  color: #7da3bf;
  font-size: 13px;
  margin: 10px 0;
  line-height: 20px;
}
#imgstyle >>> img {
  width: 100%;
}
</style>