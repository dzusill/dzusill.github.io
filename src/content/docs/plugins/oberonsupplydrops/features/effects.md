---
title: "The visual layer"
description: "What makes a drop read as an event rather than a chest appearing out of nowhere. All of it is"
---

What makes a drop read as an event rather than a chest appearing out of nowhere. All of it is
vanilla — no resource pack, no client mod, and nothing a player has to install.

```yaml
effects:
  view-distance: 96
  trail:
    enabled: true
    particle: CAMPFIRE_COSY_SMOKE
    count: 4
  beam:
    enabled: true
    height: 40
    step: 1.0
    period-ticks: 10
  impact:
    enabled: true
    particle: EXPLOSION
    count: 1
  hologram:
    enabled: true
    offset: 1.8
```

## The descent

The crate is a **block display entity** moved down by a task, not a falling block.

That is a deliberate choice. A falling block is at the mercy of physics: it can be pushed by a
piston, land in water, turn into an item, or place itself somewhere the plugin never chose. A display
entity lands exactly where and when the schedule says it will — which is the only version the
countdown can be honest about.

```yaml
phases:
  descent:
    enabled: true
    height: 45
    blocks-per-second: 14
```

Fall time is `height / blocks-per-second`, and it is added to the announcement lead, so the crate
lands `announce-lead-seconds + 3.2s` after the warning with the defaults.

Turning it off makes the crate simply appear. Worth doing on a server where the extra entity per drop
is not wanted, or where the drop should be a surprise rather than a countdown.

## The trail

Particles behind the falling crate, once per tick. `count` is how many per spawn — raise it for a
thicker smoke column, lower it on a busy server.

Any particle name works. `CAMPFIRE_COSY_SMOKE` reads as a smoke trail; `FLAME` reads as burning
wreckage; `END_ROD` reads as something engineered.

## The beam

A vertical particle column marking the site, in the tier's own `colour`, so a legendary crate is a
different colour on the horizon before anyone can read a name.

| Key | Effect |
|---|---|
| `height` | How far up the beam goes — this is the render distance in practice |
| `step` | Vertical spacing between particles; smaller is denser and costs more |
| `period-ticks` | How often it is redrawn |

The beam is what makes hidden coordinates playable. With
`notifications.reveal-coordinates: false` it is the only thing pointing at the crate from a distance.

## The impact

A one-off burst when the crate lands. `EXPLOSION` is the shipped default and is purely cosmetic — no
block is damaged and nothing is hurt.

## The hologram

Floating text above the crate, rendered with a vanilla text display. It swaps between two line lists
as the crate unlocks:

```yaml
# messages.yml
hologram:
  locked:
    - "{tier}"
    - "<white>Opens in <#00F986>{time}"
    - "<#7E7E7E>{x}, {z}"
  open:
    - "{tier}"
    - "<#00F986><bold>OPEN"
    - "<#7E7E7E>Right-click to loot"
```

`offset` is its height above the crate block. Keep the lines short — a hologram is read at a glance
from thirty blocks away, usually while running.

## Cost

`effects.view-distance` is the one setting that matters for performance. Nothing is sent to a player
outside it, so a drop on the far side of the map costs a distance check per player per tick and
nothing else.

Everything else is bounded by design:

- Display entities are non-persistent and tagged, so they never accumulate in the world save.
- The beam is redrawn on a period, not every tick.
- One task drives every live drop at 2 Hz; there is no per-drop timer.
- The descent task is the only per-drop task, and it exists only while the crate is falling.

If a server is struggling, turn the beam off first — it is the only effect that scales with height
rather than being a single burst.

## Turning it all off

```yaml
effects:
  trail: { enabled: false }
  beam: { enabled: false }
  impact: { enabled: false }
  hologram: { enabled: false }
phases:
  descent: { enabled: false }
```

The events still run identically. This is a supported configuration, not a degraded one — it is also
how the automated tests exercise the lifecycle.
