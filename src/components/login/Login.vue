<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar  title="登陆" />
    <div class="logo">
      <img src="../../assets/img/logo.png" alt />
    </div>
    <!-- <div class="title">登陆</div> -->
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
      <!-- 密码显示 -->
      <van-field
        v-model="password"
        label="登陆密码"
        placeholder="请输入登录密码"
        @click-right-icon="clickIconEye"
        right-icon="closed-eye"
        v-if="pwdType"
      />
      <!-- 密码隐藏 -->
      <van-field
        v-model="password"
        type="password"
        label="登陆密码"
        placeholder="请输入登录密码"
        @click-right-icon="clickIconEye"
        right-icon="eye-o"
        v-else
      />
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login_ipt">
      <van-button round type="info" size="large" @click="submit">登陆</van-button>
    </div>
    <!-- 底部 -->
    <div class="sign_box">
      <span>新用户？</span>
      <span @click="Register">注册</span>
      <span>&nbsp;/&nbsp;</span>
      <span @click="Forget">忘记密码？</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      password: "",
      pwdType: false
    };
  },
  methods: {
    // 登录
    submit() {
      // var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      // var reg = /^\d{11}$/;
      var reg = /^[1][3,4,5,7,8,9][0-9]{9}$|^[8]\d{10}$/;
      if (this.mobile == "") {
        this.$toast("手机号不能为空");
        return;
      }
      if (!reg.test(this.mobile)) {
        this.$toast("手机号格式不正确");
        return;
      }
      if (this.password.trim() == "") {
        this.$toast("请输入密码");
        return;
      }
      const formData = {
        mobile: this.mobile,
        pwd: this.password
      };
      this.$http.post("User/login", formData).then(response => {
        // console.log(response.data);
        const res = response.data;
        if (res.status === 200) {
          // 登录成功
          this.$http.defaults.headers.token = res.data.token;
          // console.log(res.data.token)
          localStorage.setItem("accessToken", res.data.token);
          this.$toast("登录成功");
          this.$router.push("/Home");
        } else {
          this.$toast(res.msg);
        }
      });
      //this.$router.push('/home');
    },
    // tile < 返回
    routerBack() {
      localStorage.clear();
      this.$router.push("/Personal");
    },
    // 注册
    Register() {
      this.$router.push("/Register");
    },
    // 忘记密码
    Forget() {
      this.$router.push("/Forget");
    },
    // 输入框右侧icon 点击事件
    clickIconClose() {
      this.mobile = "";
    },
    clickIconEye() {
      this.pwdType = !this.pwdType; //跟着小眼睛变化，密码框隐藏显示文本框
    }
  }
};
</script>

<style scoped>
.login {
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
  /* padding-left: 10px; */
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
  margin-top: 25px;
}
.sign_box span:nth-child(1) {
  color: #c1c6db;
}
.sign_box span:nth-child(n + 2) {
  color: #2aa3e9;
}
</style>
