<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/Column' }">栏目配置</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex">
      <div style="display:flex;">
        <!-- <el-input
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search"
          v-model="search"
          @keyup.enter.native="searchName()"
        ></el-input>
        <el-button type="primary" style="margin-left: 10px;" @click="searchName()">搜索</el-button>-->
      </div>
      <div>
        <el-button type="primary" style="margin-left: 10px;" @click="readAdd(),add = true">添加商品</el-button>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-table
        :data="tableData"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="商品名"></el-table-column>
        <el-table-column label="商品图" min-width="100">
          <template slot-scope="scope">
            <img :src="scope.row.cover[0].image" width="100px" height="100px" />
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="所属栏目" min-width="100"></el-table-column>
        <el-table-column prop="rank" label="排序" min-width="100"></el-table-column>-->
        <el-table-column fixed="right" label="操作" min-width="150">
          <template slot-scope="scope">
            <!-- <el-button size="small" @click="edit(scope.row)">编辑</el-button> -->
            <el-button size="small" @click="columnsUpdate(scope.row.id,'del')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div style="text-align: center; margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>-->

    <el-dialog :visible.sync="add" width="30%" center>
      <span>
        <div class="addinput">
          <div>商品名</div>
          <div>
            <el-select v-model="value" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="columnsAdd()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog :visible.sync="editdialog" width="30%" center>
      <span>
        <div class="addinput">
          <div>商品名</div>
          <div>
            <el-select v-model="value" filterable multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="addinput">
          <div>所属栏目</div>
          <el-input v-model="name"></el-input>
        </div>
        <div class="addinput">
          <div>排序</div>
          <el-input v-model="rank"></el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="columnsUpdate">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      currentPage: 1,
      pageSize: 20,
      total: null,
      tableData: [],
      editdialog: false,
      add: false,
      name: "",
      options: [],
      value: [],
      rank: ""
    };
  },
  mounted() {
    this.columnsRead();
    this.goodsName();
  },
  methods: {
    columnsRead() {
      // console.log(this.$route.query.id);
      let id = this.$route.query.data.id;
      let data = {
        search: this.search,
        pagesize: this.pageSize,
        page: this.currentPage
      };
      this.$columns.columnsRead(id, data).then(res => {
        this.tableData = res.data.goods;
        this.total = res.data.count;
      });
    },
    goodsName() {
      this.$goods.goodsList().then(res => {
        res.data.results.map(i => {
          let obj = { value: i.id, label: i.name };
          this.options.push(obj);
        });
      });
    },
    readAdd() {
      if (this.$route.query.data.goods !== null) {
        this.$route.query.data.goods.map(i => {
          let id = i.id;
          if (this.value.length < this.$route.query.data.goods.length) {
            this.value.push(id);
          }
        });
      }
    },
    columnsAdd() {
      let id = this.$route.query.data.id;
      let goodList = [];
      goodList.push.apply(goodList, this.value);
      let data = {
        // eslint-disable-next-line camelcase
        goods_id: goodList
      };
      this.$columns.columnsUpdate(id, data).then(res => {
        console.log(res);
        this.$message({ message: "修改成功", type: "success" });
        this.columnsRead();
        this.add = false;
      });
    },
    columnsUpdate(id, type) {
      let cateId = this.$route.query.data.id;
      let goodList = [];
      this.tableData.forEach(item => {
        goodList.push(item.id);
      });
      if (type == "add") {
        goodList.push.apply(goodList, this.value);
        // this.value.forEach(item=>{
        //         goodList.push(item);
        // });
      } else if (type == "del") {
        let index = goodList.indexOf(id);
        if (index > -1) {
          goodList.splice(index, 1);
        }
      }
      let data = {
        // name: row.name,
        // eslint-disable-next-line camelcase
        goods_id: goodList
      };
      this.$columns.columnsUpdate(cateId, data).then(res => {
        console.log(res);
        this.$message({ message: "修改成功", type: "success" });
        this.columnsRead();
      });
    }
    // columnsUpdate() {
    //   let id = this.id;
    //   let data = {
    //     name: this.name,
    //     rank: this.rank,
    //     // eslint-disable-next-line camelcase
    //     goods_id: this.value
    //   };

    //   this.$columns.columnsUpdate(id, data).then(res => {
    //     console.log(res);
    //     this.$message({ message: "编辑成功", type: "success" });
    //     this.editdialog = false;
    //     this.columnsList();
    //   });
    // },
    // edit(row) {
    //   this.id = row.id;
    //   this.editdialog = true;
    //   this.name = row.name;
    //   this.rank = row.rank;
    //     row.goods.map(i => {
    //       let arr = i.id;
    //       if (this.value.length < row.goods.length){
    //         this.value.push(arr);
    //       }
    //     });
    // },
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.columnsList();
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   this.columnsList();
    // }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.addinput {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.addinput > div:first-child {
  width: 70px;
}
.addinput > div:nth-child(2) {
  width: 300px;
}
</style>