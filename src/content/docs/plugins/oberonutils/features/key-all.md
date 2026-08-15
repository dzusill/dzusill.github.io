---
title: "Key All"
description: "A recurring weighted crate drop on a wall-clock timer, with a countdown placeholder."
---

Every interval, one crate tier is drawn by weight and its reward sequence runs for everyone online.

## The timer runs on real time

`next-drop-at` is an absolute timestamp, not a counter.

A counter that decrements once per scheduled tick is always slightly behind: under any TPS loss the
task runs late, the error accumulates all day, and "one hour" is reliably longer than an hour. A
restart freezes it entirely — the value persists, but no time passes while the server is down.

A timestamp has neither problem. A missed tick costs nothing, and downtime counts.

## One deadline drops once

The next deadline is written **before** any reward is handed out, and the dispatcher refuses to
re-enter while it is already running.

This is worth stating because the obvious ordering is wrong. Reset the counter *after* the rewards,
and a reward sequence that waits a second in the middle leaves the counter at zero for that whole
second — long enough for the once-a-second check to fire the entire drop a second time. Two crate
key-alls and two currency payouts from one scheduled drop.

## Tiers are weighted, not thresholded

```yaml
tiers:
  - id: orbital
    weight: 94
  - id: plasma
    weight: 5
  - id: andromeda
    weight: 1
```

Independent weights, so adding a fourth tier does not change what the other three mean. Written as
`roll <= 94` / `roll <= 99` / else, inserting one means recomputing every boundary, and an error
there is invisible.

## A tier is a sequence

```yaml
  - id: orbital
    weight: 94
    commands: ["crates givekeyall orbital-crate"]
    announce:
      actionbar: "..."
      sound: {name: entity.experience_orb.pickup}
    then:
      - delay: 1s
        commands: ["stardust giveall 500 -s"]
        announce:
          actionbar: "<#8C6DA0>+500✨"
          sound: {name: block.amethyst_block.chime, volume: 3.0}
```

Any number of steps, each with its own delay, commands, announcement and sound. Commands run from
console as plain strings, so the crates and economy plugins behind them can be swapped without
touching this one.

## Not into an empty server

```yaml
require-online-players: 1
```

Holds the drop until enough players are on, instead of spending it at 4am on nobody. It does not
reschedule — the moment the threshold is met, it fires.

Set to `0` to keep the old behaviour of firing regardless.

## Admin control

```
/keyall time            how long until the next drop
/keyall next            time remaining plus the configured odds
/keyall force [tier]    drop now, named or rolled
/keyall reset           restart the interval from now
```

`/keyall force` reschedules the next drop as well, so triggering one for an event does not leave a
second one queued behind it.

## The placeholder

`%oberon_keyall_timer%` — identifier and format both unchanged from the Skript expansion, so an
existing scoreboard keeps working with no edit.

[All placeholders →](/plugins/oberonutils/placeholders/) ·
[keyall.yml →](/plugins/oberonutils/configuration/keyall/)
