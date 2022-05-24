/*eslint-disable*/
import axios, { AxiosResponse } from 'axios';
import serviceConfig from '@/config/request';

// 创建axios实例
const axiosInstance = () => {
  const instance = axios.create({
    baseURL: serviceConfig.BASE_URL,
    timeout: serviceConfig.TIME_OUT,
  });
  return instance;
};

// 请求实例
const publicReq = async (params: { [key: string]: any }) => {
  const { url, method, param, options } = params;
  const instance = axiosInstance();
  return await instance({
    url,
    method,
    // 在请求头里面添加token 如果没有则为空字符串
    ...options,
    headers: {
      'Content-Type':
        Object.prototype.toString.call(param) === '[object String]'
          ? 'application/json; charset=utf-8'
          : 'application/json',
    },
    [method === 'post' ? 'data' : 'params']: param,
  }).then((res: AxiosResponse) => {
    if (res) {
      return res.data;
    }
  });
};

// 请求超时函数
const timeoutfn = (delay: number, url: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`请求超时--${url}`);
    }, delay);
  });
};

// 单个请求 存在请求超时
export async function req(params: { [key: string]: any }, delay = serviceConfig.TIME_OUT) {
  try {
    const response: any = await Promise.race([timeoutfn(delay, params.url), publicReq(params)]);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

// GET request
export async function getRequest(url: string, param?: { [key: string]: any }) {
  try {
    const response = await req({
      url,
      method: 'get',
      param,
    });
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
}

// POST request
export async function postRequest(
  url: string,
  param?: { [key: string]: any } | number | string,
  options?: { [key: string]: any },
) {
  try {
    const response = await req({
      url,
      method: 'post',
      param,
      options,
    });
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
}
