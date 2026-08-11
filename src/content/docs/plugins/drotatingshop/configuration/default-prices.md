---
title: "Default Prices (1.21)"
description: "dRotatingShop ships with prices121.yml — a bundled price list of vanilla 1.21 items. It exists to seed your items.yml so the shop works out of the box, and…"
---

dRotatingShop ships with `prices_1_21.yml` — a bundled price list of vanilla 1.21 items. It exists to **seed** your [items.yml](/plugins/drotatingshop/configuration/items/) so the shop works out of the box, and is read by `/dshop seed`.

## When it's used

- **First start** — while `items.yml` has no items, every entry that maps to a real material on your server is migrated into `items.yml` (~1,200 items). This runs **once**; a flag in [data.yml](/plugins/drotatingshop/configuration/data/) (`seeded: true`) stops it re-running.
- **`/dshop seed`** — force-loads the list any time, **skipping ids that already exist**. Use this if the auto-seed was skipped (e.g. you'd already added a few items, so the pool wasn't empty), or to refresh after clearing the pool.

> The auto-seed only fires when the pool is **empty**, so it never floods a catalogue you've curated. To get the full list anyway, run `/dshop seed`.

## Format

A flat map keyed by material id:

```yaml
jungle_log:
  name: jungle log        # label -> title-cased into the item's display name
  category: logs          # informational only
  stack: 64               # informational only
  unit_buy: 8             # -> the item's price
  stack_buy: 512          # informational only
```

For each entry, the seeder writes an [items.yml](/plugins/drotatingshop/configuration/items/) item with:

| items.yml field | Source |
|---|---|
| `material` | the entry **key** (e.g. `jungle_log` → `JUNGLE_LOG`) |
| `display-name` | `name`, title-cased |
| `price` | `unit_buy` |
| `stock` | `seed.default-stock` from [config.yml](/plugins/drotatingshop/configuration/config/) (default `64`) |
| `per-player-limit` | `seed.default-per-player-limit` (default `8`) |

## Customising the list

Edit `prices_1_21.yml` (or replace it entirely) **before** the first seed — change prices, drop entries, or add your own. Any key that doesn't resolve to a material on your server version (e.g. potions, tipped arrows, or items from a newer release) is simply **skipped**, so a mismatched list won't error.

## Enchanted books

An id shaped `enchanted_book_<enchantment>_<level>` is seeded as an `ENCHANTED_BOOK` carrying that **stored** enchantment, so the 121 book entries in the bundled list become real, sellable, buyable books:

```yaml
# in prices_1_21.yml
enchanted_book_fortune_3:
  name: enchanted book (fortune iii)
  unit_buy: 1200
```

```yaml
# seeded into items.yml
enchanted_book_fortune_3:
  display-name: "Enchanted Book (Fortune Iii)"
  material: ENCHANTED_BOOK
  enchantments:
    fortune: 3
  price: 1200.0
```

The name is split at the **last** underscore, so `enchanted_book_bane_of_arthropods_5` reads as Bane of Arthropods V. It must be the enchantment's **registry** name — `binding_curse`, not `curse_of_binding` — or the entry is skipped like an unknown material.

> Books were skipped entirely before this, because `enchanted_book_fortune_3` matches no Bukkit material. If your `items.yml` was seeded on an older build, run `/dshop seed` to add them; existing ids are never overwritten.

After the first seed, the live pool is [items.yml](/plugins/drotatingshop/configuration/items/) — edit prices there. `prices_1_21.yml` is only consulted by the seed.

## Re-seed from scratch

To rebuild the pool from the price list only:

1. Stop the server.
2. Delete `data.yml` (clears the `seeded` flag) **and** empty `items.yml` (or delete it — it regenerates empty).
3. Start the server — it seeds fresh.

Or just run `/dshop seed` to **add** the catalogue on top of what you already have.
