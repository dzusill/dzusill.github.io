---
title: "keyall.yml"
description: "The recurring crate drop — a wall-clock timer and a weighted tier table."
---

Every `interval`, one tier is drawn at random and its reward sequence runs.

## Weights are independent

```yaml
tiers:
  - id: orbital
    weight: 94
  - id: plasma
    weight: 5
  - id: andromeda
    weight: 1
```

`94 / 5 / 1` means 94%, 5% and 1%. They do not have to add up to 100 — a tier's chance is its weight
divided by the total.

This matters when you add one. Written as thresholds (`roll <= 94`, `roll <= 99`, else) a fourth
crate means recalculating every boundary by hand, and getting one wrong is silent. Here you add a
weight and the others keep meaning what they meant.

## A full tier

```yaml
  - id: orbital
    weight: 94
    commands:
      - "crates givekeyall orbital-crate"
    announce:
      actionbar: "<gradient:#C21807:#F11800><b>Key All</b></gradient> <dark_gray>» <green>+1 Orbital Crate Key"
      sound: {name: entity.experience_orb.pickup, volume: 1.0, pitch: 1.0}
    then:
      - delay: 1s
        commands:
          - "stardust giveall 500 -s"
        announce:
          actionbar: "<#8C6DA0>+500✨"
          sound: {name: block.amethyst_block.chime, volume: 3.0, pitch: 1.0}
```

A tier is a **sequence of steps**. The first is the tier itself; each entry under `then` waits its
`delay` and then runs. There is no limit on how many.

Commands run from console. `<tier>` expands to the tier id, `<player>` to each online player's name.
Because they are plain strings, your crates and economy plugins can be swapped without touching
OberonUtils.

## Timing

```yaml
interval: 1h
next-drop-at: 0
require-online-players: 0
clamp-interval:
  min: 10s
  max: 30d
```

`next-drop-at` is an absolute wall-clock timestamp the plugin maintains. That is what makes the
interval an actual hour rather than "an hour of ticks that arrived on time" — a counter that
decrements once per scheduled tick drifts under any TPS loss, and a restart freezes it entirely.
Leave it at `0` and the first drop is scheduled one interval after startup.

`require-online-players` holds the drop when fewer than that many players are online, rather than
firing it into an empty server at 4am. `0` fires regardless.

`clamp-interval` is a guard: a corrupted interval would otherwise mean a key-all every tick.

## Announcements

```yaml
    announce:
      actionbar: "..."
      chat: "..."
      sound: {name: ..., volume: 1.0, pitch: 1.0}
```

`actionbar` and `chat` are separate — set either, both, or neither. Chat lines only send when
`extras.chat-announcement` is on.

## Extras

```yaml
extras:
  chat-announcement: false
  bossbar-countdown: 0s
  bossbar:
    text: "<gradient:#C21807:#F11800><b>Key All</b></gradient> <gray>in <white><time>"
    colour: RED
    style: PROGRESS
  log-drops: false
```

- **`chat-announcement`** also sends to chat, so a player joining mid-sequence can still see what
  dropped. The action bar alone leaves no trace.
- **`bossbar-countdown`** shows a bar for the final stretch. `0s` is off.
- **`log-drops`** writes each drop and its tier to console — useful for checking the odds over time.

## Commands

| Command | Does |
|---|---|
| `/keyall time` | How long until the next drop |
| `/keyall next` | Time remaining plus the configured odds |
| `/keyall force [tier]` | Drop now. Names a tier, or rolls for one |
| `/keyall reset` | Restart the interval from now |

`/keyall force` reschedules the next drop too, so using it for an event does not double up later.

## Placeholders

```yaml
placeholders:
  identifier: oberon
  timer-format:
    hours: "<h>h <m>m <s>s"
    minutes: "<m>m <s>s"
    seconds: "<s>s"
```

The identifier is unchanged from the Skript expansion, so anything already showing
`%oberon_keyall_timer%` keeps working with no edit.

[All placeholders →](/plugins/oberonutils/placeholders/)
