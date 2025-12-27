# Threat Intel Discord Bot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js 18+](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/platform-linux%20%7C%20macos%20%7C%20windows-lightgrey.svg)]()
[![Tool Type](https://img.shields.io/badge/tool-threat%20intel-red.svg)]()
[![Built for](https://img.shields.io/badge/built%20for-SOC%20teams-red.svg)]()

[![GitHub Stars](https://img.shields.io/github/stars/moscovium-mc/Threat-Intel-Discord-Bot?style=social)](https://github.com/moscovium-mc/Threat-Intel-Discord-Bot/stargazers)
[![Forks](https://img.shields.io/github/forks/moscovium-mc/Threat-Intel-Discord-Bot?style=social)](https://github.com/moscovium-mc/Threat-Intel-Discord-Bot/network/members)
[![Issues](https://img.shields.io/github/issues/moscovium-mc/Threat-Intel-Discord-Bot)](https://github.com/moscovium-mc/Threat-Intel-Discord-Bot/issues)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/moscovium-mc/Threat-Intel-Discord-Bot/graphs/commit-activity)
[![Last Commit](https://img.shields.io/github/last-commit/moscovium-mc/Threat-Intel-Discord-Bot)](https://github.com/moscovium-mc/Threat-Intel-Discord-Bot/commits/main)

Because manually checking RSS feeds is for script kiddies.

Automated threat intelligence aggregator for Discord. Monitors CVE databases, security news feeds, ransomware intel, and malware research - delivering real-time updates straight to your Discord channels. Set it, forget it, stay informed.

Built by hackers, for hackers. Zero fluff.

## What it does

- **10 security RSS feeds** - CVEs, security news, ransomware intel, malware drops
- **Auto posts to Discord** - New vulns and news hit your channels in real-time
- **Zero interaction needed** - Fire and forget. Bot does its thing
- **Webhook-based** - Fast, reliable, no database bullshit
- **Configurable intervals** - Check feeds every 30 mins (default) or customize
- **Docker support** - Containerized deployment ready
- **TypeScript powered** - Type-safe

**TL;DR:** Automated threat intelligence aggregator that actually works.

## Feed Sources

### CVE Intelligence

| Source | What It Tracks | Why It Matters |
|--------|----------------|----------------|
| **CISA KEV** | Known Exploited Vulnerabilities | The ones being actively exploited in the wild |
| **US-CERT** | Federal advisories and ICS alerts | Government-level threat intel |

### Security News

| Source | Coverage | Style |
|--------|----------|-------|
| **Dark Reading** | Enterprise security news | Industry analysis |
| **BleepingComputer** | Breaking vulns and 0-days | Fast, accurate reporting |
| **The Hacker News** | Infosec news aggregator | Daily threat roundup |
| **Krebs on Security** | Investigative security journalism | In-depth investigations |
| **Schneier on Security** | Crypto and security commentary | Expert analysis |
| **Threatpost** | Malware and threat intel | Threat research |

### Threat Intelligence

| Source | Focus | Data |
|--------|-------|------|
| **Ransomware.live** | Active ransomware group tracking | Live victim tracking |
| **VX-Underground** | Malware samples and APT research | Malware intelligence |

**Total:** 10 feeds, checked every 30 mins (configurable), auto posted to Discord.

## Getting it running

### Prerequisites

- Node.js 18+ (if you don't have this, what are you even doing?)
- Discord bot token ([create one](https://discord.com/developers/applications))
- 4 Discord webhooks (Server Settings > Integrations > Webhooks)

### Installation
```bash
# Clone the repository
git clone https://github.com/moscovium-mc/Threat-Intel-Discord-Bot.git
cd Threat-Intel-Discord-Bot

# Install dependencies
npm install

# Build the project
npm run build

# Run the bot
npm start
```

## Configuration

Create `.env` with your creds:
```env
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

## Setting Up Discord Webhooks

1. Open Discord → Server Settings
2. Integrations → Webhooks → New Webhook
3. Name it (e.g., "Threat Intel - CVE")
4. Pick channel (e.g., #cve-alerts)
5. Copy webhook URL
6. Paste into .env

Repeat 3 more times for news, ransomware, logs.

**Pro tip:** Webhook URLs are long as fuck (~120 chars). Copy the whole thing.

## Deployment Options

### Local Testing
```bash
npm start
```

### Docker (if you're into that)
```bash
docker build -t threat-intel-bot .
docker run -d --env-file .env threat-intel-bot
```

### Docker Compose
```yaml
version: '3.8'
services:
  threat-intel-bot:
    build: .
    env_file: .env
    restart: unless-stopped
```
```bash
docker-compose up -d
```

## Example Outputs

### CVE Alert
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL CVE ALERT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CVE-2024-XXXXX
Remote Code Execution in Popular Software

Severity: CRITICAL (CVSS 9.8)
Status: ACTIVELY EXPLOITED

CISA has added this to the KEV catalog.
Patch immediately.

Source: CISA KEV
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Security News
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECURITY NEWS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Major Data Breach Affects Millions

A significant security incident has compromised
user data from a major tech company...

Source: BleepingComputer
Link: https://...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Ransomware Intel
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW RANSOMWARE VICTIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Group: LockBit 3.0
Victim: Example Corp
Industry: Healthcare
Country: United States

Source: Ransomware.live
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Platform Support

### Tested On
- **Linux (Ubuntu/Debian/Kali)**: Fully functional
- **Windows 10/11**: Fully functional
- **macOS**: Fully functional
- **Docker**: Recommended for production

### Requirements
- Node.js 18.x or higher
- npm or yarn
- Discord bot token and webhooks

## Troubleshooting

### Bot Not Posting

**Problem:** Bot runs but nothing appears in Discord

**Solutions:**
- Verify webhook URLs are complete and correct
- Check webhook permissions in Discord
- Confirm bot token is valid
- Review logs webhook for errors

### Feeds Not Updating

**Problem:** No new posts after initial setup

**Solutions:**
- Check `CHECK_INTERVAL` in `.env` (default: 30 minutes)
- Verify network connectivity to RSS sources
- Check logs for API errors
- Some feeds update slower than others

### Docker Issues

**Problem:** Container won't start or crashes

**Solutions:**
- Ensure `.env` is in same directory as docker-compose.yml
- Check logs: `docker logs threat-intel-bot`
- Verify all environment variables are set
- Confirm webhooks are accessible from container

## Fully Working Features

- 10 RSS feed sources monitored continuously
- Real-time Discord webhook delivery
- Configurable check intervals (30 min default)
- Docker and docker-compose support
- Automatic retry logic for failed requests
- TypeScript implementation with type safety
- Clean logging to dedicated webhook
- Cross-platform support (Windows/Linux/macOS)

## Contributing

PRs welcome. Keep it clean, keep it simple.

**Areas for improvement:**
- Additional RSS feed sources
- Enhanced filtering options (keyword alerts, severity thresholds)
- Custom alert rules per feed
- Database integration for historical tracking
- Web dashboard for feed management

**Please maintain:**
- Code quality and type safety
- Existing feed reliability
- Clean commit messages
- No bloat

## Support

If you find this project useful, consider supporting my work:

<a href="https://buymeacoffee.com/webmoney" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40"></a>

**Crypto donations:**
- <a href="bitcoin:bc1quavqz6cxqzfy4qtvq4zxc4fjgap3s7cmxja0k4"><img src="https://img.shields.io/badge/Bitcoin-000000?style=plastic&logo=bitcoin&logoColor=white" alt="Bitcoin"></a> `bc1quavqz6cxqzfy4qtvq4zxc4fjgap3s7cmxja0k4`
- <a href="ethereum:0x5287af72afbc152b09b3bf20af3693157db9e425"><img src="https://img.shields.io/badge/Ethereum-627EEA?style=plastic&logo=ethereum&logoColor=white" alt="Ethereum"></a> `0x5287af72afbc152b09b3bf20af3693157db9e425`
- <a href="solana:HYZjfEx8NbEMJX1vL1GmGj39zA6TgMsHm5KCHWSZxF4j"><img src="https://img.shields.io/badge/Solana-9945FF?style=plastic&logo=solana&logoColor=white" alt="Solana"></a> `HYZjfEx8NbEMJX1vL1GmGj39zA6TgMsHm5KCHWSZxF4j`
- <a href="monero:86zv6vTDuG35sdBzBpwVAsD71hbt2gjH14qiesyrSsMkUAWHQkPZyY9TreeQ5dXRuP57yitP4Yn13SQEcMK4MhtwFzPoRR1"><img src="https://img.shields.io/badge/Monero-FF6600?style=plastic&logo=monero&logoColor=white" alt="Monero"></a> `86zv6vTDuG35sdBzBpwVAsD71hbt2gjH14qiesyrSsMkUAWHQkPZyY9TreeQ5dXRuP57yitP4Yn13SQEcMK4MhtwFzPoRR1`

## Use Cases

This bot is built for:

- **SOC Teams** - Automated threat intelligence ingestion
- **Penetration Testers** - Stay updated on latest vulns and exploits
- **Bug Bounty Hunters** - Track new CVEs and security research
- **Security Researchers** - Monitor malware trends and ransomware activity
- **Red Teams** - Intelligence gathering for offensive operations

**Use responsibly.** This aggregates public threat intelligence. Don't be a dick.

## Acknowledgments

- **VX-Underground** - Malware research feeds
- **CISA** - KEV catalog
- **Ransomware.live** - Active ransomware tracking
- All security researchers contributing to public threat intelligence

## License

MIT License - See LICENSE file for details.

---

**Built for security professionals who don't have time for bullshit.** Automate your threat intel workflow.
