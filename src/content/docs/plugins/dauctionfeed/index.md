---
title: "dAuctionFeed"
description: "dAuctionFeed keeps your AxAuctions auction house alive by restocking it on a schedule with server-owned"
---

**dAuctionFeed** keeps your **AxAuctions** auction house alive by restocking it on a schedule with server-owned
listings — random items, random stack sizes, prices rolled inside rarity tiers you control, sold by a rotating
cast of fake traders. The money players spend on them is removed from the economy, so the feature fights
inflation instead of feeding it.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 🕓 **Daily restock** — at a fixed hour, or every N hours. 8–14 listings by default, rolled fresh each time so it
  never looks mechanical. See [Restocks](/plugins/dauctionfeed/features/restocks/).
- 🎲 **Rarity tiers** — five tiers decide how often an item shows up, how many get listed, and how far its price
  may drift. Fully editable, including adding your own. See [Tiers](/plugins/dauctionfeed/features/tiers/).
- 🛡️ **Price floor** — a seeded listing can **never** be cheaper than what the server pays for the same item
  through `/sell`. This is what stops players buying from the auction house and selling straight back for
  unlimited profit. See [The Price Floor](/plugins/dauctionfeed/features/price-floor/).
- 📈 **Market-aware pricing** — the feed reads the live auction house and prices just under the cheapest player
  listing, with guards so one troll listing at $1 cannot drag prices down. See
  [Market Pricing](/plugins/dauctionfeed/features/market-pricing/).
- 🧔 **Rotating sellers** — listings are attributed to `Blacksmith`, `Miner`, `Alchemist` and friends, so a restock
  reads like several traders showed up. See [Sellers & the Money Sink](/plugins/dauctionfeed/features/sellers-and-money-sink/).
- 🔥 **Money sink** — what buyers pay is drained rather than kept, so every purchase shrinks the money supply.
- 🗂️ **Ships with a catalogue** — on first start the pool is filled from a bundled 1.21 price list, so the whole
  vanilla catalogue is priced and ready. See [The Item Pool](/plugins/dauctionfeed/features/item-pool/).
- ✨ **Enchanted gear** — higher tiers roll random enchantments onto tools, weapons, armour and books, and price
  them for it.
- 🎯 **Purchase limits** — cap how many of the daily drop a single player may buy, so it is an event rather than
  a race.
- 📣 **Announcements** — chat broadcast, sound, title and a Discord webhook.
- 🔌 **Placeholders & metrics** — optional PlaceholderAPI placeholders and bStats.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21+** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | required (hard dependency) |
| AxAuctions | **required** — nothing is listed without it |
| Vault + economy plugin | **required** — for the money sink |
| dDonutWorth | optional — makes the price floor read `/sell` values live |
| PlaceholderAPI | optional — for the placeholders |

See [Requirements](/plugins/dauctionfeed/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/dauctionfeed/getting-started/installation/) · [Quick Start](/plugins/dauctionfeed/getting-started/quick-start/)
- [The Price Floor](/plugins/dauctionfeed/features/price-floor/) — read this one before changing prices
- [config.yml reference](/plugins/dauctionfeed/configuration/config/) · [tiers.yml reference](/plugins/dauctionfeed/configuration/tiers/)
- [Commands & Permissions](/plugins/dauctionfeed/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dauctionfeed/faq/)
