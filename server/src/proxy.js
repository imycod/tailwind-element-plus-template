const {
    createProxyMiddleware,
    debugProxyErrorsPlugin, // subscribe to proxy errors to prevent server from crashing
    loggerPlugin, // log proxy events to a logger (ie. console)
    errorResponsePlugin, // return 5xx response on proxy error
    proxyEventsPlugin, // implements the "on:" option
} = require('http-proxy-middleware');

const { authMiddleware } = require('./middleware');
const routes = require("./routes");

const setupProxies = (app) => {
    routes.forEach(r => {
        app.use(r.url, authMiddleware, createProxyMiddleware({
            ...r.proxy,
            ejectPlugins: true,
            logger: console,
            plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin],
        }));
    })
}

exports.setupProxies = setupProxies
