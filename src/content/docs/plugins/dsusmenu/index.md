---
title: "dSusMenu"
description: "dSusMenu is the anti-cheat investigation desk for Phalanx. It listens to Vulcan, scores how suspicious each player is, opens a case when the score gets high…"
---

**dSusMenu** is the anti-cheat investigation desk for **Phalanx**. It listens to Vulcan, scores how suspicious each player is, opens a case when the score gets high enough, and gives staff one place to act: the `/sus` menu, player profiles with flag history, a frozen-player workflow, punishments through AdvancedBan, and alerts with buttons on Discord.

Vulcan itself is **not modified**. It keeps detecting and auto-punishing exactly as before; dSusMenu only reads its public API and investigates. The score never punishes anyone on its own.

It is built on the [DzusillCore](/plugins/dzusillcore/) framework and talks to Discord through [dPhalanx](/plugins/dphalanx/).

---

## What it does

- 🕵️ **`/sus` list**: every player flagged in the last hour, 6 hours, day or week. You can filter it by online status, risk, category, check, case status and assignee, sort it by newest, most flags, score, risk or name, and search it. The heads update live.
- 📈 **Suspicion score**: each flag adds points by category and check. Points fade over time (half-life), a single spamming check is capped, and flags in several categories at once add a bonus. The score falls into a level: LOW, MEDIUM, HIGH or CRITICAL.
- 📁 **Cases**: from MEDIUM a case opens automatically. Each level is announced once per case: a silent in-game alert, a Discord alert from HIGH, and a movement/rotation timeline around the flag as evidence. Staff review, resolve, dismiss (a false positive removes its points), assign, add notes and export a markdown report.
- 🧊 **Actions**: teleport (vanished first), invisible spectate, freeze (survives relog and restart), kick, mute and ban (AdvancedBan, with preset reasons and durations), each with an optional confirmation, a permission and an audit log entry.
- 🧩 **Client detection**: the client brand, plugin channels and version are matched against rules. A rule can log, add to the score, or kick. Known cheat clients are kicked by default, and unknown clients are only logged.
- 💬 **Discord**: alerts with **Open case / Freeze / Kick / Ban** buttons, punishments, staff actions, case changes, exports, system errors and a daily summary. Buttons check the Discord role *and* the linked Minecraft account's permission.
- 🎨 **Everything is configurable**: every menu (`gui/*.yml`) and every chat line (`messages.yml`), plus all the thresholds.

## Honest limits

Client detection only sees what the client says about itself. A hacked client can hide or fake its brand and channels, so a match is evidence with a confidence, never proof. Vulcan's API reports flags, not raw measurements; dSusMenu adds its own movement timeline around them.

## Quick start

1. Install DzusillCore, Vulcan and dSusMenu (plus AdvancedBan, SimpleVanish and dPhalanx if you use them), then restart.
2. Give your staff `dsusmenu.open`, `dsusmenu.view` and `dsusmenu.alerts`, plus the action permissions they should have.
3. Type `/sus`.

→ [Requirements](/plugins/dsusmenu/getting-started/requirements/) · [Installation](/plugins/dsusmenu/getting-started/installation/) · [Commands](/plugins/dsusmenu/reference/commands/)
