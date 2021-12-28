const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/*
  样式文件： 可以使用HMR热更新， style-loader中实现了
  js文件： 默认不能使用HMR功能 ---> 修改js代码
    注意： HMR功能对js的处理， 只能处理非入口js文件的其他文件
  html文件： 默认不能使用HMR功能，同时会导致问题，HTML文件不能热更新（不用开启HMR功能）
    解决： 修改entry入口，将html文件引入
*/


// 定义node 的环境 使用browserslist那个环
process.env.NODE_ENV = 'production'

const commonCssLoader = [
  MiniCssExtractPlugin.loader, 
  'css-loader', 
  {
    // 还需要定义兼容到什么浏览器
    loader: 'postcss-loader',
      ident: 'postcss',
      options: {
      postcssOptions: {
        //或者将插件引入写在单独的配置js中
        //config: './config/postcss.config.js',
        plugins: () => [
            require('postcss-preset-env')()
        ]
      }
    }
  },
]

module.exports = {
  entry: ['./src/js/index', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /.less$/,
            use: [
              ...commonCssLoader,
              'less-loader'
            ]
          },
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
            }
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              esModule: false,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
    
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            // file-loader打包其他资源
            exclude: /\.(html|css|js|jpg|png|gif|less)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
              name: '[hash:10].[ext]'
            }
          }, 
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/build.css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
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


  /*
    source-map： 一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）

    内联和外部的区别： 1. 外部生成了文件， 内联没有 2. 内联的构建速度更快

    source-map: 外部
      错误代码准确信息 和 源代码的错误位置
    inline-source-map: 内联
      只生成了一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    hidden-source-map: 外部
      错误代码错误原因， 没有错误位置，
      不能追踪到源代码错误， 只能提示到构建后代码错误的位置
    eval-source-map: 内联
      每一个都生成对应的source-map, 都在eval
      错误代码准确信息 和 源代码的错误位置
    nosources-source-map: 外部
      错误代码准确信息 但是 没有任何源代码信息
    cheap-source-map: 外部
      错误代码准确信息 和 源代码的错误位置
      只能精确到行
    cheap-module-source-map: 外部
      错误代码准确信息 和 源代码的错误位置
      module会将loader的source-map添加进来


    开发环境： 速度快，调试更友好，
      速度快(eval >> inline >> cheap >> ..)
        eval-source-map
        cheap-source-map
      调试更友好
        source-map
        cheap-module-source-map
        cheap-source-map
      --->  eval-source-map / eval-cheap-module-source-map


    生产环境： 源代码要不要隐藏， 调试要不要更友好
      内联会导致体积更大， 生产不会使用
      nosources-source-map
      hidden-source-map
      ---> source-map / cheap-module-source-map
  */
}