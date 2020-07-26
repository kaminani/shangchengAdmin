<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/Column' }">栏目配置</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="flex" style="margin-top: 15px;">
            <div style="display:flex;">
                <el-input
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search"
                    v-model="search"
                    @keyup.enter.native="searchName()"
                ></el-input>
                <el-button type="primary" style="margin-left: 10px;" @click="searchName()">搜索</el-button>
            </div>
            <div>
                <el-button type="primary" style="margin-left: 10px;" @click="create">新增栏目</el-button>
            </div>
        </div>
        <div style="margin-top: 10px;">
            <el-table
                :data="tableData"
                :cell-style="{'text-align': 'center'}"
                :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
            >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="name" label="栏目"></el-table-column>
                <el-table-column prop="rank" label="排序" min-width="100"></el-table-column>
                <el-table-column prop="is_show" label="状态" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.is_show | show}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="150">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.is_show == false" @click="Up(scope.row)" size="small">上线</el-button>
                        <el-button v-else @click="out(scope.row)" size="small">下线</el-button>
                        <el-button size="small" @click="managementGoods(scope.row)">管理</el-button>
                        <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="small" @click="columnsDialog(scope.row), deleteDialog = true">删除</el-button>
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

        <el-dialog :visible.sync="add" width="30%" center>
      <span>
        <div class="addinput">
          <div>栏目名</div>
          <el-input v-model="name"></el-input>
        </div>
        <div class="addinput">
          <div>权重值</div>
          <el-input v-model="rank"></el-input>
        </div>
        <div class="addinput">
          <div>是否上线</div>
          <el-radio-group v-model="show">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </div>
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
      </span>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
        </el-dialog>

        <el-dialog :visible.sync="editdialog" width="30%" center>
      <span>
        <div class="addinput">
          <div>栏目名</div>
          <el-input v-model="name"></el-input>
        </div>
        <div class="addinput">
          <div>权重值</div>
          <el-input v-model="rank"></el-input>
        </div>
        <div class="addinput">
          <div>是否上线</div>
          <el-radio-group v-model="show">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </div>
      </span>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="columnsUpdate">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
            <div style="text-align: center;">确认删除?</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false,columnsDelete()">确 定</el-button>
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
                pageSize: 20,
                total: null,
                tableData: [],
                add: false,
                editdialog: false,
                deleteDialog: false,
                name: "",
                rank: "",
                show: "true",
                value: [],
                options: []
            };
        },
        filters: {
            show(val) {
                if (val == true) {
                    return "上线";
                } else {
                    return "下线";
                }
            }
        },
        mounted() {
            this.columnsList();
            this.goodsName();
        },
        methods: {
            columnsList() {
                let data = {
                    search: this.search,
                    pagesize: this.pageSize,
                    page: this.currentPage
                };
                this.$columns.columnsList(data).then(res => {
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
                    this.$columns.columnsList(data).then(res => {
                        this.tableData = res.data.results;
                        this.total = res.data.count;
                    });
                } else {
                    let data = {
                        page: 1,
                        pagesize: this.pageSize
                    };
                    this.$columns.columnsList(data).then(res => {
                        this.tableData = res.data.results;
                        this.total = res.data.count;
                    });
                }
            },
            create() {
                this.add = true;
                this.name = null;
                this.rank = null;
                this.value = null;
            },
            onSubmit() {
                let data = {
                    name: this.name,
                    rank: this.rank,
                    // eslint-disable-next-line camelcase
                    is_show: this.show,
                    // eslint-disable-next-line camelcase
                    goods_id: this.value
                };
                this.$columns.columnsCreate(data).then(res => {
                    console.log(res);
                    this.$message({message: "创建成功", type: "success"});
                    this.add = false;
                    this.columnsList();
                });
            },
            columnsDialog(row) {
                this.DeleteID = row.id;
            },
            columnsDelete() {
                let id = this.DeleteID;
                this.$columns.columnsDelete(id).then(res => {
                    console.log(res);
                    this.$message({message: "删除成功", type: "success"});
                    this.columnsList();
                });
            },
            edit(row) {
                this.id = row.id;
                this.editdialog = true;
                this.name = row.name;
                this.rank = row.rank;
                // eslint-disable-next-line semi
                this.show = row.is_show.toString();
            },
            columnsUpdate() {
                let id = this.id;
                let data = {
                    name: this.name,
                    rank: this.rank,
                    // eslint-disable-next-line camelcase
                    is_show: this.show
                };
                this.$columns.columnsUpdate(id, data).then(res => {
                    console.log(res);
                    this.$message({message: "编辑成功", type: "success"});
                    this.editdialog = false;
                    this.columnsList();
                });
            },
            Up(row) {
                let id = row.id;
                let data = {
                    // eslint-disable-next-line camelcase
                    is_show: true
                };
                this.$columns.columnsUpdate(id, data).then(res => {
                    console.log(res);
                    this.$message({message: "上线成功", type: "success"});
                    this.editdialog = false;
                    this.columnsList();
                });
            },
            out(row) {
                let id = row.id;
                let data = {
                    // eslint-disable-next-line camelcase
                    is_show: false
                };
                this.$columns.columnsUpdate(id, data).then(res => {
                    console.log(res);
                    this.$message({message: "下线成功", type: "success"});
                    this.editdialog = false;
                    this.columnsList();
                });
            },
            goodsName() {
                this.$goods.goodsList().then(res => {
                    res.data.results.map(i => {
                        let obj = {value: i.id, label: i.name};
                        this.options.push(obj);
                    });
                });
            },
            managementGoods(row) {
                console.log(row);
                this.$router.push({path: "/ColumnGoods", query: {data: row}});
            },
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.columnsList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.columnsList();
            }
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
