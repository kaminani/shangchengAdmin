<template>
    <div>
        <div class="flex">
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
                <el-button type="primary" style="margin-left: 10px;" @click="create">创建文章</el-button>
            </div>
        </div>
        <div style="margin-top: 10px;">
            <el-table
                :data="tableData"
                :cell-style="{'text-align': 'center'}"
                :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
            >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="title" label="文章标题" min-width="100">
                </el-table-column>
                <!-- <el-table-column prop="content" label="内容" min-width="200">
                  <template slot-scope="scope">
                    <el-input  v-if="editOk==scope.row" v-model="scope.row.content"></el-input>
                    <span v-else @click="editOk=scope.row">{{scope.row.content}}</span>
                  </template>
                </el-table-column>-->
                <el-table-column prop="created_at" label="时间" min-width="100"></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="150">
                    <template slot-scope="scope">
                        <el-button @click="view(scope.row)" size="small">查看</el-button>
                        <!-- <el-button
                          size="small"
                          v-if="editOk==scope.row"
                          @click="editOk=scope.row,blur(scope.row)"
                        >确定</el-button> -->
                        <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="small" @click="articlesDialog(scope.row),deleteDialog=true">删除</el-button>
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
        <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
            <div style="text-align: center;">确认删除?</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false,articlesDelete()">确 定</el-button>
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
                deleteDialog: false
                // editOk: null
            };
        },
        mounted() {
            this.articlesList();
        },
        methods: {
            view(row) {
                this.$router.push({name: "ViewArticle", params: {data: row}});
            },
            articlesDialog(row) {
                this.DeleteID = row.id;
            },
            articlesDelete() {
                let id = this.DeleteID;
                this.$marketing.articlesDelete(id).then(res => {
                    console.log(res);
                    this.articlesList();
                    this.$message({message: "删除成功", type: "success"});
                });
            },
            edit(row) {
                this.$router.push({name: "EditArticle", params: {data: row}});
            },
            articlesList() {
                let data = {
                    search: this.search,
                    pagesize: this.pageSize,
                    page: this.currentPage
                };
                this.$marketing.articlesList(data).then(res => {
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
                    this.$marketing.articlesList(data).then(res => {
                        this.tableData = res.data.results;
                        this.total = res.data.count;
                    });
                } else {
                    let data = {
                        page: 1,
                        pagesize: this.pageSize
                    };
                    this.$marketing.articlesList(data).then(res => {
                        this.tableData = res.data.results;
                        this.total = res.data.count;
                    });
                }
            },
            create() {
                this.$router.push({path: '/createArticle'});
            },
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.articlesList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.articlesList();
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
