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
    <div style="display: flex;">
      <div class="flex">
        <span>商品图片：</span>
        <div v-for="(img, i) of cover2" :key="i">
          <img
            width="150px"
            height="150px"
            :src="img.image"
            style="border-radius: 5px;margin-right: 10px;"
            alt
          />
        </div>
      </div>
    </div>
    <div class="flex" style="padding-left: 15px;">
      <span>修改商品图片：</span>
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
          <el-button type="info" @click="online">修改</el-button>
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
    this.goodsRead();
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
      cover2: [],
      cover: [],
      url: "/api/config/images/",
      dialogImageUrl: "",
      dialogVisible: false,
      // eslint-disable-next-line camelcase
      is_show: null,
      barcode: ""
    };
  },
  methods: {
    goodsRead() {
      let id = this.$route.query.id;
      this.$goods.goodsRead(id).then(res => {
        console.log(res);
        this.name = res.data.name;
        this.stock = res.data.stock;
        // eslint-disable-next-line camelcase
        this.fake_price = res.data.fake_price;
        this.price = res.data.price;
        this.detail = res.data.detail;
        this.cover2 = res.data.cover;
        // eslint-disable-next-line camelcase
        this.value = parseInt(res.data.cate_id);
        // eslint-disable-next-line camelcase
        this.is_show = res.data.is_show;
        this.barcode = res.data.barcode;
      });
    },
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
      this.cover.push(response);
    },
    online() {
      let id = this.$route.query.id;
      let data = {};
      if (this.cover.length > 0) {
        data = {
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
          is_show: this.is_show,
          barcode: this.barcode
        };
      } else {
        data = {
          name: this.name,
          stock: this.stock,
          // eslint-disable-next-line camelcase
          fake_price: this.fake_price,
          price: this.price,
          detail: this.detail,
          // eslint-disable-next-line camelcase
          cate_id: this.value[1],
          // eslint-disable-next-line camelcase
          is_show: this.is_show,
          barcode: this.barcode
        };
      }

      this.$goods.goodsUpdate(data, id).then(res => {
        console.log(res);
        this.$message({ message: "修改成功", type: "success" });
        this.$router.push({ path: "/Goods" });
      });
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