/*
 * @Author: your name
 * @Date: 2021-12-21 00:07:01
 * @LastEditTime: 2021-12-21 00:08:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/25.externals/webpack.config.js
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: []
  },
  plugins: [
    // 默认会创建一个空的html文件，自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 模板： 复制./src/index.html的文件
      template: './src/index.html'
    })
  ],
  mode: 'production',
  externals: {
    // 忽略库名 -- npm包名
    jquery: 'jQuery'
  }
}