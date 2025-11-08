#  InfoSecBot - Threat Intel on Autopilot

Because manually checking RSS feeds is for script kiddies.

InfoSecBot is a no bullshit Discord bot that monitors CVE databases and security news feeds, then dumps everything straight into your Discord channels. Set it, forget it, stay informed.
Built by hackers, for hackers. Zero fluff.

## What It Does

- Monitors 10 security RSS feeds - CVEs, security news, ransomware intel, malware drops
- Auto-posts to Discord - New vulns and news hit your channels in real-time
- Zero interaction needed - Fire and forget. Bot does its thing.
- Webhook-based - Fast, reliable, no database bullshit

TL;DR: Automated threat intelligence aggregator that actually works.

### Features

CVE Intelligence

- CISA KEV - Known Exploited Vulnerabilities (the ones that actually matter)
- US-CERT - Federal advisories and ICS alerts

Security News

- Dark Reading - Enterprise security news
- BleepingComputer - Breaking vulns and 0-days
- The Hacker News - Infosec news aggregator
- Krebs on Security - Investigative security journalism
- Schneier on Security - Crypto and security commentary
- Threatpost - Malware and threat intel

Threat Intelligence

- Ransomware.live - Active ransomware group tracking
- VX-Underground - Malware samples and APT research

Total: 10 feeds, checked every 30 mins (configurable), auto-posted to Discord.

### Quick Start 

Prerequisites
- Node.js 18+ (if you don't have this, what are you even doing?)
- Discord bot token (create one at discord.com/developers)
- 4 Discord webhooks (Server Settings > Integrations > Webhooks)

## Installation
Download or clone this repo

```
npm install
```
```
npm run build
```
```
npm start
```

### Configuration

Create .env with your creds:

```
# Discord bot token (from discord.com/developers)
DISCORD_TOKEN=token
DISCORD_CLIENT_ID=id

# Discord webhooks (Server Settings > Integrations > Webhooks > New Webhook)
WEBHOOK_CVE=https://discord.com/api/webhooks/...
WEBHOOK_NEWS=https://discord.com/api/webhooks/...
WEBHOOK_RANSOMWARE=https://discord.com/api/webhooks/...
WEBHOOK_LOGS=https://discord.com/api/webhooks/...

# How often to check feeds (in minutes)
CHECK_INTERVAL=30

# Environment
NODE_ENV=production
```

### Creating Discord Webhooks

- Open Discord → Server Settings
- Integrations → Webhooks → New Webhook
- Name it (e.g., "InfoSecBot - CVE")
- Pick channel (e.g., #cve-alerts)
- Copy webhook URL
- Paste into .env
Repeat 3 more times for news, ransomware, logs

Pro tip: Webhook URLs are long as fuck (~120 chars). Copy the whole thing.

## Running It

Local Testing

```
npm start
```

## Docker (if you're into that)

```
docker build -t infosecbot .
docker run -d --env-file .env infosecbot
```

## Contributing

PRs welcome. Keep it clean, keep it simple.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to VX-Underground and anyone who contributes code that is used
