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
    item-xp-default: 0.5     # fallback XP for any item not listed below
    item-xp:
      DIRT: 0.1
      STONE: 0.5
      IRON_INGOT: 5
      GOLD_INGOT: 10
      DIAMOND: 25
      NETHERITE_INGOT: 100
      DRAGON_EGG: 500
```

**Every item is worth something.** Rarer, harder-to-obtain materials grant more XP, and anything not
listed under `item-xp` falls back to `item-xp-default` — so a deposit *always* grants XP. The bundled
config ships a full tiered catalog (100+ materials, from `0.1` filler to `500` for a dragon egg) that
you can retune freely. Set `item-xp-default: 0` if you'd rather reward only the explicitly listed
materials.

## The level curve

```yaml
curve:
  base-xp: 1000      # XP for level 1 → 2
  multiplier: 1.06   # each level costs 6% more than the last
```

Level *n → n+1* costs `base-xp × multiplier^(n-1)`. Leveling continues to `max-level` (50 or 100),
then a **prestige** is required to keep going. Each level-up notifies members. With the default curve,
reaching prestige 1 (level 100) is a long but reachable grind (~5.3M total XP) — raise `multiplier`
for a steeper climb.

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
    per-prestige: [1, 10, 20, 30, 40, 50]   # milestone at each prestige rank
```

The list is a set of **milestones** — one per prestige rank. Within a prestige the cap **grows with
level** toward the next milestone, so a brand-new faction isn't stuck at the floor: at prestige 0 it
starts at **1** claim and climbs to **10** by max level; prestige 1 then unlocks **10 → 20**, and so
on up to **50** at prestige 5. `bonuses.extra-claims-per-prestige` adds on top. See
[Territory & Claims](/plugins/dfactions/features/territory/).

## Placeholders

`%pvpindex_faction_level%`, `%pvpindex_faction_prestige%`, `%pvpindex_faction_xp%`,
`%pvpindex_faction_xp_required%`, `%pvpindex_faction_prestige_color%` — see
[Placeholders](/plugins/dfactions/placeholders/).
