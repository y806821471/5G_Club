<template>
  <div class="exchanged">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="互转" @click-left="routerBack" />
    <div class="content">
      <van-cell-group>
        <div class="input_title">兑换币种：</div>
        <div class="select" @click="showPopup">
          <van-field v-model="moneyKind" disabled />
          <van-icon name="arrow-down" />
        </div>
        <div class="input_title">手机号码：</div>
        <van-field v-model="mobileNumber" placeholder="请输入对方手机号码" />
        <div class="input_title">转帐数量：</div>
        <van-field v-model="TransNumber" placeholder="请输入转帐数量" />
        <div class="usable">可用{{gameCoinMoney}}娱乐币</div>
        <div class="input_title">交易密码：</div>
        <van-field v-model="password" type="password" placeholder="请输入交易密码" />
      </van-cell-group>
      <div class="charge">
        <span>互转手续费（{{feedMoney}}）%</span>
        <span>{{(this.TransNumber*(this.feedMoney/100)).toFixed(2)}}娱乐币</span>
      </div>
      <!-- 按钮 -->
      <div class="confirm">
        <van-button round type="info" size="large" @click="exchangSubmit">确定</van-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      moneyKind: "请选择",
      show: false,
      currencyList: [
        { text: '娱乐币' },
        { text: '应用币' },
      ],
      TransNumber: "",
      mobileNumber: "", //手机号
      password: "", //密码
      gameCoinMoney: "", //娱乐币
      feedMoney: "", //互转手续费
      feedName: "" //手续费名
    };
  },
  mounted() {
    this.getWalletFeed();
    this.getUserInfo();
  },
  computed: {},
  methods: {
    exchangSubmit() {
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
    //互转手续费
    getWalletFeed() {
      this.$http.get("Wallet/fee").then(response => {
        const res = response.data;
        if (res.status === 200) {
          this.feedName = res.data.type_name;
          this.feedMoney = res.data.type_value;
        }
      });
    },
    // 用户信息
    getUserInfo() {
      this.$http("User/info").then(response => {
        // console.log(response.data.data)
        this.userInfo = response.data.data;
        this.gameCoinMoney = this.userInfo.money;
      });
    },
    // 币种选择
    showPopup() {
      this.show = true;
    },
    getType(text) {
      // console.log(text);
      this.show = false;
      this.moneyKind = text;
    },
    routerBack() {
      this.$router.push("/Home");
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
/* ---- */
.input_title {
  font-size: 14px;
  margin-top: 20px;
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