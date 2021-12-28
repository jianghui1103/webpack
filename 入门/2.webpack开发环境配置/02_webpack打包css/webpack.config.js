/*
 * @Author: your name
 * @Date: 2021-12-15 21:49:31
 * @LastEditTime: 2021-12-15 22:11:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/webpack打包css/webpack.config.js
 */

const { resolve } = require('path')

module.exports = {
  entry: './src/index.js', // 入口起点
  // 输出文件
  output: {
    // 输出文件名
    filename: 'build.js',
    // 输出路径
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 详细的loader配置
      {
        test: /\.css$/,
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到head生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中 ，里面的内容是样式的字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [],
  mode: 'development', 
}