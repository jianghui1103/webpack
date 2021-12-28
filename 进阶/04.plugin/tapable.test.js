/*
 * @Author: your name
 * @Date: 2021-12-27 12:38:55
 * @LastEditTime: 2021-12-27 14:18:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/进阶/04.plugin/tapable.test.js
 */
const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');


class Lesson {
  constructor() {
    // 初始化hooks 容器
    this.hooks = {
      // 同步hooks， 任务依次执行
      // go: new SyncHook(['address'])
      // SyncBailHook： 一旦有返回值就会推出
      go: new SyncBailHook(['address']),

      // 异步
      // AsyncParallelHook: 异步并行
      // leave: new AsyncParallelHook(['name', 'age']),
      // AsyncSeriesHook: 异步串行
      leave: new AsyncSeriesHook(['name', 'age']),
    }
  }
  tap() {
    // 往hooks容器中注册事件/添加回调函数
    this.hooks.go.tap('class03', (address)=> {
      console.log('class03', address)
      return 111;
    })
    this.hooks.go.tap('class04', (address)=> {
      console.log('class04', address)
    })
    this.hooks.leave.tapAsync('class05', (name, age, cb)=> {
      setTimeout(_=> {
        console.log('class05', name, age);
        cb();
      }, 2000)
    })

    this.hooks.leave.tapPromise('class06', (name, age)=> {
      return new Promise((resolve)=> {
        setTimeout(_=> {
          console.log('class06', name, age);
          resolve();
        }, 1000)
      })
    })
  }
  start() {
    // 触发hooks
    this.hooks.go.call('c03')
    this.hooks.leave.callAsync('jack', 18, function() {
      // 代表所有leave容器中的函数触发完了， 再触发这个回调函数
      console.log('结束啦')
    })
  }
}

const l = new Lesson();
l.tap();
l.start();