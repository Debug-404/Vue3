import axios from "axios";
import {ElLoading, ElNotification} from "element-plus";
import {getToKen} from "./userCookie.js";

let loading = null

const request = axios.create({
    baseURL: 'http://1.116.149.66:5000',
    timeout: 5000,
    headers: {"Content-Type": "application/json"}
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = getToKen()
    if (token) {
        config.headers.token = token
    }
    loading = ElLoading.service({
        text: "加载中"
    })
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    loading.close()
    return response["data"];
}, function (error) {
    // 对响应错误做点什么
    ElNotification({
        title: "Error",
        message: "请求超时请稍后重试",
        type: "error",
    });
    loading.close()
    return Promise.reject(error);
});
export default request

