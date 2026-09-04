---
title: "Tiers and loot"
description: "Every spawn picks one tier, weighted, and then rolls that tier's own loot. Tiers are defined in"
---

Every spawn picks one tier, weighted, and then rolls that tier's own loot. Tiers are defined in
`tiers.yml` and there is no fixed number of them — three is only what ships.

## How a tier is picked

```yaml
tiers:
  common:    { weight: 60, ... }
  rare:      { weight: 30, ... }
  legendary: { weight: 10, ... }
```

Weights are relative, not percentages, but the shipped set adds up to 100 so it reads as one. The
preview menu computes the real percentage from whatever you write, so it can never disagree with the
config.

A tier with `weight: 0` can never be rolled and is rejected at load with a warning rather than kept
as dead weight.

## What a tier controls

| Key | Effect |
|---|---|
| `weight` | Relative chance of this tier being picked |
| `display-name` | MiniMessage name used in chat, title, hologram and boss bar |
| `colour` | `#RRGGBB` for the beam and particles |
| `crate-material` | The block the crate lands as |
| `unlock-seconds` | Overrides the global countdown; `-1` keeps it |
| `sounds` | Per-event sound alias overrides, using names from `sounds.yml` |
| `commands` | Console commands run once for the first player to open the crate |
| `loot` | This tier's own table |

## How loot is rolled

```yaml
loot:
  guaranteed:
    - material: DIAMOND
      amount: "4-8"
  rolls: "2-3"
  pool:
    - material: NETHERITE_SCRAP
      amount: "1-2"
      weight: 6
    - material: ENCHANTED_GOLDEN_APPLE
      weight: 2
```

**Guaranteed** entries are always inside. Give one a `chance` between 0 and 1 to make it an
independent coin flip instead.

**Pool** entries are drawn `rolls` times, weighted by `weight`, **without replacement** — the same
sword never appears three times in one crate, however the dice fall. Asking for more rolls than the
pool holds simply gives the whole pool.

## A loot entry

| Key | Meaning |
|---|---|
| `material` | Required |
| `amount` | A number, or a `"4-12"` range (default 1) |
| `name` | MiniMessage display name |
| `lore` | MiniMessage lore lines |
| `enchantments` | `ENCHANT_NAME: level` |
| `chance` | 0.0–1.0, guaranteed entries only |
| `weight` | Pool entries only (default 1) |

Enchantments are applied unsafely on purpose: a supply-drop prize is allowed to exceed the vanilla
level cap, and refusing the enchantment would silently hand out a plain item instead.

## Custom gear

```yaml
- material: NETHERITE_SWORD
  weight: 6
  name: "<gradient:#C21807:#F11800><bold>Dropfall</bold></gradient>"
  lore:
    - "<#7E7E7E>Pulled from a legendary supply crate"
  enchantments:
    SHARPNESS: 5
    FIRE_ASPECT: 2
    MENDING: 1
```

Ranged amounts matter more than they look: two crates of the same tier that contain identical stacks
stop feeling like a roll after the third one.

## When something is wrong

A mistake costs exactly what it touches, never more. An unknown material costs that entry; a tier
with no usable loot costs that tier; the rest of the file still loads, and the console names the file
and the key. A server that refuses to run supply drops because of one typo is worse than one that
runs them with a line missing and says so.
