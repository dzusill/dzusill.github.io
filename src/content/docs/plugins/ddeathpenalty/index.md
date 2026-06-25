---
title: "dDeathPenalty"
description: "dDeathPenalty makes death hurt. Whenever a player dies they always lose something — money, XP, items, health, or any combination you configure. It's a…"
---

**dDeathPenalty** makes death hurt. Whenever a player dies they **always** lose something — money, XP, items, health, or any combination you configure. It's a punishment-style death tax for hardcore, factions and survival servers that want death to carry real weight.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 💸 **Money penalty** — lose a percentage or flat amount on death, with caps and a PvP multiplier.
- ✨ **XP penalty** — drop, wipe, or lose a set number of levels.
- 🎒 **Item penalty** — vanilla drops, keep-inventory, clear everything, or randomly drop/delete stacks.
- ❤️ **Respawn effects** — respawn with set health/food and potion effects (e.g. Slowness).
- 👹 **Extra punishments** — spawn avenging monsters, drop a "lost money" item, or run console commands.
- 🗂️ **Layered profiles** — a default penalty, overridden per world and per permission group.
- 🛡️ **Exemptions** — per-player and per-world bypasses, plus WorldGuard region control.
- 📊 **Stats & leaderboards** — track deaths and money lost, exposed via PlaceholderAPI.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21+** |
| Java | **21+** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** (required) |
| Vault + economy | optional — money penalties |
| PlaceholderAPI | optional — leaderboard placeholders |
| WorldGuard 7 | optional — per-region disable |

See [Requirements](/plugins/ddeathpenalty/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/ddeathpenalty/getting-started/installation/)
- [Quick Start](/plugins/ddeathpenalty/getting-started/quick-start/)
- [Penalty Profiles](/plugins/ddeathpenalty/features/penalty-profiles/)
- [config.yml reference](/plugins/ddeathpenalty/configuration/config/)
- [Commands & Permissions](/plugins/ddeathpenalty/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/ddeathpenalty/faq/)
