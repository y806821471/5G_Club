<template>
  <div class="ProjectApps">
    <!-- 头部 -->
    <van-nav-bar left-arrow title="项目应用" @click-left="routerBack" />
    <div class="content_box">
      <ul class="list">
        <router-link
          :to="{path:'/ProjectAppsDetails',query:{id:item.id}}"
          tag="li"
          v-for="(item,index) in list"
          :key="index"
        >
          <div class="imgs">
            <img :src="item.short_imgs" alt />
          </div>
          <div>
            <p>{{item.title}}</p>
            <div>{{item.brief}}</div>
          </div>
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
    getInfo() {
      this.$http
        .get("Apps/list", {
          params: {
            type: 1
          }
        })
        .then(response => {
          console.log("项目应用", response.data.data);
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
.content_box {
  padding: 10px 4%;
}
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list li {
  width: 47.5%;
  background-color: #0f2b57;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 4%;
  overflow: hidden;
}
.list .imgs {
  height: 153px;
}
.list li img {
  width: 100%;
  height: 100%;
}
.list li div p {
  font-size: 15px;
  margin-top: 15px;
}
.list li div div {
  color: #7da3bf;
  margin: 4px 0 15px 0;
}
</style>