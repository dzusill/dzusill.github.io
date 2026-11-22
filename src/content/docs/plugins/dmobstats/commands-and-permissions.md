---
title: "Commands & Permissions"
description: "Registered at runtime through DzusillCore; there is no commands: block in plugin.yml."
---

## Commands

Registered at runtime through DzusillCore; there is no `commands:` block in `plugin.yml`.

### /dmobstats

Alias: `/dms`. The root command has no permission of its own; every subcommand checks its own. With no argument it prints the usage list.

| Subcommand | Permission | Who | |
|---|---|---|---|
| `gui [mob]` | `dmobstats.gui` | players | Open the admin GUI, or one mob's menu. Editing needs `dmobstats.edit`; without it the GUI is read-only. |
| `info <mob>` | `dmobstats.gui` | everyone | Print the mob's base profile (no overrides) in chat. |
| `inspect` | `dmobstats.inspect` | players | Show the values rolled for the mob you look at, next to vanilla. |
| `spawn <mob> [world] [biome]` | `dmobstats.spawn` | players | Spawn a test mob at your feet, resolved as if in that world and biome. |
| `clear-test` | `dmobstats.spawn` | everyone | Remove all test mobs in loaded chunks. |
| `reload` | `dmobstats.reload` | everyone | Re-read config, GUI, messages and mob files. Existing mobs are not changed. |
| `validate` | `dmobstats.reload` | everyone | Lint `config.yml` and every mob file with line numbers. |
| `preset list` | `dmobstats.admin` | everyone | List `presets/*.yml`. |
| `preset apply <name> [confirm]` | `dmobstats.admin` | everyone | Show what a preset changes; with `confirm` (within 60 s) back up and apply it. |
| `debug` | `dmobstats.admin` | everyone | Toggle spawn debug logging until the next reload or restart. |

`<mob>` is a mob key such as `zombie` or `wither_skeleton` (tab-completes). `[world]` is a world name; `[biome]` is a biome key such as `minecraft:deep_dark`.

### Examples

```
/dms gui zombie
/dms info creeper
/dms spawn zombie world_nether minecraft:crimson_forest
/dms inspect
/dms clear-test
/dms validate
/dms reload
/dms preset apply hard
/dms preset apply hard confirm
/dms debug
```

## Permissions

| Node | Default | |
|---|---|---|
| `dmobstats.*` | op | Everything below. |
| `dmobstats.gui` | op | Open the admin GUI read-only; `/dms info`. |
| `dmobstats.edit` | op | Change values in the admin GUI. |
| `dmobstats.inspect` | op | `/dms inspect`. |
| `dmobstats.spawn` | op | `/dms spawn` and `/dms clear-test`. |
| `dmobstats.reload` | op | `/dms reload` and `/dms validate`. |
| `dmobstats.admin` | op | `/dms preset` and `/dms debug`. |

`dmobstats.edit` is separate from `dmobstats.gui` so you can give a helper a read-only view of every setting.

Everything is op-only by default; there are no player-facing commands or permissions.
