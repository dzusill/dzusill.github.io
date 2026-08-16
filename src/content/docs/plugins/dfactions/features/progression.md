---
title: "Leveling & Prestige"
description: "dFactions adds a progression axis. Factions earn XP by depositing resources,"
---

dFactions adds a **progression axis**. Factions earn **XP** by depositing resources,
climb **levels**, and eventually **prestige** for permanent perks and a recolored tag. Progression
controls how much land a faction can hold.

> **Level/prestige** drives progression and claim capacity.

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
    item-xp-default: 0.5
    item-xp:
      STONE: 1
      OAK_LOG: 1
      IRON_INGOT: 5
      GOLD_INGOT: 10
      DIAMOND: 25
      NETHERITE_INGOT: 100
```

Add any Bukkit `Material` to `item-xp` to make it depositable. Items not listed fall back to
`item-xp-default` (set it to `0` for list-only rewards).

### Enchantment bonus

Enchanted items are worth more. On top of an item's base `item-xp`, each enchantment adds
`value × enchant-level`, so a Sharpness V + Unbreaking III sword deposits for far more than a plain
one. Enchanted books count their **stored** enchantments, so a valuable book is worth depositing
even when `ENCHANTED_BOOK` has no base value.

```yaml
factions:
  leveling:
    enchant-xp:
      enabled: true
      default: 2.0          # per-level value for any enchant not listed below
      values:               # keyed by the modern namespaced enchant key
        sharpness: 3.0
        unbreaking: 2.0
        looting: 10.0
        fortune: 15.0
        silk_touch: 15.0
        mending: 25.0
```

Per item: `bonus = Σ (value × level)` over its enchantments, added to the base `item-xp`, then
multiplied by the stack amount. A diamond sword with base `10`, Sharpness V (`3.0×5`) and Unbreaking
III (`2.0×3`) deposits for `10 + 15 + 6 = 31` XP. Set `enchant-xp.enabled: false` to ignore
enchantments.

## The level curve

```yaml
curve:
  type: POLYNOMIAL     # POLYNOMIAL | LINEAR | EXPONENTIAL
  base-xp: 50          # XP for level 1 → 2
  exponent: 1.1        # POLYNOMIAL growth power
  step: 250            # LINEAR increment per level
  multiplier: 1.06     # EXPONENTIAL per-level factor
  max-xp-per-level: 0  # cap on any single level; 0 = uncapped
  levels: {}           # explicit per-level overrides, e.g. 99: 5000
xp-multiplier: 1.0     # global scale on every XP gain
```

`curve.type` decides the shape of the climb, and it matters far more than the numbers:

| Type | Cost of level *n → n+1* | Character |
|---|---|---|
| `POLYNOMIAL` (default) | `base-xp × n^exponent` | Steady growth, no runaway tail |
| `LINEAR` | `base-xp + step × (n − 1)` | Every level costs a fixed amount more |
| `EXPONENTIAL` | `base-xp × multiplier^(n − 1)` | Compounding — brutal end-game |

An exponential curve compounds, so its last handful of levels can cost more than every earlier level
combined. With the old defaults (`base-xp: 1000`, `multiplier: 1.06`) level 99 → 100 alone cost
**~302,000 XP** and the whole climb was **~5.3M** — effectively unreachable. The shipped defaults
cost **~373,000 XP** for the same 100 levels, about **14× cheaper**, with level 99 → 100 at ~7,800.

`max-xp-per-level` caps what any single level may cost, and `curve.levels` overrides individual
levels outright (the key is the level being left). `xp-multiplier` scales **every** XP gain —
deposits, mining, war kills, control zones — so you can retune the whole climb with one number.

Leveling continues to `max-level` (50 or 100), then a **prestige** is required to keep going. Each
level-up notifies members. Levels are stored rather than derived, so changing the curve never demotes
an existing faction.

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
    # xp-mult-per-prestige defaults to 0.25: prestige 1 earns +25% XP, prestige 4 +100%. Without it
    # every prestige costs exactly what the first did, making the later ranks the real wall.
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

`%dfactions_faction_level%`, `%dfactions_faction_prestige%`, `%dfactions_faction_xp%`,
`%dfactions_faction_xp_required%`, `%dfactions_faction_prestige_color%` — see
[Placeholders](/plugins/dfactions/placeholders/).
