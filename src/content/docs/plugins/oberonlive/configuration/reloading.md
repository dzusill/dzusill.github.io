---
title: "Reloading"
description: "What /olive reload replaces atomically, what stays connected until restart, and how a refused candidate preserves the active runtime settings."
---

```text
/olive reload
```

Requires `oberonlive.admin`. A successful reload replaces:

- `messages.yml` and message presentation,
- platforms, display names, domains and colors,
- URL length and duplicate window,
- cooldown default and tiers,
- static blocklists,
- chat, action bar, sound and console broadcast settings,
- history page size, retention and time zone,
- Discord identity, plain content, role, embed section switches, timeout and retry settings.

It also retries loading the database blocklist if startup state was not ready and runs the current retention purge.

## A refused config keeps the active snapshot

The full candidate `config.yml` is parsed before `SettingsService` replaces its current immutable settings. A malformed platform, overlapping domain root, negative interval, invalid time zone, bad color or invalid enabled Discord URL produces `reload-failed`; the last valid runtime settings continue serving players.

Fix every reported problem and run the command again.

## What needs a restart

| Change | Why |
|---|---|
| `database.yml` | The active connection pool is not replaced at runtime. |
| Install/remove OberonCore | It is the plugin's hard dependency. |
| Install/remove PlaceholderAPI | Hooks and the expansion register during enable. |
| Replace `OberonLive.jar` | Classes and `plugin.yml` are read during enable. |
| Command roots | `/live` and `/olive` are registered during enable and are not configurable. |

Do not use Bukkit's broad `/reload` as an update mechanism. Restart the server for jar or dependency changes.
