import axios from 'axios';

let DataManagement = {
    financesList,
    goodsSales
};

function financesList(data) {
    return axios({
        url: '/api/account/finances/',
        method: 'get',
        params:data
    });
}

function goodsSales(data) {
    return axios({
        url: '/api/commodity/goods/sales/',
        method: 'get',
        params:data
    });
}
export default {

    DataManagement

};