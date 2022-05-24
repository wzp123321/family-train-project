import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 路由钩子函数
router.beforeEach((to, from, next) => {
  document.title = to.meta && to.meta.name ? (to.meta.name as string) : '媛梦家教系统';
  next();
});

export default router;
