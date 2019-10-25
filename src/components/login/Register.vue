
<template>
  <div class="register">
    <!-- 头部 -->
    <van-nav-bar left-arrow @click-left="routerBack" title="注册" />
    <!-- <div class="title">注册</div> -->
    <div class="logo">
      <img src="../../assets/img/logo.png" alt />
    </div>
    <!-- 输入框 -->
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
      <!-- 验证码 -->
      <van-field
        class="input_icon"
        v-model="verify"
        type="namber"
        label="验证码"
        placeholder="请输入验证码"
      />
      <sms-code v-model="verify" :phone="mobile" @getCode="getCode"></sms-code>
      <!--<van-button slot="button" size="mini" type="primary" @click="goVerify">发送验证码</van-button>-->

      <!-- 邀请码 -->
      <van-field
        v-model="invitation"
        label="邀请码"
        placeholder="请输入邀请码"
        @click-right-icon="clickInvi"
        right-icon="closed-eye"
        v-if="yqmType"
      />
      <van-field
        v-model="invitation"
        type="password"
        label="邀请码"
        placeholder="请输入邀请码"
        @click-right-icon="clickInvi"
        right-icon="eye-o"
        v-else
      />
      <!-- 登陆密码 -->
      <van-field
        v-model="password"
        label="登陆密码"
        placeholder="密码为6-20位字母数字组合"
        @click-right-icon="clickPsw"
        right-icon="closed-eye"
        v-if="pwdType"
      />
      <van-field
        v-model="password"
        type="password"
        label="登陆密码"
        placeholder="密码为6-20位字母数字组合"
        @click-right-icon="clickPsw"
        right-icon="eye-o"
        v-else
      />
      <!-- 确认登陆密码 -->
      <van-field
        v-model="passwordConf"
        label="确认登陆密码"
        placeholder="确认登陆密码(6-20位字母数字组合)"
        @click-right-icon="clickPswConf"
        right-icon="closed-eye"
        v-if="pwdConfType"
      />
      <van-field
        v-model="passwordConf"
        type="password"
        label="确认登陆密码"
        placeholder="确认登陆密码(6-20位字母数字组合)"
        @click-right-icon="clickPswConf"
        right-icon="eye-o"
        v-else
      />
      <!-- 二级密码 -->
      <van-field
        v-model="twopassword"
        label="二级密码"
        placeholder="必须为六位数字"
        @click-right-icon="clickTwoPsw"
        right-icon="closed-eye"
        v-if="twoPwdType"
      />
      <van-field
        v-model="twopassword"
        type="password"
        label="二级密码"
        placeholder="必须为六位数字"
        @click-right-icon="clickTwoPsw"
        right-icon="eye-o"
        v-else
      />
      <!-- 确认二级密码 -->
      <van-field
        v-model="twopasswordConf"
        label="确认二级密码"
        placeholder="必须为六位数字"
        @click-right-icon="clickConfTwoPsw"
        right-icon="closed-eye"
        v-if="twoPwdTypeConf"
      />
      <van-field
        v-model="twopasswordConf"
        type="password"
        label="确认二级密码"
        placeholder="必须为六位数字"
        @click-right-icon="clickConfTwoPsw"
        right-icon="eye-o"
        v-else
      />
    </van-cell-group>
    <!-- 注册按钮 -->
    <div class="login_ipt">
      <van-button round type="info" size="large" @click="signIn">注册</van-button>
    </div>
    <!-- 底部 -->
    <div class="sign_box">
      <span>已注册？</span>
      <span @click="goLogin">登录</span>
    </div>
  </div>
</template>

<script>
import smsCode from "@/components/bin/smsCode";
export default {
  data() {
    return {
      mobile: "", // 电话号码
      verify: "", // 验证码
      invitation: "", // 邀请码
      password: "", // 登录密码
      passwordConf: "", // 确认登录密码
      twopassword: "", // 二级密码
      twopasswordConf: "", // 确认二级密码
      yqmType: false, // 邀请码隐藏
      pwdType: false, // 密码隐藏
      pwdConfType: false, // 确认密码隐藏
      twoPwdType: false, // 二级密码隐藏
      twoPwdTypeConf: false // 确认二级密码隐藏
    };
  },
  components: {
    smsCode
  },
  methods: {
    // 手机验证码
    getCode() {
      var re = /^[1][3,4,5,7,8,9][0-9]{9}$|^[8]\d{10}$/;
      // /^[1][3-9][0-9]{9}$/
      if (!re.test(this.mobile)) {
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
        console.log("手机号" + mobile);
        let rsaPassWord = encryptor.encrypt(
          JSON.stringify({ type: 0, mobile: mobile })
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
    // 注册
    signIn() {
      var psw = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
      var reg = /^[1][3,4,5,7,8,9][0-9]{9}$|^[8]\d{10}$/;
      var second = /^\d{6}$/;
      if (this.mobile.trim() == "") {
        this.$toast("手机号不能为空");
        return;
      }
      if (!reg.test(this.mobile)) {
        this.$toast("手机号格式不正确");
        return;
      }
      if (this.verify.trim() == "") {
        this.$toast("请输入验证码");
        return;
      }
      if (this.password.trim() == "") {
        this.$toast("请输入登录密码");
        return;
      } else if (!psw.test(this.password)) {
        this.$toast("密码为6-20位字母数字组合");
        return;
      }

      if (this.password.trim() != this.passwordConf.trim()) {
        this.$toast("两次密码输入不一致");
        return;
      }
      if (this.twopassword.trim() == "") {
        this.$toast("请输入二级密码");
        return;
      } else if (!second.test(this.twopassword)) {
        this.$toast("二级密码为6位数字");
        return;
      }
      if (this.twopasswordConf.trim() != this.twopassword.trim()) {
        this.$toast("两次二级密码输入不一致");
        return;
      }
      const formData = {
        mobile: this.mobile, //手机号
        pwd: this.password, //登录密码
        pwd2: this.twopassword, //二级密码
        code: this.verify, //验证码
        pmobile: this.invitation //邀请人手机号
      };
      this.$http.post("User/register", formData).then(response => {
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
    // 跳转到登录
    goLogin() {
      this.$router.push("/Login");
    },

    // 电话输入框右侧icon 点击事件
    clickIconClose() {
      this.mobile = "";
    },
    // 验证码输入框右侧icon 点击事件
    clickInvi() {
      this.yqmType = !this.yqmType; //跟着小眼睛变化，密码框隐藏显示文本框
    },
    // 密码输入框右侧icon 点击事件
    clickPsw() {
      this.pwdType = !this.pwdType; //跟着小眼睛变化，密码框隐藏显示文本框
    },
    // 确认密码输入框右侧icon 点击事件
    clickPswConf() {
      this.pwdConfType = !this.pwdConfType; //跟着小眼睛变化，密码框隐藏显示文本框
    },
    // 二级密码输入框右侧icon 点击事件
    clickTwoPsw() {
      this.twoPwdType = !this.twoPwdType; //跟着小眼睛变化，密码框隐藏显示文本框
    },
    // 确认二级密码输入框右侧icon 点击事件
    clickConfTwoPsw() {
      this.twoPwdTypeConf = !this.twoPwdTypeConf; //跟着小眼睛变化，密码框隐藏显示文本框
    },
    // 发送验证码
    goVerify() {
      console.log("验证码");
    },
    routerBack() {
      this.$router.push("/Login");
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
/* 登陆按钮 */
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
.sign_box {
  text-align: center;
  margin: 25px 0 35px 0;
}
.sign_box span:nth-child(2) {
  color: #2aa3e9;
}

.van-button--primary {
  color: #2aa3e9;
  background-color: #151936;
  border: none;
}
</style>

