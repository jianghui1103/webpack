/*
 * @Author: your name
 * @Date: 2021-12-24 12:48:17
 * @LastEditTime: 2021-12-25 23:06:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/进阶/03.loader/src/index.js
 */
console.log('hello word')

class Person{
  constructor() {
    this.age = 'jack'
  }
  setName() {
    this.age = 'hello'
  }
}
console.log(new Person())