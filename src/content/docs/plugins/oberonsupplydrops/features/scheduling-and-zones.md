---
title: "Scheduling and placement"
description: "Both can run at once; the earlier of the two always wins."
---

## Two schedule models

Both can run at once; the earlier of the two always wins.

### Interval

Background pacing. A drop every N minutes, with optional random spread so nobody can set a watch by
it.

```yaml
schedule:
  interval:
    enabled: true
    minutes: 30
    jitter-seconds: 300
```

Jitter only ever pushes a drop later, never earlier.

### Fixed times

Events players plan their evening around.

```yaml
  fixed:
    enabled: true
    times: [ "18:00", "21:00" ]
    days: [ ]          # empty = every day, otherwise MONDAY … SUNDAY
```

Times are local to `general.timezone`. Daylight-saving changes are handled by the date rather than by
adding a duration, so a time inside the spring-forward gap shifts forward instead of firing an hour
early, and no time fires twice on the autumn night.

### Gates

```yaml
  min-online-players: 1
  max-active: 2
  retry-seconds: 120
```

A scheduled drop below the player threshold is skipped — events should not fire into an empty
server. `max-active` caps how many crates can exist at once across all worlds, so a busy schedule
cannot flood the map.

A declined cycle no longer forfeits the whole interval. Whichever gate turned it away — the player
threshold, the active cap, or no usable landing site — the cycle retries after `retry-seconds`, so a
server that fills up two minutes later gets its drop two minutes later instead of at the next
interval. At a four-hour interval, being one player short for a single second used to cost four
hours. Set it to `0` to wait out the full interval as builds before this behaviour did.

The reason a cycle was declined is logged once, and again only when it changes, so a quiet server
retrying every two minutes does not fill the console.

## Where crates land

### RANDOM

A ring around world spawn, between `min-distance` and `radius`. Points are sampled by area rather
than by distance, so drops are spread evenly across the ring instead of piling up near its inner
edge.

### ZONES

Named regions from `zones.yml`, picked by weight. The better fit when drops belong in a wilderness, a
PvP arena, or a seasonal event map rather than anywhere on the map.

```yaml
placement:
  mode: ZONES
```

Create one from where you stand — reading coordinates off a map is exactly the step that stops people
from using the feature:

```
/supplydrop zone add northern-wastes 400
/supplydrop zone list
/supplydrop zone remove northern-wastes
```

A zone can restrict which tiers may land in it:

```yaml
zones:
  arena-outskirts:
    world: "world"
    x: -2400
    z: 2400
    radius: 250
    min-radius: 60
    weight: 4
    tiers: [ "rare", "legendary" ]
```

## Site validation

Every candidate is checked before a crate is committed to it:

- Inside the world border
- Landing height inside `min-y`–`max-y`
- Surface block not on `avoid-surface-materials`
- The crate's own block and one of headroom are free
- Open sky above, if `require-sky-access` is on
- At least `min-distance-between-drops` from every other active crate

A candidate that fails is discarded and another is tried, up to `max-attempts`. When the budget runs
out the cycle is skipped and the reason is logged — a crate in an unusable spot is worse than no
crate.

Turn on `general.debug` to see exactly why each candidate was rejected.

## Forcing one

```
/supplydrop spawn                     roll a tier and search for a site, as the scheduler would
/supplydrop spawn legendary           the same, with the tier chosen
/supplydrop spawn legendary here      at your feet, skipping the search entirely
```

`here` skips validation on purpose: somebody standing where they want the crate has already made the
judgement the search exists to automate.
