import { createApp } from 'vue';
import App from './app.vue';
// router
import router from '@/router/index';
// 样式
import 'ant-design-vue/dist/antd.css';
import '@/assets/less/common.less';

const app = createApp(App);
app.use(router).mount('#app');
