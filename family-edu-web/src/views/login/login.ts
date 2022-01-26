import { defineComponent, reactive, toRefs } from 'vue'
// component
import { Form, FormItem, Input, Button, message } from 'ant-design-vue'

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
    message,
  },
  setup() {
    const loginState = reactive<LoginState>({
      pageForm: {
        username: '',
        password: '',
      },
    })
    // 提交
    const onSubmit = () => {
      if (!loginState.pageForm.username) {
        message.error('请填写用户名！')
        return
      }
      if (!loginState.pageForm.password) {
        message.error('请填写密码！')
        return
      }
    }

    return {
      ...toRefs(loginState),
      onSubmit,
    }
  },
})
