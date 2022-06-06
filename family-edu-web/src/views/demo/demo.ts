import { defineComponent } from 'vue';

import ChartsMap from '../../collect/chart-map/chart-map.vue';

export default defineComponent({
  name: 'Demo',
  components: {
    'charts-map': ChartsMap,
  },
});
