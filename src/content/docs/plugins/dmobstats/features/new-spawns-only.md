---
title: "New Spawns Only"
description: "dMobStats modifies a mob exactly once, at the moment it comes into existence. This page explains what that means in practice and where the edges are."
---

dMobStats modifies a mob exactly once, at the moment it comes into existence. This page explains what that means in practice and where the edges are.

## The rule

- A change you make (GUI, file edit, preset, reload) only affects mobs that spawn **after** it.
- A mob keeps the values it spawned with. They are stored on the mob itself, so they survive chunk unloads, server restarts and `/dms reload`.
- Mobs that existed before you installed dMobStats stay vanilla until they die or despawn.
- Persistent mobs (name-tagged, leashed, in a boat, farm animals) keep their original values for good. That is intended.
- There is no command to re-roll mobs that already exist.

## Why config changes cannot reach old mobs

| Part | When it is decided | Where it lives |
|---|---|---|
| Attributes, special properties, equipment, effects | at spawn | written into the mob (attribute base values are saved in the mob's own data) |
| Damage multipliers, XP, drops | **rolled at spawn** | stored on the mob; the death and damage handlers read that, never the current config |
| Profile revision, spawn reason, origin | at spawn | stored on the mob, shown by `/dms inspect` |

So if you raise the XP multiplier from 1.2 to 3.0, a zombie that spawned yesterday still pays x1.2 when it dies today.

## Which spawns are modified

A spawn is modified only when **all** of these hold:

1. `enabled: true` in `config.yml`.
2. The world is allowed by `worlds.mode` / `worlds.list`.
3. The spawn reason is in `spawn-reasons`.
4. The mob's file has `enabled: true`.
5. The mob has not been modified before.
6. It is not a test mob (`/dms spawn`) - test mobs are applied separately.

Spawners, spawn eggs, `/summon` (`COMMAND`), dispensers and plugin-spawned mobs (`CUSTOM`, for example MythicMobs) are **untouched** unless you add their reason to `spawn-reasons`. See [config.yml](/plugins/dmobstats/configuration/config/).

## Worldgen mobs (`CHUNK_GEN`)

Paper places the mobs of a freshly generated chunk straight into the chunk without announcing each as a normal spawn. dMobStats handles them this way:

- They are modified **only when the chunk is generated for the first time while the server is running** and `CHUNK_GEN` is in `spawn-reasons` (it is by default).
- Only never-ticked mobs of that brand-new chunk are touched. A mob that walked in from another chunk is not.
- A chunk that already existed is never touched, no matter how often it loads. So existing villages, monuments and animals in your world stay vanilla.
- If a mob file's `spawn.chance` cancels such a mob, it is removed; `spawn.replace` removes it and spawns the replacement.

With `CHUNK_GEN` removed from the list, worldgen mobs stay vanilla.

## Conversions

When one mob turns into another (zombie to drowned, villager to zombie villager, skeleton to stray, piglin to zombified piglin), the game creates a **new** entity with its own spawn reason (`DROWNED`, `INFECTION`, `FROZEN`, `PIGLIN_ZOMBIFIED`). The new mob is rolled from the **new type's** file, if that reason is in `spawn-reasons`; otherwise it is vanilla. The old mob's values are not carried over.

## Things that are not covered

- **Stacking plugins** (RoseStacker, WildStacker and similar) may merge mobs that carry different rolled values into one stack.
- **Damage taken** (`damage.taken-multiplier`) scales damage that comes from an entity (melee, projectiles). It does not scale fall, fire, lava, drowning or other environmental damage.
- **Zombie conversion time** is not configurable: the Paper API call starts a conversion instead of changing its timer.
- **Vanilla drops** with `MULTIPLY` or `CLEAR` never touch what the mob carries; see [Drops & XP](/plugins/dmobstats/features/drops-and-xp/).
- **XP `SET`** only pays when vanilla would pay XP; see [Drops & XP](/plugins/dmobstats/features/drops-and-xp/).
