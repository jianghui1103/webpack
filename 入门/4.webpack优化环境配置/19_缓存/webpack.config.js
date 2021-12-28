const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/*
  缓存： 
    babel缓存
      cacheDirectory: true

    文件资源缓存
      hash: 每次webpack构建时会生成一个唯一的hash值
        问题：因为js和css同时使用一个hash值
          如果重新打包，会导致所有缓存失败（可能我却只改动一个文件）
      chunkhash： 根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值一样
        问题：js和css同时使用一个hash值
          因为css是在js中引入的，属于同一个chunk
      contenthahs: 根据文件的内容生成hash值，不同文件hash值一定不一样
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
          cacheDirectory: true
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
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/build[contenthash:10].css'
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