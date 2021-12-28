/*
 * @Author: your name
 * @Date: 2021-12-21 23:06:05
 * @LastEditTime: 2021-12-22 00:08:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/5.webpack配置详解/28.output/webpack.config.js
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

/*
  
*/

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        // 排除node_modules下的文件
        exclude: /node_modules/,
        // z只检查src下的js文件
        include: resolve(__dirname ,src),
        // 优先执行
        // enforce: 'pre',
        // 延后执行
        enforce: 'post',
        // 单个loader用loader
        loader: 'eslint-loader'
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}