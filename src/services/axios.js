/*
封装一个发送Ajax请求的实例
封装axios库
函数返回值是promise对象
*/
import { message } from 'antd';
import axios from 'axios';
import { BASE_URL, TIMEOUT,HEADERS} from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
  timeout: TIMEOUT
});
// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

  // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

  // 3.params/data序列化的操作

  return config;
}, err => {
  message.error(err.message)
});
// 添加响应拦截器
instance.interceptors.response.use(res => {
  console.log(res);
  return res
}, err => {
  message.error('请求出错了:' + err.message)
}
);

export default instance;

