<template>
  <div>
    <div class="flex">
      <span>商品图片：</span>
      <div style="display: flex;">
        <img width="146px" height="146px" :src="dialogImageUrl" style="border-radius: 6px;" />
        <el-upload
          :action="url"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :headers="headers"
          name="image"
          :limit="1"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          style="margin-left: 10px;"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>

    <div class="flex">
      <span style="width:72px;">文章：</span>
      <div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div class="flex">
      <span>权重值：</span>
      <div>
        <el-input v-model="rank"></el-input>
      </div>
    </div>
    <el-button style="margin-left: 15%;margin-top: 3%;" type="info" plain @click="partialUpdate">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/api/config/images/",
      dialogImageUrl: "",
      headers: {},
      rank: "",
      cover: "",
      options: [],
      value: ""
    };
  },
  mounted() {
    this.personPayproof();
    this.articlesList();
    this.bannersRead();
  },
  methods: {
    bannersRead() {
      let id = this.$route.query.id;
      this.$marketing.bannersRead(id).then(res => {
        console.log(res);
        this.rank = res.data.rank;
        this.dialogImageUrl = res.data.banner;
      });
    },
    articlesList() {
      this.$marketing.articlesList().then(res => {
        console.log(res);
        res.data.results.map(i => {
          let obj = { value: i.id, label: i.title };
          this.options.push(obj);
        });
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
      console.log(this.dialogImageUrl);
    },
    handleSuccess(response) {
      console.log(response);
      this.cover = response.image;
    },
    partialUpdate() {
      let id = this.$route.query.id;
      let data = {
        banner: this.cover,
        rank: this.rank,
        // eslint-disable-next-line camelcase
        article_id: this.value
      };
      this.$marketing.partialUpdate(data, id).then(res => {
        console.log(res);
        this.$router.push({ path: "/Banner" });
        this.$message({
          message: "修改成功",
          type: "success"
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
</style>