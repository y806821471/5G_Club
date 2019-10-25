<template>
  <div class="my">
    <van-nav-bar title="我的" />
    <!-- <img src="../../assets/img/personal.png" alt=""> -->
    <div class="info">
      <div class="info_left">
        <div class="general" v-if="userInfo.level==0">
          <img src="../../assets/img/bgu1.png" alt />
          <p>{{userInfo.level_name}}</p>
        </div>
        <div class="general" v-else>
          <img src="../../assets/img/bgu2.png" alt />
          <p>{{userInfo.level_name}}</p>
        </div>
        <div class="idid">ID：{{userInfo.mobile}}</div>
      </div>
      <div class="info_right icon" @click="dropOut">&#xe6bb;</div>
    </div>
    <div class="asset">
      <div class="asset_content">
        <p>{{userInfo.money}}</p>
        <p>娱乐币</p>
      </div>
      <div class="asset_content">
        <p>{{userInfo.money_lock}}</p>
        <p>娱乐股</p>
      </div>
      <div class="asset_content">
        <p>{{userInfo.app_money}}</p>
        <p>应用币</p>
      </div>
      <div class="asset_content">
        <p>{{userInfo.stock_money}}</p>
        <p>股权币</p>
      </div>
    </div>

    <!-- ----------------- -->
    <ul class="list">
      <router-link to="/Financial" tag="li">
        <div class="left">
          <img src="../../assets/img/list1.png" alt />
          <div>财务明细</div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
      <router-link to="/Safety" tag="li">
        <div class="left">
          <img src="../../assets/img/list2.png" alt />
          <div>安全中心</div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
      <router-link to="/MyTeam" tag="li">
        <div class="left">
          <img src="../../assets/img/list3.png" alt />
          <div>我的团队</div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
      <router-link to="/Feedback" tag="li">
        <div class="left">
          <img src="../../assets/img/list4.png" alt />
          <div>问题反馈</div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
      <router-link to="/CustomerService" tag="li">
        <div class="left">
          <img src="../../assets/img/list5.png" alt />
          <div>客服中心</div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
      <!-- <li @click="$toast('暂未开放')">
        <div class="left"><img src="../../assets/img/list6.png" alt=""><div>版本更新</div></div>
        <div class="right"><van-icon name="arrow"/></div>
      </li>-->
    </ul>
    <app-bar></app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      gameCoinMoney: "" //娱乐币
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    dropOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
    // 用户信息
    getUserInfo() {
      this.$http("User/info").then(response => {
        console.log(response.data.data);
        this.userInfo = response.data.data;
        // console.log(this.userInfo)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar__title {
  font-size: 19px;
  color: #00b1ff;
}
.info {
  padding: 10px 30px 0px 30px;
  color: #7da3bf;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
.idid {
  margin-top: 10px;
  margin-left: 5px;
}
.general {
  width: 75px;
  height: 35px;
  position: relative;
}
.general > img {
  width: 100%;
}
.general p {
  position: absolute;
  top: 50%;
  left: 12%;
  transform: translateY(-55%);
  color: #fff;
}
.info_right {
  font-size: 16px;
  color: #00b1ff;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.asset {
  display: flex;
  justify-content: space-between;
  margin: 15px;
  padding: 25px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 25px #17a2ff;
}
.asset_content {
  text-align: center;
  font-size: 13px;
  color: #7da3bf;
}
.asset_content p:nth-child(1) {
  color: #00b1ff;
  margin-bottom: 10px;
}
.list {
  width: 100%;
  padding: 0 4%;
  /* background: linear-gradient(
    90deg,
    rgba(16, 31, 63, 1) 0%,
    rgba(14, 62, 121, 1) 100%
  ); */
  margin-bottom: 55px;
}
.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 4%;
  border-bottom: solid 1px #0c4586;
}
.list li:first-child {
  border-top: solid 1px #0c4586;
}
.list .left {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #00b1ff;
}
.list .left img {
  width: 39px;
  height: 39px;
  margin-right: 24px;
}
/* .list li:last-of-type {
  border: 0;
} */
.list .right {
  color: #00b1ff;
  font-size: 16px;
}
.dialog-info {
  padding: 20px 4%;
}
.dialog-info .primary {
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
}
.dialog-info .primary span {
  font-size: 12px;
  color: #7da3bf;
}
.dialog-info .btn {
  text-align: center;
  color: #00b1ff;
}
</style>
