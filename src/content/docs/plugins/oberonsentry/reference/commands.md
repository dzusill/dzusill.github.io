---
title: "Commands"
description: "The main command is /sus (aliases /suspicious and /sentry). All three can be changed in config.yml under command. Player names are completed from online…"
---

The main command is `/sus` (aliases `/suspicious` and `/sentry`). All three can be changed in `config.yml` under `command`. Player names are completed from online players and current suspects. Offline players are found by their stored profile.

| Command | Permission | What it does |
| --- | --- | --- |
| `/sus` | `oberonsentry.open` | The list of suspicious players |
| `/sus <player>` | `oberonsentry.open` + `oberonsentry.view` | A player's profile |
| `/sus profile <player>` | `oberonsentry.view` | Profile |
| `/sus history <player>` | `oberonsentry.view` | Flag history |
| `/sus actions <player>` | `oberonsentry.open` | The actions menu |
| `/sus search [text]` | `oberonsentry.open` | Search the list for part of a name (what the search box runs). Empty clears the search |
| `/sus case <id>` | `oberonsentry.view` | Who case #id is about and its state. In game it also opens their profile. The id is in every Discord embed |
| `/sus freeze <player> [reason]` | `oberonsentry.action.freeze` | Freeze |
| `/sus unfreeze <player>` | `oberonsentry.action.freeze` | Unfreeze |
| `/sus spectate <player>` | `oberonsentry.action.spectate` | Spectate invisibly |
| `/sus spectate stop` | `oberonsentry.action.spectate` | Go back |
| `/sus note <player> <text>` | `oberonsentry.note` | Add a staff note |
| `/sus status <player> <open\|review\|resolve\|dismiss> [reason]` | `oberonsentry.case` (dismiss: `oberonsentry.case.dismiss`) | Change the case status. Resolve and dismiss need a reason |
| `/sus assign <player>` / `/sus unassign <player>` | `oberonsentry.case` | Take or release the case |
| `/sus export <player>` | `oberonsentry.export` | Markdown report to `exports/` |
| `/sus alerts` | `oberonsentry.alerts` | Turn your silent alerts on or off |
| `/sus health` | `oberonsentry.admin` | Flags per minute, dropped flags, database queue and errors, Discord webhook state, average processing times |
| `/sus reload` | `oberonsentry.admin` | Reload every file except `database.yml`, `command` and `storage` |
| `/sus debug <player> <check> <category> [vl]` | `oberonsentry.admin` | A test flag. Only works with `debug.fake-flags: true` |

Kick, mute and ban are available from the actions menu.
