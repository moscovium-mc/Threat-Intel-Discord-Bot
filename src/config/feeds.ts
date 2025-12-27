// RSS Categories and Sources
export interface FeedConfig {
  name: string;
  url: string;
  category: 'cve' | 'news' | 'ransomware' | 'threat';
  webhookEnv: string; // Which webhook to use
}

// All monitored RSS feeds
export const RSS_FEEDS: FeedConfig[] = [
  // CVE Feeds
  {
    name: 'NVD - National Vulnerability Database',
    url: 'https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml',
    category: 'cve',
    webhookEnv: 'WEBHOOK_CVE'
  },
  {
    name: 'CISA - Known Exploited Vulnerabilities',
    url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml',
    category: 'cve',
    webhookEnv: 'WEBHOOK_CVE'
  },

  // Security News
  {
    name: 'Dark Reading',
    url: 'https://www.darkreading.com/rss.xml',
    category: 'news',
    webhookEnv: 'WEBHOOK_NEWS'
  },
  {
    name: 'BleepingComputer',
    url: 'https://www.bleepingcomputer.com/feed/',
    category: 'news',
    webhookEnv: 'WEBHOOK_NEWS'
  },
  {
    name: 'The Hacker News',
    url: 'https://feeds.feedburner.com/TheHackersNews',
    category: 'news',
    webhookEnv: 'WEBHOOK_NEWS'
  },
  {
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/',
    category: 'news',
    webhookEnv: 'WEBHOOK_NEWS'
  },
  {
    name: 'Schneier on Security',
    url: 'https://www.schneier.com/feed/atom/',
    category: 'news',
    webhookEnv: 'WEBHOOK_NEWS'
  },
  {
    name: 'Threatpost',
    url: 'https://threatpost.com/feed/',
    category: 'news',
    webhookEnv: 'WEBHOOK_NEWS'
  },

  // Ransomware Intel
  {
    name: 'Ransomware.live',
    url: 'https://www.ransomware.live/rss.xml',
    category: 'ransomware',
    webhookEnv: 'WEBHOOK_RANSOMWARE'
  },

  // Threat Intel
  {
    name: 'VX-Underground',
    url: 'https://www.vx-underground.org/rss.xml',
    category: 'threat',
    webhookEnv: 'WEBHOOK_NEWS'
  }
];

// To add a new feed, just append to the array above:
