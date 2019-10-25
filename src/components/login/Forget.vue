<template>
  <div class="forget">
    <!-- 头部 -->
    <van-nav-bar left-arrow @click-left="routerBack" title="忘记密码" />
    <!-- <div class="title">忘记密码</div> -->
    <div class="logo">
      <img src="../../assets/img/logo.png" alt />
    </div>
    <van-cell-group class="input_box">
      <!-- 手机号码 -->
      <van-field
        class="input_icon"
        v-model="mobile"
        type="tel"
        label="手机号码"
        placeholder="请输入手机号码"
        @click-right-icon="clickIconClose"
        right-icon="close"
      />
      <!-- 图形验证码 -->
      <!-- <van-field class='input_icon' v-model="pattern" type="tel" label="图形验证码" placeholder="请输入图形验证码"/> -->
      <!-- 验证码 -->
      <!-- <van-field class='input_icon' v-model="verify " type="number" label="验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="mini" type="primary" @click="goVerify">发送验证码</van-button>   
      </van-field>-->
      <van-field
        class="input_icon"
        v-model="verify"
        type="namber"
        label="验证码"
        placeholder="请输入验证码"
      />
      <sms-code v-model="verify" :phone="mobile" @getCode="getCode"></sms-code>
      <!-- 登陆密码 -->
      <van-field
        v-model="password"
        label="登陆密码"
        placeholder="请输入新的登陆密码"
        @click-right-icon="clickPsw"
        right-icon="closed-eye"
        v-if="pwdType"
      />
      <van-field
        v-model="password"
        type="password"
        label="登陆密码"
        placeholder="请输入新的登陆密码"
        @click-right-icon="clickPsw"
        right-icon="eye-o"
        v-else
      />
    </van-cell-group>
    <!-- 重置密码 -->
    <div class="login_ipt">
      <van-button round type="info" size="large" @click="resetPsw">重置密码</van-button>
    </div>
  </div>
</template>

<script>
import smsCode from "@/components/bin/smsCode";
export default {
  data() {
    return {
      mobile: "", // 电话号码
      pattern: "", // 图形验证码
      verify: "", // 验证码
      password: "", //密码
      pwdType: false // 密码隐藏
    };
  },
  components: {
    smsCode
  },
  methods: {
    // 手机验证码
    getCode() {
      // var reg = /^[0-9]+.?[0-9]*$/;
      // var reg = /^\d{11}$/;
      var reg = /^[1][3,4,5,7,8,9][0-9]{9}$|^[8]\d{10}$/;
      if (!reg.test(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return;
      } else {
        let publicKey =
          "-----BEGIN PUBLIC KEY-----" +
          "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhh0tx4USkRz/w9Cbba02j+D6y" +
          "ON/Oaq+lMgg1w7rh7okvljnCNCFfIfAYlwf+J6D7XXtwJSJQLXQ5ode2ljpbk93m" +
          "NtWafH9+JxIRp37EnsuHaNkVaRx9DIzE+lYgU5BHIZ5QlILDXBAsZk4IxNZt1RS5" +
          "exENFz47MzJHug14TQIDAQAB" +
          "-----END PUBLIC KEY-----";
        let encryptor = new JSEncrypt();
        encryptor.setPublicKey(publicKey); // 设置公钥
        let mobile = this.mobile;
        let rsaPassWord = encryptor.encrypt(
          JSON.stringify({ type: 1, mobile: mobile })
        ); // 对密码进行加密
        const formData = {
          data: rsaPassWord
        };
        this.$http.post("Index/sendSms", formData).then(response => {
          const res = response.data;
          if (res.status == 200) {
            this.$toast("验证码已发送, 请注意查收!");
          } else {
            this.$toast(res.msg);
          }
        });
      }
    },
    // 重置密码
    resetPsw() {
      const formData = {
        mobile: this.mobile, //手机号
        code: this.verify, //验证码
        new_psw: this.password //登录密码
      };
      this.$http.post("User/forget", formData).then(response => {
        // console.log(response.data);
        const res = response.data;
        if (res.status === 200) {
          // 登录成功
          this.$toast(res.msg);
          this.$router.push("/Login");
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // tile < 返回
    routerBack() {
      this.$router.go(-1);
    },
    routerBack() {
      this.$router.push("/Login");
    },

    // 电话输入框右侧icon 点击事件
    clickIconClose() {
      this.mobile = "";
    },
    // 密码输入框右侧icon 点击事件
    clickPsw() {
      this.pwdType = !this.pwdType; //跟着小眼睛变化，密码框隐藏显示文本框
    }
  }
};
</script>

<style scoped>
.register {
  font-size: 14px;
}
.title {
  font-size: 25px;
  margin-left: 25px;
  margin-top: 5px;
}
.input_box {
  padding: 5px 15px;
}
.van-cell {
  padding: 18px 10px;
}
.login_ipt {
  margin-top: 25px;
  padding: 0 15px;
}
/* 按钮 */
.van-button--large {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background: linear-gradient(
    180deg,
    rgba(42, 164, 233, 1) 0%,
    rgba(32, 83, 236, 1) 100%
  );
  border-radius: 23px;
}
.van-button--primary {
  color: #2aa3e9;
  background-color: #151936;
  border: none;
}
</style>
