<template>
  <div class="MoneyApps">
    <!-- 头部 -->
    <van-nav-bar
      title="理财应用"
      left-arrow
      @click-left="routerBack"
      right-text="我的理财"
      @click-right="onClickRight"
      fixed
    />
    <div class="content">
      <ul>
        <li class="buy-item" v-for="item in list" :key="item.id">
          <div class="left">
            <div>
              <strong>{{item.title}}</strong>
            </div>
            <div>
              存币收益：
              <span class="color1">+{{item.profit_rate}}%</span>
            </div>
            <div>
              收益合计：
              <span class="color1">{{item.profit}}娱乐币</span>
            </div>
            <div>
              周期：
              <span class="color1">{{item.time_cycle}}天</span>
            </div>
          </div>
          <div class="right">
            <van-button round type="info" size="small" @click="showPopup(item)">立即参与</van-button>
          </div>
        </li>
      </ul>
      <!-- 弹出层 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <div class="header">
          <span class="header_text">立即参与</span>
          <span class="icon guanbi" @click="guanbiPopup">&#xe732;</span>
        </div>
        <div class="title_num">{{coinMoney}}</div>
        <div class="title_text">( 娱乐币 )</div>
        <!-- 输入框 -->
        <van-cell-group>
          <van-field v-model="passWord" placeholder="请输入交易密码 " type="password" />
        </van-cell-group>
        <div class="sum">可用娱乐币：{{gameCoinMoney}}</div>
        <div class="hint">提示：1.如遇到问题，请联系客服来解决问题</div>
        <div class="login_but pay_but">
          <van-button round type="info" size="large" @click="paySubmit">确认支付</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      passWord: "", // 交易密码,
      coinMoney: "", // item.money:购买需投入的金额
      moneyId: "", // id
      gameCoinMoney: "", //娱乐币
      list: []
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    routerBack() {
      this.$router.push("/Apply");
    },
    // 我的理财
    onClickRight() {
      this.$router.push("/MyMoney");
    },
    // 立即参与（弹出层）
    showPopup(item) {
      this.moneyId = item.id;
      this.coinMoney = item.money;
      this.show = true;
    },
    // 关闭弹出层按钮
    guanbiPopup() {
      this.show = false;
    },
    // 用户信息
    getUserInfo() {
      this.$http("User/info").then(response => {
        console.log(response.data.data);
        this.userInfo = response.data.data;
        this.gameCoinMoney = this.userInfo.money;
      });
    },
    // 理财应用列表数据
    getInfo() {
      this.$http.get("Apps/moneyPool").then(response => {
        console.log("理财应用", response.data.data);
        const res = response.data.data;
        this.list = res;
      });
      this.getUserInfo();
    },
    // 确认支付
    paySubmit() {
      const formData = {
        app_id: this.moneyId,
        pwd: this.passWord
      };
      this.$http.post("Apps/moneyPoolBuy", formData).then(response => {
        const res = response.data;
        console.log(res);
        if (res.status === 200) {
          this.$toast(res.msg);
          this.passWord = "";
          this.show = false;
        } else {
          this.$toast(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.van-nav-bar__text {
  color: #cce9ff;
}
.content {
  margin-top: 76px;
  padding: 0 15px;
}

.buy-item {
  padding: 15px 4%;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: #0f2b57;
  border-radius: 5px;
  margin-top: 15px;
}
.buy-item .left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 25px;
  color: #7da3bf;
}
.buy-item .left strong {
  font-size: 15px;
  font-weight: normal;
  color: #cce9ff;
}
.color1 {
  color: #fec006;
  font-size: 14px;
}
.buy-item .right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* 按钮 */
.van-button--small {
  padding: 0 15px;
  font-size: 13px;
  background: linear-gradient(180deg, #2aa4e9 0%, #2053ec 100%);
}
/* 弹出层 */
.sum {
  text-align: left;
  margin: 0 0 10px 29px;
}
.van-popup {
  text-align: center;
  background-color: #151936;
}
.title_num {
  margin-top: 19px;
  font-size: 23px;
  color: #2aa3e9;
}
.title_text {
  font-size: 13px;
  color: #7da3bf;
}
.van-cell-group {
  margin: 10px 20px;
}
.van-cell {
  width: 100%;
  color: #7da3bf;
  border-radius: 6px;
  padding: 10px 17px;
  background: linear-gradient(to right, #101b36, #0e3b75);
  border: 1px solid #0e3b75;
}
.hint {
  text-align: left;
  color: #7da3bf;
  margin-left: 29px;
}
.header {
  position: relative;
  height: 60px;
  background-color: #121415;
  line-height: 60px;
}
.header .header_text {
  font-size: 15px;
}
.header .guanbi {
  position: absolute;
  top: 0;
  right: 24px;
  font-size: 18px;
}
.login_but {
  margin-top: 40px;
  padding: 0 34px;
}
.van-button--large {
  width: 100%;
  height: 40px;
  line-height: 38px;
  background: linear-gradient(
    180deg,
    rgba(42, 164, 233, 1) 0%,
    rgba(32, 83, 236, 1) 100%
  );
}
</style>