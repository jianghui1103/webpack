/*
 * @Author: your name
 * @Date: 2021-12-22 21:08:29
 * @LastEditTime: 2021-12-22 22:05:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/5.webpack配置详解/32.optimization/src/js/index.js
 */
import(/* webpackChunkName: 'add' */'./add.js').then(({add})=> {
  console.log(add(1,2))
})