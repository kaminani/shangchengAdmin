import axios from 'axios';

let classify = {
    catalogues,
    deleteCatalogues,
    cataloguesCreate,
    cataloguesRead,
    cataloguesUpdate
};

// 查询分类
function catalogues(data) {
    return axios({
        url: '/api/commodity/catalogues/',
        method: 'GET',
        params:data,
    });
}
// 删除分类
function deleteCatalogues(id) {
    return axios({
        url: '/api/commodity/catalogues/'+id+'/',
        method: 'DELETE',
    });
}
//增加分类
function cataloguesCreate(data) {
    return axios({
        url: '/api/commodity/catalogues/',
        method: 'POST',
        data:data
    });
}
function cataloguesUpdate(id, data) {
    return axios({
        url: '/api/commodity/catalogues/'+id+'/',
        method: 'put',
        data:data
    });
}
//二级分类
function cataloguesRead(id) {
    return axios({
        url: '/api/commodity/catalogues/'+id+'/',
        method: 'get',
    });
}
export default {

    classify

};