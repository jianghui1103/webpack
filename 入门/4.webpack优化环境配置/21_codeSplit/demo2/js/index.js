/*
 * @Author: your name
 * @Date: 2021-12-18 21:30:55
 * @LastEditTime: 2021-12-20 08:51:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/16_HMR/src/js/index.js
 */
function add(x, y) {
  return x + y;
}
console.log(add(2 + 5));
print();

// 通过js 单独引入chunk进行打包
// import动态导入语法，能将某个文件单独打包
// webpackChunkName: 'test'修改名字
import (/* webpackChunkName: 'test' */'./test').then(result=> {
  console.log(result)
}).catch(error=> {
  console.log('失败')
})