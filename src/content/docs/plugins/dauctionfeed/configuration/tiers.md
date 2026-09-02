---
title: "tiers.yml"
description: "The rarity bands, and the shared enchantment rules. Conceptual overview in Tiers."
---

The rarity bands, and the shared enchantment rules. Conceptual overview in [Tiers](/plugins/dauctionfeed/features/tiers/).

## Shape

```yaml
fallback-tier: common

tiers:
  rare:
    display-name: "<aqua>Rare"
    weight: 18
    price-multiplier:
      min: 0.90
      max: 1.40
    amount:
      min: 4
      max: 32
      snap-to: 4
    enchant:
      chance: 0.30
      count: { min: 1, max: 2 }
      level-percent: { min: 0.5, max: 0.85 }

enchantments:
  allowed: [ sharpness, efficiency, … ]
  blocked: [ vanishing_curse, binding_curse ]
  per-level-bonus: 0.35
```

## Per tier

| Key | Default | What it does |
|---|---|---|
| `display-name` | the tier id | MiniMessage label used in previews and broadcasts. |
| `weight` | `1.0` | Relative chance of this tier being picked. `0` switches it off without deleting it. |
| `price-multiplier.min` / `.max` | `1.0` | Band the per-listing price multiplier is rolled from. |
| `amount.min` / `.max` | `1` | How many of the item to list. |
| `amount.snap-to` | `1` | Round the rolled amount to a multiple of this, clamped back inside the range. `1` allows any amount. |
| `enchant.chance` | `0.0` | 0–1 probability that an **enchantable** item is enchanted. |
| `enchant.count.min` / `.max` | `1` | How many enchantments to apply. |
| `enchant.level-percent.min` / `.max` | `0.5` / `1.0` | Fraction of each enchantment's own maximum level. Always at least level 1. |

Tier names are free-form. `fallback-tier` names where items land when their `tier` no longer exists; if that is
missing too, the first configured tier is used.

## `enchantments`

Global, shared by every tier.

| Key | Default | What it does |
|---|---|---|
| `allowed` | ~35 vanilla ids | Enchantments that may be rolled. **Empty list = anything the item accepts.** |
| `blocked` | the two curses | Never rolled, applied after the allow list. |
| `per-level-bonus` | `0.35` | Price bonus per total enchantment level: `price × (1 + bonus × levels)`. |

Ids are vanilla names without the `minecraft:` prefix. An id this Minecraft version does not have is skipped
silently at load — the shipped list is validated by the build's tests, but a hand-added typo will simply never
roll.

## Notes that save time later

**Enchanted gear is always listed singly.** Enchanted items do not stack, so a rolled enchantment overrides the
tier's amount. A tier with a high `enchant.chance` and a large `amount` range will mostly produce single items.

**An item's own stack size is the real ceiling.** A potion in a 16–64 tier is still listed one at a time, because
a listing is one `ItemStack`.

**Conflicting enchantments never combine.** Candidates are checked against everything already picked, so a roll
cannot produce a Silk Touch *and* Fortune pickaxe.

**A `level-percent` of 0.5 on a max-1 enchantment is still level 1.** Fractions round up — rounding down would
give level 0, which is not an enchantment at all.

## After editing

```
/auctionfeed reload
/auctionfeed preview 20
```
