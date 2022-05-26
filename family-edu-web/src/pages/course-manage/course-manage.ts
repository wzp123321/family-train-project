import { defineComponent, onMounted } from 'vue';

import { Input, Button } from 'ant-design-vue';

import ChartService from './alarm-chart/alarm-chart-service'

export default defineComponent({
  name: 'CourseManage',
  components: {
    'a-input': Input,
    'a-button': Button,
  },
  setup(){
    const chartService = new ChartService({})


    onMounted(()=>{
      chartService.initChart()
    })

    return {
      chartService
    }
  }
});
