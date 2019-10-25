<template>
  <div>
    <van-nav-bar title="我的团队" left-arrow @click-left="routerBack" />
    <div class="top">
      <img src="../../assets/img/rectangle2.png" alt />
      <div v-show="active == 0" class="info">
        <div>
          <span class="left">直推人数：</span>
          <span class="right">{{push || 0}}</span>
        </div>
        <div>
          <span class="left">团队人数：</span>
          <span class="right">{{group || 0}}</span>
        </div>
      </div>
      <div v-show="active == 1" class="info">
        <div>
          <span class="left">二级人数：</span>
          <span class="right">{{push || 0}}</span>
        </div>
        <div>
          <span class="left">团队人数：</span>
          <span class="right">{{group || 0}}</span>
        </div>
      </div>
    </div>
    <van-tabs v-model="active" @change="change" sticky line-width="40">
      <van-tab title="一级会员">
        <!--<van-list>-->
        <div class="list-item">
          <div>账号</div>
          <div>级别</div>
          <div>时间</div>
        </div>
        <div class="list-item" v-for="(item,index) in list" :class="{on:index%2==0}" :key="index">
          <div>{{item.mobile}}</div>
          <div>{{item.level}}</div>
          <div>{{item.created_at | filterDate}}</div>
        </div>
        <!--</van-list>-->
      </van-tab>
      <van-tab title="二级会员">
        <van-list>
          <div class="list-item">
            <div>账号</div>
            <div>级别</div>
            <div>时间</div>
          </div>
          <div class="list-item" v-for="(item,index) in list" :class="{on:index%2==0}" :key="index">
            <div>{{item.mobile}}</div>
            <div>{{item.level}}</div>
            <div>{{item.created_at | filterDate}}</div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      push: "",
      group: ""
    };
  },
  created() {
    this.getcode("push");
  },
  mounted() {},
  // 时间过滤器
  filters: {
    filterDate(date) {
      return date.substring(0, 10);
    }
  },
  methods: {
    change() {
      if (this.active == 0) {
        this.getcode("push");
      } else if (this.active == 1) {
        this.getcode("Second_push");
      }
    },
    getcode(type) {
      const data = {
        type: type
      };
      this.$http.post("/User/group", data).then(response => {
        let res = response.data;
        if (res.status == 200) {
          this.list = res.data.child;
          this.push = res.data.push;
          this.group = res.data.group;
        }
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
.top {
  position: relative;
  padding: 0 4%;
  margin-bottom: 10px;
}
.top img {
  width: 100%;
  height: 112px;
}
.top .info {
  position: absolute;
  top: 0;
  left: 20%;
  padding: 26px 20%;
  line-height: 30px;
  font-size: 14px;
}
.left {
  color: #7da3bf;
}
.right {
  color: #00b1ff;
}
.list-item {
  display: flex;
  color: #7da3bf;
  padding: 8px 4%;
  line-height: 26px;
  /* border-bottom: solid 1px #0c4586; */
  justify-content: space-between;
}
.list-item > div {
  width: 33%;
  text-align: center;
}
.on {
  background: linear-gradient(to right, #101b36, #0e3b75);
}
</style>
