import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 数据中心
var state = {
  num: 1,
  other: "",
};

// 注册的事件名
var mutations = {
  add: function(state, other) {
    // other 是执行时传递的参数
    state.num++;

    // 
    if (other) {
      state.other = other;
      console.log(other);
    }

  },
};


export default new Vuex.Store({
  state: state,
  mutations: mutations,
});