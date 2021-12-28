/*
 * @Author: your name
 * @Date: 2021-12-21 23:06:05
 * @LastEditTime: 2021-12-22 00:24:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/5.webpack配置详解/28.output/webpack.config.js
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

/*
  
*/

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名: 优点简写路径， 缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.css'],
    // 告诉webpack解析模块是去哪个目录找
    modules: [resolve(__dirname, '../../node_modules')]
  },
  mode: 'development'
}