---
title: "Cooldowns & Duplicates"
description: "Two separate guards. The cooldown limits a player; the duplicate window limits a link."
---

Two separate guards. The cooldown limits **a player**; the duplicate window limits **a link**.

## Cooldowns

```yaml
cooldowns:
  default-seconds: 30
  tiers: {}
```

Every player starts on `default-seconds`. Tiers are ordinary permission nodes:

```yaml
cooldowns:
  default-seconds: 300
  tiers:
    media:
      permission: dlive.cooldown.media
      seconds: 60
    partner:
      permission: dlive.cooldown.partner
      seconds: 15
```

A player holding more than one tier gets **the shortest** time, so stacking ranks never makes
somebody slower. Because tiers are plain permissions, LuckPerms manages them and dLive never needs to
depend on it.

`dlive.cooldown.bypass` skips the cooldown entirely. It also skips duplicate protection — grant it
deliberately.

The remaining time is available as `%dlive_cooldown%` for scoreboards, and the cooldown message tells
the player how long is left.

## Duplicate protection

```yaml
url-security:
  duplicate-window-seconds: 30
```

The same link cannot be announced twice inside the window, by anybody. Set it to `0` to switch it off.

This works on the [normalised](/plugins/dlive/features/link-security/) form of the link, so trailing slashes and host casing
cannot be used to slip a repeat past it.

There are two layers:

- **An in-memory reservation**, taken the moment an announcement starts. Two players hitting enter in
  the same tick cannot both get through, which a database check alone would allow.
- **A history query**, covering the window across restarts and across servers sharing one MySQL
  database.

Both are skipped for players with `dlive.cooldown.bypass`.

## Why a streamer might be refused

The message tells them which guard fired, but for your own reference:

| Message | Means |
|---|---|
| cooldown | this player announced recently |
| duplicate | this *link* was announced recently, possibly by somebody else |
| operation pending | their previous request is still being written; they clicked twice |
| not ready | they joined seconds ago and their data is still loading |
