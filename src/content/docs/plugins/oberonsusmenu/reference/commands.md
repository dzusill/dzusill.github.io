---
title: "Commands"
description: "The main command is /sus (aliases /suspicious and /sentry). All three can be changed in config.yml under command. Player names are completed from online…"
---

The main command is `/sus` (aliases `/suspicious` and `/sentry`). All three can be changed in `config.yml` under `command`. Player names are completed from online players and current suspects. Offline players are found by their stored profile.

| Command | Permission | What it does |
| --- | --- | --- |
| `/sus` | `oberonsusmenu.open` | The list of suspicious players |
| `/sus <player>` | `oberonsusmenu.open` + `oberonsusmenu.view` | A player's profile |
| `/sus profile <player>` | `oberonsusmenu.view` | Profile |
| `/sus history <player>` | `oberonsusmenu.view` | Flag history |
| `/sus actions <player>` | `oberonsusmenu.open` | The actions menu |
| `/sus case <id>` | `oberonsusmenu.view` | Who case #id is about and its state. In game it also opens their profile. The id is in every Discord embed |
| `/sus freeze <player> [reason]` | `oberonsusmenu.action.freeze` | Freeze |
| `/sus unfreeze <player>` | `oberonsusmenu.action.freeze` | Unfreeze |
| `/sus spectate <player>` | `oberonsusmenu.action.spectate` | Spectate invisibly |
| `/sus spectate stop` | `oberonsusmenu.action.spectate` | Go back |
| `/sus note <player> <text>` | `oberonsusmenu.note` | Add a staff note |
| `/sus status <player> <open\|review\|resolve\|dismiss> [reason]` | `oberonsusmenu.case` (dismiss: `oberonsusmenu.case.dismiss`) | Change the case status. Resolve and dismiss need a reason |
| `/sus assign <player>` / `/sus unassign <player>` | `oberonsusmenu.case` | Take or release the case |
| `/sus export <player>` | `oberonsusmenu.export` | Markdown report to `exports/` |
| `/sus alerts` | `oberonsusmenu.alerts` | Turn your silent alerts on or off |
| `/sus health` | `oberonsusmenu.admin` | Flags per minute, dropped flags, database queue and errors, Discord webhook state, average processing times |
| `/sus reload` | `oberonsusmenu.admin` | Reload every file except `database.yml`, `command` and `storage` |
| `/sus debug <player> <check> <category> [vl]` | `oberonsusmenu.admin` | A test flag. Only works with `debug.fake-flags: true` |

Kick, mute and ban are available from the actions menu.
