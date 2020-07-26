<template>
    <div>
        <div class="goods">
            <div>
                <el-button type="primary" @click="AddGoods">添加商品</el-button>
            </div>
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
                <!-- <el-table-column prop="cover[0].image" label="商品图片" min-width="150">
                    <template slot-scope="scope">
                        <img :src="scope.row.cover[0].image" width="100px" height="100px"/>
                    </template>
                </el-table-column> -->
                <el-table-column prop="name" label="商品名" min-width="200"></el-table-column>
                <el-table-column prop="barcode" label="商品条形码" min-width="150"></el-table-column>
                <el-table-column prop="price" label="价格" min-width="100"></el-table-column>
                <el-table-column prop="stock" label="库存" min-width="100"></el-table-column>
                <el-table-column
                    prop="is_show"
                    label="状态"
                    min-width="120"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.is_show | show}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sales" label="销量" min-width="100"></el-table-column>
                <el-table-column prop="cate" label="分类" min-width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.cate.parent}} / {{scope.row.cate.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.is_show == true"
                            size="small"
                            @click="Referrals(scope.row)"
                        >下线
                        </el-button>
                        <el-button v-if="scope.row.is_show == false" size="small" @click="up(scope.row)">上线</el-button>
                        <el-button size="small" @click="EditGoods(scope.row)">编辑</el-button>
                        <el-button size="small" @click="goodsDialog(scope.row),deleteDialog = true">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align: center; margin-top:10px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20,30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>

        <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
            <div style="text-align: center;">确认删除?</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false,goodsDelete()">确 定</el-button>
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
        methods: {
            up(row) {
                let id = row.id;
                let data = {
                    name: row.name,
                    stock: row.stock,
                    // eslint-disable-next-line camelcase
                    fake_price: row.fake_price,
                    price: row.price,
                    detail: row.detail,
                    cover: row.cover,
                    // eslint-disable-next-line camelcase
                    cate_id: row.cate_id,
                    // eslint-disable-next-line camelcase
                    is_show: true
                };
                this.$goods.goodsUpdate(data, id).then(res => {
                    console.log(res);
                    this.$message({message: "修改成功", type: "success"});
                    this.goodsList();
                });
            },
            Referrals(row) {
                let id = row.id;
                let data = {
                    name: row.name,
                    stock: row.stock,
                    // eslint-disable-next-line camelcase
                    fake_price: row.fake_price,
                    price: row.price,
                    detail: row.detail,
                    cover: row.cover,
                    // eslint-disable-next-line camelcase
                    cate_id: row.cate_id,
                    // eslint-disable-next-line camelcase
                    is_show: false
                };
                this.$goods.goodsUpdate(data, id).then(res => {
                    console.log(res);
                    this.$message({message: "修改成功", type: "success"});
                    this.goodsList();
                });
            },
            EditGoods(row) {
                // console.log(row);
                this.$router.push({path: "/EditGoods", query: {id: row.id}});
            },
            AddGoods() {
                this.$router.push({path: "/AddGoods"});
            },
            searchName() {
                if (this.search != "") {
                    let data = {
                        search: this.search,
                        page: 1,
                        pagesize: this.pageSize
                    };
                    this.$goods.goodsList(data).then(res => {
                        this.tableData = res.data.results;
                        this.total = res.data.count;
                    });
                } else {
                    let data = {
                        page: 1,
                        pagesize: this.pageSize
                    };
                    this.$goods.goodsList(data).then(res => {
                        this.tableData = res.data.results;
                        this.total = res.data.count;
                    });
                }
            },
            goodsList() {
                let data = {
                    search: this.search,
                    pagesize: this.pageSize,
                    page: this.currentPage
                };
                this.$goods.goodsList(data).then(res => {
                    this.tableData = res.data.results;
                    this.total = res.data.count;
                });
            },
            goodsDialog(row) {
                this.id = row.id;
            },
            goodsDelete() {
                let id = this.id;
                this.$goods.goodsDelete(id).then(res => {
                    console.log(res);
                    this.$message({message: "删除成功", type: "success"});
                    this.goodsList();
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.goodsList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.goodsList();
            }
        },
        mounted() {
            this.goodsList();
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
