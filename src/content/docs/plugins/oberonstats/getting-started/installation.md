---
title: "Installation"
description: "If you see either of these instead, fix it before going further:"
---

1. Install the dependencies first, in this order:
   - **nightcore** and **ExcellentEconomy** (ExcellentEconomy will not start without nightcore — or without **Vault** on 2.8.0)
   - **PlaceholderAPI** — 2.12 or newer on Minecraft 1.21.9+
   - **OberonCore** — the DzusillCore framework jar
   - optionally **Vault** + an economy plugin, for the `money` track
2. Drop `OberonStats.jar` into `plugins/`.
3. Restart the server. (`/reload` is not supported — OberonStats registers a PlaceholderAPI expansion at enable time.)
4. Check the console:

```
[OberonStats] Hooked ExcellentEconomy: 2 currencies available.
[OberonStats] Vanilla statistics available as tracks: kills, mobs-killed, deaths, playtime, blocks-broken, blocks-placed
[OberonStats] Reading player statistics from .../world/players/stats
[OberonStats] Hooked Vault economy 'Essentials' as track 'money'.
[OberonStats] Registered PlaceholderAPI expansions: %oberonstats_...% and %ostats_...%
[OberonStats] Ranked 218 player(s) from vanilla statistics.
```

If you see either of these instead, fix it before going further:

| Message | Meaning |
|---|---|
| `ExcellentEconomy is not enabled` | EE failed to start — check its own console output |
| `registered no API service` | EE started but its API is unavailable, usually a database failure |
| `ExcellentEconomy leaderboards are off (Top.Enabled: false)` | Rank, top and page placeholders will be blank until you enable them |
| `PlaceholderAPI is not installed` | Nothing is published; install it and restart |

5. Verify in-game:

```
/papi parse me %oberonstats_balance_coins%
/oberonstats status
```

## Files it creates

```
plugins/OberonStats/
├── config.yml     # blanking, formatting, paging, targets
└── messages.yml   # only the command's own output
```

Nothing else — OberonStats stores no player data of its own.
