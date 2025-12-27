"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookPoster = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
class WebhookPoster {
    // Post to Discord webhook
    static async post(webhookUrl, message) {
        try {
            await axios_1.default.post(webhookUrl, message);
            return true;
        }
        catch (error) {
            logger_1.Logger.error(`Failed to post to webhook: ${error.message}`);
            return false;
        }
    }
    // Create embed for CVE
    static createCVEEmbed(title, description, link) {
        return {
            username: 'Threat Intel Bot - CVE',
            avatar_url: 'https://i.imgur.com/4M34hi2.png', // Optional: your bot avatar
            embeds: [{
                    title: title.substring(0, 256), // Discord limit
                    description: description.substring(0, 4096), // Discord limit
                    url: link,
                    color: 0xFF0000, // Red for CVEs
                    footer: { text: 'Threat Intel Bot | CVE Monitor' },
                    timestamp: new Date().toISOString()
                }]
        };
    }
    // Create embed for news
    static createNewsEmbed(source, title, description, link) {
        return {
            username: 'Threat Intel Bot - News',
            avatar_url: 'https://i.imgur.com/4M34hi2.png',
            embeds: [{
                    title: title.substring(0, 256),
                    description: description.substring(0, 4096),
                    url: link,
                    color: 0x00FF41, // Green for news
                    fields: [{ name: 'Source', value: source, inline: true }],
                    footer: { text: 'Threat Intel Bot | Security News' },
                    timestamp: new Date().toISOString()
                }]
        };
    }
    // Create embed for ransomware
    static createRansomwareEmbed(title, description, link) {
        return {
            username: 'Threat Intel Bot - Ransomware',
            avatar_url: 'https://i.imgur.com/4M34hi2.png',
            embeds: [{
                    title: title.substring(0, 256),
                    description: description.substring(0, 4096),
                    url: link,
                    color: 0xFF00FF, // Purple for ransomware
                    footer: { text: 'Threat Intel Bot | Ransomware Intel' },
                    timestamp: new Date().toISOString()
                }]
        };
    }
    // Log message to webhook
    static async logToWebhook(webhookUrl, message, level = 'info') {
        const colors = { info: 0x00FF41, error: 0xFF0000, warn: 0xFFFF00 };
        await this.post(webhookUrl, {
            username: 'Threat Intel Bot - Logs',
            embeds: [{
                    description: message,
                    color: colors[level],
                    timestamp: new Date().toISOString()
                }]
        });
    }
}
exports.WebhookPoster = WebhookPoster;
