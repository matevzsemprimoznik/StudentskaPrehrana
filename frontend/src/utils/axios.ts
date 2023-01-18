import axios from "axios";
import {showToast} from "./toast";
import {translate} from "./translations/translate";

const instance = axios.create();

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error?.code === 'ERR_NETWORK')
        showToast(translate('network-error'))
    return Promise.reject(error);
});

export default instance;