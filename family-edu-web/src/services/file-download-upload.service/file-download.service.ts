/*
 * @Description: 文件下载导出
 * @Author: zpwan
 * @Date: 2022-05-11 10:16:24
 * @Last Modified by: zpwan
 * @Last Modified time: 2022-05-11 11:02:26
 */

import { ref } from 'vue';

import { postRequest } from '@/services/request';
import { message } from 'ant-design-vue';

import { FBlobHandler } from './util';

export class FileDownloadService<T> {
  private _is_initial = ref<boolean>(false);
  private _url = ref<string>('');
  private _type = ref<'导出' | '下载'>('导出');
  private _params = ref<T>();

  constructor(url: string, type: '下载' | '导出', params?: T) {
    this._url.value = url;
    this._type.value = type;
    this._params.value = params;
    this._is_initial.value = true;
  }

  // 下载
  download = async (errorCb: () => void, successCb: () => void) => {
    if (!this._is_initial.value) {
      throw new Error('尚未初始化！');
    }
    const messageInstance = message.loading(`正在${this._type.value}`);
    try {
      const res: Blob = await postRequest(this._url.value, this._params.value, {
        responseType: 'blob',
      });
      const symbol = Object.getOwnPropertySymbols(res)[0];
      const name = symbol ? (res as any)[symbol] : '数据导出表.xlsx';
      await FBlobHandler(res, name);
      message.success('导出成功');
      successCb();
    } catch (error) {
      console.warn('导出数据', '-->', error);
      message.error(`导出失败，${error}`);
      errorCb();
    }
  };
}
