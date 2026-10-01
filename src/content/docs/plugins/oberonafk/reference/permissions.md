---
title: "Permissions"
description: "oberonafk.admin also grants oberonafk.stats.others and oberonafk.teleport.instant."
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
| `oberonafk.admin` | op | Every staff subcommand — `stats server`, `history`, `zone`, `reward`, `storage`, `reload` |

`oberonafk.admin` also grants `oberonafk.stats.others` and `oberonafk.teleport.instant`.

A subcommand a player may not use is hidden from tab completion and refused with the `no-permission`
message.

## Nothing here is needed to collect rewards

Collecting time in a zone checks **no permission** at all — the only conditions are being in the region
and being in an eligible game mode. That is deliberate: a permission check on an AFK timer is one more
thing that can silently stop a player's rewards.

## Anti-cheat

OberonAfk sets no permissions, so it does not grant any anti-cheat bypass. See
[Players get kicked while AFK](/plugins/oberonafk/reference/troubleshooting/#players-get-kicked-while-afk).
