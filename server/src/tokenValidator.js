const Redis = require('ioredis');
const jwt = require('jsonwebtoken');
const config = require('./config');

class TokenValidator {
    constructor() {
        this.redis = new Redis(config.get('redis'));
        this.jwtSecret = config.get('jwtSecret'); 
        console.log(this.jwtSecret)
    }

    async validateToken(token) {
        try {
            // First, check if the token is in the blacklist
            const isBlacklisted = await this.redis.get(`blacklist:${token}`);
            if (isBlacklisted) {
                return { valid: false, reason: 'Token is blacklisted' };
            }

            // Verify the JWT
            const decoded = jwt.verify(token, this.jwtSecret);

            // Check if the token is in the whitelist (optional, for very high security)
            // const isWhitelisted = await this.redis.get(`whitelist:${decoded.jti}`);
            // if (!isWhitelisted) {
            //     return { valid: false, reason: 'Token not found in whitelist' };
            // }

            // Token is valid
            return { valid: true, decoded };
        } catch (error) {
            console.error('Token validation error:', error);
            return { valid: false, reason: 'Invalid token' };
        }
    }

    async blacklistToken(token, expirationTime) {
        // Add token to blacklist
        await this.redis.set(`blacklist:${token}`, 'true', 'EX', expirationTime);
    }

    async whitelistToken(jti, expirationTime) {
        // Add token to whitelist
        await this.redis.set(`whitelist:${jti}`, 'true', 'EX', expirationTime);
    }
}

module.exports = TokenValidator;