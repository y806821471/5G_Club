<template>
  <div class="feedback">
    <van-nav-bar
      title="问题反馈"
      left-arrow
      @click-left="routerBack"
      right-text="反馈列表"
      @click-right="onClickRight"
    />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="data.content"
        type="textarea"
        placeholder="请输入反馈内容"
        rows="1"
        :maxlength="100"
        :autosize="{minHeight:120 }"
      />
      <span class="num">{{ data.content.length }}/100</span>
    </van-cell-group>
    <!-- 添加图片 -->
    <div class="upload-images">
      <div class="img-box" v-for="(item,index) in uploadImages" :key="index">
        <div class="icon-po">
          <img class="image" :src="item" />
          <div class="icon-close" @click="imgclose(index)">×</div>
        </div>
      </div>
      <van-uploader :after-read="doUpload" multiple>
        <img src="../../assets/img/uploading.png" alt />
        <div class="uploader_text">添加图片</div>
      </van-uploader>
    </div>
    <div class="uploader_but">
      <van-button round type="info" size="large" @click="submitFeedback">反馈</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      uploadImages: [],
      data: {
        content: "",
        imgs: []
      }
    };
  },
  methods: {
    routerBack() {
      this.$router.push("/Personal");
    },
    // 反馈列表
    onClickRight() {
      this.$router.push("/FeedbackList");
    },
    //上传图片
    doUpload(e) {
      let app = this;
      this.$http.post("/Index/oss").then(response => {
        const res = response.data.data;
        let OSS = require("ali-oss");
        let file = e.file;
        let client = new OSS({
          region: res.regionId,
          endpoint: res.endpoint,
          accessKeyId: res.AccessKeyId,
          accessKeySecret: res.AccessKeySecret,
          stsToken: res.SecurityToken,
          bucket: res.bucket
        });
        console.log(file);

        let randomName =
          new Date().getTime() + "." + file.name.split(".").pop();
        // 上传
        client
          .put(randomName, file, {
            progress: function*(percentage, cpt) {
              this.$store.dispatch("showloader"); //上传状态
            }
          })
          .then(results => {
            app.$store.dispatch("hideloader"); // 上传完成
            // if(type == '1') {
            // this.imgs.push(results.res.requestUrls[0]);
            // console.log(app.imgs);
            app.data.imgs.push(results.res.requestUrls[0]);
            app.uploadImages.push(results.res.requestUrls[0]);
            console.log(app.uploadImages);
            // }else if(type == '2') {
            //   this.qrCode2 = results.res.requestUrls[0];
            // }
          })
          .catch(err => {
            console.log(err);
            this.$toast("上传出错了");
          });
      });
    },
    //删除预览图片按钮
    imgclose(e) {
      this.uploadImages.splice(e, 1);
    },
    // 提交反馈
    submitFeedback() {
      const data = {
        content: this.data.content,
        imgs: this.data.imgs.join(",")
      };
      this.$http.post("System/issue", data).then(res => {
        // console.log(data);
        if (res.data.status === 200) {
          this.$router.push("/FeedbackList");
        }
        this.$toast(res.data.msg);
      });
    }
  }
};
</script>

<style scoped>
.img-box {
  display: inline-block;
}
.image {
  width: 60px;
  height: 80px;
}
.icon-add {
  width: 40px;
  height: 40px;
  border: 1px solid #9a9ba3;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  margin-top: 20px;
}

.icon-add:before {
  content: "";
  position: absolute;
  width: 50px;
  height: 2px;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -1px;
  background-color: #aaabb2;
}
.icon-add:after {
  content: "";
  position: absolute;
  width: 2px;
  height: 50px;
  left: 50%;
  top: 50%;
  margin-left: -1px;
  margin-top: -25px;
  background-color: #aaabb2;
}
.icon-po {
  position: relative;
  width: 60px;
  height: 80px;
  margin-right: 20px;
  margin-top: 20px;
}
.icon-close {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.van-nav-bar__text {
  color: #cce9ff;
}
.van-nav-bar__text:active {
  background-color: transparent;
}
.van-cell-group {
  position: relative;
  margin: 15px;
}
.num {
  position: absolute;
  bottom: 10px;
  right: 17px;
  color: #a6c3de;
}
.van-cell {
  background: linear-gradient(to right, #101b36, #0e3b75);
  border: 1px solid #0e3b75;
  border-radius: 8px;
  padding: 18px 24px;
}
.van-uploader {
  margin: 5px 27px;
}
.uploader_text {
  font-size: 14px;
  color: #cce9ff;
  text-align: center;
}
.uploader_but {
  margin: 80px 33px;
}
/* 按钮 */
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
.icon-po {
  width: 75px;
  height: 75px;
  margin: 20px 0 0 15px;
}
.image {
  width: 100%;
  height: 100%;
}
</style>