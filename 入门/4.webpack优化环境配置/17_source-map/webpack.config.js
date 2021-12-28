const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
        // 以下loader只会匹配一个
        // 注意不能有两项配置处理一种类型的文件
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
              ]
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
}