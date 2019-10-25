<template>
  <div class="card">
    <van-nav-bar title="添加支付宝账号" left-arrow @click-left="routerBack" />
    <van-cell-group>
      <div class="top">
        <span class="icon icon_lock">&#xe608;</span>
        <span>支付宝</span>
      </div>
      <van-field v-model="validateForm.account" placeholder="请输入支付宝账号" clearable/>
      <div class="cardUp">
        <p>支付宝收款码：</p>
        <div class="img">
          <img v-if="!qrCode" src="../../assets/img/qrCode.png" alt />
          <img v-else :src="qrCode" />
        </div>
        <input
          class="upLoad"
          :disabled="isAdd"
          type="file"
          accept="image/*"
          @change="doUpload($event)"
        />
      </div>
    </van-cell-group>
    <div class="bottom_box">
      <van-button class="common-btn" @click="submit">确定</van-button>
      <div>请准确填写您的支付宝账号信息，一旦添加成功您将无法手动修改！若确需修改请与系统客服联系！</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddWeChat",
  data() {
    return {
      validateForm: {
        account: "" //账户
      },
      qrCode: "",
      times: localStorage.getItem("alipayTimes"),
      isAdd: false
    };
  },
  created() {
    // this.getInfo();
    if (parseInt(this.times) >= 3) {
      this.isAdd = true;
    }
  },
  methods: {
    // routerBack() {
    //   this.$router.push("/Safety");
    // },
    // getInfo() {
    //   const params = {
    //     type: "2"
    //   };
    //   this.$http.post("/User/bankAdd", { params: params }).then(response => {
    //     const res = response.data.data;
    //     console.log(res)
    //     if (!!res) {
    //       this.validateForm.account = res.value.account;
    //       this.qrCode = res.value.account_img;
    //     }
    //   });
    // },
    //上传图片
    doUpload(e) {
      this.$http.post("/Index/oss").then(response => {
        // console.log(response);
        const res = response.data.data;
        let OSS = require("ali-oss");
        let file = e.target.files[0];
        let client = new OSS({
          region: res.regionId,
          endpoint: res.endpoint,
          accessKeyId: res.AccessKeyId,
          accessKeySecret: res.AccessKeySecret,
          stsToken: res.SecurityToken,
          bucket: res.bucket
        });
        let randomName =
          new Date().getTime() + "." + file.name.split(".").pop();
        // 上传
        this.$toast.loading({
          forbidClick: true,
          loadingType: "spinner",
          message: "",
          duration: 0
        }); // 持续显示加载
        client
          .put(randomName, file, {
            progress: function*(percentage, cpt) {}
          })
          .then(results => {
            this.$toast.clear();
            this.qrCode = results.res.requestUrls[0];
          })
          .catch(err => {
            this.$toast("上传出错了!");
          });
      });
    },
    submit() {
      if (this.validateForm.account.trim() === "") {
        this.$toast("请输入账号");
        return;
      }
      if (this.qrCode == "static/images/qrcode-bg.png") {
        this.$toast("请上传收款码");
        return;
      }
      const formData = {
        type: "2",
        account: this.validateForm.account, 
        account_img: this.qrCode 
      };
      this.$http.post("/User/bankAdd", formData).then(response => {
        console.log(response);
        
        this.$toast(response.data.msg);
        if (response.data.status === 200) {
          this.times++;
          localStorage.setItem("alipayTimes", this.times);
          this.$router.back();
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-cell-group {
  padding: 20px;
}

.cardUp {
  width: 100%;
  text-align: center;
  position: relative;
  margin-top: 20px;
}
.cardUp p {
  text-align: left;
  font-size: 14px;
  margin-bottom: 15px;
}
.cardUp img {
  height: 140px;
  width: 140px;
}
.upLoad {
  opacity: 0;
  position: absolute;
  top: 34px;
  left: 0;
  width: 100%;
  height: 140px;
}

.common-btn {
  margin-bottom: 26px;
  background: linear-gradient(
    180deg,
    rgba(42, 164, 233, 1) 0%,
    rgba(32, 83, 236, 1) 100%
  );
}
.top {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 0;
}
.top span:nth-child(2) {
  font-size: 14px;
}
.icon_lock {
  color: #2053ec;
  background-image: -webkit-linear-gradient(top, #2aa4e9, #2053ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 21px;
  margin-right: 5px;
}
.van-cell {
  padding: 7px 0;
}
.van-cell::after {
  border-bottom: 1px solid #0c4586 !important;
}
.bottom_box{
  margin-top: 15px;
  padding: 0px 33px;
}
</style>
