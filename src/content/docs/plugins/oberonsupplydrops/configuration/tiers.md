---
title: "tiers.yml"
description: "Rarity tiers and their loot tables. See Tiers and loot for how the"
---

Rarity tiers and their loot tables. See [Tiers and loot](/plugins/oberonsupplydrops/features/tiers-and-loot/) for how the
rolls work; this page is the key reference.

`tiers` is never default-merged. A tier you delete stays deleted, and the shipped examples are not
written back on the next start.

## Tier keys

```yaml
tiers:
  <id>:
    weight: 30
    display-name: "<#00A3FB><bold>Rare"
    colour: "#00A3FB"
    crate-material: BARREL
    unlock-seconds: -1
    sounds:
      land: land_legendary
    commands:
      - "eco give {player} 500"
    loot:
      guaranteed: [ ]
      rolls: "2-3"
      pool: [ ]
```

| Key | Default | Meaning |
|---|---|---|
| `weight` | `1` | Relative chance of being picked; `0` rejects the tier |
| `display-name` | the id | MiniMessage name in chat, title, hologram and boss bar |
| `colour` | `#FFFFFF` | `#RRGGBB` for the beam and particles |
| `crate-material` | `crate.default-material` | Must be a block |
| `unlock-seconds` | `-1` | `-1` keeps the global countdown |
| `sounds` | none | Event name → alias from `sounds.yml` |
| `commands` | none | Run as console for the first opener; `{player}` is their name |

Overridable sound events: `announce`, `descent`, `land`, `unlock`, `open`, `loot`, `close`. An event
with no override uses the alias of the same name.

## Loot entry keys

| Key | Default | Meaning |
|---|---|---|
| `material` | required | The item |
| `amount` | `1` | A number, or a `"4-12"` range |
| `name` | none | MiniMessage display name |
| `lore` | none | MiniMessage lore lines |
| `enchantments` | none | `ENCHANT_NAME: level`, applied unsafely |
| `chance` | `1.0` | Guaranteed entries only — an independent 0–1 gate |
| `weight` | `1` | Pool entries only — relative draw chance |

## Rolls

`loot.rolls` is how many pool entries a crate gets: a number, or a `"2-3"` range. It is clamped to the
pool size at load, so the preview menu's arithmetic stays honest.

## Validation

Every problem is reported to the console with the tier and key, and then skipped:

- an unknown material → that entry is dropped
- a `crate-material` that is not a block → falls back, warning logged
- a tier with no usable loot → that tier is dropped
- `weight: 0` → dropped, since it could never be rolled

The rest of the file still loads.
