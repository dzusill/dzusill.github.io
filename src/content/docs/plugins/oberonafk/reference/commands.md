---
title: "Commands"
description: "Two root commands that answer the same subcommands and differ only in what they do when typed"
---

Two root commands that answer the **same subcommands** and differ only in what they do when typed
bare:

| Root | Bare command | Default aliases |
|---|---|---|
| `/afk` | Teleports to the AFK zone | none |
| `/afkrewards` | Opens the claim storage | `/afkclaim` |

Names, aliases and whether to take a name another plugin owns are configurable in
[`config.yml`](/plugins/oberonafk/configuration/config/#commands). `/afk` takes the name from EssentialsX by default —
see [Taking over /afk](/plugins/oberonafk/features/teleport/#taking-over-afk). Commands are registered at runtime through
OberonCore's command registry, so `plugin.yml` carries no `commands:` block and there is nothing to
merge on an update.

Below, `/afk` stands for whichever root you use.

## Players

| Command | Does |
|---|---|
| `/afk` | Teleports to the default zone, after the warm-up |
| `/afk tp [zone]` | The same, to a named zone (`/afk teleport` works too) |
| `/afkrewards` | Opens the claim storage |
| `/afk claim` / `/afk rewards` | The same, from the other root |
| `/afk stats [player]` | Rewards received, time in zones, last reward and a count per reward |
| `/afk top [track] [page]` | A leaderboard page in chat, with your own place (`/afk leaderboard` too) |
| `/afk top page <next\|prev\|first\|last\|all\|reset\|n> [track]` | Moves your page for the `page_` placeholders — for menu buttons |
| `/afk help` | The commands you may use |

Viewing someone else's stats needs `oberonafk.stats.others`.

## Staff

All of these need `oberonafk.admin`, which also grants `oberonafk.stats.others` and
`oberonafk.teleport.instant`.

| Command | Does |
|---|---|
| `/afk stats server` | Every reward's real share of everything given, beside its expected share |
| `/afk history <player> [page]` | Every roll of a player, newest first |
| `/afk zone list` | Every zone with its status and how many players are inside |
| `/afk zone info <zone>` | One zone in detail: region, interval, chance, table, points, default |
| `/afk zone setspawn <zone>` | Adds your position as a landing point (players only) |
| `/afk zone clearspawns <zone>` | Removes the points set in game, so `zones.yml`'s apply again |
| `/afk reward list [table]` | Rewards with their real chance, and why a switched-off one is off |
| `/afk reward capture <name>` | Saves the item in your hand for use as `item: { saved: <name> }` |
| `/afk reward test <zone> [rolls]` | Simulates 1 to 1,000,000 rolls; gives nothing |
| `/afk reward give <player> <zone> <reward>` | Delivers one reward for real — inventory, storage, messages, history |
| `/afk storage <player> [view\|clear]` | Looks into or empties a player's claim storage, online or not |
| `/afk reload` | Re-reads every file, messages included |

`/afk zone` also answers to `/afk zones`.

Every command except the player-only ones works from the console. A bare root typed in the console shows
the help instead of teleporting.

## Reload

`/afk reload` re-reads every file. Players already inside a zone keep their count; a zone that was removed
or switched off ends its sessions without a reward, and a changed interval applies at once. The console
reports problems with zones and rewards again. **Command names** (the `commands` block) are the one thing
that needs a restart.
