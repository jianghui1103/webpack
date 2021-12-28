/*
 * @Author: your name
 * @Date: 2021-12-18 21:30:55
 * @LastEditTime: 2021-12-20 23:52:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/16_HMR/src/js/index.js
 */
import { print } from './print';
function add(x, y) {
  return x + y;
}
console.log(add(2 + 5));
print();

/*
  1. eslint 不认识window， navigator 全局变量
  解决： 需要修改package.json中 eslintConfig配置
    "env": {
      "browser": true // 支持浏览器端全局变量
    }

  2. sw代码必须运行在服务器上
    --> nodejs
    --> 
      npm i serve -g
      serve -s build 启动服务器 将build目录下所有资源作为静态资源暴露出去

*/

// 注册 serviceworker
// 处理兼容性问题
console.log(navigator)
if ( 'serviceWorker' in navigator) {
  window.addEventListener('load',()=> {
    navigator.serviceWorker.register('/service-worker.js')
      .then(()=> {
        console.log('sw 注册成功')
      })
      .catch(()=> {
        console.log('sw注册失败')
      })
  })
}