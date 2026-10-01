---
title: "Quick start"
description: "A working zone in five minutes."
---

A working zone in five minutes.

## 1. The region

In the world and region named in `zones.yml` (by default region `afk` in world `spawn`):

```
/rg define afk
```

Check it from the console or in game:

```
/afk zone list
```

```
AFK zones
▪ afk spawn/afk, every 30m 0s | active | 0 inside
```

`region missing` means WorldGuard has no region by that name in that world; the console says the same
at startup and after `/afk reload`.

## 2. A landing point

Stand where players should arrive and run:

```
/afk zone setspawn afk
```

Run it again to add more points — one is picked at random each time, which spreads players out.

## 3. Your rewards

Open `rewards.yml`. The shipped table pays through three commands, which you replace with whatever your
server uses:

```yaml
cash-25k:
  weight: 35
  type: COMMAND
  display: "<#00FC00>$25,000"
  commands:
    - "eco give %player% 25000"
```

Then check what you wrote without waiting for anyone to stand in the zone:

```
/afk reload
/afk reward list
/afk reward test afk 10000
```

`reward test` rolls the zone ten thousand times, gives nothing to anybody, and prints how often each
reward came up next to how often its weight says it should.

## 4. Try it

Set `interval: 10s` in `zones.yml` for a minute, `/afk reload`, stand in the region and watch the action
bar count down. Put the interval back afterwards.

```
/afk reward give <you> afk diamonds
```

delivers a reward on demand to test the whole path — inventory, storage, messages, history.
