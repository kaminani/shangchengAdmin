import axios from 'axios';

let columns = {
    columnsList, 
    columnsCreate,
    columnsDelete,
    columnsUpdate,
    columnsRead
};
function columnsList(data) {
    return axios({
        url: '/api/config/columns/',
        method: 'get',
        params: data
    });
}
function columnsCreate(data) {
    return axios({
        url: '/api/config/columns/',
        method: 'POST',
        data: data
    });
}
function columnsDelete(id) {
    return axios({
        url: '/api/config/columns/'+id+'/',
        method: 'DELETE',
    });
}
//修改
function columnsUpdate(id, data) {
    return axios({
        url: '/api/config/columns/'+id+'/',
        method: 'PUT',
        data:data
    });
}

function columnsRead(id, data) {
    return axios({
        url: '/api/config/columns/'+id+'/',
        method: 'get',
        params:data
    });
}

export default {

    columns

};