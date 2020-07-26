<template>
  <div>
    <div class="flex">
      <div style="display:flex;">
        <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="search"></el-input>
        <el-button type="primary" style="margin-left: 10px;" @click="searchName">搜索</el-button>
      </div>
      <div>
        <el-date-picker
          v-model="time"
          @change="searchTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-table
        :data="tableData"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
        @filter-change="filterChange"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="created_at" label="提交时间" min-width="150"></el-table-column>
        <el-table-column prop="number" label="订单号" min-width="150"></el-table-column>
        <el-table-column prop="user" label="用户账户" min-width="120"></el-table-column>
        <el-table-column prop="money" label="实际支付" min-width="120"></el-table-column>
        <el-table-column prop="freight" label="配送费" min-width="120"></el-table-column>
        <el-table-column label="支付方式" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.pay_type | payType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          min-width="120"
          :column-key="'status'"
          :filter-multiple="false"
          :filters="[{text: '已退款', value: 'refunds'},{text: '出货失败', value: 'failure'},{text: '未支付', value: 'unpaid'},{text: '已支付', value: 'paid'},{text: '已发送', value: 'delivered'},{text: '已取消', value: 'close'}]"
        >
          <template slot-scope="scope">
            <span>{{scope.row.status | status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单类型"
          min-width="120"
          :column-key="'type'"
          :filter-multiple="false"
          :filters="[{text: '商城订单', value: 'online'},{text: '售货机订单', value: 'automat'}]"
        >
          <template slot-scope="scope">
            <span>{{scope.row.type | type}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="250">
          <template slot-scope="scope">
            <el-button @click="read(scope.row)" size="small">查看订单</el-button>
            <el-button
              size="small"
              v-if="permissions == '超级管理员'"
              @click="ordersUpdate(scope.row)"
            >关闭订单</el-button>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["permissions"])
  },
  data() {
    return {
      time: "",
      search: "",
      currentPage: 1,
      tableData: [],
      pageSize: 20,
      total: null,
      startDate: "",
      endDate: "",
      status: "",
      type: ""
    };
  },
  mounted() {
    this.ordersList();
  },
  filters: {
    status(val) {
      switch (val) {
        case "unpaid":
          return "未支付";
        case "paid":
          return "配送中";
        case "delivered":
          return "已发送";
        case "close":
          return "已取消";
        case "failure":
          return "出货失败";
        case "refunds":
          return "已退款";
      }
    },
    payType(val) {
      switch (val) {
        case "微信":
          return "微信";
        case "balance":
          return "余额";
      }
    },
    type(val) {
      switch (val) {
        case "online":
          return "商城订单";
        case "automat":
          return "售货机订单";
      }
    }
  },
  methods: {
    ordersList() {
      let data = {
        search: this.search,
        pagesize: this.pageSize,
        page: this.currentPage,
        // eslint-disable-next-line camelcase
        gte_created_at: this.startDate,
        // eslint-disable-next-line camelcase
        lte_created_at: this.endDate,
        status: this.status,
        type: this.type
      };
      this.$OrderManagement.ordersList(data).then(res => {
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
        this.$OrderManagement.ordersList(data).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count;
        });
      } else {
        let data = {
          page: 1,
          pagesize: this.pageSize
        };
        this.$OrderManagement.ordersList(data).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count;
        });
      }
    },
    read(row) {
      this.$router.push({ path: "/OrderPayment", query: { id: row.id } });
    },
    ordersUpdate(row) {
      let id = row.id;
      let data = {
        status: "close"
      };
      this.$OrderManagement.ordersUpdate(data, id).then(res => {
        console.log(res);
        this.dialogVisible = false;
        this.$message({
          message: "订单已关闭",
          type: "success"
        });
        this.ordersList();
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.ordersList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.ordersList();
    },
    filterChange(filteredValue) {
      // console.log(filteredValue.status);
      if (filteredValue.status) {
        this.status = filteredValue.status[0];
      } else {
        this.type = filteredValue.type[0];
      }
      this.currentPage = 1;
      this.ordersList();
    },
    searchTime() {
      if (this.time) {
        this.startDate = this.time[0];
        this.endDate = this.time[1];
      } else {
        this.startDate = null;
        this.endDate = null;
      }
      this.ordersList();
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
</style>