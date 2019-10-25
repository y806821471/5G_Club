<template>
  <div class="manage">
    <van-nav-bar title="应用" />
    <div class="banner">
      <img src="../../assets/img/ecology.png" alt />
    </div>
    <ul class="list">
      <!-- <li @click="$toast('敬请期待')">
        <div class="left">
          <img src="../../assets/img/natural01.png" alt />
          <div class="text">
            <span>项目应用</span>
            <p class="color">优质项目加盟</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </li>
      <li @click="$toast('敬请期待')">
        <div class="left">
          <img src="../../assets/img/natural02.png" alt />
          <div class="text">
            <span>理财应用</span>
            <p class="color">定存周期收益</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </li>
      <li @click="$toast('敬请期待')">
        <div class="left">
          <img src="../../assets/img/natural03.png" alt />
          <div class="text">
            <span>消费应用</span>
            <p class="color">轻奢商品换购</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </li>
      <li @click="$toast('敬请期待')">
        <div class="left">
          <img src="../../assets/img/natural04.png" alt />
          <div class="text">
            <span>币币应用</span>
            <p class="color">区块链币兑换</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </li> -->

      <router-link to="/ProjectApps" tag="li">
        <div class="left">
          <img src="../../assets/img/natural01.png" alt />
          <div class="text">
            <span>项目应用</span>
            <p class="color">优质项目加盟</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
      <router-link to="/MoneyApps" tag="li">
        <div class="left">
          <img src="../../assets/img/natural02.png" alt />
          <div class="text">
            <span>理财应用</span>
            <p class="color">定存周期收益</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
      <router-link to="/ConsumeApps" tag="li">
        <div class="left">
          <img src="../../assets/img/natural03.png" alt />
          <div class="text">
            <span>消费应用</span>
            <p class="color">轻奢商品换购</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
      <router-link to="/BiBiApps" tag="li">
        <div class="left">
          <img src="../../assets/img/natural04.png" alt />
          <div class="text">
            <span>币币应用</span>
            <p class="color">区块链币兑换</p>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </router-link>
    </ul>
    <app-bar></app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar__title {
  font-size: 19px;
  color: #00b1ff;
}
.banner {
  margin: 0 4%;
}
.banner img {
  width: 100%;
}

.list {
  width: 100%;
  margin: 16px 0 100px 0;
  padding: 0 4%;
  background: linear-gradient(
    90deg,
    rgba(16, 31, 63, 1) 0%,
    rgba(14, 62, 121, 1) 100%
  );
  border: solid 0.5px #0b4586;
  border-radius: 5px;
}
.list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: solid 1px #0c4586;
}
.list .left {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
}
.list .left img {
  width: 48px;
  height: 48px;
  margin-right: 12px;
}
.list .left .text {
  color: #cce9ff;
}
.list .left .text span {
  color: #00b1ff;
  font-size: 16px;
}
.list li:last-of-type {
  border: 0;
}
.list .right {
  color: #00b1ff;
  font-size: 16px;
}
.color {
  color: #7da3bf;
  font-size: 12px;
}
</style>
