---
title: "hype.yml"
description: "The Hype Train's mechanics. Presentation lives in announcements.yml instead — see Hype Train for how the ladder and timer actually work together."
---

The Hype Train's mechanics. Presentation lives in `announcements.yml` instead — see [Hype Train](/plugins/oberondonations/features/hype-train/) for how the ladder and timer actually work together.

```yaml
enabled: false

start:
  min-amount: 10.0
  min-purchases: 1
  min-unique-donors: 1
  window-seconds: 300
  cooldown-seconds: 1800
  eligible-packages: []
  ignored-packages: []

timer:
  base-seconds: 600
  extend-seconds-per-purchase: 60
  max-seconds: 3600

combo:
  enabled: false
  window-seconds: 60
  multiplier-step: 0.1
  max-multiplier: 2.0

leaderboard:
  size: 5

levels:
  1:
    name: Warming Up
    require:
      amount: 25.0
    rewards:
      commands: []
      player-commands: []
  2:
    name: Picking Up Speed
    require:
      amount: 60.0
      unique-donors: 3
    rewards:
      commands: []
      player-commands: []
  3:
    name: Full Steam
    require:
      amount: 120.0
      unique-donors: 5
    rewards:
      commands: []
      player-commands: []
```

`levels` keys are numbers, fired once each in ascending order; add or remove levels freely. A `require` criterion left at `0` is treated as not stated and ignored, rather than as "must be exactly zero."

## See also

- [Hype Train](/plugins/oberondonations/features/hype-train/)
- [Reloading](/plugins/oberondonations/configuration/reloading/)
