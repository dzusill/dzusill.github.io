---
title: "Reloading"
description: "Re-reads config.yml and messages.yml and clears the lookup cache, so a changed Min-Value or Top-Line takes effect on the next menu redraw."
---

```
/oberonstats reload
```

Re-reads `config.yml` and `messages.yml` and clears the lookup cache, so a changed `Min-Value` or `Top-Line` takes effect on the next menu redraw.

## What a reload does not do

| Not reloaded | Why | What to do instead |
|---|---|---|
| The PlaceholderAPI expansion | It is registered once at enable time and persists across PAPI reloads | Restart the server if it is somehow missing |
| `Commands.Stats.Enabled` | Commands are claimed during enable | Restart after turning `/stats` on or off |
| ExcellentEconomy's leaderboard | It is EE's snapshot on EE's timer | Lower `Top.Update_Interval` in EE, or wait |
| Viewers' pages and targets | They are session state, not configuration | They clear themselves on quit |

## Server reload

`/reload` (the Bukkit one) is not supported — as with any plugin that registers an expansion and hooks another plugin's service, restart instead.

## Checking a change landed

```
/oberonstats status
```

prints the values actually in effect: blank text, minimum value, both blanking switches, page size, maximum position and the current cache size.
