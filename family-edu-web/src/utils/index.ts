import store from '@/store/index';
import axios from 'axios';
import ServiceConfig from '../config/request';

import { ResTemplate } from '@/services/common-api';
// 节流防抖 时间戳
let timeStamp: any;
// components
import {message } from 'ant-design-vue';
import dayjs from 'dayjs';

/**
 * 获取地址栏参数
 * @returns
 */
export const getUrlParams = (paramName: string) => {
  // 构造一个含有目标参数的正则表达式的对象
  const reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)');
  // 匹配目标参数
  const url = window.location.search.substr(1).match(reg);
  // 返回参数值
  let paramStr = '';
  if (url !== null) {
    paramStr = unescape(url[2]);
  }
  return paramStr;
};

/**
 * defer函数
 */
export default class Deffer {
  public promise: any;
  public resolve: any;
  public reject: any;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

/**
 * 禁用当前日期以后
 * @param d 日期
 * @returns
 */
export const disableCurrentDate = (d: Date) => {
  return d.getTime() > Date.now();
};

/**
 * 处理数据空值返回
 * @param {*} value 传入数据
 */
export const formatEmptyValue = (value: string | number, suffix = '') => {
  return !value && value !== 0 ? '--' : `${value}${suffix}`;
};

/**
 * 创建blob对象，并利用浏览器打开url进行下载
 * @param data 文件流数据
 */
export const downloadBlobFile = (data: any, name: string, type: string, cb?: () => void) => {
  try {
    // 下载类型
    const blob = new Blob([data], { type: data.type });
    const downloadUrl = window.URL.createObjectURL(blob);

    // 以动态创建a标签进行下载
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    message.success(`${type}成功！`);
    if (typeof cb === 'function') {
      cb();
    }
  } catch (error) {
    if (typeof cb === 'function') {
      cb();
    }
    message.error(`${type}失败！`);
  }
};
/**
 * 文件流导出通用接口
 * @param param 请求参数 类型自定义
 * @param reqUrl 请求地址
 * @param url type 类型 导出&下载
 * @param cbFn 成功回调
 * @param failCb 失败回调
 */
export const getFileStreamDownload = async <T>(
  params: T,
  reqUrl: string,
  type = '导出' || '下载',
  cbFn?: () => void,
  failCb?: () => void,
) => {
  try {
    message.loading(`正在${type}`);
    const tenantCode = store.getters.tenantCode ? store.getters.tenantCode : '';
    const res: any = await axios({
      url: `${ServiceConfig.BASE_URL}${reqUrl}`,
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json',
        tenantCode,
      },
      responseType: 'blob',
    });
    if (res && res.status === 200 && res.data && res.headers['content-disposition']) {
      const fileName =
        res.headers && res.headers['content-disposition']
          ? res.headers['content-disposition'].split('filename=')[1]
          : `数据${type}`;
      downloadBlobFile(res.data, decodeURIComponent(fileName), type, () => {
        if (typeof cbFn === 'function') {
          cbFn();
        }
      });
    } else {
      console.log(res);
      if (typeof failCb === 'function') {
        failCb();
      }
      message.error(`${type}失败！`);
    }
  } catch (error) {
    if (typeof failCb === 'function') {
      failCb();
    }
    message.error(`${type}失败！`);
  }
};
/**
 * 获取当前域名
 * @returns
 */
export const getCurrentDomain = () => {
  return `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? ':' + window.location.port : ''
  }`;
};

// 打开新网页
export const openBlankUrl = (path: string) => {
  const tenantCode = store.getters.tenantCode || '';
  const username = store.getters.username || '';
  const prefixUrl = getCurrentDomain();
  const url = `${prefixUrl}/imsManage${path}?tenantCode=${tenantCode}&username=${username}`;
  window.open(url, '_blank');
};

/**
 * 防抖函数
 *  -- 在一段时间内多次触发函数fn 当间隔一段时间没有再次触发fn后才会执行
 * @param fn
 * @param await
 */
export const debounce = (fn: () => void, timeout = 800) => {
  clearTimeout(timeStamp);
  timeStamp = setTimeout(fn, timeout);
};

/**
 * 节流函数
 *  --在一段时间内多次触发函数fn 一段时间内只会执行一次
 * @param fn
 * @param timeout
 * @returns
 */
export const throttle = (fn: () => void, timeout = 500) => {
  if (timeStamp) {
    return;
  }
  timeStamp = setTimeout(() => {
    fn();
    clearTimeout(timeStamp);
  }, timeout);
};

/**
 * 响应处理
 * @param res 响应体
 * @returns 返回数据
 * @throws 异常信息
 */
export function FResHandler<T = void>(res: ResTemplate<T>): T {
  if (res?.success) {
    return res.data;
  }

  throw res?.message ?? '未知原因';
}

/**
 * 日期格式化
 * @param timeStamp 
 * @param formatStr 
 * @returns 
 */
export const formatDate = (timeStamp: number | Date , formatStr:string)=>{
  return dayjs(timeStamp).format(formatStr)
}