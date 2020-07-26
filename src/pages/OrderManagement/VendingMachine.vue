<template>
  <div>
    <div class="flex">
      <div style="display:flex;">
        <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
        <el-button type="primary" style="margin-left: 10px;">搜索</el-button>
      </div>
      <div>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-table
        :data="tableData"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="date" label="提交时间" min-width="150"></el-table-column>
        <el-table-column prop="name" label="售货机编号" min-width="150"></el-table-column>
        <el-table-column prop="province" label="商品" min-width="120"></el-table-column>
        <el-table-column prop="city" label="用户账户" min-width="120"></el-table-column>
        <el-table-column prop="zip" label="实际支付" min-width="120"></el-table-column>
        <el-table-column prop="zip" label="支付方式" min-width="120"></el-table-column>
      </el-table>
    </div>
    <div style="text-align: center; margin-top:10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input2: "",
      value1: "",
      currentPage: 4,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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