---
title: "OberonStats"
description: "OberonStats turns ExcellentEconomy into placeholders you can actually build a menu out of: a player's own stats, another player's stats, and leaderboard…"
---

**OberonStats** turns [ExcellentEconomy](https://nightexpressdev.com/excellenteconomy/) into placeholders you can actually build a menu out of: a player's own stats, **another player's** stats, and leaderboard rows that **disappear completely when they are worth nothing**.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore) and works on Paper, Purpur and Folia.

---

## Why it exists

ExcellentEconomy already ships a PlaceholderAPI expansion, and for a lot of servers that is enough. It stops being enough the moment you build a menu:

| What you want | ExcellentEconomy alone | OberonStats |
|---|---|---|
| Your own balance | ✅ `%excellenteconomy_balance_coins%` | ✅ |
| **Another player's** balance | ❌ every placeholder resolves for the viewer | ✅ `%oberonstats_balance_coins_of_Notch%` |
| Your leaderboard rank | ✅ | ✅ |
| **Another player's** rank | ❌ | ✅ |
| Empty rank slot | shows `Nobody` (or whatever the language file says) | ✅ shows **nothing** |
| Rank held by somebody with 0 | shows their name and `0` | ✅ shows **nothing** |
| One ready-made row (`#3 Steve — 12,340`) | ❌ glue it yourself | ✅ `%oberonstats_top_line_3_coins%` |
| Paging (first 10, then everyone) | ❌ | ✅ `%oberonstats_page_*%` + `/oberonstats page` |

ExcellentEconomy ranks **every** player it has data for, including everyone sitting on nothing. A "Top 10" menu built on its own placeholders therefore fills up with empty names and zeros as soon as your server has fewer than ten rich players. OberonStats makes those rows vanish.

---

## What it does

- 🙋 **Own stats** — balance, rank, ordinal rank (`3rd`), in four formats each.
- 👥 **Other players' stats** — `_of_<player>`, or a session target set by a menu button. Offline players included.
- 🫥 **Blank means blank** — a row worth nothing returns an empty string for its name, value, uuid **and** its rendered line, together, so the whole row collapses.
- 🏆 **Leaderboard rows** — name, value, uuid, or a single configurable line per rank.
- 📄 **Paging** — show the first 10, then let a button walk the pages or expand to everybody.
- 🧾 **List placeholders** — the entire leaderboard as one multi-line string.
- 🧩 **Menu-plugin friendly** — designed against DialogMaster, works with any plugin that resolves PlaceholderAPI.
- 🔌 **Read-only** — never writes a balance, never stores player data.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Purpur / Folia **1.21+** |
| Java | **21+** |
| OberonCore (DzusillCore) | **1.12.0+** (required) |
| ExcellentEconomy | **2.8.0+** (required) |
| nightcore | whatever ExcellentEconomy needs (it already depends on it) |
| PlaceholderAPI | **required in practice** — the plugin publishes nothing without it |

---

## The idea in one picture

```
placeholder request
  └─ who is it about?     viewer · _of_<player> · session target
     └─ where is the value?
        ├─ online player        → ExcellentEconomy's live cache
        ├─ anybody ranked       → ExcellentEconomy's leaderboard snapshot   (no database hit)
        └─ nobody knows yet     → blank now, async load, correct on the next redraw
           └─ is it worth anything?
              ├─ yes → format it
              └─ no  → blank the whole row
```

Nothing ever blocks the server thread. A menu that redraws twenty placeholders at once starts at most one database load.
