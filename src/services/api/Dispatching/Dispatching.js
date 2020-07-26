import axios from 'axios';

let Dispatching = {
    couriersList,
    couriersCreate,
    couriersUpdate,
    couriersDelete
};

function couriersList(data) {
    return axios({
        url: '/api/account/couriers/',
        method: 'get',
        params:data
    });
}
function couriersCreate(data) {
    return axios({
        url: '/api/account/couriers/',
        method: 'post',
        data:data
    });
}

function couriersUpdate(data, id) {
    return axios({
        url: '/api/account/couriers/'+id+'/',
        method: 'put',
        data:data
    });
}

function couriersDelete(id) {
    return axios({
        url: '/api/account/couriers/'+id+'/',
        method: 'DELETE',
    });
}

export default {

    Dispatching

};