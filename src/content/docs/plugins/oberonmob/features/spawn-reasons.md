---
title: "Spawn Reasons"
description: "Which spawns a toggle is allowed to cancel — and why leaving spawners, eggs, breeding and cured villagers out of the list is the setting that protects everybody else's builds."
---

Every mob spawn carries a reason. `Spawn-Reasons` lists the ones a toggle may cancel.

```yaml
    Spawn-Reasons:
      - NATURAL
      - REINFORCEMENTS
      - PATROL
      - RAID
      - VILLAGE_INVASION
```

**This is the most important safety setting in the plugin.** Get it wrong and a personal preference starts undoing other people's work.

## What ships, and why

| Reason | Is | In the list |
|---|---|---|
| `NATURAL` | the normal dark-place spawning | ✅ |
| `REINFORCEMENTS` | zombies calling friends when they hit a player | ✅ |
| `PATROL` | pillager patrols wandering in | ✅ |
| `RAID` | a raid wave | ✅ |
| `VILLAGE_INVASION` | zombie siege on a village | ✅ |

Everything else is left out, and the reasons why are worth spelling out:

| Reason | Is | Why it's out |
|---|---|---|
| `SPAWNER` | a mob spawner block | **Somebody's farm.** Cancelling this is how a personal toggle empties another player's grinder |
| `SPAWNER_EGG` | a spawn egg | Deliberate, by definition |
| `BREEDING` | two animals breeding | Deliberate |
| `CURED` | a zombie villager finishing curing | **This is the one the client asked about.** A player with mobs off walking past a curing setup must not interrupt it |
| `INFECTION` | a villager turning into a zombie villager | The first half of the same process |
| `BUILD_IRONGOLEM` | a player-built golem | They built it on purpose |
| `BUILD_SNOWMAN` / `BUILD_WITHER` | same | Same |
| `VILLAGE_DEFENSE` | a village spawning its own golem | Cancelling this breaks villages |
| `DISPENSE_EGG` | a dispenser firing a spawn egg | Somebody's redstone |
| `CUSTOM` | another plugin spawning it | Another plugin's business, not this one's |
| `EGG` | a thrown chicken egg | Harmless |

## Changing the list

Add reasons if you know what you are doing. The names are Bukkit's own — the full set is in the [Paper Javadocs](https://jd.papermc.io/) under `CreatureSpawnEvent.SpawnReason`.

An unknown name is skipped with a console warning rather than failing the toggle:

```
[OberonMob] Unknown spawn reason 'NATURAL_SPAWN' — skipping it.
```

That is deliberate: `SpawnReason` gains constants with new Minecraft versions, and a config written for a newer server must not break an older one.

> Adding `SPAWNER` is the single fastest way to get complaints. It looks reasonable — "why do spawners still work when I turned mobs off?" — right up until somebody with the toggle on walks past a public grinder and it stops producing for everyone using it.

## An empty list

Leaving `Spawn-Reasons` out entirely uses the default list above. Setting it to an empty list means the toggle cancels nothing at all — which is a valid way to disable a toggle without removing it, though `Enabled: false` is clearer.

## Hide mode ignores this

`Spawn-Reasons` only applies to `CANCEL_SPAWN`. In `HIDE_ENTITY` the mob always spawns however it was going to, and is simply not shown to the player — so there is no spawn to have a reason about, and no way for the toggle to affect anybody else's build regardless.
