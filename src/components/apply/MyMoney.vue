<template>
  <div class="MyMoney">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="我的理财" @click-left="routerBack" />
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
              收益：
              <span class="color1">{{item.profit_completed}}/</span>
              <span class="color2">{{item.profit}}娱乐币</span>
            </div>
            <div>
              周期：
              <span class="color1">{{item.time_completed}}/</span>
              <span class="color2">{{item.time_cycle}}天</span>
            </div>
          </div>
          <div class="right" v-if="item.status==1">收益中</div>
          <div class="right2" v-else>已完成</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get("Apps/moneyPoolOrder").then(response => {
        console.log("我的理财", response.data.data);
        const res = response.data.data;
        this.list = res;
      });
    },
    routerBack() {
      this.$router.push("/MoneyApps");
    }
  }
};
</script>

<style scoped>
.content {
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
.color2 {
  color: #cce9ff;
  font-size: 14px;
}
.buy-item .right {
  color: #2aa3e9;
  font-size: 14px;
}
.buy-item .right2 {
  color: #afcce5;
  font-size: 14px;
}
</style>