<template>
  <div class="Myproperty">
    <van-nav-bar title="我的资产" left-arrow @click-left="routerBack" />
    <ul>
      <!-- <router-link :to="{path:'/Financial'}" class="ore-item" > -->
      <!-- 娱乐币 -->
      <li class="ore-item">
        <div class="list_hd">
          <div class="left">
            <span style="margin-right:10px">娱乐币</span>
            <span class="num">0.00</span>
          </div>
          <div class="right" @click="goFinancial">
            <span>财务明细</span>
            <span class="icon">&#xe695;</span>
          </div>
        </div>
        <div class="list_bd1">
          <van-button round type="info" size="small" class="button1" @click="conversionYLB">兑换</van-button>
          <van-button round type="info" size="small" class="button1" @click="withdrawYLB">提现</van-button>
          <van-button round type="info" size="small" @click="topUp">充值</van-button>
        </div>
      </li>
      <!-- 股权币 -->
      <li class="ore-item">
        <div class="list_hd">
          <div class="left">
            <span class="num">0.00</span>
          </div>
          <div class="right" @click="goFinancial">
            <span>财务明细</span>
            <span class="icon">&#xe695;</span>
          </div>
        </div>
        <div class="list_bd">
          <span>股权币</span>
          <van-button round type="info" size="small" @click="convertGQB">转换</van-button>
        </div>
      </li>
      <!-- 应用币 -->
      <li class="ore-item">
        <div class="list_hd">
          <div class="left">
            <span class="num">0.00</span>
          </div>
          <div class="right" @click="goFinancial">
            <span>财务明细</span>
            <span class="icon">&#xe695;</span>
          </div>
        </div>
        <div class="list_bd">
          <span>应用币</span>
          <van-button round type="info" size="small" class="button1" @click="conversionYYB">兑换</van-button>
        </div>
      </li>
      <!-- 娱乐股 -->
      <li class="ore-item">
        <div class="list_hd">
          <div class="left">
            <span class="num">0.00</span>
          </div>
          <div class="right" @click="goFinancial">
            <span>财务明细</span>
            <span class="icon">&#xe695;</span>
          </div>
        </div>
        <div class="list_bd">
          <span>娱乐股</span>
          <!-- <van-button round type="info" size="small" class="button1">兑换</van-button> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    routerBack () {
      this.$router.push("/Home");
    },
    // 跳转到财务明细
    goFinancial () {
      this.$router.push("/Financial");
    },
    // 娱乐币-兑换按钮
    conversionYLB () {
      this.$router.push("/ExchangeYLB");
    },
    // 娱乐币-提现按钮
    withdrawYLB(){
      this.$router.push("/WithdrawYLB");
    },
    // 娱乐币-充值按钮  
    topUp () {
      this.$router.push("/TopUpYLB");
    },
    // 股权币-转换按钮
    convertGQB () {
      this.$router.push("/ConvertGQB");
    },
    // 应用币-兑换按钮
    conversionYYB () {
      this.$router.push("/ExchangeYYB");
    }

  }
};
</script>

<style scoped>
/* 按钮 */
.van-button--small {
  min-width: 80px;
  padding: 0 15px;
  font-size: 13px;
  background: linear-gradient(180deg, #2aa4e9 0%, #2053ec 100%);
  margin-left: 10px;
}
.button1 {
  background: transparent;
  border: 1px solid #b3cce4;
  color: #7da3bf;
}
ul {
  padding: 10px 15px;
}
.ore-item {
  min-height: 105px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-bottom: 15px;
  color: #7da3bf;
  box-shadow: inset 0px 0px 25px #17a2ff;
}
.list_hd {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
}
.left {
  display: flex;
  align-items: center;
}
.right {
  display: flex;
  align-items: center;
}
.num {
  font-size: 21px;
  color: #00b1ff;
}
.icon {
  color: #00b1ff;
  font-size: 22px;
}
.list_bd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list_bd1 {
  display: flex;
  justify-content: flex-end;
}
</style>