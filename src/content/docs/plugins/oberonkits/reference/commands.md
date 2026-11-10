---
title: "Commands"
description: "Names and aliases are set in config.yml. Commands are registered at"
---

Names and aliases are set in [`config.yml`](/plugins/oberonkits/configuration/config/#commands). Commands are registered at
runtime through OberonCore, so `plugin.yml` has no `commands:` block.

## Players

| Command | Does | Permission |
|---|---|---|
| `/kits` | Opens the kit menu (only in a kit world) | `oberonkits.use` |
| `/kits <kit>` | Picks a kit by name; a Stardust kit with no uses opens its preview | `oberonkits.use` |

`/ffakits` is an alias. `/kits` takes the name from Essentials (`take-over: true`).

## Admin

`/oberonkits` is an alias of `/okits`. Everything below needs `oberonkits.admin`, except `/okits gui`.

| Command | Does |
|---|---|
| `/okits gui` | Opens the [admin GUI](/plugins/oberonkits/features/admin-gui/). Needs only `oberonkits.gui.view` |
| `/okits` | Help (for a player with only `oberonkits.gui.view`: opens the GUI) |
| `/okits reload` | Re-reads every file; replies with the number of profiles and warnings |
| `/okits list` | Profiles, their worlds, mode and kits; marks disabled ones |
| `/okits give <player> [kit]` | Gives a kit now (random if none named). Never spends a Stardust use |
| `/okits open <player>` | Opens the kit menu for a player |
| `/okits preview <kit>` | Shows a kit's contents |
| `/okits uses <player> <kit>` | Shows Stardust kit uses |
| `/okits uses <player> <kit> set\|add\|take <n>` | Changes them |
| `/okits regen <profile>` | Runs the [arena regen](/plugins/oberonkits/features/arena-regen/) now and restarts its timer |
