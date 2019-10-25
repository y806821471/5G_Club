<template>
  <div class="ConsumeAppsDetails">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="币币详情" @click-left="routerBack" />
    <div class="goods_box">
      <img src="../../assets/img/ecology.png" alt />
      <div class="goods_hd">
        <div class="title">ETH简介</div>
        <div  class="imgstyle">以太坊（英文Ethereum）是一个开源的有智能合约功能的 公共区块链平台，通过其专用加密货币以太币（Ether，简 称“ETH”）提供去中心化的以太虚拟机（Ethereum Virtua l Machine）来处理点对点合约.</div>
      </div>
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
      this.$router.push("/BiBiApps");
    }
  }
};
</script>

<style scoped>
.van-button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, #2aa4e9 0%, #2053ec 100%);
}
.goods_hd {
  padding: 18px;
  font-size: 15px;
}

.goods_box img {
  width: 100%;
}
.imgstyle{
  margin-top: 5px;
  font-size: 13px;
  color: #7DA3BF;
}
.imgstyle >>> img {
  width: 100%;
}
</style>