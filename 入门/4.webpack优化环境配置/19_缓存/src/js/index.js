/*
 * @Author: your name
 * @Date: 2021-12-18 21:30:55
 * @LastEditTime: 2021-12-19 23:01:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/16_HMR/src/js/index.js
 */
import print from './print';
function add(x, y) {
  return x + y;
}
console.log(add(2 + 5));

if(module.hot) {
  // module.hot为true 说明开启了 HMR功能 
  module.hot.accept('./print.js', function() {
    // 方法会监听print。js 文件的变化， 一旦发生了变化，其他默认不会重新打包构建
    // 方法会执行回调后面的函数
    print();
  })
}

