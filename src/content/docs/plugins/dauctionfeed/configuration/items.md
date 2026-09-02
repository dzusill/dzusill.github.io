---
title: "items.yml"
description: "The item pool — every item the feed is allowed to list. Conceptual overview in"
---

The item pool — every item the feed is allowed to list. Conceptual overview in
[The Item Pool](/plugins/dauctionfeed/features/item-pool/).

Ships **empty**. On the first start it is filled from [`prices_1_21.yml`](/plugins/dauctionfeed/configuration/default-prices/). After that the file
is yours: nothing overwrites it, and an item you delete stays deleted.

## Entry format

```yaml
items:
  diamond:
    display-name: "<aqua>Diamond"
    material: DIAMOND
    price: 250.0
    tier: rare
    weight: 1.5
```

| Key | Required | What it does |
|---|---|---|
| `price` | **yes** | The price of **one** item. The listing price is this × amount × tier multiplier. |
| `tier` | **yes** | Must name a tier from [tiers.yml](/plugins/dauctionfeed/configuration/tiers/). An unknown tier falls back rather than dropping the item. |
| `material` | one of these two | The Bukkit material name. |
| `nbt-base64` | one of these two | A serialized `ItemStack`, for anything a material line cannot describe. |
| `display-name` | no | MiniMessage name. Omit to keep the vanilla name. |
| `weight` | no (`1.0`) | Relative chance of being picked **inside its tier**. `0.0` = never listed. |
| `enchantments` | no | Enchantments always applied, on top of anything the tier rolls. |
| `potion-type` | no | Base potion for `POTION` / `SPLASH_POTION` / `LINGERING_POTION` / `TIPPED_ARROW`. |

## Examples

### Vanilla

```yaml
  iron_ingot:
    display-name: "Iron Ingot"
    material: IRON_INGOT
    price: 40.0
    tier: common
```

### Fixed enchantments

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

An `enchantments` block on `ENCHANTED_BOOK` becomes a **stored** enchantment — which is what makes the book show
and behave as enchanted, rather than looking blank:

```yaml
  enchanted_book_fortune_3:
    display-name: "Enchanted Book (Fortune III)"
    material: ENCHANTED_BOOK
    enchantments:
      fortune: 3
    price: 1200.0
    tier: rare
```

### Potions and tipped arrows

```yaml
  potion_of_healing_2:
    display-name: "Potion Of Healing II"
    material: POTION
    potion-type: strong_healing
    price: 600.0
    tier: rare
```

Without `potion-type` a `POTION` is just a Water Bottle. Any Minecraft potion id works: `healing`,
`strong_healing` (the II potion), `long_poison` (the extended one), `water`, `awkward`.

### Custom / NBT

```yaml
  legendary_axe:
    display-name: "<gold>Legendary Axe"
    nbt-base64: "H4sIAA…"
    price: 15000.0
    tier: legendary
```

Written for you by `/auctionfeed additem`.

## Blocking an item without deleting it

```yaml
  bedrock:
    material: BEDROCK
    price: 999999.0
    tier: legendary
    weight: 0.0
```

The entry stays, so its price is still available to the [market comparison](/plugins/dauctionfeed/features/market-pricing/) and the
[price floor](/plugins/dauctionfeed/features/price-floor/) — both of which deleting would lose.

## Commands

| Command | What it does |
|---|---|
| `/auctionfeed list [tier] [page]` | Page through the pool |
| `/auctionfeed additem <tier> [price]` | Add the item you are holding |
| `/auctionfeed removeitem <id>` | Delete an entry |
| `/auctionfeed seed` | Re-run the price-list fill; never overwrites existing entries |

Hand edits need a [`/auctionfeed reload`](/plugins/dauctionfeed/configuration/reloading/).

## Entries that cannot be built

Skipped with a warning at load — once, not per restock:

```
[dAuctionFeed] Skipping pool item 'copper_golem': unknown or missing material 'COPPER_GOLEM'.
[dAuctionFeed] Skipping pool item 'old_custom': nbt-base64 could not be read (written by a different server version?).
```

The rest of the pool is unaffected.
