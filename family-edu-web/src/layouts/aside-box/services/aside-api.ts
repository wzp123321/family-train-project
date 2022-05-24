/**
 * 菜单
 */
export interface MenuVO {
  hasIcon?: boolean;
  icon: string;
  id: number;
  name: string;
  url: string;
  children: MenuVO[];
}
