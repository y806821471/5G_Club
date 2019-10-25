<template>
  <div class="recognition">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="认筹" @click-left="routerBack" />

    <div class="num">{{gameCoinMoney}}娱乐币</div>
    <div class="select">请选择认筹</div>
    <ul class="select_box">
      <li
        class="list_box"
        :class="{active: moneyId == item.id}"
        @click="selected(item)"
        v-for="item in recogniList"
        :key="item.id"
      >
        <div class="top">
          <span>{{item.money_lock}}</span>
          <span>&nbsp;(娱乐股)</span>
        </div>
        <!-- <div class="bottom">
          支付{{item.money}}
          <span>( 娱乐币 )</span>
        </div>-->
      </li>
    </ul>
    <div class="login_but">
      <van-button round type="info" size="large" @click="showPopup">确认</van-button>
    </div>
    <div class="hint">
      提示：
      <br />1.娱乐股可使用100%的娱乐币认筹
      <br />2.娱乐股可使用不少于60%娱乐币+应用币组合认筹
    </div>
    <!-- 弹出层 -->
    <!-- :style="{ height: '50%' }" -->
    <van-popup v-model="show" position="bottom">
      <div class="header">
        <span class="header_text">确认支付</span>
        <span class="icon guanbi" @click="guanbiPopup">&#xe732;</span>
      </div>
      <div class="content">
        <div class="title_num">
          <span>{{coinMoney}}</span>
          <span class="title_text">&nbsp;(娱乐股)</span>
        </div>
        <div class="asset">
          <p>可用娱乐币：0.00</p>
          <p>可用应用币：0.00</p>
        </div>

        <!-- tab标签 -->
        <van-tabs
          v-model="active"
          background="#151936"
          line-height="0"
          title-active-color="#CCE9FF"
        >
          <van-tab>
            <div slot="title">
              <span style="font-size:13px">
                <span class="outer_circle">
                  <span class="inner_circle" v-if="active == 0"></span>
                </span>娱乐币认筹
              </span>
            </div>
            <van-cell-group>
              <van-field v-model="passWord" placeholder="请输入交易密码 " type="password" />
            </van-cell-group>
            <van-cell-group>
              <van-field v-model="passWord" placeholder="请输入交易密码 " type="password" />
            </van-cell-group>
          </van-tab>
          <van-tab>
            <div slot="title">
               <span style="font-size:13px">
                <span class="outer_circle">
                  <span class="inner_circle" v-if="active == 1"></span>
                </span>娱乐币+应用币组合认筹
              </span>
            </div>
            <van-cell-group>
              <van-field v-model="passWord" placeholder="请输入交易密码 " type="password" />
            </van-cell-group>
            <van-cell-group>
              <van-field v-model="passWord" placeholder="请输入交易密码 " type="password" />
            </van-cell-group>
            <van-cell-group>
              <van-field v-model="passWord" placeholder="请输入交易密码 " type="password" />
            </van-cell-group>
          </van-tab>
        </van-tabs>
        <!-- 输入框 -->
        <!-- <van-cell-group>
          <van-field v-model="passWord" placeholder="请输入交易密码 " type="password" />
        </van-cell-group>-->
        <div class="hint">提示：1.如遇到问题，请联系客服来解决问题</div>
        <div class="login_but pay_but">
          <van-button round type="info" size="large" @click="paySubmit">确认支付</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
      show: false,
      value: "",
      recogniList: [], //认筹列表
      gameCoinMoney: "", //娱乐币
      moneyId: 1, //选择的认筹id
      coinMoney: 0, //选择娱乐币
      passWord: "" //交易密码
    };
  },
  mounted() {
    this.getRecogniInfo();
    this.getUserInfo();
  },
  methods: {
    selected(item) {
      this.moneyId = item.id;
      this.coinMoney = item.money;
    },
    //娱乐股认筹列表
    getRecogniInfo() {
      ///user/info
      this.$http.get("Wallet/moneyLockList").then(response => {
        const res = response.data;
        if (res.status === 200) {
          this.recogniList = res.data;
          console.log(this.recogniList);
          this.moneyId = this.recogniList[0].id;
          this.coinMoney = this.recogniList[0].money;
          // console.log(this.moneyId+"idddd")
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
    // 弹出层
    showPopup() {
      // console.log(2);
      this.show = true;
    },
    // 关闭弹出层
    guanbiPopup() {
      this.show = false;
    },
    // 确认支付
    paySubmit() {
      this.show = false;
      const formData = {
        id: this.moneyId,
        pwd: this.passWord
      };
      this.$http.post("Wallet/moneyToLock", formData).then(response => {
        const res = response.data;
        console.log(res);
        if (res.status === 200) {
          this.$toast(res.msg);
          this.passWord = "";
          this.getUserInfo();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    routerBack() {
      this.$router.push("/Home");
    }
  }
};
</script>

<style scoped>
.num {
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  margin-top: 10px;
  background: linear-gradient(to right, #101b36, #0e3b75);
  border-top: 1px solid #0e3b75;
  border-bottom: 1px solid #0e3b75;
}
.select {
  font-size: 13px;
  margin: 20px 0 0 20px;
}
.select_box {
  margin: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.list_box {
  width: 48%;
  box-sizing: border-box;
  color: #bbd8ef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 18px 0;
  margin-top: 20px;
  border: 1px solid #0e3b75;
  border-radius: 8px;
  /* height: 60px; */
  /* margin: 10px 12px 10px 16px; */
  /* background: url("../../assets/img/rectangle.png") ; */
  /* background-size: 146px 60px; */
}
.active {
  width: 48%;
  box-sizing: border-box;
  color: #bbd8ef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 18px 0;
  margin-top: 20px;
  border: 1px solid #0e3b75;
  border-radius: 8px;
  background: url("../../assets/img/rectangle.png");
  background-size: 100% 100%;
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top span:nth-child(1) {
  font-size: 18px;
}
.top span:nth-child(2) {
  color: #7da3bf;
  font-size: 12px;
}
.bottom {
  font-size: 14px;
}
.bottom span {
  color: #7da3bf;
  font-size: 12px;
}
.login_but {
  margin: 40px 0;
  padding: 0 20px;
}
.pay_but {
  margin: 40px 0;
  padding: 0;
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
  border-radius: 23px;
}
/* 弹出层 */
.van-popup {
  /* text-align: center; */
  background-color: #151936;
}
.content {
  padding: 0 20px;
}
.title_num {
  text-align: center;
  margin-top: 19px;
  font-size: 23px;
  color: #cce9ff;
}
.title_text {
  font-size: 13px;
  color: #cce9ff;
}
.van-cell-group {
  margin: 10px 0;
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
  text-align: center;
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
.hint {
  margin: 20px 40px;
}
.asset {
  text-align: left;
  padding: 10px 0;
  line-height: 20px;
  color: #2aa3e9;
}
.outer_circle {
  position: relative;
  width: 18px;
  height: 18px;
  border: 1px solid #2053EC;
  border-radius: 50%;
margin-right: 10px;
}
.inner_circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(42, 164, 233, 1) 0%,
    rgba(32, 83, 236, 1) 100%
  );
}
.van-tab span{
  display: inline-block;
  display: flex;
  align-items: center;
}
</style>