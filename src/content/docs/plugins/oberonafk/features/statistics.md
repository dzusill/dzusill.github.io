---
title: "Statistics and history"
description: "Everything is stored in the database, in three tables:"
---

Everything is stored in the [database](/plugins/oberonafk/configuration/database/), in three tables:

| Table | Holds |
|---|---|
| `oberonafk_players` | Running totals per player: time in zones, rewards received, last reward |
| `oberonafk_history` | One row per reward ever rolled: when, who, zone, reward, amount, how it was delivered |
| `oberonafk_storage` | The claim storage |

Online players' totals live in memory — loaded on join, written back on quit, every minute and on
shutdown — so a scoreboard asking for `%oberonafk_drops_total%` twice a second never touches the
database. All database work for one player is run strictly in order, so a quit's save always lands
before the next join's read.

## Commands

| Command | Shows |
|---|---|
| `/afk stats [player]` | Rewards received, time spent in zones, the last reward, and a count per reward |
| `/afk stats server` | Every reward's **real** share of everything given so far, beside the share its weight promises |
| `/afk history <player> [page]` | Every roll, newest first: how long ago, which reward, how it was delivered, which zone |

`/afk stats server` is the audit tool: let the zone run for a night and it tells you whether the table
behaves the way you think it does. It needs a decent number of drops before the shares settle — a
reward with a 0.5% weight will not show 0.5% after twenty rolls.

## Delivery outcomes

The history records how each reward ended up:

| Outcome | Meaning |
|---|---|
| `COMMAND` | The commands ran |
| `DIRECT` | Every stack went into the inventory |
| `STORAGE` | At least one stack went to the claim storage, nothing was lost |
| `STORAGE_FULL` | The storage cap was reached, so at least one stack was not given |
| `FAILED` | A command failed or an item could not be built — nothing was given |

`FAILED` rolls are kept in the history for staff but are **not** counted in the player's totals. The
labels players and staff read are the `delivery.*` keys in `messages.yml`.

## Without a database

With `enabled: false` in `database.yml` the totals of online players and the claim storage live only
until the next restart, nothing is written to the history, and `/afk history`, `/afk stats server` and
the stats of offline players say the database is off. Keep it on.
