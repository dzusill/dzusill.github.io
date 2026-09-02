---
title: "The Item Pool"
description: "The pool is every item the feed is allowed to list. It lives in items.yml."
---

The pool is every item the feed is allowed to list. It lives in [items.yml](/plugins/dauctionfeed/configuration/items/).

## It ships empty and fills itself

`items.yml` ships with no items. On the **first start** it is filled from the bundled
[`prices_1_21.yml`](/plugins/dauctionfeed/configuration/default-prices/) — the same price list dRotatingShop uses — so the pool
covers the whole vanilla catalogue from minute one, priced and sorted into tiers.

```yaml
seed:
  enabled: true
  price-multiplier: 1.0
```

After that one-time fill **the file is yours**. Nothing overwrites it, and an item you delete stays deleted —
`items` is registered as an ignored section for config merging, so a restart cannot resurrect it.

Re-run the fill by hand any time:

```
/auctionfeed seed
```

Existing entries are never touched, so it is safe on a pool you have already tuned. Useful after a Minecraft
update adds items, or after you have pruned too aggressively.

## How seeded items get their tier

By price. The thresholds are checked from the top down and the first one the price meets wins:

```yaml
seed:
  auto-tier:
    legendary: 5000
    epic: 1000
    rare: 250
    uncommon: 50
    common: 0
```

The order in the file does not matter — they are sorted highest-first before use.

## Excluding things from the fill

The vanilla catalogue includes plenty no server wants the auction house selling.

```yaml
seed:
  exclude:
    - "*_spawn_egg"
    - "command_block"
    - "bedrock"
    - "spawner"
```

`*` matches any run of characters. A pattern without one must match the whole id, so `bedrock` does not also
exclude `bedrock_stairs`.

This only affects the **fill**. Excluding something later does not remove it from a pool it is already in — use
`/auctionfeed removeitem` for that.

## Entry shapes

### Vanilla item

```yaml
diamond:
  display-name: "<aqua>Diamond"
  material: DIAMOND
  price: 250.0
  tier: rare
  weight: 1.5
```

`price` is the price of **one** item. The listing price is this times the amount the tier rolls, times the tier's
multiplier.

### With fixed enchantments

Always applied, on top of anything the tier rolls.

```yaml
sharp_sword:
  display-name: "<aqua>Sharpened Sword"
  material: DIAMOND_SWORD
  enchantments:
    sharpness: 5
    unbreaking: 3
  price: 2500.0
  tier: epic
```

An `enchantments` block on `ENCHANTED_BOOK` becomes a **stored** enchantment, which is what makes the book show
and behave as enchanted.

### Potions and tipped arrows

```yaml
potion_of_healing_2:
  display-name: "Potion Of Healing II"
  material: POTION
  potion-type: strong_healing
  price: 600.0
  tier: rare
```

`potion-type` is the base potion. Without it a `POTION` is just a Water Bottle. Any Minecraft potion id works:
`healing`, `strong_healing` (the II potion), `long_poison` (the extended one), `water`, `awkward`. The same field
drives `SPLASH_POTION`, `LINGERING_POTION` and `TIPPED_ARROW`.

### Anything else

Items no material line can describe — a custom item from another plugin, a named tool, a shulker box with
contents — are stored as a Base64 blob:

```yaml
legendary_axe:
  display-name: "<gold>Legendary Axe"
  nbt-base64: "H4sIAA…"
  price: 15000.0
  tier: legendary
```

`/auctionfeed additem` writes this shape for you.

## Weights

```yaml
weight: 1.5
```

Relative chance of being picked **from inside its tier**. `2.0` is twice as likely as `1.0`.

`weight: 0.0` keeps the entry but never lists it. Prefer this over deleting when you still want the item's price
available — the [market comparison](/plugins/dauctionfeed/features/market-pricing/) and the [price floor](/plugins/dauctionfeed/features/price-floor/) both read it.

## Managing the pool

| Command | What it does |
|---|---|
| `/auctionfeed list [tier] [page]` | Page through the pool, optionally filtered to one tier |
| `/auctionfeed additem <tier> [price]` | Add the item you are holding |
| `/auctionfeed removeitem <id>` | Delete an entry |
| `/auctionfeed seed` | Re-run the price-list fill |

Hand edits need a [`/auctionfeed reload`](/plugins/dauctionfeed/configuration/reloading/).

## Items that cannot be built

An entry naming a material, potion or enchantment this Minecraft version does not have is skipped with a warning
at load, once, rather than on every restock:

```
[dAuctionFeed] Skipping pool item 'copper_golem': unknown or missing material 'COPPER_GOLEM'.
[dAuctionFeed] Item pool: skipped 3 unusable entr(ies) — see the warnings above.
```

The rest of the pool is unaffected.
