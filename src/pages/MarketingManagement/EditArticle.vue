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
    <el-button type="info" style="margin-left: 30%;" @click="edit">编辑</el-button>
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
    this.form.title = this.$route.params.data.title;
    this.form.content = this.$route.params.data.content;
  },
  methods: {
    edit() {
      let id = this.$route.params.data.id;
      let data = {
        title: this.form.title,
        content: this.form.content
      };
      this.$marketing.articlesUpdate(data, id).then(res => {
        console.log(res);
        this.$router.push({path:'/Article'});
        this.$message({ message: "编辑成功", type: "success" });
      });
    }
  }
};
</script>

<style scoped>
.txt>>>.el-textarea__inner{
    height: 500px;
}
</style>