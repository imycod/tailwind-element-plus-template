/**
    Keycloak是用java编写的身份验证服务器，
    提供了完备的身份验证功能。
    这里我们使用自己编写的基于oauth2协议的身份验证服务器
    如果要用keycloak的在nodejs端要下载 keycloak-connect适配器，和部署keycloak服务
    https://juejin.cn/post/7102036766638473247
 */
const OAuth2Strategy = require('passport-oauth2');
const passport = require('passport');
const session = require('express-session');
const routes = require("./routes");
const ClientConfigManager = require('./clientConfigManager');
const TokenValidator = require('./tokenValidator');

const tokenValidator = new TokenValidator();
const clientConfigManager = new ClientConfigManager();

const setupAuth = (app) => {
    // Setup session middleware
    app.use(session({
        secret: '<RANDOM GENERATED TOKEN>',
        resave: false,
        saveUninitialized: true,
        store: new session.MemoryStore()
    }));

    // Initialize Passport and restore authentication state, if any, from the session
    app.use(passport.initialize());
    app.use(passport.session());


    // Dynamic strategy configuration
    const configureStrategy = (clientId, clientSecret, req, done) => {
        passport.use(new OAuth2Strategy({
            authorizationURL: 'https://your-auth-server.com/oauth/authorize',
            tokenURL: 'https://your-auth-server.com/oauth/token',
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: `http://your-api-gateway.com/auth/${clientId}/callback`,
            passReqToCallback: true
        },
            function (req, accessToken, refreshToken, profile, cb) {
                // Here you would typically find or create a user in your database
                cb(null, { id: 'user_id', name: 'User Name', clientId: clientId });
            }
        ));

        done();
    };

    // Middleware to set up the correct strategy based on the client
    const setupClientStrategy = async (req, res, next) => {
        const clientId = req.params.clientId || req.query.client_id || req.headers['client-id'];
        const clientConfig = await clientConfigManager.getClientConfig(clientId);
        
        console.log('clientConfig---',clientConfig)
        
        if (!clientConfig) {
            return res.status(400).json({ error: 'Invalid client' });
        }

        configureStrategy(clientConfig.clientId, clientConfig.clientSecret, req, next);
    };


    passport.serializeUser((user, done) => {
        // done(null, JSON.stringify(user));
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // done(null, JSON.parse(serializedUser));

        // Here you would typically find the user in your database
        // For this example, we're just using a mock user
        done(null, { id: id, name: 'User Name' });
    });

    // Setup routes
    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, setupClientStrategy, passport.authenticate('oauth2'), (req, res, next) => {
                next();
            });
        }
    });

    // Login route example (simplified)
    app.post('/login', async (req, res) => {
        // Assuming authentication is successful
        const {username} = req.body
        const token = 'example_token'; // In reality, you would generate a JWT here
        await tokenValidator.whitelistToken(token, 3600); // Whitelist for 1 hour
        res.json({ token });
    });

    // Add a dynamic login route
    app.get('/login/:clientId', setupClientStrategy, passport.authenticate('oauth2'));

    // Add a dynamic callback route
    app.get('/auth/:clientId/callback', setupClientStrategy, passport.authenticate('oauth2', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    // Add a logout route
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}

exports.setupAuth = setupAuth;