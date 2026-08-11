---
title: "Leaderboards"
description: "One row per rank with the player's head — from live data with nothing installed, or from a real leaderboard plugin."
---

`dynamic-body` writes **body lines**, one per row. That is what a top-10 is.

There are two ways to fill it, and the only difference is `source`.

## From a live source — works with nothing installed

```yaml
type: notice
title: "<aqua><b>Online now</b></aqua>"

body:
  - type: text
    text: "<dark_gray>──────────────────────"
    width: 300

dynamic-body:
  source: online_players_all
  width: 300
  template: "<aqua>#$(i) <head:$(player_name)> <white>$(player_name) <gray>— <dark_aqua>$(player_world)"

ok-button:
  label: "<gray>Back"
  actions: ["[back]"]
```

`$(i)` is the row number, starting at 1. The other tokens are the source's own fields — the same three sources as [Dynamic lists](/plugins/ddialogs/features/dynamic-lists).

**No `fields:` and no `count:`** — a live source brings its own values and decides how many rows there are.

This is the one to open first: it needs no PlaceholderAPI, no leaderboard plugin and no waiting for data.

## From ranked placeholders — a real leaderboard

A leaderboard's ranks are numbered, not listed, so each rank is a separate placeholder:

```yaml
dynamic-body:
  source: placeholder
  count: 10
  skip-empty: true
  width: 300
  fields:
    name:  "%ajlb_lb_statistic_player_kills_$(i)_alltime_name%"
    value: "%ajlb_lb_statistic_player_kills_$(i)_alltime_value%"
  template: "<red>#$(i) <head:$(name)> <white>$(name) <gray>— <red>$(value) kills"
```

**How `$(i)` works here:** the index goes into the pattern *first*, then the result is expanded. Row 3 turns

```
%ajlb_lb_statistic_player_kills_$(i)_alltime_name%
```

into

```
%ajlb_lb_statistic_player_kills_3_alltime_name%
```

which PlaceholderAPI then resolves. One pattern, ten placeholders, instead of ten near-identical lines.

## Every key

| Key | Meaning |
|---|---|
| `source` | `placeholder`, or any row source |
| `count` | how many ranks to try — `placeholder` only |
| `fields` | the placeholder behind each token — required by `placeholder`, ignored otherwise |
| `template` | the line to repeat |
| `skip-empty` | drop ranks nobody holds. Default `true` |
| `width` | line width, default 300 |

## skip-empty

On a server with three players, ranks 4–10 resolve to nothing. Without `skip-empty` you get seven blank lines; with it they disappear.

It also drops a row whose fields are **still unexpanded placeholders** — which is what you get when the leaderboard expansion is not installed at all. So a board on a server without ajLeaderboards renders as a title and a divider with nothing under it, rather than ten rows of literal `%ajlb_lb_..._name%`.

A half-resolved row still renders: `Steve — %missing%` keeps its Steve.

## Setting up a real board

The examples use **ajLeaderboards**, which needs PlaceholderAPI and one command per board:

```bash
/ajlb add vault_eco_balance
```

```bash
/ajlb add statistic_player_kills
```

```bash
/ajlb add statistic_hours_played
```

```bash
/ajlb add statistic_mine_block
```

The `Statistic` and `Vault` expansions come from `/papi ecloud download Statistic` and `/papi ecloud download Vault`.

Until ajLeaderboards has gathered data the rows show its own "Loading" text; they fill in on their own.

Using a different leaderboard plugin? Point `fields` at its placeholders. The template does not care where the name and value come from.

:::tip[Hours, not pretty time]
`%statistic_hours_played%` ranks cleanly. `%statistic_time_played%` is prettier — "1d 2h" — but it is not a number, so it cannot be sorted into a board.
:::

## Static and generated lines together

Static `body` lines always come first, generated rows after. That is how a heading and a divider stay above the table:

```yaml
body:
  - type: text
    text: "<gray>Faction: <white>%dfactions_faction_name%"
    width: 320
  - type: text
    text: ""
  - type: text
    text: "<dark_gray>──────── <gray>Top killers <dark_gray>────────"
    width: 320

dynamic-body:
  source: placeholder
  ...
```

## A leaderboard hub

A chooser is just a small `multi_action` whose buttons open one board each — three columns fits six boards without scrolling:

```yaml
type: multi_action
title: "<gold><b><item:gold_ingot> Leaderboards</b></gold>"
columns: 2

open:
  command: leaderboards

body:
  - type: text
    text: "<white>Choose a leaderboard below."
    width: 300

buttons:
  - label: "<item:gold_ingot> <white>Money"
    width: 150
    actions: ["[dialog] lb-money"]

  - label: "<item:iron_sword> <white>Kills"
    width: 150
    actions: ["[dialog] lb-kills"]

  - label: "<item:heart_of_the_sea> <white>Playtime"
    width: 150
    actions: ["[dialog] lb-playtime"]

  - label: "<item:diamond_pickaxe> <white>Mining"
    width: 150
    actions: ["[dialog] lb-mining"]

exit-button:
  label: "<item:book> <white>Back"
  width: 100
  actions: ["[back]"]
```

## Body, not buttons

`dynamic-body` writes text lines; `dynamic-list` writes buttons. A top-10 as ten buttons looks wrong and invites clicks that do nothing — which is why they are separate keys.
