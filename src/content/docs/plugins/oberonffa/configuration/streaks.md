---
title: "streaks.yml"
description: "(config.yml broadcasts.milestone decides who hears it)."
---

```yaml
milestones:
  "10":
    rewards: [ stardust-1000, ffa-key ]
    broadcast: true
repeat:
  enabled: true
  every: 5
  from: 25
  rewards: [ stardust-2500 ]
  broadcast: true
shutdown:
  enabled: true
  min-streak: 5
  tiers:
    "10":
      rewards: [ stardust-1500 ]
      broadcast: true
```

- `milestones."<streak>"`: paid once per streak when it reaches that number. `broadcast` announces it
  (config.yml `broadcasts.milestone` decides who hears it).
- `repeat`: every `every` kills from `from`. A streak that also has its own milestone pays only that one.
- `shutdown`: killing a player whose streak was at least `min-streak` pays the killer the highest tier at
  or below the victim's streak. `%victim_streak%` works in its reward commands.

Reward names that rewards.yml does not have are reported in the console and skipped. A milestone or tier
you delete stays deleted after updates.
