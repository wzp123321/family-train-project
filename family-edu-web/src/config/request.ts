const TIME_OUT = 60 * 1000; // 接口超时时长
const env = (import.meta.env.VITE_NODE_ENV as string) || 'production';
const BASE_URL = (import.meta.env.VITE_BASE_URL as string) || '/';
/**
 * 网关配置
 */
const gateWayConfig: {
  [key: string]: { BASE_URL: string; PUBLIC_PATH: string };
} = {
  development: {
    BASE_URL,
    PUBLIC_PATH: '/',
  },
  production: {
    BASE_URL,
    PUBLIC_PATH: '/imsManage',
  },
};

export default { ...gateWayConfig[env], TIME_OUT };
