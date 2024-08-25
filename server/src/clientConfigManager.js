/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2024-08-25 09:02:28
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2024-08-25 10:25:58
 * @FilePath: \api-gateway\ClientConfigManager.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Redis = require('ioredis');
const axios = require('axios');
const config = require('./config');

class ClientConfigManager {
    constructor() {
        this.redis = new Redis(config.get('redis'));
        this.authServiceUrl = 'https://your-auth-service.com/api';
    }

    async getClientConfig(clientId) {
        // Try to get config from Redis cache first
        let clientConfig = await this.redis.get(`client:${clientId}`);
        
        if (clientConfig) {
            return JSON.parse(clientConfig);
        }

        // If not in cache, fetch from auth service
        try {
            const response = await axios.get(`${this.authServiceUrl}/clients/${clientId}`);
            clientConfig = response.data;

            // Cache the result in Redis
            await this.redis.set(`client:${clientId}`, JSON.stringify(clientConfig), 'EX', 3600); // Cache for 1 hour

            return clientConfig;
        } catch (error) {
            console.error(`Failed to fetch client config for ${clientId}:`, error);
            return null;
        }
    }

    async updateClientConfig(clientId, newConfig) {
        try {
            // Update in auth service
            await axios.put(`${this.authServiceUrl}/clients/${clientId}`, newConfig);

            // Update in Redis cache
            await this.redis.set(`client:${clientId}`, JSON.stringify(newConfig), 'EX', 3600);

            return true;
        } catch (error) {
            console.error(`Failed to update client config for ${clientId}:`, error);
            return false;
        }
    }
}

module.exports = ClientConfigManager;