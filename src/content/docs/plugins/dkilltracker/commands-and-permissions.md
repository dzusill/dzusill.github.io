---
title: "Commands & Permissions"
description: "Registered at runtime through DzusillCore — there is no commands: block in plugin.yml, and nothing to declare anywhere else."
---

## Commands

Registered at runtime through DzusillCore — there is no `commands:` block in `plugin.yml`, and nothing to declare anywhere else.

### `/killtracker`

Aliases: `/kt`, `/kills`. Run with no arguments to see the usage list, filtered to what you have permission for.

| Subcommand | Permission | |
|---|---|---|
| `info [player]` | `killtracker.info` | Kill stats. Another player needs `killtracker.info.others`. |
| `set <player> <amount>` | `killtracker.admin` | Overwrite the counted kills. Recomputes the milestone watermark. Does **not** run milestone commands. Works offline. |
| `add <player> <amount>` | `killtracker.admin` | Add kills and **fire** every milestone crossed. Target must be online. |
| `reset <player>` | `killtracker.admin` | Wipe the record — kills, lifetime, deaths and the milestone watermark. Works offline. |
| `reload` | `killtracker.admin` | Re-read `config.yml` and `messages.yml`. |

### `/killtop`

Aliases: `/ktop`, `/topkills`. Permission `killtracker.top`. The leaderboard — see [Leaderboard](/plugins/dkilltracker/features/leaderboard/).

Only registered when `Leaderboard.Enabled: true`.

## set vs add

The one distinction worth internalising:

| | Milestone commands run? | Watermark | Offline target |
|---|---|---|---|
| `set` | ❌ No | Recomputed to match the new count | ✅ |
| `add` | ✅ Yes, for every tier crossed | Advanced normally | ❌ online only |

Use `set` to fix a number. Use `add` to actually reward someone.

`add` requires an online player because the milestone commands and messages are addressed to a live player — `%player%` has to resolve, and a `give` command needs somebody to give to.

## Permissions

### Command access

| Node | Default | |
|---|---|---|
| `killtracker.info` | everyone | `/killtracker info` on yourself |
| `killtracker.info.others` | op | `/killtracker info <player>` |
| `killtracker.top` | everyone | `/killtop` |
| `killtracker.admin` | op | `set`, `add`, `reset`, `reload` |

### Bypasses

| Node | Default | |
|---|---|---|
| `killtracker.bypass.antifarm` | op | Killer skips every anti-farm gate. |
| `killtracker.bypass.sameip` | nobody | Kills count despite sharing an IP with the victim. |
| `killtracker.bypass.victim` | nobody | Killing this player never counts, for anyone. |

### Umbrella

`killtracker.*` grants everything **except** `killtracker.bypass.victim`.

That exclusion is deliberate. If `bypass.victim` were included, every op would silently become worthless to kill — which nobody expects and which is very confusing to debug. Grant it explicitly to the staff or NPC accounts that need it.

> `killtracker.bypass.antifarm` defaulting to op is worth a second look on a server where staff play normally. It makes their kills exempt from the same-victim cooldown, which is right for testing and wrong for a fair leaderboard. Revoke it from your regular staff group.

## Recommended LuckPerms setup

```
# everyone
lp group default permission set killtracker.info true
lp group default permission set killtracker.top true

# staff who play
lp group mod permission set killtracker.info.others true
lp group mod permission set killtracker.bypass.antifarm false

# admins
lp group admin permission set killtracker.admin true

# staff who get hunted at spawn
lp user Steve permission set killtracker.bypass.victim true
```
