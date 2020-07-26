<template>
    <!-- begin login -->
    <div class="login login-with-news-feed">
        <!-- begin news-feed -->
        <div class="news-feed">
            <div class="news-image login_img"></div>
            <div class="news-caption" style="background:none">
                <h4 class="caption-title">
                    <b>商城管理平台</b>
                </h4>
                <p>© 商城 All Right Reserved 2020</p>
            </div>
        </div>
        <!-- end news-feed -->
        <!-- begin right-content -->
        <div class="right-content">
            <!-- begin login-header -->
            <div class="login-header">
                <div class="brand">
                    <div class="flex acent">
                        <div class="bgc_logo_guava"></div>
                        <div>
                            <b>商城管理平台</b>
                        </div>
                    </div>
                    <small></small>
                </div>
                <div class="icon">
                    <i class="fa fa-sign-in"></i>
                </div>
            </div>
            <!-- end login-header -->
            <!-- begin login-content -->
            <div class="login-content">
                <div class="form-group m-b-15">
                    <el-input
                        type="text"
                        v-model="username"
                        placeholder="用户名"
                        @keyup.enter.native="login()"
                        required
                    />
                </div>
                <!-- <div class="form-group m-b-15">
                    注册账号<span style="color:#02A7F0;"> 请联系客服</span>
                </div> -->
                <div class="form-group m-b-15">
                    <el-input
                        type="password"
                        v-model="password"
                        placeholder="密码"
                        @keyup.enter.native="login()"
                        required
                    />
                </div>
                <div class="login-buttons">
                    <button @click="login()"
                            class="btn btn-success btn-block btn-lg">登陆
                    </button>
                </div>
                <!-- Not a member yet? Click here to register. -->
                <hr/>
                <p class="text-center text-grey-darker">&copy; 商城 All Right Reserved 2020</p>
            </div>
            <!-- end login-content -->
        </div>
        <!-- end right-container -->
    </div>
    <!-- end login -->
</template>
<script>
    import PageOptions from '@/config/PageOptions.vue';
    
    export default {
        data() {
            return {
                username: '',
                password: ''
            };
        },

        created() {
            PageOptions.pageEmpty = true;
            document.body.className = 'bg-white';
        },
        beforeRouteLeave(to, from, next) {
            PageOptions.pageEmpty = false;
            document.body.className = '';
            next();
        },
        methods: {
             profiles(){
                this.$account.profiles().then(res=>{
                    console.log(res.data);
                    if(res.data.results[0].is_staff == true){
                        this.$router.push({ path: '/Goods' });
                    }else{
                        this.$router.push({ path: '/ShopOrder' });
                    }
                });
            },
            login() {
                let data = {
                    username: this.username,
                    password: this.password
                };
                this.$account.login(data).then(res => {
                    let token = 'JWT ' + res.data.access;
                    this.cookies.set('token', token);
                    this.$Message.success('登录成功！');
                    this.profiles();
                }).catch(error => {
                    if (error.status == '401'){
                        this.$Message.error('账号或密码错误，请重试！');
                    }
                });
                // .catch(err => {
                //     console.log(err);
                //     if (err.status == '401'){
                //         this.$Message.error('账号或密码错误，请重试！');
                //     }
                //     this.cookies.remove('token');
                // });
                // localStorage.setItem("username", res.data.username);
                // this.username = res.data.username;
                // this.cookies.set("token", res.data.token);
            }
        }
    };
</script>
<style scoped>
    .login-content > div:nth-child(2) {
        font-family: 'Arial Normal', 'Arial';
        font-size: 12px;
    }

    .login_img {
        background-image: url("../../assets/css/google/images/coming-soon.jpg");
        background-repeat: no-repeat;
    }

    .acent {
        align-items: center !important;
    }
</style>
