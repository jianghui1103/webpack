/*
 * @Author: your name
 * @Date: 2021-12-18 23:10:34
 * @LastEditTime: 2021-12-20 08:20:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/19_缓存/src/js/print.js
 */
console.log('print被执行222221111');
export function print() {
  const content = 'hello 222222';
  console.log(content);
}

export function count(x ,y) {
  return x+y
}