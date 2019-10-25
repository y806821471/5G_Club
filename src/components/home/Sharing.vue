<template>
  <div class="sharing">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="我的邀请码" @click-left="routerBack" />
    <!-- 我的邀请码 -->
    <div class="invite">我的邀请码</div>
    <div class="invite_num">{{services.pmobile}}</div>
    <!-- 复制按钮 -->
    <div class="copy_but">
      <van-button
        round
        type="info"
        v-clipboard:copy="services.pmobile"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >点击复制</van-button>
    </div>
    <!-- 二维码 -->
    <div class="qrcode-box">
      <div id="qr"></div>
    </div>

    <div class="scan">扫描注册</div>
    <div class="copy_link">
      <van-button
        round
        type="info"
        v-clipboard:copy="services.url"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >复制邀请链接</van-button>
    </div>
    <div class="save_but">
      <!-- <van-button round type="info">保存图片</van-button> -->
      <div class="saveImg">请截图保存图片</div>
    </div>
    <div class="bottom_text">-5G众创娱乐新时代-</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeurl: "",
      services: ""
    };
  },
  created() {
    this.getcode();
  },
  methods: {
    //User/getRegister
    getcode() {
      this.$http("/User/getRegister").then(response => {
        this.services = response.data.data;
        this.codeurl = response.data.data.url;
        let qr = new QRCode(document.getElementById("qr"), {
          width: 140,
          height: 140,
          colorDark: "#000000",
          colorLight: "rgba(255,255,255,1)"
        });
        qr.makeCode(this.codeurl);
      });
    },
    // 复制地址
    onCopy: function(e) {
      this.$toast("复制成功");
    },
    onError: function(e) {
      this.$toast("复制失败");
    },
    routerBack() {
      this.$router.push("/Home");
    }
  }
};
</script>

<style scoped>
.sharing {
  text-align: center;
}
.invite {
  width: 100%;
  text-align: center;
  margin-top: 15px;
  font-size: 16px;
}
.invite_num {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin: 10px 0 15px 0;
}
.copy_but {
  width: 100%;
  height: 40px;
  text-align: center;
}
.copy_but .van-button {
  width: 114px;
  height: 40px;
  line-height: 38px;
  border-radius: 24px;
  color: #00b1ff;
  background-color: #151936;
  border: 1px solid #00b1ff;
}
.van-image {
  margin: 22px 0 12px 0;
}
.scan {
  font-size: 14px;
  margin: 15px 0 35px 0;
}
.copy_link .van-button {
  width: 167px;
  height: 40px;
  line-height: 38px;
  border-radius: 24px;
}
.save_but .van-button {
  width: 167px;
  height: 40px;
  line-height: 38px;
  border-radius: 24px;
  color: #00b1ff;
  background-color: #151936;
  border: 1px solid #00b1ff;
  margin: 18px 0 24px 0;
}
.bottom_text {
  font-size: 13px;
  margin-bottom: 50px;
}
.saveImg {
  color: #00b1ff;
  font-size: 14px;
  margin: 18px 0 24px 0;
}
.qrcode-box {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  margin-top: 30px;
}
#qr {
  outline: 10px solid #fff;
  min-height: 120px;
  background-color: #fff;
  padding-left: 4px;
}
#qr img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>