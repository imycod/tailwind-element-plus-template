// config.js
const fs = require('fs');
const path = require('path');

class Config {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    loadConfig() {
        const configPath = process.env.CONFIG_PATH || path.join(__dirname, '../config.json');
        try {
            const rawConfig = fs.readFileSync(configPath);
            this.config = JSON.parse(rawConfig);
        } catch (error) {
            console.error(`Error loading config from ${configPath}:`, error);
            process.exit(1);
        }
    }

    get(key) {
        return this.config[key];
    }
}

module.exports = new Config();