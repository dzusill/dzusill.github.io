---
title: "Reloading"
description: "Permission: killtracker.admin."
---

```
/killtracker reload
```

Permission: `killtracker.admin`.

Re-reads `config.yml` and `messages.yml`, and clears the remembered anti-farm pairs so the new cooldown length isn't compared against timestamps taken under the old one.

## What reloads live

| | |
|---|---|
| Every `Tracking.*` key | ✅ |
| Every `Anti-Farm.*` key, including `Cooldown-Seconds` | ✅ |
| `Same-IP.Block` | ✅ |
| Every `Combat-Tag.*` key | ✅ |
| Every `Milestones.*` key, tiers included | ✅ |
| `Leaderboard.Top-Size` | ✅ |
| `Debug` | ✅ |
| All of `messages.yml` | ✅ |

## What needs a restart

| | Why |
|---|---|
| `Leaderboard.Enabled` | Commands are registered with the server at startup. |
| `Storage.Save-Interval-Seconds` | The save timer is scheduled at startup. |
| Everything in `database.yml` | The storage backend is chosen at startup. |

## Side effect: anti-farm pairs are forgotten

Reloading clears the pair cooldown cache. Right after a reload, everyone can score one kill against anyone — including someone they killed a minute earlier.

That's the safe choice: keeping timestamps taken under a 10-minute window and measuring them against a new 1-minute one produces cooldowns that are wrong in both directions. It's worth knowing before you reload in the middle of a busy PvP session.

Combat tags survive a reload; they expire on their own.

## Reloading milestones

Tier changes take effect immediately — but remember how [Backfill](/plugins/dkilltracker/features/milestones/#adding-a-tier-later) works. With `Backfill: false` (the default), a tier you add below players' existing totals is absorbed silently and never fires for them.

To grant a new tier to existing players:

1. Set `Backfill: true`.
2. `/killtracker reload`.
3. Let players get a kill (or use `/killtracker add <player> 0`… which won't work — use `add 1` and accept the extra kill, or leave it to natural play).
4. Set it back to `false` and reload again.

## Don't use `/reload confirm`

Bukkit's full server reload is unreliable with any plugin that holds scheduled tasks and a service registry — dKillTracker holds both, and so does DzusillCore underneath it. Use `/killtracker reload` for config changes and a real restart for anything else.
