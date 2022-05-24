import { defineComponent } from 'vue';
// component
import { Form, FormItem, Input, Button } from 'ant-design-vue';

import loginService from './services/login-service';

export default defineComponent({
  name: 'Login',
  components: {
    'a-form': Form,
    'a-form-item': FormItem,
    'a-input': Input,
    'a-button': Button,
  },
  setup() {
    return {
      loginService,
    };
  },
});
