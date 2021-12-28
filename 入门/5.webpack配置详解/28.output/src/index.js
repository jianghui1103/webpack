/*
 * @Author: your name
 * @Date: 2021-12-21 22:49:08
 * @LastEditTime: 2021-12-21 23:14:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/5.webpack配置详解/27.entry/src/index.js
 */
import count from './count'
import('./add').then(({default: add})=> {
  console.log(add(1,2))
})

console.log('index.js')

console.log(count(3,2))