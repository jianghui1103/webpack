/*
 * @Author: your name
 * @Date: 2021-12-16 23:43:46
 * @LastEditTime: 2021-12-18 01:13:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/08_提取css为单独文件/webpack.config.js
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 设置环境变量
// process.env.NODE_ENV = 'production'
// process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  // 生产环境下会自动压缩js
  mode: 'development'
}