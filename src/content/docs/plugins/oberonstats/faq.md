---
title: "FAQ & Troubleshooting"
description: "It did not parse. Almost always one of:"
---

### The placeholder shows up as raw `%oberonstats_…%` text

It did not parse. Almost always one of:

- an unknown currency id — check with `/oberonstats status`;
- a missing rank (`top_name_coins` instead of `top_name_1_coins`);
- rank `0` or a negative rank;
- a `_of_<player>` suffix on a `top_` or `page_` placeholder, which is never player-scoped.

Raw text is deliberate: it tells you a placeholder is wrong instead of silently showing nothing.

### Everything is blank

In order:

1. `/oberonstats status` — is a provider hooked, are there tracks?
2. Is ExcellentEconomy running and did it register its API? The console says so at startup.
3. Are EE leaderboards on (`Top.Enabled: true`)? Without them, rank/top/page placeholders have no data.
4. Is `Tracks.Whitelist` set to something that excludes your currency?

### The leaderboard shows fewer rows than I expect

That is the feature. Rows worth `Blanking.Min-Value` or less are removed. `%oberonstats_top_size_<track>%` tells you how many real rows there are. Set `Hide-Zero-Rows: false` to see everything ExcellentEconomy ranked.

### A player's balance is blank the first time and correct the second

They are neither online nor on the leaderboard, so the value needs a database lookup — which cannot run on the server thread. The first request starts it and returns blank; the answer is cached for `Targets.Cache-TTL-Seconds` and appears on the next redraw.

### Ranks are out of date

ExcellentEconomy rebuilds its leaderboard every `Top.Update_Interval` seconds (900 by default). Lower it there. An online player's own balance is always live regardless.

### `%oberonstats_top_updated_<track>%` always says `-1`

ExcellentEconomy does not expose when it last rebuilt the snapshot, so there is nothing honest to report. The placeholder exists for providers that do.

### Empty rows still leave decoration behind

Move the decoration into `Format.Top-Line` and use `%oberonstats_top_line_<pos>_<track>%`. Text written in the menu itself is the menu's, and OberonStats cannot blank it.

### `/stats` stopped working after installing this

It should not have — `Commands.Stats.Enabled` is `false` by default. If you turned it on, OberonStats claims `/stats`; turn it back off and restart.

### Can I use it without PlaceholderAPI?

No. Placeholders are the entire product. Without PAPI the plugin enables, logs a warning and does nothing.

### Does it work with CoinsEngine?

No. CoinsEngine (ExcellentEconomy 2.7.x and earlier) uses different package names. Update to ExcellentEconomy 2.8.0+.

### Does it change balances?

Never. It only reads, and it stores no player data of its own — the only state is per-viewer paging and targets, both in memory, both dropped on quit.

### My kills / playtime leaderboard is empty

Check the startup log. It says where the statistics are read from:

```
[OberonStats] Reading player statistics from .../world/players/stats
[OberonStats] Ranked 218 player(s) from vanilla statistics.
```

If instead it says it could not find that directory, or ranked 0 players, then either nobody has played within `Sources.Active-Within-Days`, or the server keeps its player data somewhere unusual — say so and it can be taught the path.

Also remember a track only ranks players who have a value: on a fresh server nobody has any kills, so `kills` is legitimately empty and `%oberonstats_top_size_kills%` says `0`.

### One rank in the middle of my menu shows nothing

It should not, and since 1.2.0 it does not: ranks close up behind removed rows, so `1` through
`%oberonstats_top_size_<track>%` always draw and only ranks past the end of the board are empty.

If you are on an older build, this is the known cause. ExcellentEconomy files its leaderboard under lower-case
player names, so two accounts sharing a name collapse into one slot — the numbering gains a hole and the list stops
being sorted, which surfaces as exactly one rank rendering empty. Update, then confirm with:

```
/oberonstats board <track> 10
```

The closing note says what had to be corrected — rows worth nothing, duplicates dropped, and whether the source
list arrived sorted at all. If a rank still renders empty after that, the board is simply shorter than the menu:
`%oberonstats_top_size_<track>%` says how many rows exist.

### The top of a leaderboard is wrong — a richer player is missing

Run `/oberonstats why <that player> <track>`. It names the cause directly; the four real ones are:

1. **Another source owns the track.** An ExcellentEconomy currency called `money` and the Vault balance both want that id, and whoever registers first wins it. The `source` line says so, the startup log warns about it, and `Sources.Vault.Track-Id` renames one of them.
2. **The player is outside the ranking population.** Vanilla-statistic and Vault leaderboards only read players who pass `Sources.Active-Within-Days` and fit inside `Sources.Max-Players`. A rich player who has not logged in for months is simply never read. Set `Active-Within-Days: 0` and raise `Max-Players` to rank everybody.
3. **The economy will not report them.** For the `money` track OberonStats asks Vault `hasAccount` first and skips players without one — deliberately, because EssentialsX *creates* an account at the starting balance when asked for a balance it does not have, and reading a leaderboard must never write to your economy. A player whose account lives on another server of a network is not readable here.
4. **The snapshot is stale.** Both the ExcellentEconomy board (its own `Top.Update_Interval`) and ours (`Sources.Refresh-Seconds`) are rebuilt on a timer. The `snapshot` line shows the age.

### Why is `blocks-placed` not exactly right?

Minecraft has no "blocks placed" statistic. `blocks-placed` is its "items used" total, which also counts eating food and using tools. See [Stat Sources](/plugins/oberonstats/features/stat-sources/).

### Does the money track duplicate ExcellentEconomy?

Only if ExcellentEconomy is your Vault economy. `money` is whatever Vault reports — usually EssentialsX — and ExcellentEconomy currencies are their own tracks. Run both and you get both; disable `Sources.Vault.Enabled` if you only want the currencies.

### Can it show stats from another plugin?

The internals are built around a generic stat provider, and anything that plugs in gets the full placeholder set for free. Today that is ExcellentEconomy, Vault and vanilla statistics.
