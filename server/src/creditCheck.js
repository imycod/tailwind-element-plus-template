const routes = require('./routes');

// 信用检查，当某人的账户没有足够的信用，就不可以访问某个端点
const checkCredit = (req) => {
    return new Promise((resolve, reject) => {
        console.log("Checking credit with token", req.headers["authorization"]);
        setTimeout(() => {
            reject('No sufficient credits');
        }, 500);
    })
}

const setupCreditCheck = (app) => {
    routes.forEach(r => {
        if (r.creditCheck) {
            app.use(r.url, function (req, res, next) {
                checkCredit(req)
                    .then(() => {
                        next();
                    }).catch((error) => {
                        res.status(402).send({ error });
                    })
            });
        }
    })
}

exports.setupCreditCheck = setupCreditCheck
