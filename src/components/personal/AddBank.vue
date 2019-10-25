<template>
  <div class="card">
    <van-nav-bar title="添加银行卡" left-arrow @click-left="routerBack" />
    <div class="tips">请绑定持卡人为本人的银行卡</div>
    <van-cell-group>
      <div class="title">请输入持卡人姓名:</div>
      <van-field v-model="validateForm.name" clearable />
      <div class="title">请输入银行卡号:</div>
      <van-field v-model="validateForm.cardId" clearable />
      <div class="title">请输入开户行:</div>
      <van-field v-model="validateForm.openingBank" clearable />
      <van-button class="common-btn" @click="submit">确定</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "AddBank",
  data() {
    return {
      validateForm: {
        name: "",
        cardId: "",
        openingBank: ""
      },
      info: {},
      isAdd: false,
      times: localStorage.getItem("bankTimes")
    };
  },
  created() {
    this.getInfo();
    if (parseInt(this.times) >= 3) {
      this.isAdd = true;
    }
  },
  methods: {
    getInfo() {
      const params = {
        type: "3"
      };
      this.$http.post("/User/bankAdd", { params: params }).then(response => {
        const res = response.data.data;
        console.log(res);
        if (!!res) {
          this.validateForm.name = res.value.bank_name;
          this.validateForm.openingBank = res.value.bank_location;
          this.validateForm.cardId = res.value.bank_account;
        }
      });
    },
    submit() {
      if (this.validateForm.name.trim() === "") {
        this.$toast("请输入持卡人姓名");
        return;
      }
      if (this.validateForm.cardId.trim() === "") {
        this.$toast("请输入卡号");
        return;
      }
      if (this.validateForm.openingBank.trim() === "") {
        this.$toast("请输入开户行");
        return;
      }
      const formData = {
        type: "3",
        value: {
          name: this.validateForm.name,
          bank: this.validateForm.openingBank,
          account: this.validateForm.cardId
        }
      };
      this.$http.post("/User/bankAdd", formData).then(response => {
        this.$toast(response.data.msg);
        if (response.data.status === 200) {
          this.times++;
          localStorage.setItem("bankTimes", this.times);
          this.$router.back();
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card .tips {
  color: #01a5f0;
  padding: 15px 5%;
  font-size: 13px;

}
.van-cell-group {
  padding: 0px 5% 20px 5%;
}
.van-cell {
  padding:8px  0;
}
.common-btn {
  margin-top: 40px;
  background:linear-gradient(180deg,rgba(42,164,233,1) 0%,rgba(32,83,236,1) 100%);
}
.title {
  margin-top: 20px;
  font-size: 14px;
}
</style>
