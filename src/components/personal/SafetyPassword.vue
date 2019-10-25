<template>
  <div class="exchanged">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="修改登陆密码" @click-left="routerBack" />
    <div class="content">
      <van-cell-group>
        <div class="input_title">输入新登陆密码：</div>
        <van-field v-model="password" placeholder="密码为6-20位字母数字组合" />
        <div class="input_title">确认新登陆密码：</div>
        <van-field v-model="passwordConf" placeholder="密码为6-20位字母数字组合" />
        <div class="input_title">输入验证码：</div>
        <van-field class="input_icon" v-model="verify" type="namber" />
        <sms-code v-model="verify" @getCode="getCode"></sms-code>
      </van-cell-group>
      <!-- 按钮 -->
      <div class="confirm">
        <van-button round type="info" size="large" @click="Determine">确定</van-button>
      </div>
      <div class="hint">
        <div>友情提示：</div>
        <div>1.请不要设置之前用过的旧密码，否则密码修改不成功。</div>
        <div>2.请不要频繁修改密码，每日最多可修改3次。</div>
      </div>
    </div>
  </div>
</template>

<script>
import smsCode from "@/components/bin/smsCode";
export default {
  data() {
    return {
      password: "",
      passwordConf: "",
      verify: ""
    };
  },
  components: {
    smsCode
  },
  methods: {
    //确定提交
    Determine() {
      var psw = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
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
      const formData = {
        new_psw: this.password,
        code: this.verify,
        type: 1
      };
      this.$http.post("User/edit", formData).then(response => {
        // console.log(response.data);
        const res = response.data;
        if (res.status === 200) {
          this.$toast(res.msg);
          this.$router.push("/Login");
        } else {
          this.$toast(res.msg);
        }
      });
    },

    // 手机验证码
    getCode() {
      this.$http.post("Index/sms").then(response => {
        const res = response.data;
        this.$toast(res.msg);
      });
    },
    routerBack() {
      this.$router.push("/Safety");
    }
  }
};
</script>

<style scoped>
.content {
  padding: 0 24px;
}
/* 输入框 */
.van-cell {
  padding: 10px 0;
}
.input_title {
  color: #c9e6fc;
  font-size: 14px;
  margin-top: 20px;
}
.van-cell::after {
  border-bottom: 1px solid #0c4586 !important;
}
.usable {
  margin-top: 6px;
  color: #00b1ff;
}
.charge {
  font-size: 14px;
  margin-top: 17px;
  display: flex;
  justify-content: space-between;
}
.confirm {
  margin: 37px 0;
}
.confirm .van-button {
  height: 40px;
  line-height: 38px;
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
  margin-right: 10px;
}
.hint {
  color: #c9e6fc;
}
</style>