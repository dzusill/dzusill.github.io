---
title: "How It Works"
description: "Why per-player mob toggles need two strategies, what each one costs, and why nothing that already exists is ever removed."
---

## The problem

Bukkit has one event for a mob appearing, and one answer: cancel it, or don't. There is no "cancel it for Alice but not for Bob". So "per-player mob toggles" is not one feature — it is two, with different trade-offs.

OberonMob ships both. Set `Mode` on each toggle.

## `CANCEL_SPAWN`

The mob never spawns.

**Cost:** none once running. A cancelled spawn is a spawn the server never has to tick, path or track.

**Catch:** the effect is shared. Something has to decide what happens when one player nearby wants mobs and another doesn't.

By default:

> The spawn is stopped only when **nobody in range still wants mobs**.

Stand next to a player with mobs off and your spawns keep happening. That is the fix for the old script's behaviour, where cancelling as soon as *any* nearby player had them off let one person turn a shared area into a dead zone for everybody in it.

If you want that behaviour back:

```yaml
    Cancel-When-Others-Nearby: true
```

## `HIDE_ENTITY`

The mob spawns and is hidden from the player who asked.

**Cost:** a periodic sweep, and only while somebody actually has a hide-mode toggle off. Nothing runs otherwise.

**Catch:** the mob is still physically there. It can be walked into. It only stops hunting the player because `Prevent-Targeting: true` cancels its targeting.

**Upside:** genuinely per player. Nobody else is affected, ever. No shared dead zones, no arguments about whose preference wins.

### What the sweep is for

Hiding at spawn only covers mobs that appear near a player. It does not cover a player walking towards mobs that already exist. The sweep — `Hide-Mode.Refresh-Ticks`, default 40 ticks (2 seconds) — re-checks what each player with a toggle off should be able to see.

Switching the toggle back on shows everything that was hidden, immediately.

## Nothing that already exists is ever removed

This is worth stating plainly because it is the thing people worry about:

**Neither mode despawns, kills or removes a mob that is already in the world.**

`CANCEL_SPAWN` only ever acts on a spawn as it happens. `HIDE_ENTITY` only changes what one player's client is sent. Walking past somebody's zombie villager trading hall with mobs off leaves every villager exactly where it was.

## Nothing deliberate is touched either

`Spawn-Reasons` decides which spawns may be cancelled, and the default list is natural spawning only:

```yaml
    Spawn-Reasons:
      - NATURAL
      - REINFORCEMENTS
      - PATROL
      - RAID
      - VILLAGE_INVASION
```

Left out on purpose: `SPAWNER`, `SPAWNER_EGG`, `BREEDING`, `CURED`, `BUILD_IRONGOLEM`, `BUILD_SNOWMAN`, `DISPENSE_EGG`, `CUSTOM`. Every one of those is somebody's deliberate work — a farm, a cured villager, a golem they built. A personal preference has no business undoing it.

See [Spawn reasons](/plugins/oberonmob/features/spawn-reasons/) for the full list and what each one means.

## Why it is cheap

The old script looped over every player within 256 blocks of **every mob spawn on the server**. On a busy server that adds up fast.

OberonMob stores the state the way the check reads it: one small set per toggle, holding only the players who turned it **off**. On a normal server that set is empty, so the whole check is:

1. Does this toggle cover this entity type and spawn reason? — one lookup in a flat set
2. Does anybody have it off? — `isEmpty()`

Only when somebody actually has it off are nearby players looked up at all, and that lookup is chunk-local rather than a walk over the whole player list.
