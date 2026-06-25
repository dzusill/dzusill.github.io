---
title: "Commands & Permissions"
description: "/dhomeadmin has aliases /ahomes and /homesadmin. Commands are registered at runtime by DzusillCore — no plugin.yml entries."
---

## Commands

| Command | Permission | Description |
|---|---|---|
| `/home [name]` | `dhomegui.use` | Teleport to a home (default home if no name). |
| `/homes` | `dhomegui.use` | Open the homes GUI. |
| `/sethome <name>` | `dhomegui.sethome` | Create a home at your location. |
| `/delhome <name>` | `dhomegui.delhome` | Delete one of your homes. |
| `/back` | `dhomegui.back` | Return to your previous location. |
| `/dhomeadmin <…>` | `dhomegui.admin` | Admin tools (reload / players / view / tp / delete / deleteall / count / import / backup). |
| `/adminhomes <player>` | `dhomegui.admin` | Open the admin view of a player's homes. |

`/dhomeadmin` has aliases `/ahomes` and `/homesadmin`. Commands are registered at runtime by DzusillCore — no `plugin.yml` entries.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `dhomegui.use` | everyone | Open the GUI and teleport. |
| `dhomegui.sethome` | everyone | Create homes. |
| `dhomegui.sethome.overwrite` | everyone | Update an existing home's location. |
| `dhomegui.delhome` | everyone | Delete your own homes. |
| `dhomegui.back` | everyone | Use `/back`. |
| `dhomegui.homes.<n>` | — | Home-limit tier (highest `<n>` wins, floored at `DefaultLimit`). |
| `dhomegui.homes.unlimited` | op | Bypass the home limit. |
| `dhomegui.world.nether` | everyone | Set homes in the nether. |
| `dhomegui.world.end` | everyone | Set homes in the end. |
| `dhomegui.bypass.cooldown` | op | Skip the teleport cooldown. |
| `dhomegui.bypass.cost` | op | Skip all economy charges. |
| `dhomegui.bypass.worlds` | op | Ignore world restrictions. |
| `dhomegui.bypass.warmup` | op | Skip the teleport warmup. |
| `dhomegui.admin` | op | All admin commands + manage any player's homes. |

### Suggested setup

```
# default players: 3 homes
/lp group default permission set dhomegui.homes.3 true

# VIP: 10 homes, no warmup wait
/lp group vip permission set dhomegui.homes.10 true
/lp group vip permission set dhomegui.bypass.warmup true

# staff
/lp group staff permission set dhomegui.admin true
```

> **Limit gotcha:** `dhomegui.sethome` lets a player *run* `/sethome`, but their count is capped at `Settings.SetHome.DefaultLimit` (default 1) until you grant a higher `dhomegui.homes.<n>` tier (or `unlimited`). See [Home Limits](/plugins/dhomegui/features/home-limits/).
