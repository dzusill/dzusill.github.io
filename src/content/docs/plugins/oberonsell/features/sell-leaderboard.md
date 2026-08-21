---
title: "Sell Leaderboard"
description: "An all-time ranking of who has earned the most from selling. One player head per row, ranked by lifetime"
---

```
/selltop        (alias /sellleaderboard)
```

An all-time ranking of who has earned the most from selling. One player head per row, ranked by lifetime
earnings.

Needs `oberonsell.selltop`, granted to everyone by default. With nobody on the board yet the command
replies with `top.empty` instead of opening an empty menu.

## What it ranks

Every player record in `playerdata.yml`, not just the ones currently online. A player is on the board if
they have earned anything **or** sold anything; rows worth nothing and holding nothing are left off.

Ties break in this order: money, then items sold, then name (case-insensitively). Money is compared exactly
rather than as a `double`, so two players a cent apart at the top of a long-running board do not collapse
into a tie.

A malformed hand-edited row is skipped rather than taking the whole leaderboard down.

## The page

`gui/sell-top.yml`:

```yaml
rows: 6
title: "<#C21807>💲 <b><gradient:#C21807:#F11800>Sell Top</gradient></b>"
top-limit: 45

grid-filler:
  item: "BLACK_STAINED_GLASS_PANE"
  name: " "

bottom-row:
  filler-item: "GRAY_STAINED_GLASS_PANE"
  filler-name: " "

entry:
  material: "PLAYER_HEAD"
  name: "<#C21807>#{rank} {player}"
  lore:
    - "<#AAAAAA>Amount: <#C21807>{items}"
    - "<#AAAAAA>Money Earned: <#00FC00>${money}"
```

| Key | Default | What it does |
|---|---|---|
| `rows` | `6` | Page height, clamped to `1`–`6` |
| `title` | `Sell Top` | Any colour dialect |
| `top-limit` | `45` | How many ranks to draw. Clamped to `1`–`(rows − 1) × 9` |
| `grid-filler.item` / `.name` | glass | Fills the ranked area below the last real row. Blank for none |
| `bottom-row.filler-item` / `.filler-name` | glass | Fills the bottom row |
| `entry.material` | `PLAYER_HEAD` | Icon per rank. A skull is textured with that player's head |
| `entry.name`, `entry.lore` | see above | The icon's text |

Tokens on `entry.name` and `entry.lore`: `{rank}`, `{player}`, `{items}`, `{money}`.

The page does **not** paginate — `top-limit` is the whole board, and it cannot exceed the slots above the
bottom row.

> `{money}` is already formatted by your economy plugin and may include its currency symbol. The shipped
> lore writes a `$` in front of it; drop that if your economy adds one of its own.

## Placeholders

There are **no** sell-leaderboard placeholders yet. `%oberonsell_top_*%` is not implemented — the ranking
exists only as the `/selltop` menu. See [Placeholders](/plugins/oberonsell/placeholders/).

## Storage

The board is read from the YAML player store. There is no SQL backend, so it ranks the players on this
server only. See [`storage`](/plugins/oberonsell/configuration/config/#storage).
