/*
 * @Author: your name
 * @Date: 2021-12-25 00:07:54
 * @LastEditTime: 2021-12-25 00:22:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/进阶/03.loader/loaders/loader3.js
 */
const { validate } = require('schema-utils');
const schema = require('./schema.json')
// loader 本质是一个函数

// 同步 loader
module.exports = function(content, map, meta) {
  // 获取options
  const options = this.query;
  console.log(333, options)
  // 检验options 是否合法
  validate(schema, options, {
    name: 'loader3'
  })
  return content;
}


// 解析的时候会被执行
module.exports.pitch = function() {
  console.log(111111);
}
