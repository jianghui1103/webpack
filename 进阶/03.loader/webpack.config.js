/*
 * @Author: your name
 * @Date: 2021-12-24 12:44:16
 * @LastEditTime: 2021-12-25 22:21:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/进阶/03.loader/webpack.config.js
 */
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: 'loader1'
        // use: [
        //   'loader1',
        //   'loader2',
        //   {
        //     loader: 'loader3',
        //     options: {
        //       name: 'jack',
        //       age: 18
        //     }
        //   }
        // ]
        loader: 'babelLoader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  },
  mode: 'development'
}
