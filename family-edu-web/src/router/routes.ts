import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path: '/courseManage',
        meta: {
          name: '课程管理',
        },
        component: () => import('@/pages/course-manage/course-manage.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: {
      name: '登录系统',
    },
    component: () => import('@/views/login/login.vue'),
  },
];

export default routes;
