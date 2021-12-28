/*
 * @Author: your name
 * @Date: 2021-12-27 23:08:58
 * @LastEditTime: 2021-12-28 22:10:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/进阶/04.plugin/webpack.config.js
 */

// const Plugin1 = require('./plugins/Plugin1')
// const Plugin2 = require('./plugins/Plugin2')
const CopyPlugin = require('./plugins/CopyPlugin')

module.exports = {
  plugins: [
    // new Plugin1()
    // new Plugin2()
    new CopyPlugin({
      from: 'public',
      to: 'css',
      ignore: ['**/index.html']
    })
  ],
  mode: 'development'
}