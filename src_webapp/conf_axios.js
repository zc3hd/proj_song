import axios from 'axios';
import Vue from 'vue';
var me = new Vue();
var loading;
// 拦截器
axios.interceptors.request
  .use(function(config) {

    loading = me.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });

    //配置发送请求的信息
    return config;
  }, function(error) {
    return Promise.reject(error);
  });

axios.interceptors.response
  .use(function(response) {
    //配置请求回来的信息
    // console.log(response.data);
    loading.close();

    return response.data;
  }, function(error) {
    return Promise.reject(error);
  });