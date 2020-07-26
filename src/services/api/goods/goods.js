import axios from 'axios';

let goods = {
    goodsCreate,
    goodsList,
    goodsUpdate,
    goodsRead,
    goodsDelete
};

function goodsCreate(data) {
    // 添加商品
    return axios({
        url: '/api/commodity/goods/',
        method: 'post',
        data: data
    });
}

// 商品列表
function goodsList(data) {
    return axios({
        url: '/api/commodity/goods/',
        method: 'get',
        params: data
    });
}
//编辑
function goodsUpdate(data, id) {
    return axios({
        url: '/api/commodity/goods/' + id + '/',
        method: 'patch',
        data: data
    });
}

function goodsRead(id) {
    return axios({
        url: '/api/commodity/goods/' + id + '/',
        method: 'get',
    });
}
//删除
function goodsDelete(id) {
    return axios({
        url: '/api/commodity/goods/' + id + '/',
        method: 'DELETE',
    });
}
export default {

    goods

};