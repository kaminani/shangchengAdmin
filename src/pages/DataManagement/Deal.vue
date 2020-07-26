<template>
  <div>
    <div class="flex">
      <div style="display:flex;">
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
        <el-input
          style="margin-left: 10px;"
          placeholder="请输入用户名"
          prefix-icon="el-icon-search"
          v-model="search"
          @keyup.enter.native="searchName()"
        ></el-input>
        <el-button type="primary" style="margin-left: 10px;" @click="searchName()">搜索</el-button>
      </div>
    </div>
    <div style="display:flex;">
      <div class="order">
        <div>当前总商城订单</div>
        <div>{{total}}</div>
      </div>
      <div class="order">
        <div>当前总售货机订单</div>
        <div>{{automat_count}}</div>
      </div>
      <div class="order">
        <div>当前总在线充值</div>
        <div>{{online_count}}</div>
      </div>
      <div class="order">
        <div>当前总充值送礼</div>
        <div>{{bonus_count}}</div>
      </div>
      <div class="order">
        <div>当前总管理员充值</div>
        <div>{{admin_add}}</div>
      </div>
      <div class="order">
        <div>当前总管理员扣款</div>
        <div>{{admin_minus}}</div>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-table
        :data="tableData"
        @filter-change="filterChange"
        :cell-style="{'text-align': 'center'}"
        :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          prop="detail"
          label="事项"
          min-width="100"
          :filter-multiple="false"
          :filters="[{text: '商城订单', value: '商城订单'},{text: '售货机订单', value: '售货机订单'}]"
          :column-key="'type'"
        ></el-table-column>
        <el-table-column prop="user" label="用户" min-width="100"></el-table-column>
        <el-table-column label="类型" min-width="100">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.type == '支出'?'rgb(124, 188, 25)':'rgb(239, 147, 158)'}"
            >{{ scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" min-width="100">
          <template slot-scope="scope">
            <span
              v-if="scope.row.type =='支出'"
              :style="{color:scope.row.type == '支出'?'rgb(124, 188, 25)':'rgb(239, 147, 158)'}"
            >-{{ scope.row.money}}</span>
            <span
              :style="{color:scope.row.type == '支出'?'rgb(124, 188, 25)':'rgb(239, 147, 158)'}"
              v-else
            >+{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_way | payWay}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="时间" min-width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" min-width="100"></el-table-column>
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
      time: "",
      startDate: "",
      endDate: "",
      search: "",
      total: null,
      pageSize: 20,
      currentPage: 1,
      // eslint-disable-next-line camelcase
      online_count: null,
      // eslint-disable-next-line camelcase
      automat_count: null,
      // eslint-disable-next-line camelcase
      recharge_count: null,
      // eslint-disable-next-line camelcase
      bonus_count: null,
      // eslint-disable-next-line camelcase
      admin_add: null,
      // eslint-disable-next-line camelcase
      admin_minus: null,
      detail: null
    };
  },
  mounted() {
    this.DataManagement();
  },
  filters: {
    payWay(val) {
      // switch (val) {
      //   case "wechatpay":
      //     return "微信";
      // }
      if (val == "wechatpay") {
        return "微信";
      } else {
        return "余额";
      }
    }
  },
  methods: {
    DataManagement() {
      let data = {
        search: this.search,
        pagesize: this.pageSize,
        page: this.currentPage,
        // eslint-disable-next-line camelcase
        gte_created_at: this.startDate,
        // eslint-disable-next-line camelcase
        lte_created_at: this.endDate,
        detail: this.detail
      };
      this.$DataManagement.financesList(data).then(res => {
        console.log(res);
        this.tableData = res.data.results;
        this.total = res.data.count;
        // eslint-disable-next-line camelcase
        this.online_count = res.data.online_count;
        // eslint-disable-next-line camelcase
        this.automat_count = res.data.automat_count;
        // eslint-disable-next-line camelcase
        this.recharge_count = res.data.recharge_count;
        // eslint-disable-next-line camelcase
        this.bonus_count = res.data.bonus_count;
        // eslint-disable-next-line camelcase
        this.admin_add = res.data.admin_add;
        // eslint-disable-next-line camelcase
        this.admin_minus = res.data.admin_minus;
      });
    },
    searchName() {
      if (this.search != "") {
        let data = {
          search: this.search,
          page: 1,
          pagesize: this.pageSize
        };
        this.$DataManagement.financesList(data).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count;
        });
      } else {
        let data = {
          page: 1,
          pagesize: this.pageSize
        };
        this.$DataManagement.financesList(data).then(res => {
          this.tableData = res.data.results;
          this.total = res.data.count;
        });
      }
    },
    searchTime() {
      if (this.time) {
        this.startDate = this.time[0];
        this.endDate = this.time[1];
      } else {
        this.startDate = null;
        this.endDate = null;
      }
      this.DataManagement();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.DataManagement();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.DataManagement();
    },
    filterChange(val) {
      this.detail = val.type[0];
      this.DataManagement();
      this.currentPage = 1;
      console.log('奇怪的知识增加了！！！');
    }
  }
};
</script>

<style scoped>
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