---
title: "Troubleshooting"
description: "The first move for almost everything here:"
---

The first move for almost everything here:

```
/afk zone list
/afk reward list
```

Both read what the plugin actually loaded, not what you meant to write, and the console prints the same
problems at startup and after every `/afk reload`.

## Nobody gets rewards

Work down this list — ordered by how often each one is the answer.

| Check | How |
|---|---|
| Is WorldGuard installed? | The console says so at startup. Without it no zone can pay out |
| Is the zone active? | `/afk zone list`. `region missing` — no such region in that world; `table missing` — no such table; `disabled` — `enabled: false` or an unreadable `interval` |
| Is the world right? | `world` in `zones.yml` must be the exact name of the world the region is in |
| Is the player in an eligible game mode? | `game-modes` in `config.yml`. Creative and spectator collect nothing |
| Is the player really inside? | `/afk zone info <zone>` shows how many are inside. The region's vertical extent counts too |
| Did the timer keep resetting? | Leaving the region, dying and changing game mode all start it over |
| Is anything switched on in the table? | `/afk reward list` — a switched-off reward says why |
| Is the zone's `chance` low? | `/afk reward test <zone>` shows the effect |

## A reward was rolled but nothing arrived

`/afk history <player>` shows every roll and how it ended.

| Outcome | Meaning |
|---|---|
| `FAILED` | The command did not run or an item could not be built. The console named the reward and the command — usually an unknown command (the economy or crates plugin is not installed, or the name differs) or an unknown item |
| `STORAGE` | The item is in the claim storage — `/afkrewards` |
| `STORAGE_FULL` | The storage cap was reached; raise `storage.max-stacks` |

Commands run **from the console**, so a command that only works for players will fail. Test it with
`/afk reward give <player> <zone> <reward>`.

## "region missing"

WorldGuard has no region by that id in that world. Create it with `/rg define <id>` in that world, or
correct `region` / `world` in `zones.yml`, then `/afk reload`. If the world is not loaded when the server
starts, the console says the region could not be checked rather than reporting it missing.

## `/afk` does nothing, or the wrong thing

| Symptom | Cause |
|---|---|
| It toggles AFK status instead of teleporting | EssentialsX owns the name. Set `commands.main.take-over: true` (the default) and restart, or rename the command |
| "no teleport point" | `/afk zone setspawn <zone>` where players should land |
| "in combat" | PvPManager reports a combat tag. If it is wrong, `teleport.block-in-combat: false` |
| Cancelled at once | Something moves the player (a conveyor, a flowing water block) or damages them (a trap) |

## The claim menu is empty or does not open

- **"still loading"** — the storage is read when a player joins; try again in a moment.
- An item that cannot be read is hidden and the console says so, but it **stays in the database**: it
  may be readable again once the plugin it depends on is fixed.
- With `database.yml` `enabled: false` the storage empties on every restart.

## Players get kicked while AFK

Standing still for hours is exactly what an anti-cheat does not expect, and a "no input" or "autoclick"
check can flag it. OberonAfk changes no permissions, so exempt the zone yourself — for example grant
`vulcan.bypass.*` to players inside the region, with a context for the WorldGuard region in your
permissions plugin.

## The leaderboard is empty or behind

- It is rebuilt every `leaderboard.refresh-seconds` (60). `/afk reload` rebuilds it at once.
- Only values above `leaderboard.min-value` are ranked, and exempt players (`oberonafk.top.exempt`,
  `exempt-players`) never are — check that staff testing it are not exempt.
- A typo in a placeholder (`%oberonafk_top_name_1_tiem%`) stays visible as raw text; an empty rank renders
  `blank-text`. `/afk top nonsense` lists the tracks that exist.

## Item plugin rewards fail

`hook:` rewards reach MMOItems, ItemsAdder, Oraxen and ExecutableItems by reflection. A plugin whose API
changed fails only the rewards that use it; the console names it once. `/afk reward list` shows `X is not
installed` for a plugin that is missing. A `COMMAND` reward using the plugin's own give command is always
an alternative.

## Config upgrade problems

If a file ever fails to parse on load, the console says which file and line; the plugin runs on defaults
for that file until it is fixed. `data.yml` is never overwritten when it cannot be read.

Command names are read at startup — a change to `commands` needs a restart, not a reload.
