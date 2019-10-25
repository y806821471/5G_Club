<template>
  <div class="TopUpYLB">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="充值" @click-left="routerBack" />
    <!-- tab切换 -->
    <van-tabs v-model="active" line-width="30px" background="#151936" title-active-color="#00B1FF">
      <!-- 支付宝充值 -->
      <van-tab title="支付宝充值">
        <div class="account_ZFB">
          <div>付款账号</div>
          <div>
            <span>支付宝账号：</span>
            <span>12344567787</span>
          </div>
          <div class="QRcode">
            <img src="../../assets/img/code.png" alt />
            <p>（支付宝收款码）</p>
          </div>
        </div>
      </van-tab>
      <!-- 银行卡充值 -->
      <van-tab title="银行卡充值">
        <div class="account_YHK">
          <p>付款账号</p>
          <div>
            <span>姓名：</span>
            <span>张三</span>
          </div>
          <div>
            <span>银行：</span>
            <span>中国银行长沙支行</span>
          </div>
          <div>
            <span>账号：</span>
            <span>332364637373374</span>
          </div>
        </div>
      </van-tab>
      <van-cell-group>
        <div class="input_title">充值金额：</div>
        <van-field v-model="money" placeholder="请输入您要充值的金额" />
        <div class="input_title">交易密码：</div>
        <van-field v-model="password" type="password" placeholder="请输入交易密码" />
        <!-- 图片上传 -->
        <div class="cardUp">
          <div class="img">
            <img v-if="!qrCode" src="../../assets/img/uploading.png" alt />
            <img id="photo" v-else :src="qrCode" />
          </div>
          <input class="upLoad" type="file" accept="image/*" @change="doUpload($event)" />
          <p v-if="qrCode ==''">请上传付款凭证</p>
        </div>
        <van-button round type="info" size="large">确定充值</van-button>
      </van-cell-group>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      money: "",
      password: "",
      qrCode: '',
    };
  },
  methods: {
    routerBack() {
      this.$router.push("/Myproperty");
    },
        //上传图片
    doUpload(e) {
      this.$http.post("/Index/oss").then(response => {
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
        let randomName = new Date().getTime() + '.' + file.name.split('.').pop();
        // 上传
        this.$toast.loading({forbidClick: true, loadingType: 'spinner', message: '', duration: 0}); // 持续显示加载
        client.put(randomName,file, {
          progress: function* (percentage, cpt) {
          }  
        }).then(results => {
          this.$toast.clear();
          this.qrCode = results.res.requestUrls[0];
          let photo = document.querySelector("#photo");
          photo.style.width = '100%';
          photo.style.height = 'auto';
        }).catch(err => {
          this.$toast("上传出错了!");
        });
      })
    },
    submit() {
      if(this.validateForm.question.trim() === '' || this.validateForm.question.trim().length <10 || this.validateForm.question.trim().length >240){
        this.$toast("请输入问题，长度10-240");
        return;
      }
      const formData = {
        content: this.validateForm.question,
        cover: this.qrCode,
      }
      this.$http.post("/Wallet/moneyRecharge", formData).then((response) => {
        const res = response.data;
        if(res.status === 200){
          this.$router.push("/QuestionList");
        }
        this.$toast(res.msg);
      })
    }
  }
};
</script>

<style scoped>
.account_ZFB {
  background: linear-gradient(
    90deg,
    rgba(16, 31, 63, 1) 0%,
    rgba(14, 62, 121, 1) 100%
  );
  padding: 15px 20px;
  font-size: 14px;
}
.account_YHK {
  background: linear-gradient(
    90deg,
    rgba(16, 31, 63, 1) 0%,
    rgba(14, 62, 121, 1) 100%
  );
  padding: 15px 20px;
  font-size: 14px;
  line-height: 35px;
}
.QRcode {
  margin-top: 20px;
  text-align: center;
}

.QRcode img {
  width: 110px;
  height: 110px;
}
.QRcode p {
  color: #7da3bf;
  font-size: 13px;
  margin-top: 5px;
}
.van-cell-group {
  padding: 0 20px;
}
.van-cell {
  padding: 10px 0;
}
.input_title {
  font-size: 14px;
  margin-top: 10px;
}
.van-button {
  margin: 30px 0;
  max-height: 40px;
  line-height: 38px;
  background: linear-gradient(
    180deg,
    rgba(42, 164, 233, 1) 0%,
    rgba(32, 83, 236, 1) 100%
  );
}
/* 图片上传 */
.cardUp{ width: 100%;  position: relative; margin-top: 20px; margin-bottom: 20px;}
.cardUp p{ text-align: left; font-size: 12px; margin-top: 10px; color: #7DA3BF;}
.cardUp img{ height: 70px; width: 70px; border-radius: 5px;}
.upLoad{ opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 70px;}
</style>