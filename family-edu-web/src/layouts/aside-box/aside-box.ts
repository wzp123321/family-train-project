import { defineComponent } from 'vue'
// components
import { Menu } from 'ant-design-vue'

export default defineComponent({
  name: 'AsideBox',
  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-sub-menu': Menu.SubMenu,
  },
})
