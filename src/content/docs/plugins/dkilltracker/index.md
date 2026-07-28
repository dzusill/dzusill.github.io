---
title: "dKillTracker"
description: "dKillTracker counts every player kill on your server, refuses to be farmed, and turns kill counts into ranks — automatically running whatever commands you…"
---

**dKillTracker** counts every player kill on your server, refuses to be farmed, and turns kill counts into ranks — automatically running whatever commands you configure when a player hits 5, 10, 25 or 500 kills.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore) and works on Paper, Purpur and Folia.

---

## What it does

- 🗡️ **Every kill recorded** — direct hits, arrows and tridents, and (optionally) tamed pets. Deaths to lava or fall damage during a fight still credit the attacker, so nobody escapes a kill by jumping into a pit.
- 🛡️ **Anti kill-farming built in** — a configurable cooldown per killer + victim pair, same-IP alt detection, world safezones and exempt victims. Farmed kills are recorded but never count.
- 🏅 **Kill milestones** — unlimited tiers in `config.yml`; each one runs any console commands you want (`rank %player% bandit`, `give`, `eco give`, `broadcast`, anything).
- 🔒 **Rewards never fire twice** — the highest awarded milestone is stored per player, so restarts, relogs and reloads are safe.
- 🧩 **PlaceholderAPI** — 16 placeholders for TAB, scoreboards, holograms and chat formats.
- 🏆 **Leaderboard** — `/killtop` plus `%killtracker_top_name_1%` style placeholders.
- 🗄️ **Flat file or SQL** — `kills.yml` by default, MySQL/PostgreSQL for a network.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Purpur / Folia **1.21.x** |
| Java | **21+** |
| DzusillCore | **1.2.0+** (required) |
| PlaceholderAPI | optional (placeholders) |
| MySQL / PostgreSQL | optional (cross-server storage) |

---

## The idea in one picture

```
PlayerDeathEvent
  └─ who killed them?          direct hit · projectile · combat tag fallback
     └─ does it count?         self · exempt victim · world · same IP · pair cooldown
        ├─ yes  → kills +1, lifetime +1, milestones checked
        └─ no   → lifetime +1 only, nothing else happens
```

Two counters per player is the whole trick. `kills` is what survived the anti-farm rules and drives everything visible. `lifetime_kills` counts every kill including the suppressed ones — so the difference tells you at a glance who has been farming an alt.

---

## Quick links

- [Requirements](/plugins/dkilltracker/getting-started/requirements/)
- [Installation](/plugins/dkilltracker/getting-started/installation/)
- [Quick Start](/plugins/dkilltracker/getting-started/quick-start/)
- [Milestones & Ranks](/plugins/dkilltracker/features/milestones/)
- [Anti-Farm Protection](/plugins/dkilltracker/features/anti-farm/)
- [Placeholders](/plugins/dkilltracker/placeholders/)
- [Commands & Permissions](/plugins/dkilltracker/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dkilltracker/faq/)
