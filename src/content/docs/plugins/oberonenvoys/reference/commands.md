---
title: "Commands"
description: "One root command, /envoy, with subcommands. Aliases are configurable in config.yml, so a server that"
---

One root command, `/envoy`, with subcommands. Aliases are configurable in `config.yml`, so a server that
already has something on `/envoys` can move it without a rebuild:

```yaml
commands:
  aliases:
    - "envoys"
```

`/supplydrop` and `/drops` — the names from before 2.0, when the plugin was OberonSupplyDrops — always
run too, so menus and NPCs set up for them keep working. They are left out of tab completion.

Commands are registered at runtime through OberonCore's command registry, so `plugin.yml` carries no
`commands:` block and there is nothing to merge on an update.

## Players

| Command | Does |
|---|---|
| `/envoy` | Lists the subcommands you have access to |
| `/envoy preview` | Every tier, its real chance, and the loot it can hold |
| `/envoy next` | Time until the next scheduled drop |
| `/envoy active` | What is on the map right now |
| `/envoy locate` | Direction and distance to the nearest crate |
| `/envoy top` | The claim leaderboard |
| `/envoy stats` | Your own crate and item totals |

`/envoy active` hides coordinates when `notifications.reveal-coordinates` is off — a player who
cannot be told where a crate landed must not be able to ask a second time and get the answer anyway.
Staff see them regardless.

`/envoy locate` can be switched off entirely with `commands.locate-enabled: false`, for a server
that wants the hunt to be completely player-driven.

## Staff

| Command | Does |
|---|---|
| `/envoy force [tier]` | Run a whole cycle now — as many crates as `schedule.drops-per-cycle` rolls |
| `/envoy spawn [tier] [here]` | Force a single drop |
| `/envoy open` | Open every active drop now, skipping its countdown (alias `unlock`) |
| `/envoy clear` | Remove every active drop and everything it placed |
| `/envoy zone add <name> [radius]` | Create a drop zone where you stand |
| `/envoy zone remove <name>` | Delete a zone |
| `/envoy zone list` | List the zones |
| `/envoy reload` | Re-read every configuration file |

`spawn` with no arguments rolls a tier and searches for a site exactly as the scheduler would, which
is the version worth running before an event. `here` puts the crate on the ground under your feet and
skips the search. Flying above a barrier roof (or any air) does not leave the crate floating: it
comes to rest on the first solid block below, ignoring `placement.see-through-materials`, the same
way `/envoy move` does. A second `here` on a block another envoy already occupies is refused.

`open` is the companion to it: `spawn` forces a crate into the world, `open` forces it open. Together
they check a tier's loot in two commands instead of two minutes of standing around. A crate still
falling is landed on the way through, so one command is always enough, and everything the normal
unlock does still happens — the announcement, the sound, the boss bar switching to its open line. A drop opened this
way is indistinguishable from one that waited, and still despawns on its own after
`phases.despawn-seconds`.

`reload` leaves a drop that is already in flight alone: its deadlines are absolute and its crate is
already in the world, so it finishes under the rules it started with. Only the schedule is
recomputed, which is what somebody who just changed the interval is actually asking for.
