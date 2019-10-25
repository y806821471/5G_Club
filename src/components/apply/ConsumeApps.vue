<template>
  <div class="ConsumeApps">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="消费应用" @click-left="routerBack" />
    <div class="content">
      <ul>
        <!-- <li class="ore-item"> -->
        <router-link
          :to="{path:'/ConsumeAppsDetails',query:{id:item.id}}"
          tag="li"
          v-for="(item,index) in list"
          :key="index"
          class="ore-item"
        >
          <div class="img">
            <img :src="item.short_imgs" alt />
          </div>
          <div class="right">
            <div>{{item.title}}</div>
            <div>{{item.brief}}</div>
            <div>
              <span class="color">{{item.money}}</span>
              <p>(娱乐币)</p>
            </div>
          </div>
          <van-button round type="info" size="small" @click.stop="getJump">联系客服</van-button>
        </router-link>
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
    getJump() {
      this.$router.push("/CustomerService");
    },
    getInfo() {
      this.$http
        .get("Apps/list", {
          params: {
            type: 2
          }
        })
        .then(response => {
          console.log("消费应用", response.data.data);
          const res = response.data.data;
          this.list = res;
        });
    },
    routerBack() {
      this.$router.push("/Apply");
    }
  }
};
</script>

<style scoped>
.content {
  padding: 0 15px;
}
.ore-item {
  display: flex;
  align-items: center;
  color: #7da3bf;
  margin-top: 15px;
  padding: 15px 10px;
  background: #0f2b57;
  position: relative;
  border-radius: 5px;
}
.ore-item .img {
  width: 120px;
  height: 100px;
  margin-right: 15px;
  border-radius: 5px;
  overflow: hidden;
}
.ore-item .img img {
  width: 100%;
  height: 100%;
}
.ore-item .right div:nth-child(1) {
  color: #cce9ff;
  font-size: 15px;
  margin-bottom: 10px;
}
.ore-item .right div:nth-child(2) {
  margin-bottom: 10px;
}
.color {
  font-size: 16px;
  color: #fec006;
}
.van-button--small {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 0 15px;
  font-size: 13px;
  background: linear-gradient(180deg, #2aa4e9 0%, #2053ec 100%);
}
</style>