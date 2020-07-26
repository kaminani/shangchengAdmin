<template>
  <div>
    <p style="font-size:18px;">充值活动</p>
    <div class="reacharge">
      <div>
        <span>每充值</span>
        <el-input v-model="money"></el-input>
      </div>
      <div>
        <span>送</span>
        <el-input v-model="give"></el-input>
      </div>
    </div>
    <div class="reacharge" style="margin:20px 0 0 10px;">
      <p>活动开启：</p>
      <el-radio v-model="radio" label="true">是</el-radio>
      <el-radio v-model="radio" label="false">否</el-radio>
    </div>
    <el-button type="primary" size="mini" style="margin-left:6%;" @click="setGift">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      money: "",
      give: "",
      radio: 'true'
    };
  },
  mounted() {
    this.giftsList();
  },
  methods: {
    giftsList(){
      this.$marketing.giftsList().then(res => {
        this.money = res.data.results[0].reached;
        this.give = res.data.results[0].give;
        // eslint-disable-next-line camelcase
        this.radio = res.data.results[0].is_active.toString();
      });
    },
    setGift() {
      let data = {
        reached: parseFloat(this.money),
        give: parseFloat(this.give),
        // eslint-disable-next-line camelcase
        is_active: this.radio
      };
      this.$marketing.setGift(data).then(res => {
        console.log(res);
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      });
    }
  }
};
</script>

<style scoped>
.reacharge {
  width: 50%;
  display: flex;
}
.reacharge > div {
  width: 20%;
  display: flex;
  align-items: center;
}
.reacharge > div > span:first-child {
  width: 100px;
  text-align: center;
}
</style>