<template>
  <div class="ConsumeAppsDetails">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="详情" @click-left="routerBack" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="2000" indicator-color="white" style="height: 220px;">
      <van-swipe-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imgs" alt />
      </van-swipe-item>
    </van-swipe>

    <div class="buy-item">
      <div class="color1">{{datas.title}}</div>
      <div class="color2">{{datas.brief}}</div>
      <div>
        <span class="color3">{{datas.money}}</span>
        <span>（娱乐币）</span>
      </div>
    </div>
    <div class="goods_box">
      <div class="goods_hd">详情</div>
      <div v-html="datas.details" class="imgstyle"></div>
      <!-- <img src="../../assets/img/swipe.png" alt /> -->
    </div>
    <!-- 底部按钮 -->
    <van-button type="info" @click="getJump">联系客服</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: {},
      banners: []
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    getJump() {
      this.$router.push("/CustomerService");
    },
    getDetails() {
      var newId = this.$route.query.id;
      this.$http("Apps/consume_details", {
        params: {
          app_id: newId
        }
      }).then(response => {
        let data = response.data.data;
        this.datas = data;
        this.banners = data.banner_list;
        console.log("消费详情", data);
      });
    },
    routerBack() {
      this.$router.push("/ConsumeApps");
    }
  }
};
</script>

<style scoped>
.van-swipe__track .van-swipe-item img {
  width: 100%;
  height: 100%;
}
.buy-item {
  margin-top: 9px;
  line-height: 26px;
  color: #7da3bf;
  padding: 14px;
  background-color: #0f2b57;
}
.color1 {
  color: #bedbf2;
  font-size: 15px;
}
.color2 {
  font-size: 13px;
}
.color3 {
  color: #fec006;
  font-size: 18px;
}
.van-button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, #2aa4e9 0%, #2053ec 100%);
}
.goods_hd {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-top: 10px;
}
.goods_box {
  background-color: #0f2b57;
  margin-bottom: 50px;
}
.goods_box img {
  width: 100%;
  margin-bottom: 4px;
}
.imgstyle >>> img {
  width: 100%;
}
</style>