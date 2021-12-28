/*
 * @Author: your name
 * @Date: 2021-12-20 08:31:08
 * @LastEditTime: 2021-12-20 12:44:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/21_codeSplit/webpack.config.js
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
/*
  多入口
  使用splitChunks
  使用import动态导入
*/



// 定义node 的环境 使用browserslist那个环
process.env.NODE_ENV = 'production'


module.exports = {
  entry: { // 多入口: 一个入口输出一个bundle
    main: './src/js/index',
  },
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60'
                }
              }
            ]
          ],
          cacheDirectory: true
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  // 可以将node_modules 中的代码单独打包一个chunk最终输出
  // 自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production',
  devServer: {
    static: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR 热加载
    hot: true
  },
  devtool: 'source-map'
}