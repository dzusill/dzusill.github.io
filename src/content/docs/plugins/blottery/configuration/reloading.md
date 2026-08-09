---
title: "Reloading"
description: "bLottery has no reload command. Configuration changes are applied by restarting the server."
---

**bLottery has no reload command.** Configuration changes are applied by restarting the server.

---

## Why

A lottery round is live state: an open round, tickets already paid for, a running timer, a pot. Swapping `ticketPrice` or `lossTime` underneath a round in progress means some players paid one price and others another, or the countdown jumps — and the round has already taken people's money.

A restart is the honest boundary. The round is persisted in MySQL and resumes exactly where it was, with its tickets and its pot intact.

## Applying a change safely

1. Edit `settings.yml` or `messages.yml`.
2. Wait for the current round to draw, or run `/lot reset` to refund every ticket.
3. Restart.

Step 2 matters for price changes. For a `messages.yml` wording fix it does not — nobody is harmed by a restart mid-round, the round simply resumes.

## What a restart does not lose

| State | Survives |
|---|---|
| Open round and its timer | ✅ persisted |
| Tickets bought | ✅ persisted |
| Pot | ✅ persisted |
| Payout owed to an offline winner | ✅ persisted |
| History and stats | ✅ persisted |

## What needs a restart specifically

- anything in `settings.yml`
- anything in `messages.yml`
- `database.yml`
- installing or removing Vault or an economy plugin

## Never use `/reload confirm`

Bukkit's global reload re-enables plugins in an uncontrolled order. For a plugin holding a connection pool, a running round timer and pending payouts, that is a genuinely bad idea. Use a real restart.

## Next

- [Commands & Permissions](/plugins/blottery/commands-and-permissions/)
