/*
 * @Description: 菜单服务
 * @Author: zpwan
 * @Date: 2022-05-24 14:37:01
 * @Last Modified by: zpwan
 * @Last Modified time: 2022-05-24 15:38:56
 */
import { ref } from 'vue';
import { MenuVO } from './aside-api';

class MenuService {
  //#region
  private _menuList = ref<MenuVO[]>([
    {
      id: 1,
      name: '管理员管理',
      url: '/courseManage3',
      icon: 'iconfont icon-guanliyuan_jiaoseguanli',
      hasIcon: true,
      children: [
        {
          id: 1,
          name: '教师管理',
          url: '/courseManage2',
          icon: 'iconfont icon-jiaoshi',
          children: [],
        },
      ],
    },
    {
      id: 1,
      hasIcon: true,
      name: '学生管理',
      url: '/courseManage11',
      icon: 'iconfont icon-shuyi_xuesheng',
      children: [],
    },
    {
      id: 2,
      name: '教师管理',
      url: '/courseManage',
      hasIcon: true,
      icon: 'iconfont icon-jiaoshi',
      children: [],
    },
  ]);
  private _selectedKeys = ref<string[]>([]);
  //#endregion
  //#region
  public get menuList(): MenuVO[] {
    return this._menuList.value;
  }
  public get selectedKeys(): string[] {
    return this._selectedKeys.value;
  }
  public set selectedKeys(value: string[]) {
    this._selectedKeys.value = value;
  }
  //#endregion
}

export default new MenuService();
