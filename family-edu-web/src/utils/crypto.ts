/*
 * @Description: 加密解密，校验是否加密
 * @Autor: zpwan
 * @Date: 2022-03-31 14:47:28
 * @LastEditors: zpwan
 * @LastEditTime: 2022-04-28 19:48:48
 */
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF'); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); // 十六位十六进制数作为密钥偏移量

// 解密方法
const Decrypt = (word: string) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

// 加密方法
const Encrypt = (word: string) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

// 校验是否加密过
const verifyCrypto = (word: string) => {
  return word && word === Encrypt(Decrypt(word));
};

export default {
  Decrypt,
  Encrypt,
  verifyCrypto,
};
