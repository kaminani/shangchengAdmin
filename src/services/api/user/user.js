import axios from 'axios';

let user = {
    profilesList,
    profilesRecharge
};

function profilesList (data) {
    return axios({
        url: '/api/account/profiles/',
        method: 'get',
        params:data
    });
}
function profilesRecharge (id, data) {
    return axios({
        url: '/api/account/profiles/'+id+'/recharge/',
        method: 'post',
        data:data
    });
}
export default {

    user

};