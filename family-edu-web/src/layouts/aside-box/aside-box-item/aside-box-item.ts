import { defineComponent, PropType, toRef } from 'vue';

import { Menu } from 'ant-design-vue';

import { MenuVO } from '../services/aside-api';

export default defineComponent({
  name: 'AsideBoxItem',
  components: {
    'a-menu-item': Menu.Item,
    'a-sub-menu': Menu.SubMenu,
  },
  props: {
    menuItem: {
      type: Object as PropType<MenuVO>,
      default: [],
    },
  },
  setup(props) {
    const menuItem = toRef(props, 'menuItem');

    return {
      menuItem,
    };
  },
});
