/*
 * @Author: your name
 * @Date: 2021-12-27 23:10:04
 * @LastEditTime: 2021-12-27 23:44:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/进阶/04.plugin/plugins/Plugin1.js
 */

class Plugin1 {
  apply(complier) {
    complier.hooks.emit.tap('Plugin1', (compilation)=> {
      console.log('emit.tap 1111');
    })
    complier.hooks.emit.tapAsync('Plugin1', (compilation, cb)=> {
      setTimeout(_=> {
        console.log('emit.tap 1111');
        cb();
      }, 1000)
    })
    complier.hooks.emit.tapPromise('Plugin1', (compilation, cb)=> {
      return new Promise(resolve=> {
        setTimeout(_=> {
          console.log('emit.tapPromise 1111');
          resolve();
        }, 1000)

      })
    })
    complier.hooks.afterEmit.tap('Plugin1', (compilation)=> {
      console.log('afterEmit.tap 1111');
    })
    complier.hooks.done.tap('Plugin1', (stats)=> {
      console.log('done.tap 1111');
    })
  }
}

module.exports = Plugin1;