import axios from 'axios';

let account = {
    login,  //登录 ， 参数：用户名 密码
    profiles
};

function login(data) {
    // todo 用户登录
    return axios({
        url: '/api/login/',
        method: 'post',
        data: data
    });
}
function profiles(data) {
    return axios({
        url: '/api/account/profiles/userProfile/',
        method: 'get',
        params: data
    });
}
export default {

    account

};