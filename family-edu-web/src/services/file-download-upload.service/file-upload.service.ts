/*
 * @Description: 文件上传
 * @Author: zpwan
 * @Date: 2022-05-11 10:32:20
 * @Last Modified by: zpwan
 * @Last Modified time: 2022-05-11 11:12:06
 */

import { ref } from 'vue';
import { FUploadHandler, verifyUpload } from './util';

class FileUploadService {
  //#region
  private _type = ref<'导入' | '上传'>('导入');
  private _is_initial = ref<boolean>(false);
  private _accept = ref<{ [key: string]: string }>({});
  private _single_limit_size = ref<number>(0);
  private _total_limit_size = ref<number>(0);
  //#endregion

  constructor(type: '导入' | '上传', extension: { [key: string]: string }, singleSize: number, totalSize: number) {
    this._type.value = type;
    this._is_initial.value = true;
    this._accept.value = extension;
    this._single_limit_size.value = singleSize;
    this._total_limit_size.value = totalSize;
  }

  fileImport = (list: File[]) => {
    if (!this._is_initial.value) {
      throw new Error('尚未初始化！');
    }
    return new Promise(async (resolve, reject) => {
      const file = await FUploadHandler(Object.keys(this._accept.value).join());
      if (!verifyUpload(list, file, this._single_limit_size.value, this._accept.value, this._total_limit_size.value)) {
        return;
      } else {
        resolve(file);
      }
    });
  };
}

export default FileUploadService;
