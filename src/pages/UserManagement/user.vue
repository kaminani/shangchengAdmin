<template>
  <div>
    <div class="goods">
      <div></div>
      <div>
        <el-input
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search"
          v-model="search"
          @keyup.enter.native="searchName()"
        ></el-input>
        <el-button type="primary" @click="searchName()">搜索</el-button>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-table
        :data="tableData"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="nickname" label="微信昵称" min-width="150"></el-table-column>
        <!-- <el-table-column prop="phone" label="手机号" min-width="150"></el-table-column> -->
        <el-table-column prop="created_at" label="注册时间" min-width="150"></el-table-column>
        <el-table-column prop="money" label="余额" min-width="100"></el-table-column>
        <el-table-column prop="order_count" label="成交次数" min-width="100"></el-table-column>
        <el-table-column prop="order_money" label="成交金额" min-width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" min-width="250">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row),centerDialogVisible = true" size="small">充值</el-button>
            <el-button size="small" @click="chargeDialog(scope.row), chargeMoney= true">扣款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center; margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog title="充值" :visible.sync="centerDialogVisible" width="30%" center>
      <span>
        <div class="flex">
          <div>金额</div>
          <el-input v-model="money"></el-input>
          <div>元</div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="recharge">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="扣款" :visible.sync="chargeMoney" width="30%" center>
      <span>
        <div class="flex">
          <div>金额</div>
          <el-input v-model="money"></el-input>
          <div>元</div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chargeMoney = false">取 消</el-button>
        <el-button type="primary" @click="charge">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      currentPage: 1,
      tableData: [],
      pageSize: 20,
      total: null,
      centerDialogVisible: false,
      money: null,
      phone: "",
      nickname: "",
      chargeMoney: false
    };
  },
  mounted() {
    this.profilesList();
  },
  methods: {
    profilesList() {
      let data = {
        search: this.search,
        pagesize: this.pageSize,
        page: this.currentPage
      };
      this.$user.profilesList(data).then(res => {
        console.log(res);
        this.tableData = res.data.results;
        this.total = res.data.count;
      });
    },
    searchName() {
      if (this.search != "") {
        let data = {
          search: this.search,
          page: 1,
          pagesize: this.pageSize
        };
        this.$user.profilesList(data).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count;
        });
      } else {
        let data = {
          page: 1,
          pagesize: this.pageSize
        };
        this.$user.profilesList(data).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count;
        });
      }
    },
    handleClick(row) {
      this.id = row.id;
    },
    recharge() {
      if (!this.money) {
        this.$message.error("内容不能为空！");
      } else {
        let id = this.id;
        let data = {
          money:parseFloat(this.money),
          type: "add",
        };
        this.$user.profilesRecharge(id, data).then(res => {
          console.log(res);
          this.$message({
            message: "充值成功",
            type: "success"
          });
          this.money = null;
          this.centerDialogVisible = false;
          this.profilesList();
        });
      }
    },
    chargeDialog(row) {
      this.id = row.id;
    },
    charge() {
      if (!this.money) {
        this.$message.error("内容不能为空！");
      } else {
        let id = this.id;
        let data = {
          money: parseInt(this.money),
          type: "minus",
        };
        this.$user.profilesRecharge(id, data).then(res => {
          console.log(res);
          this.$message({
            message: "扣款成功",
            type: "success"
          });
          this.money = null;
          this.chargeMoney = false;
          this.profilesList();
        });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.profilesList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.profilesList();
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  justify-content: space-between;
}
.goods > div:nth-child(2) {
  display: flex;
}
.goods > div:nth-child(2) > div:first-child {
  padding-right: 10px;
}
.flex {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 200px;
}
.flex > div:first-child {
  flex: 2;
}
.flex > div:nth-child(2) {
  flex: 6;
}
.flex > div:nth-child(3) {
  flex: 2;
  text-align: center;
}
</style>