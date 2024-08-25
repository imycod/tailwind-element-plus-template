/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-08-24 21:52:51
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-08-25 11:11:04
 * @FilePath: \api-gateway\src\routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const routes = [
    {
        url:'/api/user',
        auth: true,
        scopes: ['user:read', 'user:write'],
        proxy: {
            target: "http://127.0.0.1:3001",
            changeOrigin: true,
            pathRewrite: {
                [`^/user`]: '',
            },
        }
    },
    {
        url: '/free',
        auth: false,
        creditCheck: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "https://ship-stage.item.com/",
            changeOrigin: true,
            pathRewrite: {
                [`^/free`]: '',
            },
        }
    },
    {
        url: '/premium',
        auth: true,
        creditCheck: true,
        proxy: {
            target: "https://my.item.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/premium`]: '',
            },
        }
    },
    {
        url: '/credit',
        auth: false,
        creditCheck: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "https://www.baidu.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/free`]: '',
            },
        }
    },
    {
        url:'/api/orders',
        auth: true,
        scopes: ['order:read', 'order:write'],
        proxy: {
            target: "https://www.baidu.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/orders`]: '',
            },
        }
    },
    {
        url:'/api/products',
        auth: true,
        scopes: ['product:read'],
        proxy: {
            target: "https://www.baidu.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/products`]: '',
            },
        }
    },
    {
        url:'/api/public',
        auth: false,
        proxy: {
            target: "https://www.baidu.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/public`]: '',
            },
        }
    }
]

module.exports = routes
