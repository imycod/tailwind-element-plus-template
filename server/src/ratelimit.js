const rateLimit = require("express-rate-limit");
const routes = require("./routes");

const setupRateLimit = (app) => {
    routes.forEach(r => {
        if (r.rateLimit) {
            app.use(r.url, rateLimit(r.rateLimit));
        }
    })
}

exports.setupRateLimit = setupRateLimit;
