<template>
  <div class="WithdrawYLB">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="提现" @click-left="routerBack" />
    <!-- tab切换>>已添加收款账户 -->
    <van-tabs
      v-model="active"
      line-width="30px"
      background="#151936"
      title-active-color="#00B1FF"
      @click="onClick"
      v-if="payInfo.account"
    >
      <!-- 支付宝充值 -->
      <van-tab title="支付宝提现">
        <div class="account_ZFB">
          <div>收款账号</div>
          <div>
            <span>支付宝账号：</span>
            <span>{{payInfo.account}}</span>
          </div>
        </div>
      </van-tab>
      <!-- 银行卡充值 -->
      <van-tab title="银行卡提现">
        <div class="account_YHK">
          <p>收款账号</p>
          <div>
            <span>姓名：</span>
            <span>{{payInfo.bank_name}}</span>
          </div>
          <div>
            <span>银行：</span>
            <span>{{payInfo.bank_location}}</span>
          </div>
          <div>
            <span>账号：</span>
            <span>{{payInfo.bank_account}}</span>
          </div>
        </div>
      </van-tab>
      <div class="num">
        <span>可提娱乐币：</span>
        <span>{{userInfo.money}}</span>
        <div class="color">提现时间为09:00-18:00,申请提现后两小时内到账</div>
      </div>
      <van-cell-group>
        <div class="input_title">提现金额：</div>
        <van-field v-model="validateForm.number" placeholder="请输入您要充值的金额" />
        <div class="input_title">交易密码：</div>
        <van-field v-model="validateForm.password" type="password" placeholder="请输入交易密码" />
        <div class="cost">
          <span>手续费：</span>
          <span>200</span>
          <span>&nbsp;娱乐币</span>
        </div>
        <div class="confirm">
          <van-button round type="info" size="large"  @click="submit">申请提现</van-button>
        </div>
      </van-cell-group>
    </van-tabs>

    <!-- tab切换>>未添加收款账户 -->
    <van-tabs v-model="active2" line-width="30px" background="#151936" title-active-color="#00B1FF" v-else>
      <van-tab title="支付宝提现">
        <div class="num2">
          <span>可提娱乐币：</span>
          <span>1200</span>
          <div class="color">提现时间为09:00-18:00,申请提现后两小时内到账</div>
        </div>
        <div class="addCard" @click="addCard_ZFB">
          <span class="icon icon_card">&#xe63a;</span>
          <span>请您先添加收款账户</span>
          <span class="icon icon_right">&#xe695;</span>
        </div>
      </van-tab>
      <van-tab title="银行卡提现">
        <div class="num2">
          <span>可提娱乐币：</span>
          <span>1200</span>
          <div class="color">提现时间为09:00-18:00,申请提现后两小时内到账</div>
        </div>
        <div class="addCard" @click="addCard_YHK">
          <span class="icon icon_card">&#xe63a;</span>
          <span>请您先添加收款账户</span>
          <span class="icon icon_right">&#xe695;</span>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      active: 0,
      validateForm: {
        number: "",
        password: ""
      },
      payInfo: {
        account: "", //支付宝账号
        account_img: "", //支付宝收款码
        bank_name: "", //银行卡姓名
        bank_location: "", //开户行
        bank_account: "" //银行卡卡号
      },
      active2: 0
    };
  },
  created() {
    this.getUserInfo();
    this.getInfo(2);
  },
  methods: {
    // 用户信息
    getUserInfo() {
      this.$http("User/info").then(response => {
        this.userInfo = response.data.data;
      });
    },
    onClick(index, title) {
      if (!this.payInfo.account && this.active == 0) {
        this.getInfo(2);
      }
      if (!this.payInfo.bank_location && this.active == 1) {
        this.getInfo(3);
      }
    },
    // 支付宝/银行卡信息获取
    getInfo(type) {
      const params = {
        type: type
      };
      this.$http("/User/bankList", { params: params }).then(response => {
        const res = response.data.data;
        console.log(res);
         if (!!res && type === 2) {
          this.payInfo.account = res[0].account;
        } else if (!!res && type ===3) {
          this.payInfo.bank_name = res[0].bank_name;
          this.payInfo.bank_location = res[0].bank_location;
          this.payInfo.bank_account = res[0].bank_account;

        }
      });
    },
    // 提交
        submit() {
      if(Number(this.validateForm.number) <= 0) {
        this.$toast('请输入正确的数量');
        return;
      }
      if(!(/^\d{6}$/.test(this.validateForm.password))){
        this.$toast('交易密码为六位数字');
        return;
      }
      const formData = {
        type: this.active+2,
        num: this.validateForm.number,
        trade: this.validateForm.password,
      };
      this.$http.post("/User/withdraw", formData).then(response => {
        const res = response.data;
        this.$toast(res.msg);
        if(res.status === 200) {
          this.$router.back();
        }
      });
    },
    routerBack() {
      this.$router.push("/Myproperty");
    },
    // 添加收款账户>>支付宝
    addCard_ZFB() {
      this.$router.push("/AddAlipay");
    },
    // 添加收款账户>>银行卡
    addCard_YHK() {
      this.$router.push("/AddBank");
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
  line-height: 42px;
}
.num {
  padding: 0 20px;
  font-size: 14px;
  line-height: 35px;
  margin-top: 10px;
}
.num2 {
  padding: 20px;
  font-size: 14px;
  line-height: 35px;
  background: linear-gradient(
    90deg,
    rgba(16, 31, 63, 1) 0%,
    rgba(14, 62, 121, 1) 100%
  );
}
.color {
  color: #fdbf06;
}
.cost {
  font-size: 14px;
  margin-top: 10px;
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

.confirm .van-button {
  max-height: 40px;
  line-height: 38px;
  background: linear-gradient(
    180deg,
    rgba(42, 164, 233, 1) 0%,
    rgba(32, 83, 236, 1) 100%
  );
  margin: 45px 0;
}
.addCard {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  font-size: 13px;
  color: #00b1ff;
}
.icon_card {
  margin-right: 8px;
  font-size: 20px;
  color: #2053ec;
  background-image: -webkit-linear-gradient(top, #2aa4e9, #2053ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.icon_right {
  margin-top: 3px;
}
</style>