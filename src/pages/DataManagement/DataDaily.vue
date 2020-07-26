<template>
  <div>
    <div class="goods">
      <div></div>
      <div>
        <el-button type="primary" @click="getInExcel">导出</el-button>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-table
        :data="tableData"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
        :default-sort="{ order: 'descending'}"
        @sort-change="handleSortChange"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <!-- <el-table-column prop="cover" label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.cover.image" width="100px" height="90px" />
          </template>
        </el-table-column>-->
        <el-table-column prop="name" label="商品名" min-width="100"></el-table-column>
        <el-table-column prop="order_type" label="订单类型" min-width="100"></el-table-column>
        <el-table-column prop="today_amount" sortable="custom" label="今日销售数量" min-width="100"></el-table-column>
        <el-table-column prop="yesterday_amount" sortable="custom" label="昨日销售数量" min-width="100"></el-table-column>
        <el-table-column prop="mouth_amount" sortable="custom" label="本月销售数量" min-width="100"></el-table-column>
        <el-table-column prop="all_amount" sortable="custom" label="总销量" min-width="100"></el-table-column>
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
export default {
  data() {
    return {
      tableData: [],
      search: "",
      total: null,
      pageSize: 20,
      currentPage: 1,
      ordering: null
    };
  },
  mounted() {
    this.goodsSales();
  },
  methods: {
    getInExcel() {
      require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const { export_json_to_excel } = require("../../vendor/Export2Excel");
        const tHeader = [
          "商品名",
          "今日销售数量",
          "昨日销售数量",
          "本月销售数量",
          "总销量"
        ];
        const filterVal = [
          "name",
          "today_amount",
          "yesterday_amount",
          "mouth_amount",
          "all_amount"
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        // eslint-disable-next-line camelcase
        export_json_to_excel(tHeader, data, "拨款批次表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    goodsSales() {
      let data = {
        search: this.search,
        pagesize: this.pageSize,
        page: this.currentPage,
        ordering: this.ordering,
        // eslint-disable-next-line camelcase
        sales_goods__order__type: this.type
      };
      this.$DataManagement.goodsSales(data).then(res => {
        console.log(res);
        this.tableData = res.data.results;
        this.total = res.data.count;
      });
    },
    //排序
    handleSortChange(val) {
      switch (val.order) {
        case "descending":
          switch (val.prop) {
            case "today_amount":
              this.ordering = "-today_amount";
              this.goodsSales();
              break;
            case "yesterday_amount":
              this.ordering = "-yesterday_amount";
              this.goodsSales();
              break;
            case "mouth_amount":
              this.ordering = "-mouth_amount";
              this.goodsSales();
              break;
            case "all_amount":
              this.ordering = "-all_amount";
              this.goodsSales();
              break;
          }
          break;
        case "ascending":
          switch (val.prop) {
            case "today_amount":
              this.ordering = "today_amount";
              this.goodsSales();
              break;
            case "yesterday_amount":
              this.ordering = "yesterday_amount";
              this.goodsSales();
              break;
            case "mouth_amount":
              this.ordering = "mouth_amount";
              this.goodsSales();
              break;
            case "all_amount":
              this.ordering = "all_amount";
              this.goodsSales();
              break;
          }
          break;
        default:
          this.ordering = null;
          this.goodsSales();
      }
    },
    searchName() {
      if (this.search != "") {
        let data = {
          search: this.search,
          page: 1,
          pagesize: this.pageSize
        };
        this.$DataManagement.goodsSales(data).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count;
        });
      } else {
        let data = {
          page: 1,
          pagesize: this.pageSize
        };
        this.$DataManagement.goodsSales(data).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count;
        });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.goodsSales();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.goodsSales();
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
  justify-content: flex-end;
}
.order {
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  background-color: rgb(245, 154, 35);
  color: #fff;
  font-size: 18px;
}
</style>