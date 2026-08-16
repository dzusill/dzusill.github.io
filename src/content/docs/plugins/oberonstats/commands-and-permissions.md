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
