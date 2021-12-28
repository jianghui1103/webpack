
const { validate } = require('schema-utils');
const babelSchema = require('./babelSchema.json');
const babel = require('@babel/core');
const util = require('util')
// babel.transform 用来编译代码
// 是一个普通异步方法
// util.promisify将普通的异步方法转换为promise的异步方法
const transform = util.promisify(babel.transform);

module.exports = function(content, map ,meta) {
  // 获取options配置
  const options = this.query || {};
  // 检验配置
  validate(babelSchema, options, {
    name: 'babel loader'
  })
  // 创建异步
  const callback = this.async();

  // 使用babel 做编译
  transform(content, options)
  .then(({code, map})=> callback(null ,code, map, meta)
  ).catch(e=> callback(e))
}