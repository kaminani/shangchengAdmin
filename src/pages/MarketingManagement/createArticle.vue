<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章名">
        <el-input v-model="form.title" style="width:20%;"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" v-model="form.content" style="width:80%;" class="txt"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="info" style="margin-left: 30%;" @click="onSubmit">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: ""
      }
    };
  },
  mounted() {
  },
  methods: {
     onSubmit() {
      let data = {
        title: this.form.title,
        content: this.form.content
      };
      this.$marketing.articlesCreate(data).then(res => {
        console.log(res);
        this.$router.push({path:'/Article'});
        this.$message({ message: "创建成功", type: "success" });
      });
    },
  }
};
</script>

<style scoped>
.txt>>>.el-textarea__inner{
    height: 500px;
}
</style>