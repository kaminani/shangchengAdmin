<template>
    <div>
        <div class="goods">
            <div></div>
            <div>
                <el-button type="primary" @click="create(),dialogVisible = true">新增配送员</el-button>
            </div>
        </div>
        <div style="margin-top: 10px;">
            <el-table
                :data="tableData"
                :cell-style="{'text-align': 'center'}"
                :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
            >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="username" label="配送员名称" min-width="150"></el-table-column>
                <el-table-column prop="password" label="设置密码" min-width="150">******</el-table-column>
                <el-table-column fixed="right" label="操作" min-width="250">
                    <template slot-scope="scope">
                        <el-button @click="Update(scope.row),UpdateDialog = true" size="small">编辑</el-button>
                        <el-button @click="couriersDialog(scope.row),deleteDialog=true" size="small">删除</el-button>
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

        <el-dialog :visible.sync="dialogVisible" width="25%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="couriersCreate">确认</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :visible.sync="UpdateDialog" width="25%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="couriersUpdate">确认</el-button>
                    <el-button @click="UpdateDialog = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
            <div style="text-align: center;">确认删除?</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false,couriersDelete()">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: "",
                    password: ""
                },
                input2: "",
                currentPage: 1,
                dialogVisible: false,
                UpdateDialog: false,
                tableData: [],
                total: null,
                pageSize: 20,
                deleteDialog: false
            };
        },
        mounted() {
            this.couriersList();
        },
        methods: {
            couriersList() {
                let data = {
                    search: this.search,
                    size: this.pageSize,
                    page: this.currentPage
                };
                this.$Dispatching.couriersList(data).then(res => {
                    console.log(res);
                    this.tableData = res.data.results;
                    this.total = res.data.count;
                });
            },
            create() {
                this.form = {};
            },
            couriersCreate() {
                if (!this.form.name || !this.form.password) {
                    this.$message.error("内容不能为空");
                } else {
                    let data = {
                        username: this.form.name,
                        password: this.form.password
                    };
                    this.$Dispatching.couriersCreate(data).then(res => {
                        console.log(res);
                        this.$message({message: "新增成功", type: "success"});
                        this.dialogVisible = false;
                        this.couriersList();
                    });
                }
            },
            Update(row) {
                this.id = row.id;
                this.form = {};
            },
            couriersUpdate() {
                if (!this.form.name || !this.form.password) {
                    this.$message.error("内容不能为空");
                }
                let id = this.id;
                let data = {
                    username: this.form.name,
                    password: this.form.password
                };
                this.$Dispatching.couriersUpdate(data, id).then(res => {
                    console.log(res);
                    this.$message({message: "编辑成功", type: "success"});
                    this.UpdateDialog = false;
                    this.couriersList();
                });
            },
            couriersDialog(row) {
                this.DeleteID = row.id;
            },
            couriersDelete() {
                let id = this.DeleteID;
                this.$Dispatching.couriersDelete(id).then(res => {
                    console.log(res);
                    this.$message({message: "删除成功", type: "success"});
                    this.couriersList();
                });
            },
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.couriersList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.couriersList();
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
</style>
