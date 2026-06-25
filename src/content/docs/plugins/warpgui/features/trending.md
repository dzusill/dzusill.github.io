---
title: "Trending"
description: "The Trending tab surfaces warps that are popular right now, based on recent teleport traffic with a time decay so old spikes fade away. Enable it with…"
---

The **Trending** tab surfaces warps that are popular *right now*, based on recent teleport traffic with a time decay so old spikes fade away. Enable it with `Settings.Trending.Enabled`.

```yaml
Settings:
  Trending:
    Enabled: true
    DecayFactor: 0.9
    DecayMinutes: 1440
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `true` | Toggle the Trending tab. |
| `DecayFactor` | `0.9` | Fraction of the trending score kept after each decay interval. `0.9` = lose 10% per period. |
| `DecayMinutes` | `1440` | Length of one decay interval, in minutes. `1440` = one day. |

## How it works

- Each teleport to a warp bumps its trending score.
- Every `DecayMinutes`, every warp's score is multiplied by `DecayFactor`.

So a warp that was hammered last week but is quiet now slowly slides down, while a warp getting visits today climbs. Tuning:

- **Lower `DecayFactor`** (e.g. `0.7`) → trending reacts faster, favours very recent activity.
- **Higher `DecayFactor`** (e.g. `0.97`) → smoother, rewards sustained popularity.
- **Shorter `DecayMinutes`** → decay applies more often.

> Trending is distinct from [Recommended](/plugins/warpgui/features/recommended-warps/): Recommended is a paid, fixed-duration promotion the owner buys, while Trending is automatic and earned through real visits.
