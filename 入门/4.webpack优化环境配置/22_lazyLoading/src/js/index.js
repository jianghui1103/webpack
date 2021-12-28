/*
 * @Author: your name
 * @Date: 2021-12-20 12:35:54
 * @LastEditTime: 2021-12-20 12:49:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/22_lazyLoading/src/js/index.js
 */
console.log('index js被夹在了')

// import { count } from './test'

document.getElementById('btn').onclick = function() {
  // 懒加载： 当文件需要使用时再加载文件
  // 预加载 webpackPrefetch: 会在使用之前， 提前加载js文件
  // 正常加载可以认为是并行加载(同一时间加载多个文件) 
  // 预加载是等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackPrefetch: true */'./test').then(({count})=> {
    console.log(count(2,3))
  });
}