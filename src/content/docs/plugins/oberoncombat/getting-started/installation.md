---
title: "Installation"
description: "Everything optional degrades cleanly: the plugin says once at startup what it did not find, and the feature that needs"
---

## Requirements

| | |
|---|---|
| Server | Paper 26.2 (Folia is supported) |
| Java | 25 |
| Required | **OberonCore 1.14.4 or newer** |
| Optional | WorldGuard (exclusions by region, the barrier), Vault with an economy (money steal), PlaceholderAPI, OberonKills 1.6.0+, Duels-Shyam 1.0.4 |

Everything optional degrades cleanly: the plugin says once at startup what it did not find, and the feature that needs
it stays off. Without WorldGuard exclusions work on worlds only and there is no barrier. Without Vault nothing is
stolen.

## Steps

1. Put `OberonCombat.jar` and `OberonCore.jar` in `plugins/`.
2. **Remove PvPManager.** OberonCombat refuses to start while PvPManager is installed: both would tag, untag and take
   money for every fight. The console says so and why.
3. Start the server. `config.yml` and `messages.yml` are written to `plugins/OberonCombat/`.
4. Run `/oberoncombat status`. It lists what is switched on and what was found: WorldGuard, Vault, Duels-Shyam.

## Plugins that talk to OberonCombat

These ask OberonCombat whether a player is tagged. Install the builds that know about it, or they will not see combat
once PvPManager is gone:

| Plugin | What it does with the answer |
|---|---|
| OberonKills 1.6.0 | prints a combat-log death message |
| OberonUtils | refuses teleports, `/suicide` and elytra use while tagged; its own combat module stays off |
| OberonAfk | refuses `/afk` while tagged |
| OberonTools | withholds drill, axe and bucket abilities while tagged (`combat.block-tools`) |

## Updating

Replace the jar and restart. New keys that a release adds are merged into your files without touching the ones you
changed, and a section you deleted comes back with its defaults. Read the console once after an update: a value that
cannot be understood is reported by key name and replaced by its default, never silently ignored.

## Files

| File | What |
|---|---|
| `config.yml` | everything that is not text |
| `messages.yml` | every text, with where it shows and what it sounds like |
| `pvp-state.yml` | each player's own PvP choice, once [the toggle](/plugins/oberoncombat/features/pvp-toggle/) is used |
