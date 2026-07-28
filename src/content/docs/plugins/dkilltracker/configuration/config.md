---
title: "config.yml"
description: "Every key, what it does, and the default. Reload with /killtracker reload unless noted."
---

Every key, what it does, and the default. Reload with `/killtracker reload` unless noted.

## Tracking

```yaml
Tracking:
  Enabled: true
  Worlds:
    Mode: BLACKLIST
    List: []
  Count-Projectile-Kills: true
  Count-Pet-Kills: false
  Notify-Killer: true
```

| Key | Default | |
|---|---|---|
| `Enabled` | `true` | Master switch. `false` records nothing at all. |
| `Worlds.Mode` | `BLACKLIST` | `BLACKLIST` = count everywhere except `List`. `WHITELIST` = count only in `List`. |
| `Worlds.List` | `[]` | World names. Empty = everywhere, whichever mode. |
| `Count-Projectile-Kills` | `true` | Whether a bow/trident hit sets a combat tag. Direct projectile kills count regardless. |
| `Count-Pet-Kills` | `false` | Credit a tamed wolf/cat's kill to its owner (owner must be online). |
| `Notify-Killer` | `true` | Chat message after a counted kill. Skipped when a milestone fired instead. |

See [Kill Tracking](/plugins/dkilltracker/features/kill-tracking/).

## Anti-Farm

```yaml
Anti-Farm:
  Enabled: true
  Cooldown-Seconds: 600
  Count-Toward-Lifetime: true
  Notify-On-Suppress: true
  Max-Tracked-Pairs: 50000
```

| Key | Default | |
|---|---|---|
| `Enabled` | `true` | Turn the same-victim cooldown on or off. |
| `Cooldown-Seconds` | `600` | Seconds before killing the same player counts again. `0` disables the window. |
| `Count-Toward-Lifetime` | `true` | Suppressed kills still raise `%killtracker_lifetime_kills%`. |
| `Notify-On-Suppress` | `true` | Tell the killer why it didn't count, and how long is left. |
| `Max-Tracked-Pairs` | `50000` | Hard cap on remembered killer→victim pairs. Oldest evicted first. |

See [Anti-Farm Protection](/plugins/dkilltracker/features/anti-farm/).

## Same-IP

```yaml
Same-IP:
  Block: true
```

| Key | Default | |
|---|---|---|
| `Block` | `true` | Don't count kills between two accounts on the same IP address. |

## Combat-Tag

```yaml
Combat-Tag:
  Enabled: true
  Duration-Seconds: 15
```

| Key | Default | |
|---|---|---|
| `Enabled` | `true` | Credit environmental deaths to the last attacker. |
| `Duration-Seconds` | `15` | How long the tag lasts after a hit. |

See [Combat Tagging](/plugins/dkilltracker/features/combat-tagging/).

## Milestones

```yaml
Milestones:
  Enabled: true
  Default-Rank: "Rookie"
  Backfill: false
  Broadcast: true
  Tiers:
    '5':
      Rank: "Bandit"
      Commands:
        - "rank %player% bandit"
```

| Key | Default | |
|---|---|---|
| `Enabled` | `true` | Turn milestone rewards on or off. Kills are still tracked either way. |
| `Default-Rank` | `Rookie` | `%killtracker_rank%` before the first milestone. |
| `Backfill` | `false` | Whether a tier added *below* a player's current total fires for them. |
| `Broadcast` | `true` | Default for announcing a reached milestone server-wide. |
| `Tiers.<n>.Rank` | `Default-Rank` | Display name for the tier. |
| `Tiers.<n>.Commands` | `[]` | Console commands. Tokens: `%player% %uuid% %kills% %milestone% %rank%`. |
| `Tiers.<n>.Broadcast` | `Milestones.Broadcast` | Per-tier override. |

> **`Tiers` is never merged on update.** Every other section gets new keys added automatically when you update the plugin; the tier list is deliberately left alone so a tier you deleted stays deleted. The trade-off is that new *example* tiers from an update won't appear either — check the changelog.

See [Milestones & Ranks](/plugins/dkilltracker/features/milestones/).

## Leaderboard

```yaml
Leaderboard:
  Enabled: true
  Top-Size: 10
```

| Key | Default | |
|---|---|---|
| `Enabled` | `true` | Register `/killtop`. Requires a **restart** to change — commands are registered at startup. |
| `Top-Size` | `10` | Rows shown, and the reach of the `top_*` placeholders. |

## Storage

```yaml
Storage:
  Save-Interval-Seconds: 300
```

| Key | Default | |
|---|---|---|
| `Save-Interval-Seconds` | `300` | Seconds between background saves. Also flushed on shutdown. Requires a **restart**. Minimum 10. |

Kills are cached in memory and written in batches — a busy PvP server does not need a disk write per kill. Only changed records are written.

## Debug

```yaml
Debug: false
```

Logs every kill decision and why:

```
[dKillTracker] [debug] Alice -> Bob = COUNTED
[dKillTracker] [debug] Alice -> Bob = FARMED
```

Outcomes: `COUNTED`, `FARMED`, `SAME_IP`, `SELF`, `VICTIM_EXEMPT`, `IGNORED_WORLD`, `DISABLED`. Noisy — support use only.
