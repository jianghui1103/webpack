const fs = require('fs');
const util = require('util');

const path = require('path');

const webpack = require('webpack');
const { RawSource } = webpack.sources;

// 将fs.readFile方法变成基于promise风格的异步方法
const readFile = util.promisify(fs.readFile);

class Plugin2 {
  apply(complier) {
    complier.hooks.thisCompilation.tap('plugin2', compilation=> {
      // debugger;
      // console.log(compilation)
      // 添加资源
      compilation.hooks.additionalAssets.tapAsync('plugin2',async cb=> {
        // console.log(compilation);

        const content = 'hello plugin2';

        // 往要输出的资源中，添加一个a.txt
        compilation.assets['a.txt'] = {
          // 文件大小
          size() {
            return content.length 
          },
          // 文件内容
          source() {
            return content;
          }
        }
        const data = await readFile(path.resolve(__dirname, 'b.txt'));
        // compilation.assets['b.txt'] = new RawSource(data);

        compilation.emitAsset('b.txt', new RawSource(data));

        cb();
      })
    })
  }
}

module.exports = Plugin2;