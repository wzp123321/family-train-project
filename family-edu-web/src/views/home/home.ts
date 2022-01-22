import { defineComponent } from 'vue'
// components
import HeaderBox from '@/layouts/header-box/header-box.vue'
import ContentBox from '@/layouts/content-box/content-box.vue'
import AsideBox from '@/layouts/aside-box/aside-box.vue'
import { Layout, LayoutContent, LayoutHeader } from 'ant-design-vue'

export default defineComponent({
  name: 'Home',
  components: {
    HeaderBox,
    ContentBox,
    AsideBox,
    'a-layout': Layout,
    LayoutContent,
    LayoutHeader,
  },
})
