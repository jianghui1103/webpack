/*
 * @Author: your name
 * @Date: 2021-12-21 23:06:05
 * @LastEditTime: 2021-12-22 00:01:17
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
    // 文件名称(指定名称 + 目录)
    filename: 'js/[name].js',
    // 输出文件目录(将来所有资源输出的公共目录)
    path: resolve(__dirname, 'build'),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
    library: '[name]', // 整个库向外暴露的变量名
    // libraryTarget: 'window', // 变量名添加到哪个上 browser
    // libraryTarget: 'global', // 变量名添加到哪个上 node
    libraryTarget: 'commonjs', 
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}