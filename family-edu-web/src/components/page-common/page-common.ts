import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'PageCommon',
  props: {
    title: {
      // 页面标题
      type: String,
      default: '',
    },
    showSearch: {
      // 是否显示搜索模块
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    /**
     * 导出点击事件
     */
    const reportExport = () => {
      emit('report-export');
    };
    const title = computed(() => {
      return props.title;
    });
    return {
      reportExport,
      title,
    };
  },
});
