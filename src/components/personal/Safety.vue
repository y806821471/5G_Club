<template>
  <div class="address">
    <van-nav-bar title="安全中心" left-arrow @click-left="routerBack" />
    <ul class="list">
      <router-link tag="li" to="/AddAlipay" class="list-item">
        <div class="left">
          <div class="icon icon_lock">&#xe608;</div>
          <div>
            <div>添加支付宝账号</div>
          </div>
        </div>
        <div class="right">
          <span class="center2" v-if="!allStatus.account">已添加</span>
          <span class="center" v-else>未添加</span>
          <span class="icon">&#xe695;</span>
        </div>
      </router-link>
      <router-link tag="li" to="/AddBank" class="list-item">
        <div class="left">
          <div class="icon icon_lock">&#xe63a;</div>
          <div>
            <div>添加银行卡</div>
          </div>
        </div>
        <div class="right">
         <span class="center2" v-if="!allStatus.account">已添加</span>
          <span class="center" v-else>未添加</span>
          <span class="icon">&#xe695;</span>
        </div>
      </router-link>
    </ul>

    <ul class="list">
      <!-- SafetyPassword   &#xe625; DealPassword -->
      <router-link tag="li" to="/SafetyPassword" class="list-item">
        <div class="left">
          <div class="icon icon_lock">&#xe625;</div>
          <div>
            <div>登陆密码修改</div>
          </div>
        </div>
        <div class="right">
          <span class="icon">&#xe695;</span>
        </div>
      </router-link>
      <router-link tag="li" to="/DealPassword" class="list-item">
        <div class="left">
          <div class="icon icon_lock">&#xe625;</div>
          <div>
            <div>交易密码修改</div>
          </div>
        </div>
        <div class="right">
          <span class="icon">&#xe695;</span>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
       allStatus: {},
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http("/User/bankList").then(response => {
        const res = response.data.data;
        console.log(res);
        this.allStatus = res;
      });
    },
    routerBack() {
      this.$router.push("/Personal");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  width: 92%;
  margin: 15px 4%;
  padding: 0 4%;
  background: linear-gradient(
    90deg,
    rgba(16, 31, 63, 1) 0%,
    rgba(14, 62, 121, 1) 100%
  );
  border: solid 0.5px #0b4586;
  border-radius: 8px;
}
.list li {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: solid 1px #0c4586;
  border-bottom: solid 1px #0c4586;
}
.icon_lock {
  color: #2053ec;
  background-image: -webkit-linear-gradient(top, #2aa4e9, #2053ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
}
.list .left {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.list .left .icon {
  margin-right: 10px;
  font-size: 20px;
}
.list li:last-of-type {
  border: 0;
}
.center {
  font-size: 13px;
}
.center2 {
  font-size: 13px;
  color: #7da3bf;
}
.list .right {
  display: flex;
  align-items: center;
  color: #00b1ff;
  font-size: 15px;
}
/* .center{
   vertical-align: middle;
} */
.right .icon {
  margin-top: 3px;
}
</style>
