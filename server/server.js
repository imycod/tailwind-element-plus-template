/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-08-24 21:32:14
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-08-25 12:04:00
 * @FilePath: \api-gateway\src\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const { setupLogging } = require("./src/logging");
const { setupProxies } = require('./src/proxy');
const { setupRateLimit } = require("./src/ratelimit");
const { setupAuth } = require("./src/auth");
const { setupCreditCheck } = require("./src/creditCheck");

const app = express();
const port = 3000;

setupLogging(app);
setupRateLimit(app);
// api-gateway验证token失效401 403即可，上层应用根据这个状态自己调用oauth2身份验证服务器获取验证，api-gateway不负责oauth2重定向逻辑
// setupAuth(app);
// setupCreditCheck(app);
setupProxies(app);

app.listen(port, () => {
    console.log(`Listen: http://localhost:${port}`);
});
