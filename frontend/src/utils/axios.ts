import axios from "axios";
import {showToast} from "./toast";
import {translate} from "./translations/translate";

const instance = axios.create();

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error);
    if (error.response.status === 401) {
        showToast(translate('unauthorized'))
    }
    else {
        showToast(translate('error'))
    }
    return Promise.reject(error);
});

export default instance;