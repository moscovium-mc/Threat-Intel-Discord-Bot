"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./utils/logger");
const rssMonitor_1 = require("./services/rssMonitor");
const webhookPoster_1 = require("./services/webhookPoster");
// Load environment variables
dotenv_1.default.config();
// Validate required environment variables
const requiredEnvVars = ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        logger_1.Logger.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}
// Create Discord client
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
    ]
});
// Bot ready event
client.once('ready', async () => {
    logger_1.Logger.success(`Bot logged in as ${client.user?.tag}`);
    logger_1.Logger.info(`Connected to ${client.guilds.cache.size} servers`);
    // Setup webhooks map
    const webhooks = new Map();
    if (process.env.WEBHOOK_CVE)
        webhooks.set('WEBHOOK_CVE', process.env.WEBHOOK_CVE);
    if (process.env.WEBHOOK_NEWS)
        webhooks.set('WEBHOOK_NEWS', process.env.WEBHOOK_NEWS);
    if (process.env.WEBHOOK_RANSOMWARE)
        webhooks.set('WEBHOOK_RANSOMWARE', process.env.WEBHOOK_RANSOMWARE);
    if (process.env.WEBHOOK_LOGS)
        webhooks.set('WEBHOOK_LOGS', process.env.WEBHOOK_LOGS);
    logger_1.Logger.info(`Configured ${webhooks.size} webhooks`);
    // Log startup to webhook if available
    if (process.env.WEBHOOK_LOGS) {
        await webhookPoster_1.WebhookPoster.logToWebhook(process.env.WEBHOOK_LOGS, `Threat Intel Bot started successfully\n\`\`\`Connected to ${client.guilds.cache.size} servers\nConfigured ${webhooks.size} webhooks\`\`\``, 'info');
    }
    // Start RSS monitor
    const rssMonitor = new rssMonitor_1.RSSMonitor(webhooks);
    const checkInterval = parseInt(process.env.CHECK_INTERVAL || '30');
    await rssMonitor.start(checkInterval);
    // Log stats every hour
    setInterval(() => {
        const stats = rssMonitor.getStats();
        logger_1.Logger.info(`Stats: ${stats.totalFeeds} feeds monitored, ${stats.itemsSeen} items processed`);
    }, 60 * 60 * 1000);
});
// Error handling
client.on('error', (error) => {
    logger_1.Logger.error('Discord client error:', error);
});
process.on('unhandledRejection', (error) => {
    logger_1.Logger.error('Unhandled promise rejection:', error);
});
process.on('SIGINT', async () => {
    logger_1.Logger.info('Shutting down...');
    if (process.env.WEBHOOK_LOGS) {
        await webhookPoster_1.WebhookPoster.logToWebhook(process.env.WEBHOOK_LOGS, 'Threat Intel Bot shutting down', 'warn');
    }
    client.destroy();
    process.exit(0);
});
// Login to Discord
client.login(process.env.DISCORD_TOKEN).catch((error) => {
    logger_1.Logger.error('Failed to login to Discord:', error);
    process.exit(1);
});
