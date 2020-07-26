<template>
  <div>
    <div style="width:1000px; margin: 0 auto;">
      <div class="flex">
        <span style="font-size: 22px;">当前订单状态：{{order.status | status}}</span>
        <div>
          <el-button v-if="order.status == 'paid'" @click="accomplish">完成配送</el-button>
          <el-button
            v-if="order.status == 'unpaid'||order.status == 'paid'"
            @click="getConsignee(order),dialogVisible = true"
          >修改收货人信息</el-button>
          <el-button @click="close">关闭</el-button>
        </div>
      </div>
      <div class="message">
        <div>基本信息</div>
        <p>
          <span>订单编号：</span>
          <span>{{order.number}}</span>
        </p>
        <p>
          <span>用户账号：</span>
          <span>{{order.user}}</span>
        </p>
        <p>
          <span>支付方式：</span>
          <span>{{order.pay_type | payType}}</span>
        </p>
        <p>
          <span>购买途径：</span>
          <span>在线商城</span>
        </p>
        <p>
          <span>确认收货时间：</span>
          <span>{{order.status | status}}</span>
        </p>
      </div>
      <hr />
      <div class="message">
        <div>收货人信息</div>
        <p>
          <span>收货人：</span>
          <span>{{order.receive_name}}</span>
        </p>
        <p>
          <span>手机号：</span>
          <span>{{order.receive_phone}}</span>
        </p>
        <p>
          <span>收货地址：</span>
          <span>{{order.receive_address}}</span>
        </p>
      </div>
      <hr />
      <div v-for="(item,index) of order.order_goods" :key="index" style="margin-top:5%;">
        <div class="message">
          <div>商品信息</div>
          <p>
            <span>商品图片：</span>
            <img :src="item.cover" width="200px" alt />
          </p>
          <p>
            <span>商品名称：</span>
            <span>{{item.name}}</span>
          </p>
          <p>
            <span>单价：</span>
            <span>{{item.price}}</span>
          </p>
          <p>
            <span>数量：</span>
            <span>{{item.amount}}</span>
          </p>
        </div>
      </div>
      <div class="message">
        <p>
          <span>配送费：</span>
          <span>{{order.freight}}</span>
        </p>
        <p>
          <span>小计：</span>
          <span>{{order.pay_money}}</span>
        </p>
      </div>
    </div>

    <el-dialog title="修改收货人信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="收货人姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.receive_phone"></el-input>
        </el-form-item>
        <el-form-item label="配送地址" class="site">
          <el-input v-model="form.receive_address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ordersUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: [],
      dialogVisible: false,
      form: {
        name: "",
        // eslint-disable-next-line camelcase
        receive_phone: "",
        // eslint-disable-next-line camelcase
        receive_address: ""
      }
    };
  },
  mounted() {
    this.getMessage();
  },
  filters: {
    payType(val) {
      if (val == "wechatpay") {
        return "微信支付";
      } else if (val == "balance") {
        return "余额支付";
      }
    },
    status(val) {
      switch (val) {
        case "unpaid":
          return "待付款";
        case "paid":
          return "配送中";
        case "delivered":
          return "已完成";
        case "close":
          return "已关闭";
      }
    }
  },
  methods: {
    accomplish() {
      let id = this.$route.query.id;
      let data = {
        status: "delivered"
      };
      this.$OrderManagement.ordersUpdate(data, id).then(res => {
        console.log(res);
        this.$message("修改成功");
        this.getMessage();
      });
    },
    getMessage() {
      let id = this.$route.query.id;
      this.$OrderManagement.ordersRead(id).then(res => {
        this.order = res.data;
      });
    },
    close() {
      this.$router.push({ path: "/ShopOrder" });
    },
    getConsignee(order) {
      this.form.name = order.receive_name;
      // eslint-disable-next-line camelcase
      this.form.receive_phone = order.receive_phone;
      // eslint-disable-next-line camelcase
      this.form.receive_address = order.receive_address;
    },
    ordersUpdate() {
      if (
        !this.form.name ||
        !this.form.receive_phone ||
        !this.form.receive_address
      ) {
        this.$message.error("内容不能为空");
      } else {
        let id = this.$route.query.id;
        let data = {
          // eslint-disable-next-line camelcase
          receive_name: this.form.name,
          // eslint-disable-next-line camelcase
          receive_phone: this.form.receive_phone,
          // eslint-disable-next-line camelcase
          receive_address: this.form.receive_address
        };
        this.$OrderManagement.ordersUpdate(data, id).then(res => {
          console.log(res);
          this.dialogVisible = false;
          this.$router.push({ path: "/ShopOrder" });
        });
      }
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.message > div {
  font-size: 18px;
  margin: 10px 0;
}
.message p {
  padding-left: 80px;
}
.message p span:first-child {
  font-weight: bold;
  font-size: 15px;
}
.site /deep/ .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
.site /deep/ .el-select {
  width: 115px;
}
</style>