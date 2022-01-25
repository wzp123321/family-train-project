import { createApp } from 'vue';
import App from './App.vue';
// router
import router from '@/router/index';
// 样式
import '@/assets/less/common.less';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.use(router).mount('#app');
