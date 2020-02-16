import Vue from 'vue';

// --------------------------------Element-ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);


// 按需引入
// import {
//   DatePicker,
//   ColorPicker,
//   Progress
// } from 'element-ui';

// Vue.use(DatePicker);
// Vue.use(ColorPicker);
// Vue.use(Progress);





// --------------------------------router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 配置路由
import routes from './conf_router.js';
var router = new VueRouter({
  routes: routes,
  // mode: 'history',
});




// --------------------------------axios
import axios from 'axios';
Vue.prototype.$http = axios;
import './conf_axios.js'; // 只是引入，没有导出，那就引入就可以了。





// ---------------------------------vuex
import conf_vuex from './conf_vuex.js';

import App from './App.vue';
new Vue({
  el: '#app',
  render: h => h(App),
  // 开启路由
  router: router,
  // vuex
  store: conf_vuex,
});