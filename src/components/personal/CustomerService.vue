<template>
  <div class="CustomerService">
    <van-nav-bar title="客服中心" left-arrow @click-left="routerBack" />
    <ul class="list">
      <li class="list-item" v-for="(item, i) in services" :key="item.id">
        <div>
          <span :class="color[i]">{{item.name}}：&nbsp;&nbsp;</span>
          <span>{{item.value}}</span>
        </div>
        <div v-clipboard:copy="item.value" v-clipboard:success="onCopy" v-clipboard:error="onError">
          <span class="icon">&#xe649;</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomerService",
  data() {
    return {
      services: [],
      color: ["qq", "wx", "yx"]
    };
  },
  created() {
    this.getServices();
  },
  methods: {
    // 客服列表
    getServices() {
      this.$http.get("System/server_list").then(response => {
        // console.log(response.data.data);
        this.services = response.data.data;
      });
    },
    // 复制地址
    onCopy: function(e) {
      this.$toast("复制成功");
    },
    onError: function(e) {
      this.$toast("复制失败");
    },
    routerBack() {
      this.$router.push("/Personal");
    }
  }
};
</script>


<style scoped>
.list {
  padding: 0 4%;
  width: 92%;
  height: 100%;
  margin: 10px 4%;
  background: linear-gradient(
    90deg,
    rgba(16, 31, 63, 1) 0%,
    rgba(14, 62, 121, 1) 100%
  );
  border: solid 0.5px #0b4586;
  border-radius: 5px;
  font-size: 14px;
}
.list-item {
  display: flex;
  padding: 4px 4%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #0c4586;
  color: #00b1ff;
}
.list-item .icon {
  font-size: 18px;
}
.qq {
  color: #fdbf06;
}
.wx {
  color: #36eae2;
}
.yx {
  color: #cce9ff;
}
</style>
