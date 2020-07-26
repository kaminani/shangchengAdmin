<template>
  <div>
    <div class="flex">
      <span>商品图片：</span>
      <div>
        <el-upload
          :action="url"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :headers="headers"
          name="image"
          :limit="1"
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
    <el-button style="margin-left: 15%;margin-top: 3%;" type="info" plain @click="bannersCreate">添加</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/api/config/images/",
      dialogImageUrl: "",
      headers: {},
      dialogVisible: false,
      rank: "",
      cover: "",
      options: [],
      value: ""
    };
  },
  mounted() {
    this.personPayproof();
    this.articlesList();
  },
  methods: {
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
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    handleSuccess(response) {
      console.log(response);
      this.cover = response.image;
    },
    bannersCreate() {
      let data = {
        banner: this.cover,
        rank: this.rank,
        // eslint-disable-next-line camelcase
        article_id:this.value
      };
      this.$marketing.bannersCreate(data).then(res => {
        console.log(res);
        this.$router.push({ path: "/Banner" });
        this.$message({
          message: "添加成功",
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