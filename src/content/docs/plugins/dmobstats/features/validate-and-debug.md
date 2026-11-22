---
title: "Validate & Debug"
description: "Permission dmobstats.reload. Works from the console. It lints config.yml and every mobs/.yml straight from disk (off the main thread) and prints the…"
---

## /dms validate

```
/dms validate
```

Permission `dmobstats.reload`. Works from the console. It lints `config.yml` and **every** `mobs/*.yml` straight from disk (off the main thread) and prints the problems grouped by file, each with the key path and the line:

```
[dMobStats] Checking config.yml and every mob file...
mobs/zombie.yml (2)
   line 6   attributes.max_health: 5000.0 is above the hard limit 1024.0, clamped
   line 11  equipment.main-hand.items[0].item: 'IRON_SWRD' is not an item on this server, skipped
[dMobStats] Checked 82 files, 2 problems.
```

It never touches the live profiles, so you can run it before `/dms reload`.

What it reports (and what happens to the value when the file is loaded):

| Problem | Result |
|---|---|
| Value past a hard limit | clamped to the limit |
| `min` greater than `max` | swapped |
| Unknown key, or a property the mob does not have on this server | ignored |
| Not a number / not a valid value | treated as vanilla |
| Unknown spawn reason in `config.yml` | skipped (some reasons only exist on newer versions) |
| Unknown item, effect or replacement mob | that entry is skipped |
| Invalid YAML | the whole mob stays vanilla |

Overrides are checked as well, reported as `overrides.worlds.<world> > <key>` or `overrides.biomes.<biome> > <key>`. A problem an override only inherits from the base is reported once, for the base.

The same checks run on every `/dms reload` and at startup; the problems are logged to the console.

## /dms debug

```
/dms debug
```

Permission `dmobstats.admin`. Toggles spawn logging **at runtime**, until the next reload or restart. To keep it on, set `debug: true` in `config.yml`.

With debug on, every modified spawn is logged:

```
[dMobStats] [debug] modified zombie in world (minecraft:plains), reason NATURAL, rev 3fa9c1d2: {attributes.max_health=25.4, ...}
```

and so are cancelled (`spawn.chance`) and replaced (`spawn.replace`) spawns.

### debug-skipped

Set `debug-skipped: true` as well (it needs `debug`) to also log every spawn that was **left alone**, with the reason. This is very chatty; turn it on briefly to find out why a mob looks vanilla.

| Skip reason |
|---|
| `enabled: false in config.yml` |
| not a mob |
| test mob |
| already modified |
| world excluded by `worlds` in config.yml |
| spawn reason not in `spawn-reasons` |
| no mob file loaded |
| `enabled: false` in its mob file |

`debug-skipped` is read from `config.yml` only; `/dms debug` toggles `debug`.
