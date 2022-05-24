import { defineComponent } from 'vue';
// components
import { Menu } from 'ant-design-vue';

import menuService from './services/aside-service';

import AsideBoxItem from './aside-box-item/aside-box-item.vue';

export default defineComponent({
  name: 'AsideBox',
  components: {
    'a-menu': Menu,
    'aside-box-item': AsideBoxItem,
  },
  setup() {
    return {
      menuService,
    };
  },
});
