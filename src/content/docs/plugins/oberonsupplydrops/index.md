---
title: "OberonSupplyDrops"
description: "Scheduled supply drop events for Paper, built on OberonCore."
---

Scheduled supply drop events for Paper, built on OberonCore.

A crate falls from the sky on a schedule you control. The whole server sees it coming, a countdown
runs while everyone races for it, and then it opens — to everybody at once. There is no owner and no
reservation: whoever gets there first takes what they can carry, and everyone else has to take it off
them.

## What it does

- **A repeating, self-running event.** Interval-based, calendar-based, or both. Staff can force one
  at any time.
- **Weighted rarity tiers.** As many as you like, each with its own colour, crate block, countdown,
  sounds and loot table.
- **Loot that is worth fighting over.** Guaranteed staples plus a weighted pool, ranged stack sizes,
  and fully custom named, lored and enchanted gear — all from YAML.
- **A visible landing.** The crate descends on a particle trail, lands with an impact effect, and is
  marked by a coloured beam and a floating hologram. No resource pack, no client mod.
- **An open claim race.** Once the countdown ends the crate is a normal container. First there wins.
- **Placement you control.** A ring around spawn, named zones created in game, or a WorldGuard
  whitelist and blacklist — with the blacklist winning where regions overlap.
- **Announcements on every channel.** Chat, title, boss bar, sound, plus a live action-bar countdown
  for whoever is close enough to be running for it.
- **A leaderboard.** Who claims the most crates, with PlaceholderAPI output for your scoreboard, TAB
  or Discord bridge.

## Where to start

New install: [Installation](/plugins/oberonsupplydrops/getting-started/installation/), then
[Quick start](/plugins/oberonsupplydrops/getting-started/quick-start/).

Tuning an existing one: [The drop lifecycle](/plugins/oberonsupplydrops/features/drop-lifecycle/) explains what each timing
actually controls.
