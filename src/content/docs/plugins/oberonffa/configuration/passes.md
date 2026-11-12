---
title: "passes.yml"
description: "With rules.alt-guard.rewards-per-ip each tier pays one account per address group."
---

```yaml
passes:
  weekly:
    enabled: true
    display: "<gradient:#C21807:#F11800>Weekly Pass</gradient>"
    period: WEEKLY
    stat: KILLS
    permission: ""
    slot: 20
    icon:
      material: NETHER_STAR
      name: "{pass}"
      lore:
        - "<#AAAAAA>Kills this week: <white>{progress}"
      glow: false
    tiers:
      - at: 10
        rewards: [ stardust-500 ]
      - at: 25
        rewards: [ mace-t1-use ]
        icon:
          material: MACE
    auto-claim-on-reset: true
```

| Key | Meaning |
|---|---|
| `enabled` | `false` hides the pass and stops it paying |
| `display` | `{pass}` in menus and messages |
| `period` | `DAILY`, `WEEKLY`, `MONTHLY` or `LIFETIME`; progress starts at 0 each period |
| `stat` | `KILLS` or `BEST_STREAK` |
| `permission` | Only holders see and claim it; `""` for everyone |
| `slot`, `icon` | Its icon in the main menu (`-1` hides it). `{pass}` `{progress}` `{progress_raw}` `{claimable}` `{tiers}` `{period}` |
| `tiers` | A list; each `at`, `rewards` and an optional `icon` over the state's look in gui.yml. Sorted by `at`. A claim belongs to the threshold, so adding or removing tiers never makes a claimed tier claimable again; two tiers at the same `at` — only the first is kept |
| `auto-claim-on-reset` | Hand over unclaimed unlocked tiers when the period ends (offline: at the next join) |

With `rules.alt-guard.rewards-per-ip` each tier pays one account per address group.
