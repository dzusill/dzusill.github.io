---
title: "Daily first kills and passes"
description: "Each of the first daily.kills (5) counted kills of the day pays its own rewards (daily.per-kill),"
---

## Daily first kills

Each of the first `daily.kills` (5) counted kills of the day pays its own rewards (`daily.per-kill`),
and all of them together `daily.complete`. Shipped: 200 stardust each, 1,000 + a key for all five.

- With `rules.daily-unique-victims` every kill must be a different victim; a repeat victim is a counted
  kill but no daily step, and the killer is told so.
- With `rules.alt-guard.rewards-per-ip` each step pays one account per address group: an alt finds a
  step its main already took.
- The day ends at midnight in `periods.timezone`; progress survives a relog.

## Passes

`passes.yml` holds any number of passes. Each counts `KILLS` or `BEST_STREAK` in its own period
(`DAILY`, `WEEKLY`, `MONTHLY`, `LIFETIME`) and has tiers that unlock at a value. In `/ffa` a tier is
**locked**, **claimable** (click to claim) or **claimed**; the player is told when a tier unlocks.

- A claim is decided before anything is given, so a double click never pays twice.
- With `rewards-per-ip` one account per address group claims each tier.
- `permission` limits a pass to players who hold it.
- `auto-claim-on-reset`: when the period ends, every unlocked tier nobody claimed is handed over —
  online players at once, offline players at their next join.

Shipped: **Weekly** (kills) 10 → 500 stardust · 25 → a Mace Tier 1 use · 50 → 1,500 + key · 100 → a
Mace Tier 2 use + 3,000 · 200 → 5,000 + 2 keys. **Lifetime** (kills) 100 → $100K · 250 → 5,000 stardust ·
500 → $500K + key · 1K → 15,000 · 2.5K → $2.5M · 5K → 50,000 + 3 keys · 10K → $10M. Daily (best streak)
and Monthly (kills) are in the file, switched off.

## The menus

`/ffa` opens the main menu: stats, today's first kills, every pass the player may use and the claim
storage. `/ffa pass <id>` opens one pass; `/ffa claim` the claim storage (outside the arena only). The
layout is [gui.yml](/plugins/oberonffa/configuration/gui/).
