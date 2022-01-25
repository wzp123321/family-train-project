import { defineComponent, reactive, toRefs } from 'vue'
// component
import { Form, FormItem, Input, Button } from 'ant-design-vue'

interface LoginState {
  pageForm: ILogin.LoginForm
}

export default defineComponent({
  name: 'Login',
  components: {
    'a-form': Form,
    'a-form-item': FormItem,
    'a-input': Input,
    'a-button': Button,
  },
  setup() {
    const loginState = reactive<LoginState>({
      pageForm: {
        username: '',
        password: '',
      },
    })
    // 提交
    const onSubmit = () => {}

    return {
      ...toRefs(loginState),
      onSubmit,
    }
  },
})
