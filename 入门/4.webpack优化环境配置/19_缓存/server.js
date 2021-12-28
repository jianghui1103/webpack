/*
 * @Author: your name
 * @Date: 2021-12-19 22:55:17
 * @LastEditTime: 2021-12-19 22:58:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /webpack/19_缓存/server.js
 */

const express = require('express');

const app = express();

app.use(express.static('build', {maxAge: 1000*3600}));

app.listen(3000);