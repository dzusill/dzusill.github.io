---
title: "Migrating from PerfShop"
description: "OberonShop reads PerfShop's shop files as they are. The config style, the field names, the per-character"
---

OberonShop reads PerfShop's shop files as they are. The config style, the field names, the per-character
hex gradients, the `take-command` / `give-command` escape hatch — all of it loads unchanged, because a
migration that made you rewrite eleven hand-tuned category files would not be a migration.

## The files

Copy `plugins/PerfShop/shops/*.yml` and `plugins/PerfShop/gui/*.yml` into `plugins/OberonShop/`, then
`/adminshop reload`.

Everything OberonShop adds is optional and additive: an item with no `stock`, `limit`, `sale`, `dynamic`,
`variants` or `custom-item` block behaves exactly as it did.

### Four things worth checking

| | |
|---|---|
| **Duplicated header blocks** | PerfShop's own `blocks.yml` repeated `back-button` / `rows` / `pages` / `icons` after a stray `yamlgui-title` key. YAML keeps the last one so it worked; delete the dead copy. |
| **Categories with no icon** | PerfShop shipped `gear` and `shards` fully priced with nothing in the menu opening them. `/adminshop doctor` reports this now. |
| **`take-command` items** | These land on a `command` currency, which cannot check a balance or refund. See [Currencies](/plugins/oberonshop/features/currencies/#command-currencies). |
| **The Discord link in `config.yml`** | PerfShop's header comment. Not yours. |

### Message keys that changed

| PerfShop | OberonShop |
|---|---|
| `shop.not-enough-shards` | `shop.not-enough-currency`, with `{currency}` |
| `shop.purchase-shards` | `shop.purchase-currency` |
| `actionbar.*-shards` | the same two renames |
| `shard-store.use-perfshards-balance` | gone — use `economy.currencies` instead |
| `stats` and `/perfshop stats` | gone — use the placeholders and `/adminshop doctor` |

## The purchase history

```
/adminshop import perfshop
```

Reads `plugins/PerfShop/perfshop.db` and reports what it would do. Nothing is written until you add
`--apply`. A report is written to `plugins/OberonShop/import-report.txt` either way.

```
/adminshop import perfshop --apply
```

### What comes across

| Filled | From |
|---|---|
| Popular items | How often and how much of each product was bought |
| Recently bought | Each player's most recent purchase of each product |
| Repeat last purchase | One row per player |

Without this the Popular and Recently Bought menus would be empty for weeks after switching.

### What does not, and why

**Stock and purchase limits are not imported, because PerfShop does not have those features.** There is
no stock table and no limit table in its database to read. Both start empty and fill from your own
trading.

**The purchase log itself is not copied.** OberonShop keeps counters, not a transaction history — that is
a deliberate scope boundary, not an omission.

**Balances are untouched.** They belong to Vault and ExcellentEconomy.

### Renamed products

The log records the item id as it was **at the time of sale**. An item renamed since then matches nothing
and its history would be dropped.

```yaml
import:
  product-aliases:
    shards/skeleton: shards/skeleton-spawner
    shards/creeper: shards/creeper-spawner
    shards/spider: shards/spider-spawner
    shards/iron_golem: shards/iron_golem-spawner
```

Those four ship because they are known renames — between them they are worth 264 purchases, most of that
category's activity.

**The report lists every log entry that matched nothing.** If it names products beyond the ones you
already have aliases for, those are renames you had forgotten about: add a line and run the import again.
It is idempotent — the aggregate is recomputed from the whole log each time — so re-running is safe and
produces the same result.

### Deleted categories

Entries pointing at categories that no longer exist are counted and skipped, not imported. Putting them in
would leave a player's Recently Bought full of items that open nothing. Re-create the category and import
again if you want the history back.

## Running both at once

Don't. Both register `/shop` by default and whichever loads last wins, with no warning. Take PerfShop
out, or change `command.shop` in `config.yml`.
