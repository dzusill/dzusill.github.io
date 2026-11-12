---
title: "DialogMaster leaderboards"
description: "The plugin ships ready DialogMaster menus in its repository's delivery/dialogmaster/ folder, built on the"
---

The plugin ships ready DialogMaster menus in its repository's `delivery/dialogmaster/` folder, built on the
layout of the server's own `lb-kills.yml` / `lb-kills-ext.yml`:

| File | Shows |
|---|---|
| `lb-ffa-kills.yml` / `lb-ffa-kills-ext.yml` | Top 10 / top 100 kills this week, your kills per period |
| `lb-ffa-streak.yml` / `lb-ffa-streak-ext.yml` | Top 10 / top 100 best streaks this week |
| `lb-ffa-current.yml` | Top 10 live streaks, your streak and tag |

Copy them into `plugins/DialogMaster/menus/` and add the three buttons from `HUB_BUTTONS.md` to
`leaderboard-hub.yml`. OberonFFA never loads or changes these files.

A notice dialog has one button, so each file shows one period; for another period copy a file and replace
`_weekly` with `_daily`, `_monthly` or `_alltime`. Clicking a name runs `/ffa stats <name>`.
