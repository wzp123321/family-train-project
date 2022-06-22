import { defineComponent } from 'vue';

import { Input, Button } from 'ant-design-vue';
import WaterBallChart from '../../collect/water-ball-chart/water-ball-chart.vue';

export default defineComponent({
  name: 'CourseManage',
  components: {
    'a-input': Input,
    'a-button': Button,
    WaterBallChart,
  },
  setup() {},
});
