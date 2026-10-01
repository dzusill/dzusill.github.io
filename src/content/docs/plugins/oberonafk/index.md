---
title: "OberonAfk"
description: "AFK zone rewards for Paper, built on OberonCore."
---

AFK zone rewards for Paper, built on OberonCore.

Mark a WorldGuard region as an AFK zone and everybody standing in it is paid: every interval
(30 minutes by default) one reward is rolled from a weighted table. Money, currencies and crate keys
are handed out by commands you choose; items go straight to the inventory, and what does not fit waits
in a personal claim storage that is opened with `/afkrewards`.

## What it does

- **Zones are WorldGuard regions.** Several zones are supported, each with its own interval, chance
  and reward table. There is nothing to draw in game: define the region the way you already do.
- **A per-player timer that only counts time spent in the zone.** Leaving, dying, logging out or
  changing game mode starts it again, and only the game modes you list collect anything.
- **Weighted rewards.** One reward per roll, picked by weight. A reward is either a list of console
  commands (money, stardust, crate keys — whatever your other plugins give out) or an item: plain,
  custom-built, captured from your hand, or taken from MMOItems, ItemsAdder, Oraxen or
  ExecutableItems.
- **Nothing is lost to a full inventory.** Items that do not fit go to a claim storage that survives
  restarts, and can only be taken *out* of — it is not an extra chest.
- **A manual teleport.** `/afk` takes a player to the zone after a short warm-up that movement and
  damage cancel and a PvPManager combat tag refuses. Nobody is ever teleported without asking.
- **Everything is configurable.** Every text, the chat / action bar / title it appears on, its sound,
  how times are written (seconds included), and the whole claim menu layout.
- **Statistics you can audit.** Per-player totals, a full drop history, and a staff report that sets
  every reward's real share next to the share its weight promises.
- **PlaceholderAPI output** for a scoreboard, tab list or hologram.

## Where to start

New install: [Installation](/plugins/oberonafk/getting-started/installation/), then
[Quick start](/plugins/oberonafk/getting-started/quick-start/).

Tuning an existing one: [Zones and rewards](/plugins/oberonafk/features/zones-and-rewards/) explains how a roll is
decided, and [Notifications and formatting](/plugins/oberonafk/features/notifications/) covers everything players see.
