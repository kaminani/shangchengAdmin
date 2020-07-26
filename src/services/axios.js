import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/config/PageRoutes';
import Cookies from 'js-cookie';

axios.interceptors.request.use(
    config => {
        let token = Cookies.get('token');
        if (token) {
            config.headers = {
                Authorization: token
            };
        }
        return config;
    },
    error => {
        return Promise.reject(error.response);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    // Message.error('账号或密码错误，请重试！');
                    localStorage.clear();
                    Cookies.remove('token');
                    router.push({ path: '/' });
                    break;
                case 500:
                    Message.error(
                        'TaT ,我们的程序员好像出小差了 , 请联系客服 '
                    );
                    break;
                default:
                    break;
            }
            return Promise.reject(error.response);
        }
    }
);
