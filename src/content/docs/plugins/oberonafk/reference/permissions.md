---
title: "Permissions"
description: "oberonafk.admin also grants oberonafk.stats.others, oberonafk.teleport.instant and"
---

| Node | Default | Allows |
|---|---|---|
| `oberonafk.use` | everyone | Using `/afk` and `/afkrewards` at all, and `/afk help` |
| `oberonafk.claim` | everyone | Opening the claim storage |
| `oberonafk.teleport` | everyone | `/afk` and `/afk tp` |
| `oberonafk.teleport.instant` | op | Skips the `/afk` warm-up |
| `oberonafk.stats` | everyone | Your own `/afk stats` |
| `oberonafk.stats.others` | op | `/afk stats <player>` |
| `oberonafk.top` | everyone | `/afk top` and `/afk top page` |
| `oberonafk.top.exempt` | nobody | Left out of every leaderboard. Not given by `oberonafk.admin` or op — grant it on purpose |
| `oberonafk.altguard.bypass` | nobody | Collects in AFK zones even while a linked account does, and holds nobody back — for siblings on one connection. Not given by `oberonafk.admin` or op |
| `oberonafk.altguard.notify` | op | The chat alert when the [alt guard](/plugins/oberonafk/features/alt-guard/) holds an account back |
| `oberonafk.admin` | op | Every staff subcommand — `stats server`, `history`, `zone`, `reward`, `storage`, `reload` |

`oberonafk.admin` also grants `oberonafk.stats.others`, `oberonafk.teleport.instant` and
`oberonafk.altguard.notify`.

A subcommand a player may not use is hidden from tab completion and refused with the `no-permission`
message.

## Nothing here is needed to collect rewards

Collecting time in a zone needs **no permission** at all. The conditions are being in the region, being in
an eligible game mode, and no linked account of the player's collecting already
([alt guard](/plugins/oberonafk/features/alt-guard/)). That is deliberate: a permission an AFK timer depends on is one
more thing that can silently stop a player's rewards. `oberonafk.altguard.bypass` only ever lets
someone collect who otherwise would not.

## Anti-cheat

OberonAFK sets no permissions, so it does not grant any anti-cheat bypass. See
[Players get kicked while AFK](/plugins/oberonafk/reference/troubleshooting/#players-get-kicked-while-afk).
