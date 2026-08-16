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

### Can it show kills, playtime or other stats later?

The internals are built around a generic "stat provider", and a placeholder like `%oberonstats_top_name_1_kills%` would fall out of the same parser. Version 1.0.0 ships the ExcellentEconomy provider only.
