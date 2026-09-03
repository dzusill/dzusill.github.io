---
title: "Hype Train"
description: "A burst of purchases starts a train that climbs a ladder of levels, extending its own timer as more purchases land, up to a hard cap. One train runs at a…"
---

A burst of purchases starts a train that climbs a ladder of levels, extending its own timer as more purchases land, up to a hard cap. One train runs at a time. Off by default (`hype.yml` → `enabled: false`).

## Starting a train

All of these must be satisfied within `start.window-seconds`:

- `start.min-amount` — total raised in the window
- `start.min-purchases` — number of purchases
- `start.min-unique-donors` — distinct donors

`start.cooldown-seconds` is the minimum gap after a train ends before another can start. `start.eligible-packages` / `ignored-packages` restrict which packages count toward starting one at all (empty = every package counts).

`/donations hype start` force-starts one immediately, bypassing every threshold above — useful for testing the announcement chain without waiting for real purchases.

## The timer

`timer.base-seconds` is how long a freshly-started train runs; each further purchase adds `timer.extend-seconds-per-purchase`, up to `timer.max-seconds` measured from the start — without that ceiling, a busy evening could keep one train alive indefinitely.

## Levels

`hype.yml` → `levels` is the ladder, keyed by number, fired once each in ascending order. A level's `require` block can combine `amount`, `purchases` and `unique-donors` — every criterion actually stated must be met; a criterion left at `0` is not stated at all and is ignored.

```yaml
levels:
  1:
    name: Warming Up
    require:
      amount: 25.0
    rewards:
      commands: []           # run once, as console
      player-commands: []    # run once per contributing donor, %player% substituted
```

Server-wide unlocks are just console commands in `rewards.commands`; per-donor rewards go in `rewards.player-commands`.

## Combo multiplier (optional, off by default)

`combo.enabled: true` makes purchases close together in time (`combo.window-seconds`) count for **more** toward reaching a level — `combo.multiplier-step` per rapid purchase, capped at `combo.max-multiplier`. This only affects how quickly the ladder climbs: the real money recorded, donor statistics and any reward payout are never multiplied. Off by default because it is the setting most easily configured into meaninglessness — a low `max-multiplier` with a wide window makes normal donation pacing look artificially "combo'd."

## Leaderboard

`leaderboard.size` — how many top contributors are tracked for that train, feeding the `{hype_top_name}` / `{hype_top_amount}` and numbered `{hype_top_<n>_name}` placeholders in announcements.

## Announcing it

Presentation lives entirely in `announcements.yml`, under the `hype-start`, `hype-level`, `hype-complete` and `hype-expired` events — this file only decides the mechanics. See [Announcements](/plugins/oberondonations/features/announcements/) and the placeholder list in [Placeholders](/plugins/oberondonations/placeholders/#hype-train).

## Commands

| Command | Does |
|---|---|
| `/donations hype info` | Current level, total, donor count, time left — or that none is running |
| `/donations hype start` | Force-start one |
| `/donations hype stop` | End the current one early |

## See also

- [GG Wave](/plugins/oberondonations/features/gg-wave/) — the other purchase-driven event, independent of this one
- [hype.yml reference](/plugins/oberondonations/configuration/hype-yml/)
