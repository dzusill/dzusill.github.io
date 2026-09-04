---
title: "Quick start"
description: "Five minutes from install to a drop players will chase."
---

Five minutes from install to a drop players will chase.

## 1. Pick the world

```yaml
# config.yml
worlds:
  - "world"
```

A world that is not listed is never used, and `/supplydrop spawn` in it is refused.

## 2. Decide where crates land

The default is a ring around world spawn:

```yaml
placement:
  mode: RANDOM
  radius: 2000        # never further out than this
  min-distance: 500   # never closer in than this
```

Set `min-distance` above your spawn-protection radius. Set `radius` to somewhere players can
realistically reach in the time the countdown gives them — a 5,000-block radius with a two-minute
countdown means nobody ever arrives.

## 3. Set the pace

```yaml
schedule:
  interval:
    enabled: true
    minutes: 30
    jitter-seconds: 300   # so players cannot set a watch by it
  min-online-players: 1
  max-active: 2
```

For events people plan around, add fixed times as well:

```yaml
  fixed:
    enabled: true
    times: [ "18:00", "21:00" ]
    days: []              # empty means every day
```

Both models can run at once.

## 4. Tune the countdown

```yaml
phases:
  unlock-seconds: 120     # travel time; 0 opens the crate on landing
  despawn-seconds: 600    # how long an unclaimed crate survives
```

The countdown is the feature. It is what turns a crate into a race — long enough that several people
arrive together, short enough that nobody loses interest.

## 5. Try it

```
/supplydrop spawn
```

Forces a drop immediately, exactly as the scheduler would make it. Add a tier name to force a
specific one, or `here` to put it at your feet:

```
/supplydrop spawn legendary
/supplydrop spawn legendary here
```

Then `/supplydrop preview` to see what players see before they commit to the run.

## 6. Make the loot yours

`tiers.yml` ships a working three-tier example. Change the item lists, keep the shape. See
[Tiers and loot](/plugins/oberonsupplydrops/features/tiers-and-loot/).

## Common first adjustments

| You want | Change |
|---|---|
| Drops nobody can find in time | Lower `placement.radius`, or raise `phases.unlock-seconds` |
| A harder hunt | `notifications.reveal-coordinates: false` |
| Less chat noise | `notifications.chat: false` — the boss bar and beam still show |
| Drops only in one area | `placement.mode: ZONES`, then `/supplydrop zone add <name> <radius>` |
| No falling-crate show | `phases.descent.enabled: false` |
