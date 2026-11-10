---
title: "OberonKits"
description: "Kits for kit worlds such as an FFA arena, built on OberonCore."
---

Kits for kit worlds such as an FFA arena, built on OberonCore.

When a player enters a world that has a kit profile, OberonKits resets them and hands out a kit: the player
picks one in a menu, or gets one at random. The kits themselves stay in EssentialsX `kits.yml`, so the
kits you already have keep working and are edited the way you edit them today.

## What it does

- **Kits per world.** A profile ties one or more worlds (wildcards allowed) to a list of Essentials kits.
  Entering, respawning or logging in inside the world gives a kit; every trigger can be switched off.
- **Choose or random.** In `choose` mode a menu opens with every kit, a preview on right-click and a
  Random button. In `random` mode a weighted kit is given with no menu.
- **Safe to leave and come back.** With `on-return: keep` a player who walks out and back keeps what
  they had, and gets a new kit only when their inventory is empty.
- **Stardust kits.** A kit can have a price in Stardust (ExcellentEconomy). One purchase buys a set
  number of lives with it; each time the kit is given, one use is spent.
- **Death rules per world.** No item drops, no XP orbs, and 10–15 XP bottles for the killer — or any
  other mix you set. A combat logout still pays the last player who hit the victim.
- **Arena regen.** Runs a console command on a timer (the duels plugin's `sduels arena regen ffa`),
  warns the players first and can move them out of the arena while it is rebuilt.
- **Guards against wiping survival inventories.** If a kit world shares its Multiverse-Inventories
  inventory with a world that has no kit profile, that profile is switched off and the console says why.
- **An in-game admin GUI.** `/okits gui` changes profiles, kits, prices, rules and the regen timer
  without SFTP access, with a permission per part and a change log. Console commands stay file-only.
- **Everything is configurable.** Every text and where it appears (chat, action bar, title, sound),
  the whole menu layout, every reset step and every death rule. `/okits reload` applies it without a
  restart.
- **PlaceholderAPI output** for a scoreboard: the current kit, uses left, time to the next regen.

## Where to start

New install: [Installation](/plugins/oberonkits/getting-started/installation/), then
[Quick start](/plugins/oberonkits/getting-started/quick-start/).

Tuning an existing one: [Kit worlds](/plugins/oberonkits/features/kit-worlds/) explains when a kit is given and what is
reset first, and [profiles.yml](/plugins/oberonkits/configuration/profiles/) lists every key a world can override.
