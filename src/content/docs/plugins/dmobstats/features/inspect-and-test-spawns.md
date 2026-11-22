---
title: "Inspect & Test Spawns"
description: "Look at a mob and run /dms inspect (permission dmobstats.inspect, players only). The range is inspect.range in gui.yml (default 16 blocks)."
---

## /dms inspect

Look at a mob and run `/dms inspect` (permission `dmobstats.inspect`, players only). The range is `inspect.range` in `gui.yml` (default 16 blocks).

```
[dMobStats] Zombie spawned by NATURAL, revision 3fa9c1d2
  attributes.max_health: 25.4 (vanilla 20)
  attributes.attack_damage: 4.1 (vanilla 3)
  damage.dealt-multiplier: 1.12 (vanilla 1)
```

It shows:

- the **spawn reason** and the **profile revision** (a short hash of the profile the mob was rolled from);
- every value that was **rolled for this mob** next to the vanilla value;
- `(profile changed since)` when the current profile of that mob type/world/biome no longer has the same revision, so you can see an old mob was rolled with older settings;
- `(test mob)` for mobs made with `/dms spawn`.

If dMobStats never modified the mob (it existed before install, its file is disabled, its spawn reason is not listed, ...) you get "was not modified by dMobStats". That is also the quickest way to check why a mob looks vanilla; combine it with [`/dms debug`](/plugins/dmobstats/features/validate-and-debug/).

## /dms spawn

```
/dms spawn <mob> [world] [biome]
```

Spawns one mob at your feet with the **current profile**, resolved as if it spawned in the given world and biome (default: where you stand). Players only, permission `dmobstats.spawn`.

```
/dms spawn zombie
/dms spawn zombie world_nether
/dms spawn zombie world_nether minecraft:crimson_forest
```

Test mobs:

- are rolled even while the mob's file has `enabled: false`, which is the point of a test;
- are marked, so the normal spawn handler never touches them;
- include whatever vanilla spawns with them (a spider jockey's skeleton, a chicken jockey's chicken, passengers and vehicles);
- use the same stored values as real mobs, so you can check damage, XP and drops by killing them.

The mob menu's **Test spawn** button does the same for the scope you are editing.

## /dms clear-test

Removes every test mob in loaded chunks and reports how many. Permission `dmobstats.spawn`; works from the console.

## /dms info

`/dms info <mob>` (permission `dmobstats.gui`, also from the console) prints the mob's **base** profile (no world or biome override): enabled state, profile revision, every configured value and section, spawn chance and replacements. It also works while the file is disabled and says so.
