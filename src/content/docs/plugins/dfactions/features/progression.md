---
title: "Leveling & Prestige"
description: "dFactions adds a progression axis on top of power. Factions earn XP by depositing resources,"
---

dFactions adds a **progression axis** on top of power. Factions earn **XP** by depositing resources,
climb **levels**, and eventually **prestige** for permanent perks and a recolored tag. Progression —
not power — controls how much land a faction can hold.

> **Two independent axes:** power → raid vulnerability; level/prestige → progression + claim
> capacity. Both matter.

## Earning XP — the Resource Chest

```
/f resources
```

Opens a deposit GUI. Drop resource items in; each grants XP by material, raising the faction's XP.

```yaml
factions:
  leveling:
    enabled: true
    max-level: 100
    resource-chest: { title: "Faction Resources", rows: 3 }
    item-xp:
      STONE: 1
      OAK_LOG: 1
      IRON_INGOT: 5
      GOLD_INGOT: 10
      DIAMOND: 25
      NETHERITE_INGOT: 100
```

Add any Bukkit `Material` to `item-xp` to make it depositable. Unlisted items grant no XP.

## The level curve

```yaml
curve:
  base-xp: 1000      # XP for level 1 → 2
  multiplier: 1.15   # each level costs 15% more than the last
```

Level *n → n+1* costs `base-xp × multiplier^(n-1)`. Leveling continues to `max-level` (50 or 100),
then a **prestige** is required to keep going. Each level-up notifies members.

## Prestige

```
/f level      # show level, XP and XP-to-next
/f prestige   # prestige up (requires max level)
```

Prestige **resets level to 1** in exchange for a higher prestige rank, a recolored tag and permanent
bonuses.

```yaml
factions:
  prestige:
    max: 5
    colors: ["<white>", "<green>", "<aqua>", "<light_purple>", "<gold>", "<red>"]
    bonuses:
      extra-claims-per-prestige: 0
      xp-mult-per-prestige: 0.0
      interest-boost-per-prestige: 0.0
```

Bonuses scale with rank — e.g. `xp-mult-per-prestige: 0.05` gives +5% XP at prestige 1, +10% at
prestige 2, and so on.

## Prestige-gated claim capacity

```yaml
factions:
  claims:
    per-prestige: [1, 2, 4, 6, 8, 10]   # index = prestige rank
```

Higher prestige = more simultaneous claims. `bonuses.extra-claims-per-prestige` adds on top. See
[Territory & Claims](/plugins/dfactions/features/territory/).

## Placeholders

`%pvpindex_faction_level%`, `%pvpindex_faction_prestige%`, `%pvpindex_faction_xp%`,
`%pvpindex_faction_xp_required%`, `%pvpindex_faction_prestige_color%` — see
[Placeholders](/plugins/dfactions/placeholders/).
