---
title: "config.yml"
description: "The bundled config.yml with its real defaults. Every key falls back to the default shown here if it is missing."
---

The bundled `config.yml` with its real defaults. Every key falls back to the default shown here if it is missing.

```yaml
# Master switch. false = the plugin touches no spawn at all.
enabled: true

# Spawn reasons that get modified. The default is everything the world spawns by itself.
# Add SPAWNER, TRIAL_SPAWNER, SPAWNER_EGG, BREEDING, BUILD_WITHER... to modify those too.
# Names this server version does not know are skipped with a warning.
# CUSTOM (other plugins, e.g. MythicMobs) is deliberately not in the default list.
spawn-reasons:
  - NATURAL
  - CHUNK_GEN
  - PATROL
  - RAID
  - REINFORCEMENTS
  - JOCKEY
  - MOUNT
  - VILLAGE_DEFENSE
  - VILLAGE_INVASION
  - SLIME_SPLIT
  - LIGHTNING
  - DROWNED
  - INFECTION
  - FROZEN
  - PIGLIN_ZOMBIFIED
  - SILVERFISH_BLOCK
  - ENDER_PEARL
  - NETHER_PORTAL

# Worlds where mobs are modified.
worlds:
  # World names for WHITELIST / BLACKLIST.
  list: []
  # ALL | WHITELIST | BLACKLIST
  mode: ALL

gui:
  # Click = small step, shift-click = large step. A property can override these in the catalog.
  step:
    small: 1.0
    large: 10.0
  # Ask for confirmation before saving a value above a property's dangerous threshold.
  confirm-dangerous: true

backups:
  # How many backups of a mob file to keep in backups/ before the oldest is deleted.
  keep: 10

# Log every modified spawn to the console.
debug: false
# With debug on, also log every spawn that was left alone and why (very chatty).
debug-skipped: false
```

## Keys

| Key | Default | |
|---|---|---|
| `enabled` | `true` | Master switch. `false` and the plugin modifies no spawn (existing mobs keep their stored values and their effect). |
| `spawn-reasons` | the 18 reasons above | Which spawns are modified. Names are Bukkit's `CreatureSpawnEvent.SpawnReason` values, case-insensitive. A name the server version does not know is skipped with a warning. |
| `worlds.mode` | `ALL` | `ALL`, `WHITELIST` or `BLACKLIST`. Anything else reads as `ALL`. |
| `worlds.list` | `[]` | World names for `WHITELIST` / `BLACKLIST`, case-insensitive. |
| `gui.step.small` / `large` | `1.0` / `10.0` | Click steps for number controls whose property has no step of its own. |
| `gui.confirm-dangerous` | `true` | Ask for confirmation before saving a value past a dangerous threshold. |
| `backups.keep` | `10` | Backups kept per mob. `0` disables backups. |
| `debug` | `false` | Log every modified spawn. `/dms debug` toggles it until the next reload. |
| `debug-skipped` | `false` | With `debug`: also log skipped spawns and why. |

## spawn-reasons

What the default reasons mean:

| Reason | Spawn |
|---|---|
| `NATURAL` | normal world spawning |
| `CHUNK_GEN` | mobs of a brand-new chunk (see [New Spawns Only](/plugins/dmobstats/features/new-spawns-only/#worldgen-mobs-chunk_gen)) |
| `PATROL`, `RAID` | pillager patrols and raids |
| `REINFORCEMENTS` | zombie reinforcements |
| `JOCKEY`, `MOUNT` | jockeys and the mobs they ride |
| `VILLAGE_DEFENSE`, `VILLAGE_INVASION` | iron golems and zombie sieges |
| `SLIME_SPLIT` | slimes and magma cubes splitting |
| `LIGHTNING` | lightning-spawned mobs (skeleton trap horses) |
| `DROWNED`, `INFECTION`, `FROZEN`, `PIGLIN_ZOMBIFIED` | conversions (drowned, zombie villager, stray, zombified piglin) |
| `SILVERFISH_BLOCK`, `ENDER_PEARL`, `NETHER_PORTAL` | silverfish from blocks, endermites, portal pigmen |

Add these to modify more: `SPAWNER`, `TRIAL_SPAWNER`, `SPAWNER_EGG`, `COMMAND` (`/summon`), `BREEDING`, `BUILD_WITHER`, `BUILD_IRONGOLEM`, `BUILD_SNOWMAN`, `DISPENSE_EGG`, `EGG`, `CUSTOM` (other plugins). The default list does not contain `CUSTOM`, on purpose: plugins such as MythicMobs spawn their own configured mobs that way.

A mob created by a `spawn.replace` rule is always modified (from its own file), even if its spawn reason is not in the list, and is never replaced again.

## Worlds

```yaml
worlds:
  mode: WHITELIST
  list: [world, world_nether]
```

`WHITELIST` modifies only the listed worlds, `BLACKLIST` modifies every world except them. This is the **global** filter. Per-world *values* are [overrides](/plugins/dmobstats/features/overrides/).

Changes to `config.yml` are picked up by `/dms reload`; see [Reloading](/plugins/dmobstats/configuration/reloading/).
