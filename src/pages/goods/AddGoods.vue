<template>
  <div>
    <div class="flex">
      <span>商品名称：</span>
      <div>
        <el-input v-model="name"></el-input>
      </div>
    </div>
    <div class="flex" style="padding-left: 68px;">
      <span>条形码：</span>
      <div>
        <el-input v-model="barcode"></el-input>
      </div>
    </div>
    <div class="flex">
      <span>商品图片：</span>
      <div>
        <el-upload
          :action="url"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :headers="headers"
          name="image"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
    </div>
    <div style="display: flex;">
      <div class="flex" style="padding-left: 85px;">
        <span>分类：</span>
        <div>
          <el-cascader v-model="value" :options="options"></el-cascader>
        </div>
      </div>
    </div>
    <div style="display: flex;">
      <div class="flex">
        <span>实际价格：</span>
        <div>
          <el-input v-model="price"></el-input>
        </div>
      </div>
      <div class="flex" style="padding-left: 88px;">
        <span>原价：</span>
        <div>
          <el-input v-model="fake_price"></el-input>
        </div>
      </div>
    </div>
    <div class="flex" style="padding-left: 85px;">
      <span>库存：</span>
      <div>
        <el-input v-model="stock"></el-input>
      </div>
    </div>
    <div class="Details">
      <span>商品详情：</span>
      <div style="width:530px;">
        <el-input type="textarea" :rows="10" placeholder="请输入商品简介" v-model="detail"></el-input>
        <div style="padding-top:10px;">
          <el-button type="info" @click="online">保存上线</el-button>
          <el-button type="info" @click="save">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.personPayproof();
    this.getCatalogues();
  },
  data() {
    return {
      name: "",
      detail: "",
      price: "",
      // eslint-disable-next-line camelcase
      fake_price: "",
      stock: "",
      options: [],
      value: [],
      headers: {},
      fileList: [],
      cover: [],
      url: "/api/config/images/",
      dialogImageUrl: "",
      dialogVisible: false,
      barcode: ""
    };
  },
  methods: {
    personPayproof() {
      var token = this.cookies.get("token");
      this.token = token;
      this.headers = {
        Authorization: token
      };
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(file.response.image);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.response.image;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    handleSuccess(response) {
      console.log(response);
      this.cover.push({ image: response.image });
    },
    save() {
      if (!this.name) {
        this.$message({
          showClose: true,
          message: "商品名不能为空！",
          type: "warning"
        });
      } else if (!this.stock) {
        this.$message({
          showClose: true,
          message: "库存不能为空！",
          type: "warning"
        });
      } else if (!this.fake_price) {
        this.$message({
          showClose: true,
          message: "原价不能为空！",
          type: "warning"
        });
      } else if (!this.price) {
        this.$message({
          showClose: true,
          message: "实际价格不能为空！",
          type: "warning"
        });
      } else if (this.detail.length >= 250) {
        this.$message({
          showClose: true,
          message: "商品详情内容不能超过250字！",
          type: "warning"
        });
      } else if (!this.value[1]) {
        this.$message({
          showClose: true,
          message: "分类不能为空！",
          type: "warning"
        });
      } else if (this.cover.length == 0) {
        this.$message({
          showClose: true,
          message: "商品图片不能为空！",
          type: "warning"
        });
      } else {
        let data = {
          name: this.name,
          stock: this.stock,
          // eslint-disable-next-line camelcase
          fake_price: this.fake_price,
          price: this.price,
          detail: this.detail,
          cover: this.cover,
          // eslint-disable-next-line camelcase
          cate_id: this.value[1],
          // eslint-disable-next-line camelcase
          is_show: false,
          barcode: this.barcode
        };
        this.$goods
          .goodsCreate(data)
          .then(res => {
            console.log(res);
            this.$message({ message: "保存成功", type: "success" });
            this.$router.push({ path: "/Goods" });
          })
          .catch(error => {
            // console.log(error);
            this.$message({ message: error.data.barcode[0], type: "success" });
          });
      }
    },
    online() {
      if (!this.name) {
        this.$message({
          showClose: true,
          message: "商品名不能为空！",
          type: "warning"
        });
      } else if (!this.stock) {
        this.$message({
          showClose: true,
          message: "库存不能为空！",
          type: "warning"
        });
      } else if (!this.fake_price) {
        this.$message({
          showClose: true,
          message: "原价不能为空！",
          type: "warning"
        });
      } else if (!this.price) {
        this.$message({
          showClose: true,
          message: "实际价格不能为空！",
          type: "warning"
        });
      } else if (this.detail.length >= 250) {
        this.$message({
          showClose: true,
          message: "商品详情内容不能超过250字！",
          type: "warning"
        });
      } else if (!this.value[1]) {
        this.$message({
          showClose: true,
          message: "分类不能为空！",
          type: "warning"
        });
      } else if (this.cover.length == 0) {
        this.$message({
          showClose: true,
          message: "商品图片不能为空！",
          type: "warning"
        });
      } else {
        let data = {
          name: this.name,
          stock: this.stock,
          // eslint-disable-next-line camelcase
          fake_price: this.fake_price,
          price: this.price,
          detail: this.detail,
          cover: this.cover,
          // eslint-disable-next-line camelcase
          cate_id: this.value[1],
          // eslint-disable-next-line camelcase
          is_show: true,
          barcode: this.barcode
        };
        this.$goods
          .goodsCreate(data)
          .then(res => {
            console.log(res);
            this.$message({ message: "保存成功", type: "success" });
            this.$router.push({ path: "/Goods" });
          })
          .catch(error => {
            // console.log(error);
            this.$message({ message: error.data.barcode[0], type: "success" });
          });
      }
    },
    getCatalogues() {
      let data = {
        level: 1
      };
      this.$classify.catalogues(data).then(res => {
        res.data.results.map(i => {
          let obj = { text: null, value: null, children: [] };
          obj.label = i.label;
          obj.value = i.value;
          obj.children = i.children;
          this.options.push(obj);
        });
      });
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  padding-left: 50px;
  padding-top: 30px;
}
.flex > span {
  font-size: 18px;
}
.Details {
  display: flex;
  padding-left: 50px;
  padding-top: 30px;
}
.Details > span {
  font-size: 18px;
}
</style>