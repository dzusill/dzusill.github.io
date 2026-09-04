---
title: "Commands"
description: "One root command with subcommands. Aliases are configurable in config.yml, so a server that already"
---

One root command with subcommands. Aliases are configurable in `config.yml`, so a server that already
has something on `/drops` can move it without a rebuild:

```yaml
commands:
  aliases:
    - "drops"
```

Commands are registered at runtime through OberonCore's command registry, so `plugin.yml` carries no
`commands:` block and there is nothing to merge on an update.

## Players

| Command | Does |
|---|---|
| `/supplydrop` | Lists the subcommands you have access to |
| `/supplydrop preview` | Every tier, its real chance, and the loot it can hold |
| `/supplydrop next` | Time until the next scheduled drop |
| `/supplydrop active` | What is on the map right now |
| `/supplydrop locate` | Direction and distance to the nearest crate |
| `/supplydrop top` | The claim leaderboard |
| `/supplydrop stats` | Your own crate and item totals |

`/supplydrop active` hides coordinates when `notifications.reveal-coordinates` is off — a player who
cannot be told where a crate landed must not be able to ask a second time and get the answer anyway.
Staff see them regardless.

`/supplydrop locate` can be switched off entirely with `commands.locate-enabled: false`, for a server
that wants the hunt to be completely player-driven.

## Staff

| Command | Does |
|---|---|
| `/supplydrop spawn [tier] [here]` | Force a drop |
| `/supplydrop clear` | Remove every active drop and everything it placed |
| `/supplydrop zone add <name> [radius]` | Create a drop zone where you stand |
| `/supplydrop zone remove <name>` | Delete a zone |
| `/supplydrop zone list` | List the zones |
| `/supplydrop reload` | Re-read every configuration file |

`spawn` with no arguments rolls a tier and searches for a site exactly as the scheduler would, which
is the version worth running before an event. `here` puts the crate at your feet and skips the search.

`reload` leaves a drop that is already in flight alone: its deadlines are absolute and its crate is
already in the world, so it finishes under the rules it started with. Only the schedule is
recomputed, which is what somebody who just changed the interval is actually asking for.
