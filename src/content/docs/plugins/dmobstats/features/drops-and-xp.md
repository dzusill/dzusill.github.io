---
title: "Drops & XP"
description: "Everything here is rolled when the mob spawns and stored on the mob. Changing the config later never changes the drops or XP of mobs that already exist."
---

```yaml
drops:
  xp: { mode: MULTIPLY, min: 1.2, max: 1.5 }     # vanilla | 2.0 | { mode: SET, min: 10, max: 20 }
  vanilla-drops: KEEP                            # KEEP | CLEAR | { mode: MULTIPLY, min: 1.0, max: 2.0 }
  extra:
    - { item: EMERALD, chance: 0.05, amount: { min: 1, max: 2 }, looting-bonus: 0.01, player-kill-only: true }
```

Everything here is **rolled when the mob spawns and stored on the mob**. Changing the config later never changes the drops or XP of mobs that already exist.

## XP

| Form | Effect |
|---|---|
| `vanilla` (or missing) | Untouched. |
| `2.0` or `{ mode: MULTIPLY, min: 1.0, max: 1.5 }` | Vanilla XP times a rolled factor, `0`-`100`. |
| `{ mode: SET, min: 5, max: 10 }` | A rolled whole amount of XP, `0`-`100000`. |

`SET` only pays when vanilla would pay XP: vanilla XP above zero, or the mob was killed by a player, and the `doMobLoot` gamerule is on. It never makes XP appear where vanilla pays none, for example for a mob that dies to the environment and gives no XP in vanilla, or when `doMobLoot` is off.

## Vanilla drops

| Value | Effect |
|---|---|
| `KEEP` | Untouched (default). |
| `CLEAR` | Loot-table drops are removed. |
| `{ mode: MULTIPLY, min: 1.0, max: 2.0 }` | Loot stacks are scaled by a rolled factor, `0`-`64`. A fractional result is rounded up or down at random, so `1.5` gives 1 or 2. A plain `MULTIPLY` without a factor is ignored with a warning (`KEEP`). |

**What the mob carries is never touched.** `CLEAR` and `MULTIPLY` leave alone everything the mob was wearing or holding (so equipment `drop-chance` keeps working) and everything in its own inventory: a horse's saddle and armour, a donkey, mule or llama's chest and its contents, a piglin's or allay's inventory. Nothing the mob carried is deleted or duplicated; only the loot-table part of a drop is changed. A drop is protected only up to the amount the mob really carried.

## Extra drops

| Key | Default | |
|---|---|---|
| `item` / `base64` | required | Same item syntax as [equipment](/plugins/dmobstats/features/equipment-and-effects/#item-syntax), including `enchants`, `name`, `lore`. |
| `chance` | `1.0` | Chance the entry drops. |
| `amount` | `1` | Number or `{ min, max }`, up to `1024`. Split into normal stacks. |
| `looting-bonus` | `0.0` | Added to `chance` per level of Looting on the killer's main hand. |
| `player-kill-only` | `false` | Only drops when a player killed the mob. |

Extra drops are stored on the mob as a compact snapshot, so there are limits: at most **64 entries** and about **16 000 characters** per mob. Entries beyond the limit (big Base64 items count heavily) are dropped with a warning.

## In the GUI

**Drops & XP** has the XP mode (vanilla, multiply, set) with min and max, the vanilla-drops mode (keep, clear, multiply) with min and max, and the extra-drop list. Add an extra drop by holding an item on your cursor and clicking **Add an extra drop**, or shift-click the item in your inventory. A copy is stored; your item stays with you. Click an entry to edit chance, amount, looting bonus and player-kill-only; Ctrl+Q removes it. Save writes the file.
