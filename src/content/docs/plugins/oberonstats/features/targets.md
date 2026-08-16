---
title: "Other Players"
description: "/stats is easy — it is /stats <player> that ExcellentEconomy cannot do, because every one of its player placeholders resolves for whoever is looking at the…"
---

`/stats` is easy — it is `/stats <player>` that ExcellentEconomy cannot do, because every one of its player placeholders resolves for whoever is looking at the screen.

OberonStats offers two ways, and ships both because which one you need depends on your menu plugin.

## Mode A — name the player in the placeholder

```
%oberonstats_balance_coins_of_Notch%
%oberonstats_position_ordinal_coins_of_Notch%
```

Everything after the first `_of_` is the player name, so names with underscores work. Use this when your menu plugin can build a placeholder string out of a command argument or a clicked player.

## Mode B — a session target

When the menu plugin cannot inject an argument, have a button set the target first:

```
/oberonstats target <player>
```

and then use the `target_` placeholders:

```
%oberonstats_target_name%
%oberonstats_target_online%
%oberonstats_target_balance_coins%
%oberonstats_target_position_ordinal_coins%
```

The target belongs to the viewer, so two players browsing at once never see each other's. It expires after `Targets.Session-TTL-Seconds` (default 300) and is dropped when the player quits — a stale target pointing at a leaderboard that has since been rebuilt helps nobody.

Clear it early with `/oberonstats target clear`.

### Optionally, `/stats` itself

OberonStats can own `/stats` if nothing else does:

```yaml
Commands:
  Stats:
    Enabled: true
    Run: "dialog show oberon:stats"
```

`/stats [player]` then sets the target and runs that command — `%player%` inside it is replaced with the name. It is **off by default** so a menu plugin's own `/stats` keeps working after you install this.

## Where the numbers come from

| Situation | Source | Cost |
|---|---|---|
| Target is online | ExcellentEconomy's live cache | instant, always current |
| Target is ranked (online or not) | the leaderboard snapshot | instant, as fresh as the last rebuild |
| Target is in neither | asynchronous database lookup | **blank on this redraw**, correct on the next |

That last row is deliberate. A placeholder is resolved on the server thread; waiting for a database there would freeze the server for everybody. So the first request for an unknown player returns blank and starts one load in the background; the answer is cached for `Targets.Cache-TTL-Seconds` (default 60) and appears the next time the menu redraws.

A menu with twenty placeholders about the same unknown player starts **one** load, not twenty.

## Turning it off

```yaml
Targets:
  Enabled: false
```

Both modes then answer blank — useful if you want players to see only their own numbers.
