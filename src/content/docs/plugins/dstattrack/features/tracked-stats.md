---
title: "Tracked Stats"
description: "dStattrack tracks four categories, organised into three groups. An item belongs to exactly one group, decided by its material, and tracks every category in…"
---

dStattrack tracks four **categories**, organised into three **groups**. An item belongs to exactly one group, decided by its material, and tracks every category in that group.

## Groups, items & categories

| Group | Items (default) | Categories tracked | Triggered by |
|---|---|---|---|
| **kills** | sword, bow, crossbow, trident, **mace** | `Playerkills`, `Mobkills` | `EntityDeathEvent` |
| **breakBlocks** | pickaxe, axe, shovel, **hoe**, **shears** | `Block` | `BlockBreakEvent` |
| **fishing** | fishing_rod | `Fishing` | `PlayerFishEvent` (a fish is caught) |

Item matching is **substring-based** on the material name, so every variant is covered automatically — `sword` matches `WOODEN_SWORD` … `NETHERITE_SWORD`, `hoe` matches `DIAMOND_HOE`, and so on. Configure the lists under `stattrackItems` and `items` in [config.yml](/plugins/dstattrack/configuration/config/).

## How counting works

When a player **kills**, **breaks a block**, or **catches a fish**, dStattrack looks at the item in their **main hand**:

1. If it's air or has no stattrack, nothing happens.
2. Otherwise the matching counter is incremented by 1 and the item's lore is rebuilt.

So the player must be **holding the stattracked item at the moment of the action** for it to count.

### Kills: players vs mobs

On `EntityDeathEvent`, dStattrack checks the dead entity's type:

- **Player** → `Playerkills` is incremented.
- **Anything else** → `Mobkills` is incremented.

This means new mobs added by Mojang are tracked with no config change — any non-player death counts as a mob kill.

### Blocks

Any block broken while holding a stattracked tool counts toward `Block`. New block types need no config. The event is `ignoreCancelled`, so a break cancelled by protection (WorldGuard, etc.) does **not** count.

### Fishing

Only the `CAUGHT_FISH` state counts — reeling in nothing, or hooking an entity, does not increment `Fishing`.

## Categories reference

| Category | Group | Lore placeholder | Raw NBT tag |
|---|---|---|---|
| `Playerkills` | kills | `%playerkills%` | `Playerkills` |
| `Mobkills` | kills | `%mobkills%` | `Mobkills` |
| `Block` | breakBlocks | `%block%` | `Block` |
| `Fishing` | fishing | `%fishing%` | `Fishing` |

Category names are accepted case-insensitively by `/dstattrack set` (you can type `mobkills` or `Mobkills`).
