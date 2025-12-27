import axios from 'axios';
import { Logger } from '../utils/logger';

export interface WebhookMessage {
  username?: string;
  avatar_url?: string;
  embeds: Array<{
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    fields?: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
    footer?: {
      text: string;
    };
    timestamp?: string;
  }>;
}

export class WebhookPoster {
  // Post to Discord webhook
  static async post(webhookUrl: string, message: WebhookMessage): Promise<boolean> {
    try {
      await axios.post(webhookUrl, message);
      return true;
    } catch (error: any) {
      Logger.error(`Failed to post to webhook: ${error.message}`);
      return false;
    }
  }

  // Create embed for CVE
  static createCVEEmbed(title: string, description: string, link: string): WebhookMessage {
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
  static createNewsEmbed(source: string, title: string, description: string, link: string): WebhookMessage {
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
  static createRansomwareEmbed(title: string, description: string, link: string): WebhookMessage {
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
  static async logToWebhook(webhookUrl: string, message: string, level: 'info' | 'error' | 'warn' = 'info'): Promise<void> {
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
