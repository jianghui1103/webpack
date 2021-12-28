/*
 * @Author: your name
 * @Date: 2021-12-24 12:46:04
 * @LastEditTime: 2021-12-25 00:17:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/进阶/03.loader/loaders/loader1.js
 */
// loader 本质是一个函数

module.exports = function(content, map, meta) {
  console.log(content, '11111');
  this.callback(null, content, map, meta);
  return content;
}

// 解析的时候会被执行
module.exports.pitch = function() {
  console.log(111111);
}
