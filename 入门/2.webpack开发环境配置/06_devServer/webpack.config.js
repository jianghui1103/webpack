/*
 * @Author: your name
 * @Date: 2021-12-15 23:19:26
 * @LastEditTime: 2021-12-16 14:17:24
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
        exclude: /\.(html|css|js|less)$/,
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
  mode: 'development',

  // 开发服务器devserver 用来自动化（自动编译，打开浏览器，刷新浏览器）
  // 启动devServer指令为 npx webpack-dev-server
  devServer: {
    static: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号：
    port: 3000
  }

}