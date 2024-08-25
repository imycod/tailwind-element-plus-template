/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-08-24 23:05:35
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-08-25 12:11:56
 * @FilePath: \api-gateway\src\middleware.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const jwt = require("jsonwebtoken");
const routes = require("./routes");
const TokenValidator = require('./tokenValidator')

const tokenValidator = new TokenValidator()
// 模拟的token验证和scope提取函数
function verifyTokenAndGetScopes(token) {
    // 在实际应用中，这里应该验证token并从中提取scopes
    // 这里只是一个简单的演示
    return new Promise(async (resolve, reject) => {
        let scopes = null
        const deserializeToken = await tokenValidator.validateToken(token)
        if (deserializeToken.valid) {
            scopes = deserializeToken.decoded.scopes;
            resolve(scopes);
        }
    })
}

// 中间件：验证token和scopes
async function authMiddleware(req, res, next) {
    const route = routes.find(r => r.url === req.baseUrl)
    if (!route.auth) {
        return next();
    }

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const userScopes = await verifyTokenAndGetScopes(token);
    console.log(userScopes)
    if (!userScopes) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    // 检查用户是否有所需的所有scopes
    const hasAllRequiredScopes = route.scopes.every(scope => userScopes.includes(scope));
    if (!hasAllRequiredScopes) {
        return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
}

exports.authMiddleware = authMiddleware;