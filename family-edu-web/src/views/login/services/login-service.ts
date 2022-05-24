/*
 * @Description: 登录服务
 * @Author: zpwan
 * @Date: 2022-05-24 14:27:25
 * @Last Modified by: zpwan
 * @Last Modified time: 2022-05-24 14:32:12
 */
import { ref } from 'vue';
import { message } from 'ant-design-vue';

import { LoginForm } from './login-api';

class LoginService {
  //#region
  private _is_logining = ref<boolean>(false);
  private _form = ref<LoginForm>({
    username: '',
    password: '',
  });
  //#endregion

  //#region
  public get is_logining(): boolean {
    return this._is_logining.value;
  }
  public get form(): LoginForm {
    return this._form.value;
  }
  public set form(value: LoginForm) {
    this._form.value = value;
  }
  //#endregion

  //#region 登录
  login = () => {
    if (!this._form.value.username) {
      message.error('请填写用户名！');
      return;
    }
    if (!this._form.value.password) {
      message.error('请填写密码！');
      return;
    }
    if (this._is_logining.value) {
      return;
    }
    this._is_logining.value = true;
  };
  //#endregion
}

export default new LoginService();
