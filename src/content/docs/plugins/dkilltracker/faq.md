---
title: "FAQ & Troubleshooting"
description: "The plugin won't enable — Unknown/missing dependency: DzusillCore."
---

## Setup

**The plugin won't enable — `Unknown/missing dependency: DzusillCore`.**
`DzusillCore.jar` is missing from `plugins/`. It's a separate download and it is required.

**Does it work on Spigot?**
No. Paper, Purpur or Folia 1.21.x. dKillTracker uses Paper's runtime command registration and Adventure text.

**Do I need Vault or an economy plugin?**
No. dKillTracker never touches money. If you want a milestone to pay out, put `eco give %player% 5000` in that tier's command list and let your economy plugin handle it.

**Does it work on Folia?**
Yes. Milestone commands are always dispatched on the global region thread, which is the only place Folia permits console commands.

---

## Kills not counting

**Kills aren't counting at all.**
Work down this list:

1. `Tracking.Enabled: true`?
2. Is the world excluded by `Tracking.Worlds`? Remember an empty `List` means "everywhere" — a *non-empty* list in `WHITELIST` mode means only those worlds.
3. Set `Debug: true` and kill someone. The console prints the exact reason:
   ```
   [dKillTracker] [debug] Alice -> Bob = IGNORED_WORLD
   ```

**Every single kill shows `SAME_IP`.**
You're behind a proxy (BungeeCord/Velocity) without IP forwarding, so every player looks like they share the proxy's address. Enable IP forwarding on the proxy and `player-info-forwarding` on the backend, or set `Same-IP.Block: false`.

**Killing the same player repeatedly stops counting.**
Working as designed — that's the anti-farm cooldown. Lower `Anti-Farm.Cooldown-Seconds`, or set it to `0` to disable the window.

**My kills count but the killer gets no message.**
Either `Tracking.Notify-Killer: false`, or the kill also triggered a milestone — the milestone announcement replaces the routine one. Or `kill-counted` is set to `""` in `messages.yml`.

**Bow kills don't count.**
They should — Bukkit attributes a projectile kill to its shooter, regardless of `Count-Projectile-Kills`. If they genuinely don't, check `Debug` output; something else is probably cancelling the death event.

---

## Milestones

**A milestone didn't fire.**
1. `Milestones.Enabled: true`?
2. Is the threshold actually in `Tiers`, and is the key a plain number? A non-numeric key is skipped.
3. Did the player pass it *before* you added the tier? Then `Backfill: false` absorbed it — see [Milestones](/plugins/dkilltracker/features/milestones/#adding-a-tier-later).
4. Does the tier have any `Commands`? An empty list is a valid, silent tier.

**The commands fire but nothing happens.**
The command itself is failing. Run it manually from the console with a real player name. Most often it's a permissions-plugin syntax mismatch — the shipped config's `rank %player% bandit` is a placeholder for *your* command, not a real one.

Check the console for:
```
[dKillTracker] Milestone command failed: rank Steve bandit
```

**Milestones fired twice.**
They shouldn't — the awarded threshold is stored per player. If it genuinely happened, check whether two servers share one database and both processed the same kill, or whether an old `kills.yml` was restored over a newer one.

**I added a tier and nobody got it.**
`Backfill: false` (the default). Set it to `true`, reload, let it apply, set it back.

**I restored a backup and everyone got re-ranked.**
The backup had an older `Last-Milestone` for those players, so tiers above it were legitimately unearned again. Nothing to fix in the plugin — restore the matching `kills.yml`, not a partial one.

---

## Placeholders

**`%killtracker_kills%` shows as raw text.**
PlaceholderAPI isn't installed, or the expansion didn't register. Look for `Registered PlaceholderAPI expansion 'killtracker'.` at startup.

**One placeholder shows raw while others work.**
It's a typo. Unknown placeholders are returned unresolved on purpose so mistakes are visible. Check the [full list](/plugins/dkilltracker/placeholders/).

**`%killtracker_rank%` disagrees with the player's actual rank.**
It reads the last *awarded* milestone, not the kill count. A player on 100 kills whose tiers were absorbed by `Backfill: false` shows the older rank — which matches what's really in your permissions plugin. Use `/killtracker info` to see both numbers.

**`%killtracker_progress%` returns `2/15` but I expected `12/25`.**
Two different questions, two placeholders. `progress` is progress within the current band; `progress_absolute` is kills over the next threshold.

---

## Data

**Kill counts reset after a crash.**
Data is written every `Storage.Save-Interval-Seconds` (default 300) and on clean shutdown. A hard crash loses at most that window. Lower it if crashes are common — but fix the crashes.

**I edited `kills.yml` and my change vanished.**
The in-memory copy is authoritative and overwrote the file on the next save. Stop the server before editing, or use `/killtracker set`.

**Everything reset when I enabled MySQL.**
Expected — the SQL backend starts empty and there is no automatic import. See [database.yml](/plugins/dkilltracker/configuration/database/#migrating-from-flat-file-to-sql).

**How do I wipe everything for a new season?**
Stop the server, delete `kills.yml` (or `TRUNCATE killtracker_stats`), start it again. Copy the file first if you want a hall of fame.

**How do I reset one player?**
```
/killtracker reset <player>
```
Kills, lifetime, deaths and the milestone watermark, all gone — so their rewards can be earned again.

---

## Performance

**Does it lag with a lot of players?**
No. Kills are cached in memory and written in batches off the main thread; the leaderboard and every placeholder read straight from memory. The anti-farm pair cache is hard-capped and self-evicting.

**Should I use MySQL?**
Only for a network, or past a few thousand tracked players. A single server is better off on the flat file.
