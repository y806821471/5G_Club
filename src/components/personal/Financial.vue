<template>
  <div class="Financial">
    <!-- 头部 -->
    <van-nav-bar title="财务明细" left-arrow @click-left="routerBack" fixed>
      <span class="icon" slot="right" @click="showPopup">&#xe639;</span>
    </van-nav-bar>
    <!-- Tab -->
    <div class="top_border"></div>
    <van-tabs v-model="active" sticky line-width="30" replace @change="exchange" :offset-top="66" title-active-color="#00B1FF">
      <van-tab title="娱乐币">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list-item" v-for="(item,index) in moneyDataList" :key="index">
            <div>
              <span>
                {{item.type}}
                <span class="pandora">{{item.push_mobile}}</span>
              </span>
              <span>{{item.num}}</span>
            </div>
            <div>
              <span>{{item.created_at | filterDate}}</span>
              <span>数量</span>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="娱乐股">
        <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
          <div class="list-item" v-for="(item,index) in moneyLockDataList" :key="index">
            <div>
              <span>
                {{item.type}}
                <span class="pandora">{{item.push_mobile}}</span>
              </span>
              <span>{{item.num}}</span>
            </div>
            <div>
              <span>{{item.created_at | filterDate}}</span>
              <span>数量</span>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <!-- Popup 弹出层 -->
    <!-- 娱乐币 -->
    <van-popup v-model="show" position="right">
      <ul>
        <li v-for="(item,index) in moneyList" :key="index" @click="getType(item.type)">{{item.name}}</li>
      </ul>
    </van-popup>
    <!-- 娱乐股 -->
    <van-popup v-model="show2" position="right" class="stock">
      <ul>
        <li
          v-for="(item,index) in moneyLockList"
          :key="index"
          @click="getType2(item.type)"
        >{{item.name}}</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // type: this.$route.query.type,
      active: 0,
      show: false,
      show2: false,
      list: [],
      loading: false,
      finished: false,
      type: "",
      moneyList: [],
      moneyDataList: [],
      list2: [],
      loading2: false,
      finished2: false,
      type2: "",
      moneyLockList: [],
      moneyLockDataList: []
    };
  },
  created() {
    this.getDataType();
    this.getDataType2();
  },
  filters: {
    filterDate(date) {
      return date.substring(0, 16);
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.$http("/Wallet/moneyLog", {
          params: {
            type: this.type,
            page: 1
          }
        }).then(response => {
          // console.log("获取列表数据", response.data.data);
          // 隐藏遮罩
          this.loading = false;
          const res = response.data.data.data;
          this.moneyDataList = res;
          if (res.length == this.moneyDataList.length) {
            // 加载完成
            this.finished = true;
          }
        });
      }, 500);
    },
    onLoad2() {
      // 异步更新数据
      setTimeout(() => {
        this.$http("/Wallet/moneyLockLog", {
          params: {
            type: this.type2,
            page: 1
          }
        }).then(response => {
          // console.log("获取列表数据", response.data.data);
          // 隐藏遮罩
          this.loading2 = false;
          const res = response.data.data.data;
          this.moneyLockDataList = res;
          if (res.length == this.moneyLockDataList.length) {
            // 加载完成
            this.finished2 = true;
          }
        });
      }, 500);
    },
    // Popup 弹出层
    showPopup() {
      if (this.active === 0) {
        this.show = true;
      } else {
        this.show2 = true;
      }
    },
    // 下拉框点击事件
    getType(type) {
      this.show = false;
      this.type = type;
      this.onLoad();
    },
    // 下拉框点击事件
    getType2(type) {
      this.show2 = false;
      this.type2 = type;
      this.onLoad2();
    },
    // 获取娱乐币筛选类型
    getDataType() {
      this.$http("/Wallet/getMoneyType", {
        params: {
          type: "money"
        }
      }).then(response => {
        // console.log("获取筛选类型1", response.data.data);
        const res = response.data.data;
        this.moneyList = res;
      });
    },
    // 获取娱乐股筛选类型
    getDataType2() {
      this.$http("/Wallet/getMoneyType", {
        params: {
          type: "money_lock"
        }
      }).then(response => {
        // console.log("获取筛选类型2", response.data.data);
        const res = response.data.data;
        this.moneyLockList = res;
      });
    },
    exchange(e) {
      // console.log(e);
      if (e === 0) {
        this.type2 = "";
        this.onLoad2();
      } else if (e === 1) {
        this.type = "";
        this.onLoad();
      }
    },
    routerBack() {
      // this.$router.push("/Personal");
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-list {
  width: 94%;
  margin: 0 3%;
  padding: 0 2%;
  margin-top: 3%;
  background: linear-gradient(
    90deg,
    rgba(16, 31, 63, 1) 0%,
    rgba(14, 62, 121, 1) 100%
  );
  border: solid 0.5px #0b4586;
  border-radius: 5px;
}
.list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 4%;
  line-height: 26px;
  border-bottom: solid 1px #0c4586;
}
.list-item > div {
  display: flex;
  justify-content: space-between;
}
.list-item > div:last-of-type {
  color: #7da3bf;
}
.color1 {
  color: #00b1ff;
}
.pandora {
  color: #7da3bf;
}
/* 弹出层 */
.van-popup {
  background: #0e386e;
  box-shadow: 0px 1px 23px 0px rgba(42, 154, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(0, 134, 255, 1);
  top: 200px;
  right: 4%;
}
.stock {
  top: 140px;
  right: 4%;
}
.van-popup ul {
  width: 140px;
  padding: 0 5%;
}
.van-popup ul li {
  display: flex;
  padding: 10px 4%;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px #0c4586;
  font-size: 14px;
}
.van-popup ul li span {
  color: #00b1ff;
}
.van-tabs .van-tabs__nav {
  /* background: linear-gradient(90deg, rgba(16, 31, 63, 1) 0%, rgba(14, 62, 121, 1) 100%); */
  border: solid 1px #0b4586;
}
.top_border {
  margin-top: 66px;
  border: 0.5px solid #0b4586;
}
</style>
