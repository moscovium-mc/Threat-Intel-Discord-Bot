import Parser from 'rss-parser';
import { Logger } from '../utils/logger';
import { WebhookPoster } from './webhookPoster';
import { RSS_FEEDS, FeedConfig } from '../config/feeds';

export class RSSMonitor {
  private parser: Parser;
  private seenItems: Set<string>; // Track posts
  private webhooks: Map<string, string>;

  constructor(webhooks: Map<string, string>) {
    this.parser = new Parser();
    this.seenItems = new Set();
    this.webhooks = webhooks;
  }

  // Start monitoring all feeds
  async start(intervalMinutes: number = 30): Promise<void> {
    Logger.info('Starting RSS monitor...');
    
    // Initial check
    await this.checkAllFeeds();
    
    // Recurring checks
    setInterval(async () => {
      await this.checkAllFeeds();
    }, intervalMinutes * 60 * 1000);

    Logger.success(`RSS monitor started (checking every ${intervalMinutes} minutes)`);
  }

  // Check all configured feeds
  private async checkAllFeeds(): Promise<void> {
    Logger.info('Checking all RSS feeds...');
    
    for (const feed of RSS_FEEDS) {
      try {
        await this.checkFeed(feed);
      } catch (error: any) {
        Logger.error(`Error checking feed ${feed.name}: ${error.message}`);
      }
    }
  }

  // Check individual feed
  private async checkFeed(feed: FeedConfig): Promise<void> {
    try {
      const parsed = await this.parser.parseURL(feed.url);
      const webhookUrl = this.webhooks.get(feed.webhookEnv);

      if (!webhookUrl) {
        Logger.warn(`No webhook configured for ${feed.webhookEnv}`);
        return;
      }

      // Process new 
      for (const item of parsed.items) {
        if (!item.link || !item.title) continue;

        // Skip if already posted
        if (this.seenItems.has(item.link)) continue;

        // Post new 
        await this.postItem(feed, item, webhookUrl);
        
        // Mark as seen
        this.seenItems.add(item.link);
        
        // Rate limit: wait 1 second between posts
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } catch (error: any) {
      Logger.error(`Failed to check feed ${feed.name}: ${error.message}`);
    }
  }

  // Post RSS to Discord
  private async postItem(feed: FeedConfig, item: any, webhookUrl: string): Promise<void> {
    const title = item.title || 'No title';
    const description = this.cleanDescription(item.contentSnippet || item.description || 'No description');
    const link = item.link || '';

    let message;

    // Create embed based on category
    switch (feed.category) {
      case 'cve':
        message = WebhookPoster.createCVEEmbed(title, description, link);
        break;
      case 'ransomware':
        message = WebhookPoster.createRansomwareEmbed(title, description, link);
        break;
      default:
        message = WebhookPoster.createNewsEmbed(feed.name, title, description, link);
    }

    const success = await WebhookPoster.post(webhookUrl, message);
    
    if (success) {
      Logger.info(`Posted: ${title.substring(0, 50)}... from ${feed.name}`);
    }
  }

  // Description text
  private cleanDescription(text: string): string {
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
  getStats(): { totalFeeds: number; itemsSeen: number } {
    return {
      totalFeeds: RSS_FEEDS.length,
      itemsSeen: this.seenItems.size
    };
  }
}
