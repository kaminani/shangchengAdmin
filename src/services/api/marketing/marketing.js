import axios from 'axios';

let marketing = {
    articlesCreate,
    articlesList,
    articlesUpdate,
    articlesDelete,
    bannersList,
    bannersCreate,
    bannersDelete,
    bannersRead,
    partialUpdate,
    setGift,
    giftsList
};
//添加文章
function articlesCreate(data) {
    return axios({
        url: '/api/config/articles/',
        method: 'post',
        data: data
    });
}
//文章列表
function articlesList(data) {
    return axios({
        url: '/api/config/articles/',
        method: 'get',
        params: data
    });
}
//编辑文章
function articlesUpdate(data, id) {
    return axios({
        url: '/api/config/articles/'+id+'/',
        method: 'put',
        data: data
    });
}
//删除文章
function articlesDelete(id) {
    return axios({
        url: '/api/config/articles/'+id+'/',
        method: 'DELETE',
    });
}

function bannersList() {
    return axios({
        url: '/api/config/banners/',
        method: 'get',
    });
}
//添加Banner
function bannersCreate(data) {
    return axios({
        url: '/api/config/banners/',
        method: 'post',
        data:data
    });
}
//删除Banner
function bannersDelete(id) {
    return axios({
        url: '/api/config/banners/'+id+'/',
        method: 'delete',
    });
}
//编辑Banner
function bannersRead(id) {
    return axios({
        url: '/api/config/banners/'+id+'/',
        method: 'GET',
    });
}
function partialUpdate(data, id) {
    return axios({
        url: '/api/config/banners/'+id+'/',
        method: 'PATCH',
        data:data
    });
}
//充值
function setGift(data) {
    return axios({
        url: '/api/config/gifts/',
        method: 'post',
        data:data
    });
}

function giftsList(data) {
    return axios({
        url: '/api/config/gifts/',
        method: 'get',
        params:data
    });
}
export default {

    marketing

};