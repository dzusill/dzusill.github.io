---
title: "config.yml"
description: "The main configuration. Every value can be changed live and applied with"
---

The main configuration. Every value can be changed live and applied with
[`/auctionfeed reload`](/plugins/dauctionfeed/configuration/reloading/).

## `auctions`

```yaml
auctions:
  currency: "vault"
```

| Key | Default | What it does |
|---|---|---|
| `currency` | `vault` | Which AxAuctions currency seeded listings are priced in. Must match an entry in **AxAuctions' own** currencies config. The startup check verifies it resolves. |

## `restock`

```yaml
restock:
  mode: DAILY_AT
  hour: 4
  minute: 0
  timezone: ""
  interval-hours: 24
  items:
    min: 8
    max: 14
  catch-up-on-startup: true
  clear-previous: true
  avoid-duplicates-across-batches: true
  avoid-duplicates-within-batch: true
```

| Key | Default | What it does |
|---|---|---|
| `mode` | `DAILY_AT` | `DAILY_AT` = once a day at a wall-clock time. `INTERVAL` = every N hours from the last restock. |
| `hour` / `minute` | `4` / `0` | The daily time, 24h clock. `DAILY_AT` only. |
| `timezone` | *(blank)* | IANA zone the hour is read in. Blank or unrecognised = the machine's own zone. |
| `interval-hours` | `24` | Hours between restocks. `INTERVAL` only. |
| `items.min` / `items.max` | `8` / `14` | Batch size range, rolled fresh each restock. Same value for both = fixed size. |
| `catch-up-on-startup` | `true` | Run a restock missed while the server was down. `false` skips it. |
| `clear-previous` | `true` | Delete unsold listings from the previous batch before the new one. |
| `avoid-duplicates-across-batches` | `true` | Do not list an item that still has an unsold seeded listing. Only relevant when `clear-previous` is `false`. |
| `avoid-duplicates-within-batch` | `true` | Never roll the same item twice in one restock. |

See [Restocks](/plugins/dauctionfeed/features/restocks/).

## `daily`

```yaml
daily:
  max-items: 50
  max-total-value: -1
```

| Key | Default | What it does |
|---|---|---|
| `max-items` | `50` | Most listings that may be created per calendar day, across every restock. `-1` = uncapped. |
| `max-total-value` | `-1` | Most total listed value per calendar day. `-1` = uncapped. The restock stops early and logs it. |

## `seller`

```yaml
seller:
  names: [ "Blacksmith", "Miner", "Alchemist", "Farmer", "Fisherman", "Wanderer" ]
  payout: SINK
  payout-account: ""
  sink-sweep-minutes: 10
```

| Key | Default | What it does |
|---|---|---|
| `names` | six traders | Fake seller names, picked at random per listing. |
| `payout` | `SINK` | `SINK` removes the money from the economy, `KEEP` leaves it on the fake account, `ACCOUNT` moves it to a real one. |
| `payout-account` | *(blank)* | The real account for `payout: ACCOUNT`. |
| `sink-sweep-minutes` | `10` | Minutes between safety sweeps of the seller accounts. `0` disables. |

See [Sellers & the Money Sink](/plugins/dauctionfeed/features/sellers-and-money-sink/).

## `pricing`

```yaml
pricing:
  round-to: 10
  minimum-price: 1.0
  sale:
    enabled: false
    percent: -30
    tag: "<red><bold>SALE"
```

| Key | Default | What it does |
|---|---|---|
| `round-to` | `10` | Round final prices to a multiple of this. `0` disables. Never rounds below the floor. |
| `minimum-price` | `1.0` | Rolls below this are discarded and re-rolled. |
| `sale.enabled` | `false` | Whether a blanket adjustment is running. |
| `sale.percent` | `-30` | Signed. `-30` = 30% off, `20` = 20% markup. |
| `sale.tag` | `<red><bold>SALE` | Appended to the restock broadcast while the sale is on. |

### `pricing.floor`

```yaml
pricing:
  floor:
    enabled: true
    multiplier: 1.5
    source: DDONUTWORTH
    assumed-sell-ratio: 0.35
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | **Leave this on.** See [The Price Floor](/plugins/dauctionfeed/features/price-floor/). |
| `multiplier` | `1.5` | How far above the sell value a listing must sit. Do not go below 1.2. Clamped to at least 1.0. |
| `source` | `DDONUTWORTH` | `DDONUTWORTH` reads `/sell` values live; `POOL` derives them from the pool price. |
| `assumed-sell-ratio` | `0.35` | Fraction of the pool price `/sell` is assumed to pay. Used by `POOL`, and as the fallback. |

### `pricing.market`

```yaml
pricing:
  market:
    enabled: true
    undercut-percent: 5.0
    sane-range:
      min-ratio: 0.25
      max-ratio: 4.0
    max-adjust-percent: 40.0
    ignore-own-listings: true
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | Price against live player listings. |
| `undercut-percent` | `5.0` | How far under the cheapest player listing to sit. |
| `sane-range.min-ratio` | `0.25` | Lowest fraction of the pool price a competing listing may be to count. |
| `sane-range.max-ratio` | `4.0` | Highest multiple of the pool price a competing listing may be to count. |
| `max-adjust-percent` | `40.0` | The most the market step may move a price, either direction. |
| `ignore-own-listings` | `true` | Never treat this plugin's listings as competition. |

See [Market Pricing](/plugins/dauctionfeed/features/market-pricing/).

## `purchase-limit`

```yaml
purchase-limit:
  enabled: true
  per-restock: 3
  permission-bypass: true
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether the cap applies. |
| `per-restock` | `3` | Seeded listings one player may buy per restock. `-1` = unlimited. |
| `permission-bypass` | `true` | Let `dauctionfeed.limit.bypass` ignore the cap. |

See [Purchase Limits](/plugins/dauctionfeed/features/purchase-limits/).

## `marker`

```yaml
marker:
  mode: LORE
  lore:
    - ""
    - "<gold>✦ <yellow>Daily Offer</yellow> <gold>✦"
  strip-on-purchase: true
```

| Key | Default | What it does |
|---|---|---|
| `mode` | `LORE` | `LORE` adds the lines below; `NONE` marks nothing. |
| `lore` | two lines | MiniMessage lines added to the listed item. |
| `strip-on-purchase` | `true` | Remove the marker once the buyer has the item, so it stacks normally. |

See [Item Markers](/plugins/dauctionfeed/features/item-markers/).

## `announce`

See [Announcements](/plugins/dauctionfeed/features/announcements/) for the full breakdown.

## `seed`

```yaml
seed:
  enabled: true
  price-multiplier: 1.0
  auto-tier:
    legendary: 5000
    epic: 1000
    rare: 250
    uncommon: 50
    common: 0
  exclude:
    - "*_spawn_egg"
    - "bedrock"
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | Fill `items.yml` from the bundled price list on the first start. |
| `price-multiplier` | `1.0` | Applied to every price taken from the price list. |
| `auto-tier` | five bands | Unit price → tier. Checked highest first; the first threshold the price meets wins. |
| `exclude` | a short list | Item-id patterns never written into the pool. `*` matches any run of characters. |

See [The Item Pool](/plugins/dauctionfeed/features/item-pool/).

## `advanced`

```yaml
advanced:
  log-bridge-details: false
  startup-delay-seconds: 10
  check-interval-seconds: 30
  verbose-logging: false
```

| Key | Default | What it does |
|---|---|---|
| `log-bridge-details` | `false` | Print every AxAuctions member the startup check resolved. Useful when reporting a compatibility break. |
| `startup-delay-seconds` | `10` | Wait after the server finishes loading before attaching to AxAuctions, which initialises its database asynchronously. Raise it if the startup check fails on a slow server. |
| `check-interval-seconds` | `30` | How often the scheduler checks whether a restock is due. |
| `verbose-logging` | `false` | Print one line per created listing. |
