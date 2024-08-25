const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./src/config');
const Redis = require('ioredis');

const app = express();
app.use(express.json());
const port = 3002;

const redis = new Redis(config.get('redis'));

const clientConfigs = {
    'QWERT12345001': {
        clientId: 'QWERT12345001',
        clientSecret: 'QWERT12345001',
        scopes: ['user:read', 'user:write']
    }
}

app.post('/auth/login', (req, res) => {
    const { username } = req.body;
    const clientId = req.headers['client-id']
    const scopes = clientConfigs[clientId]?.scopes || [];
    const token = jwt.sign({ username, clientId, scopes }, config.get('jwtSecret'), { expiresIn: '1h' });
    redis.setex(token, 3600, JSON.stringify({ username, clientId, scopes }), (err) => {
        if (err) {
            console.error('Error storing token in Redis:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // 成功存储后返回令牌
        return res.json({ token });
    })
})

app.listen(port, () => {
    console.log(`Listen: http://localhost:${port}`);
});
