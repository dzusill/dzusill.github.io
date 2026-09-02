---
title: "Installation"
description: "Drop these into plugins/ first:"
---

## 1. Install the dependencies

Drop these into `plugins/` first:

- **DzusillCore** 1.14.0 or newer
- **AxAuctions**
- **Vault** and an economy plugin

## 2. Install dAuctionFeed

Drop `dAuctionFeed.jar` into `plugins/` and restart the server. A `/reload` is not enough — dAuctionFeed attaches
to AxAuctions during startup.

## 3. What happens on the first start

Three things, in this order:

1. **The item pool is filled.** `items.yml` ships empty and is filled from the bundled 1.21 price list — the whole
   vanilla catalogue, priced, each item sorted into a tier by its price. After this one-time fill the file is
   yours: nothing overwrites it, and an item you delete stays deleted.
2. **A restock runs immediately.** On a brand-new install the plugin does not wait for the configured hour — you
   should be able to open the auction house and see it working while you are still looking at it.
3. **The schedule starts.** From then on it restocks at `restock.hour`.

You will see something like this in the console:

```
[dAuctionFeed] Attached to AxAuctions (currency 'vault').
[dAuctionFeed] First start: seeded 1183 item(s) into the pool from prices_1_21.yml. Edit items.yml to tune it.
[dAuctionFeed] Item pool loaded: 1183 item(s) across 5 tier(s).
[dAuctionFeed] Price floor attached to dDonutWorth — sell values are read live.
[dAuctionFeed] First start — running an initial restock so the auction house is not empty.
```

## 4. Check it

```
/auctionfeed status
```

Everything that can stop a restock is on that one screen with its current value. The line to look at first is
**AxAuctions** — it should say `attached`.

## Files it creates

| File | What it is |
|---|---|
| [`config.yml`](/plugins/dauctionfeed/configuration/config/) | Schedule, seller, pricing, floor, market, limits, announcements |
| [`tiers.yml`](/plugins/dauctionfeed/configuration/tiers/) | The rarity tiers |
| [`items.yml`](/plugins/dauctionfeed/configuration/items/) | The item pool |
| [`messages.yml`](/plugins/dauctionfeed/configuration/messages/) | Every message players see |
| [`prices_1_21.yml`](/plugins/dauctionfeed/configuration/default-prices/) | The bundled price list used for the one-time fill |
| [`data.yml`](/plugins/dauctionfeed/configuration/data/) | Runtime state — **not** a config file |

## Updating

Replace the jar and restart. Your configs are kept; new keys are merged in with their comments, and anything you
deleted from `items.yml` stays deleted.
