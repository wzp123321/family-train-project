import { RouteRecordRaw } from 'vue-router';

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        component: ()=>import('@/views/home/home.vue'),
    },
    {
        path: '/login',
        meta: {
            name: '登录',
        },
        component: ()=>import('@/views/login/login.vue'),
    }
];

export default routes;
