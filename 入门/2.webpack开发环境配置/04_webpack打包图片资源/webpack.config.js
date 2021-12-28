/*
 * @Author: your name
 * @Date: 2021-12-15 23:19:26
 * @LastEditTime: 2021-12-16 00:02:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/04_webpack打包图片资源/webpack.config.js
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader',
        'css-loader',
        'less-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          // 图片小于8k 会base64处理
          limit: 8 * 1024,
          // 关闭url-loader es6模块化
          esModule: false,
          // 给图片重命名
          name: '[hash:10].[ext]'
        }
      }, 
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'

}