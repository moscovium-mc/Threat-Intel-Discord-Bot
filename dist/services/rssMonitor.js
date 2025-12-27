"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSSMonitor = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const logger_1 = require("../utils/logger");
const webhookPoster_1 = require("./webhookPoster");
const feeds_1 = require("../config/feeds");
class RSSMonitor {
    constructor(webhooks) {
        this.parser = new rss_parser_1.default();
        this.seenItems = new Set();
        this.webhooks = webhooks;
    }
    // Start monitoring all feeds
    async start(intervalMinutes = 30) {
        logger_1.Logger.info('Starting RSS monitor...');
        // Initial check
        await this.checkAllFeeds();
        // Recurring checks
        setInterval(async () => {
            await this.checkAllFeeds();
        }, intervalMinutes * 60 * 1000);
        logger_1.Logger.success(`RSS monitor started (checking every ${intervalMinutes} minutes)`);
    }
    // Check all configured feeds
    async checkAllFeeds() {
        logger_1.Logger.info('Checking all RSS feeds...');
        for (const feed of feeds_1.RSS_FEEDS) {
            try {
                await this.checkFeed(feed);
            }
            catch (error) {
                logger_1.Logger.error(`Error checking feed ${feed.name}: ${error.message}`);
            }
        }
    }
    // Check individual feed
    async checkFeed(feed) {
        try {
            const parsed = await this.parser.parseURL(feed.url);
            const webhookUrl = this.webhooks.get(feed.webhookEnv);
            if (!webhookUrl) {
                logger_1.Logger.warn(`No webhook configured for ${feed.webhookEnv}`);
                return;
            }
            // Process new 
            for (const item of parsed.items) {
                if (!item.link || !item.title)
                    continue;
                // Skip if already posted
                if (this.seenItems.has(item.link))
                    continue;
                // Post new 
                await this.postItem(feed, item, webhookUrl);
                // Mark as seen
                this.seenItems.add(item.link);
                // Rate limit: wait 1 second between posts
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        catch (error) {
            logger_1.Logger.error(`Failed to check feed ${feed.name}: ${error.message}`);
        }
    }
    // Post RSS to Discord
    async postItem(feed, item, webhookUrl) {
        const title = item.title || 'No title';
        const description = this.cleanDescription(item.contentSnippet || item.description || 'No description');
        const link = item.link || '';
        let message;
        // Create embed based on category
        switch (feed.category) {
            case 'cve':
                message = webhookPoster_1.WebhookPoster.createCVEEmbed(title, description, link);
                break;
            case 'ransomware':
                message = webhookPoster_1.WebhookPoster.createRansomwareEmbed(title, description, link);
                break;
            default:
                message = webhookPoster_1.WebhookPoster.createNewsEmbed(feed.name, title, description, link);
        }
        const success = await webhookPoster_1.WebhookPoster.post(webhookUrl, message);
        if (success) {
            logger_1.Logger.info(`Posted: ${title.substring(0, 50)}... from ${feed.name}`);
        }
    }
    // Description text
    cleanDescription(text) {
        // Remove HTML tags
        let clean = text.replace(/<[^>]*>/g, '');
        // Decode HTML entities
        clean = clean.replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"');
        // Truncate to 500 chars
        return clean.substring(0, 500) + (clean.length > 500 ? '...' : '');
    }
    // Get stats
    getStats() {
        return {
            totalFeeds: feeds_1.RSS_FEEDS.length,
            itemsSeen: this.seenItems.size
        };
    }
}
exports.RSSMonitor = RSSMonitor;
