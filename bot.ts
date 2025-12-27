import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { Logger } from './utils/logger';
import { RSSMonitor } from './services/rssMonitor';
import { WebhookPoster } from './services/webhookPoster';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DISCORD_TOKEN', 'DISCORD_CLIENT_ID'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    Logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

// Bot ready event
client.once('ready', async () => {
  Logger.success(`Bot logged in as ${client.user?.tag}`);
  Logger.info(`Connected to ${client.guilds.cache.size} servers`);

  // Setup webhooks map
  const webhooks = new Map<string, string>();
  
  if (process.env.WEBHOOK_CVE) webhooks.set('WEBHOOK_CVE', process.env.WEBHOOK_CVE);
  if (process.env.WEBHOOK_NEWS) webhooks.set('WEBHOOK_NEWS', process.env.WEBHOOK_NEWS);
  if (process.env.WEBHOOK_RANSOMWARE) webhooks.set('WEBHOOK_RANSOMWARE', process.env.WEBHOOK_RANSOMWARE);
  if (process.env.WEBHOOK_LOGS) webhooks.set('WEBHOOK_LOGS', process.env.WEBHOOK_LOGS);

  Logger.info(`Configured ${webhooks.size} webhooks`);

  // Log startup to webhook if available
  if (process.env.WEBHOOK_LOGS) {
    await WebhookPoster.logToWebhook(
      process.env.WEBHOOK_LOGS,
      `Threat Intel Bot started successfully\n\`\`\`Connected to ${client.guilds.cache.size} servers\nConfigured ${webhooks.size} webhooks\`\`\``,
      'info'
    );
  }

  // Start RSS monitor
  const rssMonitor = new RSSMonitor(webhooks);
  const checkInterval = parseInt(process.env.CHECK_INTERVAL || '30');
  await rssMonitor.start(checkInterval);

  // Log stats every hour
  setInterval(() => {
    const stats = rssMonitor.getStats();
    Logger.info(`Stats: ${stats.totalFeeds} feeds monitored, ${stats.itemsSeen} items processed`);
  }, 60 * 60 * 1000);
});

// Error handling
client.on('error', (error) => {
  Logger.error('Discord client error:', error);
});

process.on('unhandledRejection', (error: any) => {
  Logger.error('Unhandled promise rejection:', error);
});

process.on('SIGINT', async () => {
  Logger.info('Shutting down...');
  
  if (process.env.WEBHOOK_LOGS) {
    await WebhookPoster.logToWebhook(
      process.env.WEBHOOK_LOGS,
      'Threat Intel Bot shutting down',
      'warn'
    );
  }
  
  client.destroy();
  process.exit(0);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN).catch((error) => {
  Logger.error('Failed to login to Discord:', error);
  process.exit(1);
});
