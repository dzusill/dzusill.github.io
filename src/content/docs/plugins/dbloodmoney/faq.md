---
title: "FAQ & Troubleshooting"
description: "Could not load 'dBloodMoney.jar' … unknown/invalid plugin DzusillCore"
---

## The plugin won't load

**`Could not load 'dBloodMoney.jar' … unknown/invalid plugin DzusillCore`**
dBloodMoney requires [DzusillCore](/plugins/dbloodmoney/getting-started/requirements/). Put `DzusillCore-1.1.0.jar` in `plugins/` and restart.

## Killing a player does nothing

Work through these — a steal is skipped if **any** apply:

1. **No economy.** You need Vault **and** a provider (EssentialsX, CMI…). Check the console for `No Vault economy found — stealing is disabled`. Run `/dbm info` and confirm an economy plugin is installed.
2. **Testing with two accounts on one PC.** Both share an IP, so `Same-IP.Block: true` skips the reward. Set it to `false` while testing, or test from two connections.
3. **Safezone world.** The kill happened in a [safezone](/plugins/dbloodmoney/features/safezones/). Check `Safezone` in `config.yml`.
4. **Farm cooldown.** You already killed that player recently — see [Anti-Farm](/plugins/dbloodmoney/features/anti-farm/). Grant yourself `dbloodmoney.bypass.cooldown` to test.
5. **Victim too poor.** Their balance is below `Steal.Min-Victim-Balance`.
6. **Victim is exempt.** They have `dbloodmoney.bypass.victim`.

## PRO features (bounty / killtop / streaks) don't work

You're probably running the **free** jar. Run `/dbm info` — it must say `(PRO)`. If it says `(FREE)`, swap `dBloodMoney.jar` for `dBloodMoney-PRO.jar` (see [Free vs PRO](/plugins/dbloodmoney/getting-started/free-vs-pro/)).

## Combat loggers aren't punished

- Confirm `Combat-Tag.Enabled: true` and `Punish-Combat-Log: true`.
- The player must be **tagged** (have taken/dealt PvP damage within `Duration-Seconds`) when they log out.

## Placeholders show as raw text

- Use the **PRO** edition and install **PlaceholderAPI**.
- Test with `/papi parse me %dbloodmoney_kills%`.

## How do I reset the leaderboard?

Flat file: delete `plugins/dBloodMoney/stats.yml` (server stopped). Database: `TRUNCATE TABLE dbloodmoney_stats;`. See [Leaderboards](/plugins/dbloodmoney/features/leaderboards/).

---

## Can I document several plugins in one GitBook? *(yes)*

Absolutely — this is exactly what GitBook is built for. Two patterns:

### Option A — one Space per plugin, grouped in a Site (recommended)

In GitBook, a **Space** is one book. A **Site** (or Collection) groups multiple Spaces behind one URL with a space-switcher dropdown.

- Keep each plugin in its **own repo** with its own `.gitbook.yaml` + `docs/` (dBloodMoney already has this; DzusillCore has its own).
- In GitBook, create a Space per plugin and connect each repo via **Git Sync**.
- Group the Spaces into one **Site**. Visitors get a dropdown: *DzusillCore · dBloodMoney · WarpGUI…*

This keeps each plugin's docs independent, separately versioned, and cleanly linkable — best for a growing catalogue.

### Option B — one Space, multiple groups

Put every plugin in a **single** docs repo and give `SUMMARY.md` a top-level group per plugin:

```markdown
# Table of Contents

* [Home](/plugins/dbloodmoney/)

## dBloodMoney
* [Introduction](/plugins/dbloodmoney/dbloodmoney/)
* [Installation](/plugins/dbloodmoney/dbloodmoney/installation/)

## WarpGUI
* [Introduction](/plugins/dbloodmoney/warpgui/)
* [Installation](/plugins/dbloodmoney/warpgui/installation/)
```

One URL, one sidebar with collapsible sections. Simplest to manage, but everything shares a single book.

> **Recommendation:** Option A. It matches how DzusillCore is already set up (its own Space) and scales as you add plugins. Connect this repo's `docs/` folder as the **dBloodMoney** Space and add it to your Site alongside the others.
