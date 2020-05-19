// webpack配置文件，每次执行会自动执行这里的配置

const path = require("path");

//html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports={
    //入口文件
    entry: './src/index.js',

    // 出口文件
    output: {
        //文件名
        filename: 'js/bundle.js',
        //路径，绝对路径
        path: path.resolve(__dirname, 'dist'),
    },

    //模块
    module:{
        //规则
        rules:[
            {
                test: /\.css$/,
                //这里执行顺序是从右往左执行的,css-loader必须先执行编译成字符串给style-loader
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    {
                        loader:'css-loader',
                        options:{
							//import 导入的css文件也编译
                            importLoaders:1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                //这里执行顺序是从右往左执行的,less-loader必须先执行编译成css给css-loader
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    'css-loader','less-loader']
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options:{
            //                 //修改打包后的名字
            //                 name:'./img/[name].[ext]'
            //             }
            //         },
                    
            //       ],
                
            // },
            {
                test:/\.(png|jpe?g|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10240,
                            name:'[name].[ext]',
                            outputPath:'img/'
                        }
                    }
                ]
            },
            {
                test:/\.html$/,
                use:['html-loader']
            }
            
        ]
    },


    //devServer 自动化
    devServer:{
        hot:true,
        // publicPath:'./dist',         //访问路径
        port:3000,                  //独立端口号
        stats:'minimal',            //迷你型服务启动信息
    },

    //插件
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:"index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        })
    ],
    
    //生成模式
    mode: 'development',

    //devTool
    devtool:"inline-source-map"
};