import { createApp } from 'vue';
import App from './main-app.vue';
// router
import router from '@/router/index';
// 样式
import 'ant-design-vue/dist/antd.css';
import '@/assets/less/common.less';

import registerComponent from '@/components/register';

const app = createApp(App);

registerComponent(app);
app.use(router).mount('#app');
