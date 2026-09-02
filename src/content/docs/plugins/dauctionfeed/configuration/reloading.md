---
title: "Reloading"
description: "Re-reads every config file and rebuilds everything derived from one."
---

```
/auctionfeed reload
```

Re-reads **every** config file and rebuilds everything derived from one.

## What it actually does

Reloading the files alone would leave the parsed tiers, the enchantment rules, the price engine and the restock
schedule still holding the old values — a config change would appear to do nothing until the next restart. So the
reload also:

- rebuilds the [tier ladder](/plugins/dauctionfeed/configuration/tiers/) from `tiers.yml`
- rebuilds the [item pool](/plugins/dauctionfeed/configuration/items/) from `items.yml`
- rebuilds the enchantment rules and the price engine, including re-attaching the
  [price floor](/plugins/dauctionfeed/features/price-floor/) to dDonutWorth
- restarts the [money sink](/plugins/dauctionfeed/features/sellers-and-money-sink/) sweep
- recomputes the next restock time from the current schedule settings

## It also re-tests AxAuctions

If the plugin failed to attach at startup — AxAuctions was slow, its database was still initialising, the currency
name was wrong — `/auctionfeed reload` retries. **No restart needed.**

```
[dAuctionFeed] Attached to AxAuctions on reload (currency 'vault').
```

Fix `auctions.currency`, reload, done.

## What it does not touch

- **Listings already in the auction house.** A price change affects the *next* restock, not what is already up.
  Use `/auctionfeed clear` then `/auctionfeed restock` to redo the current batch.
- **`data.yml`.** Batch ids and purchase counters survive.

## After editing

| Changed | Then |
|---|---|
| `config.yml` | `/auctionfeed reload` |
| `tiers.yml` | `/auctionfeed reload`, then `/auctionfeed preview` to see the effect |
| `items.yml` | `/auctionfeed reload` |
| `messages.yml` | `/auctionfeed reload` |

Commands that edit the pool (`additem`, `removeitem`, `seed`) rebuild it themselves — no reload needed.

## When a reload fails

```
[Auctions] Reload failed, check the console for details.
```

The console carries the cause, usually a YAML syntax error. The plugin keeps running on the previously loaded
values rather than half-applying the broken file.
