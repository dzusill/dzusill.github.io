---
title: "Backups & Change Log"
description: "Before a mob file is overwritten, by a GUI save, a Reset to vanilla or a preset apply, a copy is written to:"
---

## backups/

Before a mob file is overwritten, by a GUI save, a **Reset to vanilla** or a preset apply, a copy is written to:

```
plugins/dMobStats/backups/<mob>/<yyyyMMdd-HHmmss-SSS>.yml
```

Only the newest `backups.keep` copies per mob are kept (default `10`, in [config.yml](/plugins/dmobstats/configuration/config/)); older ones are deleted. `backups.keep: 0` turns backups off. If a backup cannot be written, the save is **not** done, so the original is never overwritten without a copy.

To restore, stop editing, copy a backup over `mobs/<mob>.yml` and run `/dms reload`.

## logs/changes.log

An append-only audit log of every change made **from inside the game** (GUI saves and preset applies). One line per changed key:

```
[2026-11-22 14:03:11] Steve | mobs/zombie.yml | attributes.max_health: vanilla -> {min=22, max=28}
```

Preset applies also log one event line for the preset as a whole. Hand edits of the files are not logged.

## Races

GUI saves, preset applies and reloads share one lock, so they never interleave. A save also re-checks that the file still has the content the admin opened; if somebody else changed it, the save is refused ("changed by someone else, reopen") instead of overwriting.
