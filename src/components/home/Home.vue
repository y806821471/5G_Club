<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="swiper-border">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(item,index) in banners" :key="index" class="swiper-slide">
            <img :src="item.imgs" />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!-- 公告 -->
    <div class="notice">
      <div class="icon_left">
        <span class="icon">&#xe6cf;</span>
        <span>公告</span>
      </div>
      <marquee class="roll" @click="click_Notice">{{notices.brief}}</marquee>
      <span class="icon icon_right">&#xe695;</span>
    </div>
    <!-- 中间导航 -->
    <div class="nav">
      <van-grid :border="false" :column-num="4">
        <van-grid-item to="/Recognition">
          <img src="../../assets/img/contreNav.png" alt />
          <div>认筹</div>
        </van-grid-item>
        <van-grid-item to="/Myproperty">
          <img src="../../assets/img/contreNav4.png" alt />
          <div>资产</div>
        </van-grid-item>
        <van-grid-item to="/Exchanged">
          <img src="../../assets/img/contreNav2.png" alt />
          <div>互转</div>
        </van-grid-item>
        <van-grid-item to="/Sharing">
          <img src="../../assets/img/contreNav3.png" alt />
          <div>分享</div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 最新资讯 -->
    <div class="message">
      <div class="message_hd">
        <span style="font-size:14px;">
          <!-- <b>5G</b> / 最新资讯 -->
          项目最新资讯
        </span>
      </div>
      <div v-for="(item,index) in newsList" :key="index" class="message_bd">
        <span>{{item.title}}</span>
        <div v-html="item.details" id="imgstyle"></div>
        <!-- <div > {{item.details}}</div> -->
        <div class="message_shar">
          <span>{{item.created_at | filterDate}}</span>
          <!-- <span class="icon" @click="showPopup(item)">&#xe607;</span> -->
        </div>
        <div class="bottom_border"></div>
      </div>
      <!-- 弹出层 -->
      <!-- <van-popup v-if="show" v-model="show" position="bottom" :style="{ height: '90%' }">
        <div class="popup_title">
          <img src="../../assets/img/log.png"
               alt />
          <span>众创娱乐·资讯</span>
          <div class="icon shut"
               @click="shutX">&#xe732;</div>
        </div>
        <div class="popup_bottom">
          <div class="popup_bottom_hd">
            <div class="title">{{datalist.title}}</div>
            <div class="subject">{{datalist.details}}</div>
            <div class="time">{{datalist.created_at | filterDate}}</div>
          </div>
          <div class="popup_bottom_bd">
            <div class="left">
              <p>众创娱乐·资讯</p>
              <p>长按识别右边二维码，即可下载APP</p>
            </div>
            <div class="right">
              <img src="../../assets/img/code.png"
                   alt />
            </div>
          </div>
          <div class="share_but">
            <van-button round
                        type="info"
                        size="large"
                        @click="saveImg">一键分享</van-button>
          </div>
        </div>
      </van-popup>-->
    </div>
    <!-- 底部导航 -->
    <app-bar></app-bar>
  </div>
</template>

<script>
import "../../assets/css/swiper-3.4.2.min.css";
import Swiper from "swiper";
export default {
  data() {
    return {
      show: false,
      notices: {}, //公告
      tradeList: [],
      messageList: [],
      newsList: [],
      datalist: [],
      banners: []
    };
  },
  created() {
    this.getNews();
    this.getNotices();
    this.getBanners();
  },
  // 时间过滤器
  filters: {
    filterDate(date) {
      return date.substring(0, 10);
    }
  },
  methods: {
    // 轮播图
    swiperCreate() {
      const screenWidth = window.screen.width;
      let modifier = (screenWidth + (screenWidth / 100) * 2) / 100;
      this.$nextTick(() => {
        let swiper = new Swiper(".swiper-container", {
          loop: true,
          slidesPerView: "auto",
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          pagination: {
            el: ".swiper-pagination"
          },
          centeredSlides: true,
          effect: "coverflow",
          coverflowEffect: {
            rotate: 0, // 旋转的角度
            stretch: 20, // 拉伸   图片间左右的间距和密集度
            depth: 120, // 深度   切换图片间上下的间距和密集度
            modifier: modifier, // 修正值 该值越大前面的效果越明显
            slideShadows: false // 页面阴影效果
          }
        });
      });
    },
    click_Notice() {
      this.$router.push("/NoticeList");
    },

    // 轮播图
    getBanners() {
      this.$http("System/banner_list").then(response => {
        // console.log('轮播图：', response.data.data);
        const res = response.data.data;
        this.banners = res;
        this.swiperCreate();
      });
    },
    // 公告
    getNotices() {
      this.$http("/System/notice", {
        params: {
          type: 1
        }
      }).then(response => {
        // console.log("公告", response.data.data);
        const res = response.data.data;
        if (res.length > 0) {
          this.notices = res[0];
          this.tradeList = res;
        }
      });
    },

    // 资讯
    getNews() {
      this.$http("/System/notice", {
        params: {
          type: 3
        }
      }).then(response => {
        // console.log("资讯", response.data.data);
        const res = response.data.data;
        if (res.length > 0) {
          this.news = res[0];
          this.newsList = res;
        }
      });
    },
    showPopup(item) {
      this.datalist = item;
      this.show = true;
    },
    shutX() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.notice {
  display: flex;
  justify-content: space-between;
  height: 44px;
  margin: 10px 0;
  background: linear-gradient(to right, #101b36, #0e3b75);
}
.icon_left {
  display: flex;
  justify-content: center;
  width: 80px;
  height: 24px;
  color: #2aa3e9;
  line-height: 24px;
  margin: 10px 0 0 10px;
  padding-right: 5px;
  border-right: 1px solid #0c4586;
}

/* 中间导航 */
.nav {
  height: 100px;
  background: linear-gradient(to right, #101b36, #0e3b75);
}

.van-grid-item__content img {
  width: 43px;
  height: 43px;
}
.van-grid-item__content div {
  margin-top: 9px;
  font-size: 13px;
}
/* 最新资讯 */
.message {
  height: 100%;
  margin-top: 10px;
  padding: 0 16px 65px 16px;
  background: linear-gradient(to right, #101b36, #0e3b75);
}
.message_hd {
  width: 120px;
  height: 33px;
  line-height: 33px;
  background: url("../../assets/img/bgu1.png") 55% 75%;
}
.message_hd span {
  font-size: 12px;
  color: #fff;
  margin-left: 9px;
}
.message_hd span b {
  font-size: 15px;
}
.message_bd span {
  display: block;
  height: 25px;
  font-size: 15px;
  margin-top: 15px;
  font-weight: bold;
}
.message_bd div {
  font-size: 13px;
  color: #7da3bf;
  line-height: 20px;
}
.message_shar {
  display: flex;
  justify-content: space-between;
  height: 25px;
  margin-top: 10px;
}
.message_shar span {
  line-height: 25px;
  font-size: 13px;
  color: #7da3bf;
  font-weight: 400;
  margin: 0 !important;
}
.message_shar .icon {
  font-size: 18px;
  color: #00aefc;
}
.bottom_border {
  /* width: 100%; */
  height: 20px;
  border-bottom: 1px solid #0c4586;
}

/* 弹出层 */
.van-popup {
  background-color: #151936;
}
/* 顶部 */
.popup_title {
  position: relative;
  display: flex;
  justify-content: center;
  height: 80px;
  line-height: 80px;
  background-color: #121415;
}
.popup_title img {
  margin: 23px 5px 0 0;
  width: 35px;
  height: 35px;
}
.popup_title span {
  font-size: 18px;
}
.shut {
  position: absolute;
  top: -12px;
  right: 15px;
  font-size: 20px;
}
.popup_bottom_hd {
  margin: 15px;
  border-bottom: 1px solid #0c4586;
}
.popup_bottom_hd .title {
  font-size: 15px;
  margin-top: 20px;
}
.popup_bottom_hd .subject {
  font-size: 13px;
  line-height: 20px;
  color: #7da3bf;
  margin: 7px 0;
}
.popup_bottom_hd .time {
  font-size: 13px;
  color: #7da3bf;
  margin-bottom: 10px;
}
.popup_bottom_bd {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}
.left p:nth-child(1) {
  font-size: 15px;
}
.left p:nth-child(2) {
  font-size: 13px;
  color: #7da3bf;
  margin-top: 5px;
}
.right {
  width: 68px;
  height: 68px;
}
.right img {
  width: 100%;
  height: 100%;
}
.van-button--large {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background: linear-gradient(
    180deg,
    rgba(42, 164, 233, 1) 0%,
    rgba(32, 83, 236, 1) 100%
  );
  border-radius: 23px;
}
.share_but {
  margin: 0 30px;
}

.swiper-border {
  width: 100%;
  padding: 25px 0 0 0;
}
.swiper-container {
  width: 100%;
}
.swiper-slide {
  background-position: center;
  width: 80%;
}
.swiper-slide img {
  display: block;
  width: 100%;
  border-radius: 10px;
  height: 150px;
}
.roll {
  color: #cce9ff;
  line-height: 44px;
  margin-left: 10px;
  font-size: 13px;
}
.icon_right {
  padding-right: 10px;
  line-height: 44px;
}
#imgstyle >>> img {
  width: 100%;
  margin-top: 10px;
}
</style>