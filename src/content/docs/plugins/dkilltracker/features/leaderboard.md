---
title: "Leaderboard"
description: "Aliases: /ktop, /topkills. Permission killtracker.top, granted to everyone by default."
---

## In game

```
/killtop
```

Aliases: `/ktop`, `/topkills`. Permission `killtracker.top`, granted to everyone by default.

```
────────── Top Killers ──────────
1. Alice - 132 kills (Warlord)
2. Bob - 87 kills (Slayer)
3. Carol - 41 kills (Slayer)
```

## Configuration

```yaml
Leaderboard:
  Enabled: true
  Top-Size: 10
```

`Enabled: false` unregisters the command entirely — useful when you'd rather present the ranking through a hologram or a web panel and not have a second, differently-formatted version in chat.

`Top-Size` is how many rows `/killtop` prints. It also caps how far the `top_*` placeholders can reach.

## Ordering

Ranked by **counted kills**, descending. Ties are broken by lifetime kills, so between two players on 50 counted kills the one who has actually fought more comes first.

Players with zero counted kills never appear, however many lifetime kills they have — a leaderboard of farmers who scored nothing would be a strange thing to publish.

## Placeholders

```
%killtracker_top_name_1%     Alice
%killtracker_top_kills_1%    132
%killtracker_top_name_2%     Bob
%killtracker_top_kills_2%    87
```

Out-of-range slots return `-` for names and `0` for counts, so a 10-line hologram on a server with three players doesn't render errors.

A player's own position:

```
%killtracker_position%       3
```

Returns `0` when they're unranked (no counted kills).

### Hologram example

```
&6&lTOP KILLERS
&e#1 &f%killtracker_top_name_1% &7- &c%killtracker_top_kills_1%
&e#2 &f%killtracker_top_name_2% &7- &c%killtracker_top_kills_2%
&e#3 &f%killtracker_top_name_3% &7- &c%killtracker_top_kills_3%
```

## Performance

The leaderboard is computed from the in-memory cache, never from disk or the database. `/killtop` and the placeholders are free to call as often as you like — a hologram refreshing every second is fine.

## Names

The stored name is refreshed every time a player kills, dies or is touched by an admin command. A player who renamed and hasn't played since will show their old name until they next appear.

## Wiping it

There is no "reset the leaderboard" command — it is a view over the kill data, so resetting it means resetting kills. For a season reset, stop the server and delete `kills.yml` (or truncate `killtracker_stats`). Take a copy first if you want a hall of fame.
