---
title: "Commands"
description: "The main command is /sus (alias /suspicious). Both can be changed in config.yml under command. Player names are completed from online players and current…"
---

The main command is `/sus` (alias `/suspicious`). Both can be changed in `config.yml` under `command`. Player names are completed from online players and current suspects. Offline players are found by their stored profile.

| Command | Permission | What it does |
| --- | --- | --- |
| `/sus` | `dsusmenu.open` | The list of suspicious players |
| `/sus <player>` | `dsusmenu.open` + `dsusmenu.view` | A player's profile |
| `/sus profile <player>` | `dsusmenu.view` | Profile |
| `/sus history <player>` | `dsusmenu.view` | Flag history |
| `/sus actions <player>` | `dsusmenu.open` | The actions menu |
| `/sus case <id>` | `dsusmenu.view` | Who case #id is about and its state. In game it also opens their profile. Handy with Discord alerts |
| `/sus freeze <player> [reason]` | `dsusmenu.action.freeze` | Freeze |
| `/sus unfreeze <player>` | `dsusmenu.action.freeze` | Unfreeze |
| `/sus spectate <player>` | `dsusmenu.action.spectate` | Spectate invisibly |
| `/sus spectate stop` | `dsusmenu.action.spectate` | Go back |
| `/sus note <player> <text>` | `dsusmenu.note` | Add a staff note |
| `/sus status <player> <open\|review\|resolve\|dismiss> [reason]` | `dsusmenu.case` (dismiss: `dsusmenu.case.dismiss`) | Change the case status. Resolve and dismiss need a reason |
| `/sus assign <player>` / `/sus unassign <player>` | `dsusmenu.case` | Take or release the case |
| `/sus export <player>` | `dsusmenu.export` | Markdown report to `exports/` (and Discord) |
| `/sus alerts` | `dsusmenu.alerts` | Turn your silent alerts on or off |
| `/sus health` | `dsusmenu.admin` | Flags per minute, dropped flags, database queue and errors, Discord state, average processing times |
| `/sus reload` | `dsusmenu.admin` | Reload every file except `database.yml`, `command` and `storage` |
| `/sus debug <player> <check> <category> [vl]` | `dsusmenu.admin` | A test flag. Only works with `debug.fake-flags: true` |

Kick, mute and ban are available from the actions menu and from Discord.
