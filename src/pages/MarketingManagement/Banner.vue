<template>
    <div>
        <el-button @click="addBanner" v-if="tableData.length != 5">添加Banner</el-button>
        <el-button v-else disabled>只能添加5张Banner</el-button>
        <div style="margin-top: 10px;">
            <el-table
                :data="tableData"
                :cell-style="{'text-align': 'center'}"
                :header-cell-style="{'text-align':'center',background:'rgb(45, 53, 60)',color:'#ffffff'}"
            >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="banner" label="图片" min-width="150">
                    <template slot-scope="scope">
                        <img :src="scope.row.banner" width="100px" height="100px"/>
                    </template>
                </el-table-column>
                <el-table-column prop="rank" label="权重值" min-width="150"></el-table-column>
                <el-table-column fixed="right" label="操作" min-width="250">
                    <template slot-scope="scope">
                        <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="small" @click="bannersDialog(scope.row), deleteDialog=true">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
            <div style="text-align: center;">确认删除?</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false,bannersDelete()">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                deleteDialog: false
            };
        },
        mounted() {
            this.bannersList();
        },
        methods: {
            bannersList() {
                this.$marketing.bannersList().then(res => {
                    console.log(res);
                    this.tableData = res.data.results;
                });
            },
            addBanner() {
                this.$router.push({path: '/addBanner'});
            },
            edit(row) {
                this.$router.push({path: '/EditBanner', query: {id: row.id}});
            },
            bannersDialog(row) {
                this.DeleteID = row.id;
            },
            bannersDelete() {
                let id = this.DeleteID;
                this.$marketing.bannersDelete(id).then(res => {
                    console.log(res);
                    this.bannersList();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                });
            }
        }
    };
</script>

<style scoped>
    .flex {
        display: flex;
    }

    .flex > div:first-child {
        flex: 3;
    }

    .flex > div:nth-child(2) {
        flex: 7;
    }
</style>
