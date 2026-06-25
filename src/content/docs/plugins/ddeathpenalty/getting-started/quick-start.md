---
title: "Quick Start"
description: "On every death, dDeathPenalty resolves one penalty profile for the player and applies it. The profile is built by layering:"
---

## The idea

On every death, dDeathPenalty resolves **one penalty profile** for the player and applies it. The profile is built by layering:

```
default  →  worlds.<world>  →  groups.<group the player has>
```

Each layer **deep-merges** over the previous, so you only specify what changes. See [Penalty Profiles](/plugins/ddeathpenalty/features/penalty-profiles/).

## A common setup

```yaml
default:
  enabled: true
  money:
    enabled: true
    mode: PERCENT      # take a % of balance
    amount: 10.0       # 10%
    pvp-multiplier: 2.0  # double it on PvP deaths
  exp:
    enabled: true
    keep: false
    lose-levels: 5     # lose 5 levels
  items:
    mode: VANILLA      # normal drops

# nether is harsher
worlds:
  world_nether:
    money: { amount: 25.0 }

# VIPs lose less
groups:
  vip:
    money: { amount: 5.0 }
```

VIPs are matched by the `deathpenalty.group.vip` permission.

## Protect spawn / staff

- Give staff `deathpenalty.exempt` (they die but keep everything) or `deathpenalty.ignore` (the plugin does nothing for them).
- In a WorldGuard region: `/rg flag spawn death-penalty deny`.

See [Exemptions](/plugins/ddeathpenalty/features/exemptions/) and [WorldGuard Regions](/plugins/ddeathpenalty/features/worldguard/).

## Apply changes

```
/dp reload
```

Then check stats anytime:

```
/dp check          # your own
/dp check Steve    # someone else's
```
