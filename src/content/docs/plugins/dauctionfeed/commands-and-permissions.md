---
title: "Commands & Permissions"
description: "One command tree, /auctionfeed, aliases /af and /afeed."
---

One command tree, `/auctionfeed`, aliases **`/af`** and **`/afeed`**.

There are no player commands — players interact with the auction house itself.

## Commands

| Command | What it does |
|---|---|
| `/auctionfeed` | Prints usage |
| `/auctionfeed restock` | Run a restock now, and move the schedule on |
| `/auctionfeed preview [count]` | Roll a batch and print it **without listing anything** |
| `/auctionfeed clear` | Remove every listing this plugin owns from the auction house |
| `/auctionfeed status` | The plugin's whole state in one screen |
| `/auctionfeed list [tier] [page]` | Page through the item pool |
| `/auctionfeed additem <tier> [price]` | Add the item you are holding to the pool |
| `/auctionfeed removeitem <id>` | Delete a pool entry |
| `/auctionfeed seed` | Re-run the price-list fill; never overwrites existing entries |
| `/auctionfeed reload` | Reload every config and rewire everything derived from one |

Aliases: `restock` also answers to `now` and `rotate`; `preview` to `dryrun`; `status` to `info`; `removeitem` to
`delitem`.

## Permissions

| Node | Default | What it grants |
|---|---|---|
| `dauctionfeed.admin` | op | The whole `/auctionfeed` tree |
| `dauctionfeed.limit.bypass` | false | Ignore the per-restock [purchase limit](/plugins/dauctionfeed/features/purchase-limits/) |

`dauctionfeed.limit.bypass` is off for everyone including operators — give it to staff accounts deliberately.

---

## The three worth knowing

### `preview`

```
/auctionfeed preview 20
```

Runs the identical code path a real restock does and stops before the insert, so what you see is what you would
get. Lines are tagged when the [price floor](/plugins/dauctionfeed/features/price-floor/) or the
[market](/plugins/dauctionfeed/features/market-pricing/) moved them:

```
Preview — 11 listings this plugin would create right now:
 • 48x Iron Ingot [Common] for 1,920
 • 16x Diamond [Rare] for 4,300 (market-adjusted)
 • 32x Redstone [Common] for 640 (raised by price floor)
```

This is the right way to tune tiers — repeatable, and it never pollutes the live auction house with test listings
you then have to clear.

### `status`

Written for the support question this plugin will actually generate: *"it stopped putting things in the auction
house."* Everything that can cause that is on one screen with its current value.

```
dAuctionFeed status
 • AxAuctions: attached (currency 'vault')
 • Pool: 1183 item(s) across 5 populated tier(s)
 • Tiers: common, uncommon, rare, epic, legendary
 • Live seeded listings: 11
 • Next restock: 7h 12m (2026-09-02 04:00 Europe/Bratislava)
 • Restock size: 8-14
 • Price floor: on at 1.5x, source dDonutWorth
 • Market pricing: on undercutting by 5.0%
 • Sale: off
 • Purchase limit: 3 per player per restock
 • Payout: SINK
 • Sunk this session: 1,284,300
 • Today: 11/50 listing(s), value 84,320
```

### `restock`

Runs a restock now **and moves the schedule on**, exactly as the timer would. A forced restock that left the clock
alone would fire again minutes later.

When it produces nothing it tells you why:

```
[Auctions] Nothing was listed. the item pool is empty — run /auctionfeed seed or add items.
[Auctions] Nothing was listed. today's cap in daily.max-items has already been reached.
[Auctions] Nothing was listed. no tier in tiers.yml has a weight above zero.
```

## Registration

Commands are registered at runtime through DzusillCore's command registry, so there is no `commands:` block in
`plugin.yml` and nothing to conflict with another plugin's `plugin.yml`.
