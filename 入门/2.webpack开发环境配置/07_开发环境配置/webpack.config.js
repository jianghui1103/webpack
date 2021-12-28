/*
 * @Author: your name
 * @Date: 2021-12-16 22:28:32
 * @LastEditTime: 2021-12-16 23:32:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/07_开发环境配置/webpack.config.js
 */
const { resolve } = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        // 处理less
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理css
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]',
          esModule: false,
          outputPath: 'images'
        },
        type: 'javascript/auto'
      },
      {
        // 处理html中的img资源
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: 'media'
        },
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',

    })
  ],
  devServer: {
    static: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
  },
  mode: 'development'
}