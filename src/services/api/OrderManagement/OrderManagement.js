import axios from 'axios';

let OrderManagement = {
    ordersList,
    ordersUpdate,
    ordersRead
};

function ordersList (data) {
    return axios({
        url: '/api/automat/orders/',
        method: 'get',
        params:data
    });
}
function ordersUpdate (data, id) {
    return axios({
        url: '/api/automat/orders/'+id+'/',
        method: 'put',
        data:data
    });
}
function ordersRead (id) {
    return axios({
        url: '/api/automat/orders/'+id+'/',
        method: 'get',
    });
}

export default {

    OrderManagement

};