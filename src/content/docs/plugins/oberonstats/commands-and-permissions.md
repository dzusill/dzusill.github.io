---
title: "Commands & Permissions"
description: "Main command: /oberonstats, alias /ostats."
---

Main command: `/oberonstats`, alias `/ostats`.

| Command | Permission | Description |
|---|---|---|
| `/oberonstats` | `oberonstats.use` | Usage help |
| `/oberonstats reload` | `oberonstats.admin` | Re-read config and messages, clear the lookup cache |
| `/oberonstats status` | `oberonstats.admin` | What is hooked, which tracks exist, how blanking is configured, cache size |
| `/oberonstats dump <player> [track]` | `oberonstats.admin` | Resolve the main placeholders for a player, right now |
| `/oberonstats why <player> [track]` | `oberonstats.admin` | Explain a player's place on a leaderboard — alias `/oberonstats diag` |
| `/oberonstats board <track> [rows]` | `oberonstats.admin` | The board as the plugin sees it, blanked rows included — alias `/oberonstats rows` |
| `/oberonstats target <player>` | `oberonstats.use` | Point this viewer's `%oberonstats_target_*%` placeholders at somebody |
| `/oberonstats target clear` | `oberonstats.use` | Drop the target |
| `/oberonstats page next\|prev\|first\|all\|reset\|<n> [track]` | `oberonstats.use` | Move the viewer's leaderboard page |
| `/stats [player]` | `oberonstats.use` | Optional, off by default — sets the target and runs `Commands.Stats.Run` |

Omit `[track]` and the first available currency is used.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonstats.admin` | op | `reload`, `status`, `dump` |
| `oberonstats.use` | true | `target`, `page`, `/stats` — the parts a menu button drives |

`oberonstats.use` defaults to everyone on purpose: menu buttons run these commands as the player who clicked them, so locking the node breaks the menu for normal players.

## Diagnosing a menu with `dump`

```
/oberonstats dump MetaElement coins
```

```
Stats » Placeholders for MetaElement on track coins:
 » %oberonstats_balance_coins_of_MetaElement% = 12340$
 » %oberonstats_balance_short_coins_of_MetaElement% = 12k
 » %oberonstats_position_coins_of_MetaElement% = 3
 » %oberonstats_top_name_1_coins% = Rich
 » %oberonstats_top_line_1_coins% = #1 Rich - 98000$
 » %oberonstats_top_size_coins% = 7
```

Two markers matter:

- `(blank)` — the placeholder resolved to nothing. Usually intended (empty rank, zero balance, unranked player).
- `(unparsed)` — the placeholder itself is wrong; PlaceholderAPI would leave it as raw text in a menu.

## "The leaderboard is wrong" — `why`

When somebody insists the top is not the top, this answers it in one command:

```
/oberonstats why huh23 money
```

```
Stats » Why huh23 sits where they do on money:
 » source: economy (also offered by vault)
 » ranking population: NO — this player is not being read at all (2000 ranked, 5321 eligible, 5400 known, CAPPED by Max-Players)
 » leaderboard row: none — not on this board
 » rendered: -
 » snapshot: 2000 row(s), 43s old
 » top 1: someone = 8500000
```

Read it top down — each line rules out one cause:

| Line | What it tells you |
|---|---|
| `source` | **Which** plugin answers for that track. If it says `economy (also offered by vault)`, an ExcellentEconomy currency and the Vault balance share the id and you are seeing the other one's numbers. Rename one — `Sources.Vault.Track-Id`. |
| `ranking population` | Whether this player is read at all. `NO` means `Sources.Active-Within-Days` or `Sources.Max-Players` excluded them, so no balance of theirs can ever appear. |
| `leaderboard row` | Their rank and **raw** value, unformatted — this is where a suspiciously small number shows itself. |
| `rendered` | What a placeholder actually prints for them. |
| `snapshot` | How many rows the board has and how old it is. A stale snapshot explains a value that changed minutes ago. |
| `top 1..3` | The raw values at the head of the board, to compare against what the player claims. |

## "Rank 5 shows nothing" — `board`

A rank that renders as nothing has exactly two causes, and they look identical in a menu. This tells them apart:

```
/oberonstats board stardust 6
```

```
Stats » Board stardust (source economy, 17 row(s), 13 visible, 43s old)
 » #1 Test01 = 993
 » #2 Test02 = 986
 » #3 Test03 = 979
 » #4 Test04 = 972
 » #5 Test05 = 965
 » Source list: 4 row(s) worth nothing, 0 duplicate(s) dropped, sorted: yes
```

The numbered rows are exactly what a menu draws — ranks close up, so `1` through the visible count always render.
The closing note says what had to be corrected on the way there:

| Note | Meaning |
|---|---|
| `N row(s) worth nothing` | Removed by the blanking policy. `Blanking.Hide-Zero-Rows: false` keeps them. |
| `N duplicate(s) dropped` | The source listed a player more than once; the higher value was kept. Common with offline-mode duplicate accounts. |
| `sorted: NO` | The source handed over an unsorted list — OberonStats sorted it before showing it. |

If a rank still renders empty, the board is simply shorter than the menu asks for, and a closing line says so.
Values are printed **raw**, so they are directly comparable with what a player reports in game.
