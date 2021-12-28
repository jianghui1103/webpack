/*
 * @Author: your name
 * @Date: 2021-12-15 23:19:26
 * @LastEditTime: 2021-12-16 12:46:33
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
        // file-loader打包其他资源
        extends: /\.(html|css|js)$/,
        loader: 'file-loader',
        options: {
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