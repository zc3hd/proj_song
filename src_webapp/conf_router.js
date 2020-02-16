// import A from './modules/A/index.vue';
// import B from './modules/B/index.vue';

import admin from './modules/admin/index.vue';
import st from './modules/st/index.vue';
import song from './modules/song/index.vue';

export default [
  // 管理员
  {
    path: '/admin',
    component: admin,
  },
  // 学生
  {
    path: '/st',
    component: st,
  },
  // 点歌界面
  {
    path: '/song/:bj',
    component: song,
  },
  // 
  // {
  //   path: '/c',
  //   component: C,
  // },
  // ------默认指向
  // { path: '/', redirect: '/a' },
  // 
  // { path: '/b', redirect: '/b/1' }
];