<template>
  <div class="ExchangeYLB">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="兑换" @click-left="routerBack" />
    <div class="content">
      <van-cell-group>
        <div class="input_title">兑换币种：</div>
        <div class="select" @click="showPopup">
          <van-field v-model="mobileNumber" disabled />
          <van-icon name="arrow-down" />
        </div>
        <div class="input_title">兑换数量：</div>
        <van-field v-model="TransNumber" placeholder="请输入兑换数量" />
        <div class="usable">可用{{gameCoinMoney}}娱乐币</div>
        <div class="input_title">交易密码：</div>
        <van-field v-model="password" type="password" placeholder="请输入交易密码" />
      </van-cell-group>
      <!-- 按钮 -->
      <div class="confirm">
        <van-button round type="info" size="large" @click="exchangSubmit">确定</van-button>
      </div>
    </div>
    <!-- Popup 弹出层 -->
    <van-popup v-model="show" position="right">
      <ul>
        <li
          v-for="(item,index) in currencyList"
          :key="index"
          @click="getType(item.text)"
        >{{item.text}}</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      TransNumber: "",
      mobileNumber: '请选择',
      password: "", //密码
      gameCoinMoney: "", //娱乐币
      show: false,
      currencyList: [
        { text: '娱乐币' },
        { text: '应用币' },
      ],
    };
  },
  mounted () {
    this.getUserInfo();
  },
  computed: {},
  methods: {
    exchangSubmit () {
      const formData = {
        mobile: this.mobileNumber,
        money: this.TransNumber,
        pwd: this.password
      };
      this.$http.post("Wallet/send", formData).then(response => {
        const res = response.data;
        // console.log(res);
        if (res.status === 200) {
          this.$toast("互转成功");
          this.$router.back();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 用户信息
    getUserInfo () {
      this.$http("User/info").then(response => {
        // console.log(response.data.data)
        this.userInfo = response.data.data;
        this.gameCoinMoney = this.userInfo.money;
      });
    },
    routerBack () {
      this.$router.push("/Myproperty");
    },
    // 币种选择
    showPopup () {
      this.show = true;
    },
    getType (text) {
      // console.log(text);
      this.show = false
      this.mobileNumber = text;
    },

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
  margin: 65px 0;
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
.van-dropdown-menu {
  height: 44px;
  background: transparent;
}
/* 选择币种 */
.select {
  position: relative;
}
.van-icon-arrow-down {
  position: absolute;
  top: 35%;
  right: 2%;
  color: #029ae4;
}
/* 弹出层 */
.van-popup {
  background: #0e386e;
  border-radius: 5px;
  padding: 14px 10px;
  top: 180px;
  right: 5%;
}
.van-popup li {
  padding: 0 10px;
}
.van-popup li:nth-child(1) {
  border-bottom: 1px solid #0c4586;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
</style>