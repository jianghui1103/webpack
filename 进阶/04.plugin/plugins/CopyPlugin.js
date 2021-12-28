/*
 * @Author: your name
 * @Date: 2021-12-28 12:28:21
 * @LastEditTime: 2021-12-28 22:09:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/进阶/04.plugin/plugins/CopyPlugin.js
 */
const { validate } = require('schema-utils');
const globby = require('globby')
const path = require('path')
const schema = require('./schema.json');
const { promisify } = require('util');
const fs = require('fs');
const webpack = require('webpack');


const readFile = promisify(fs.readFile);
const { RawSource } = webpack.sources;

class CopyPlugin {
  constructor(options = {}) {

    // 验证options是否符合规范
    validate(schema, options, {
      name: 'CopyPlugin'
    })
    
    this.options = options;

  }

  apply(complier) {
    // 初始化 compilation
    complier.hooks.thisCompilation.tap('CopyPlugin', compilation=> {
      // 添加资源的hooks
      compilation.hooks.additionalAssets.tapAsync('CopyPlugin',async cb=> {
        // 将from中的资源复制到to中  输出出去
        const { from, ignore } = this.options;
        const to = this.options.to ? this.options.to : '.';
        // 1. 读取from中所有资源

        // context 就是webpack context
        // 运行指令的目录
        const context = complier.options.context; // process.cwd()
        // 将输入路径变成绝对路径
        const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from )

        // 2. 过滤忽略的文件
        // globby(要处理的文件夹, options)
        const paths = await globby(absoluteFrom, { ignore })
        console.log(paths) // 需要复制的文件路径

        const files = await Promise.all(
          paths.map(async (absolutePath)=> {
            // 读取文件
            const data = await readFile(absolutePath);
            // basename 得到最后的文件名称
            const relativePath = path.basename(absolutePath);
            // 和to 属性结合
            // 没有to ---> reset.css
            // 有to ---> css/reset.css
            const filename = path.join(to, relativePath);

            return {
              // 文件数据
              data,
              // 文件名称
              filename
            }
          })
        )
         
        // 3. 生成webpack格式的资源
        const assets = files.map(file=> {
          const source = new RawSource(file.data);
          return {
            source,
            filename: file.filename
          }
        })
        
        // 4. 添加comilation中，输出出去
        assets.forEach(asset=>{
          compilation.emitAsset(asset.filename, asset.source)
        })

        cb();
      })
    })
  }
}

module.exports = CopyPlugin