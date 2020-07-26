<template>
  <div class="flex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 22px;">一级分类</span>
        <el-button style="float: right; padding: 7px 15px" @click="add();id=null">增加</el-button>
      </div>
      <div v-for="(item,o) of Catalogues" :key="o" class="text item contents">
        <span>
          <el-input v-if="edit == true && editIndex==o" v-model="item.name"></el-input>
          <span v-else>{{item.name}}</span>
        </span>
        <div>
          <el-button v-if="edit == true && editIndex==o" @click="cataloguesUpdate(item)">确定</el-button>
          <el-button v-else @click="modifyLevel(o)">编辑</el-button>
          <el-button @click="secondLevel(item.id)">查看</el-button>
          <el-button @click="CataloguesDialog(item),deleteDialog = true">删除</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-left: 10px;">
      <div slot="header" class="clearfix">
        <span style="font-size: 22px;">二级分类</span>
        <el-button
          style="float: right; padding: 7px 15px"
          @click="add2(id)"
          :disabled="submitDisabled"
        >增加</el-button>
      </div>
      <div v-for="(item,i) of Catalogues2" :key="i" class="text item contents">
        <span>
          <el-input v-if="edit2 == true && editIndex2==i" v-model="item.name"></el-input>
          <span v-else>{{item.name}}</span>
        </span>
        <div>
          <el-button v-if="edit2 == true && editIndex2==i" @click="cataloguesUpdate2(item)">确定</el-button>
          <el-button v-else @click="modifyLevel2(i)">编辑</el-button>
          <el-button @click="CataloguesDialog2(item),deleteDialog2 = true">删除</el-button>
        </div>
      </div>
    </el-card>

    <el-dialog :visible.sync="dialogVisible" width="25%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="cataloguesCreate('form')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible2" width="25%">
      <el-form ref="form2" :model="form2" :rules="rules2" label-width="80px">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="form2.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="cataloguesCreate2('form2')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
      <div style="text-align: center;">确认删除?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false,deleteCatalogues()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deleteDialog2" width="30%" center>
      <div style="text-align: center;">确认删除?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog2 = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog2 = false,deleteCatalogues2()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: -1,
      Catalogues: [],
      Catalogues2: [],
      dialogVisible: false,
      dialogVisible2: false,
      id: null,
      submitDisabled: true,
      edit: false,
      edit2: false,
      editIndex: 1,
      editIndex2: null,
      deleteDialog: false,
      deleteDialog2: false,
      rules: {
        name: [
          { required: true, message: "请输入分类名", trigger: "blur" },
          { min: 1, max: 8, message: "字数不可超过8个字", trigger: "blur" }
        ]
      },
      rules2: {
        name: [
          { required: true, message: "请输入分类名", trigger: "blur" },
          { min: 1, max: 8, message: "字数不可超过8个字", trigger: "blur" }
        ]
      },
      form: {
        name: ""
      },
      form2: {
        name: ""
      }
    };
  },
  mounted() {
    this.getCatalogues();
  },
  methods: {
    getCatalogues() {
      let data = {
        level: 1
      };
      this.$classify.catalogues(data).then(res => {
        this.Catalogues = res.data.results;
      });
    },
    CataloguesDialog(row) {
      this.deleteId = row.id;
    },
    deleteCatalogues() {
      this.submitDisabled = true;
      let id = this.deleteId;
      this.$classify.deleteCatalogues(id).then(res => {
        console.log(res);
        this.$message("删除成功");
        this.getCatalogues();
        this.Catalogues2 = [];
      });
    },
    CataloguesDialog2(row) {
      this.deleteId2 = row.id;
    },
    deleteCatalogues2() {
      let id = this.deleteId2;
      this.$classify.deleteCatalogues(id).then(res => {
        console.log(res);
        this.$message("删除成功");
        this.secondLevel(this.id);
      });
    },
    add() {
      this.dialogVisible = true;
      this.form = {};
    },
    cataloguesCreate(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let data = {
            name: this.form.name
            // eslint-disable-next-line camelcase
            // parent_id: 1
          };
          this.$classify.cataloguesCreate(data).then(res => {
            console.log(res);
            this.dialogVisible = false;
            this.getCatalogues();
            this.Catalogues2 = [];
            if (this.id) {
              this.secondLevel(this.id);
            }
            this.$message("增加成功");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    modifyLevel(o) {
      this.edit = true;
      this.editIndex = o;
    },
    cataloguesUpdate(item) {
      console.log(item);
      let id = item.id;
      let data = {
        name: item.name
      };
      this.$classify.cataloguesUpdate(id, data).then(res => {
        console.log(res);
        this.getCatalogues();
        this.Catalogues2 = [];
        if (this.id) {
          this.secondLevel(this.id);
        }
        this.$message("编辑成功");
        this.edit = false;
      });
    },
    modifyLevel2(i) {
      this.edit2 = true;
      this.editIndex2 = i;
    },
    cataloguesUpdate2(item) {
      console.log(item);
      let id = item.id;
      let data = {
        name: item.name,
        // eslint-disable-next-line camelcase
        parent_id: item.parent_id
      };
      this.$classify.cataloguesUpdate(id, data).then(res => {
        console.log(res);
        this.getCatalogues();
        this.Catalogues2 = [];
        if (this.id) {
          this.secondLevel(this.id);
        }
        this.$message("编辑成功");
        this.edit2 = false;
      });
    },
    secondLevel(id) {
      this.submitDisabled = false;
      this.id = id;
      this.$classify.cataloguesRead(id).then(res => {
        this.Catalogues2 = res.data.children;
      });
    },
    add2(id) {
      this.dialogVisible2 = true;
      this.form2 = {};
      console.log(id);
      this.id = id;
    },
    cataloguesCreate2(form2) {
      this.$refs[form2].validate(valid => {
        if (valid) {
          let data = {
            name: this.form2.name,
            // eslint-disable-next-line camelcase
            parent_id: this.id
          };
          this.$classify.cataloguesCreate(data).then(res => {
            console.log(res);
            this.dialogVisible2 = false;
            this.secondLevel(this.id);
            this.$message("增加成功");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  line-height: 30px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.contents {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>