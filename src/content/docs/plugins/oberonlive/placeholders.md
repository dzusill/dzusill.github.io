---
title: "Placeholders"
description: "Use OberonLive's built-in announcement values, recipient-specific PlaceholderAPI values and five self-only %oberonlive_*% expansion placeholders."
---

OberonLive has two placeholder surfaces.

## Inside broadcasts and Discord

| Placeholder | Available in game | Available in Discord |
|---|---:|---:|
| `%player%` | yes | yes |
| `%display_name%` | yes | yes |
| `%uuid%` | yes | yes |
| `%link%` | yes | yes |
| `%platform%` | yes | yes |
| `%platform_id%` | yes | yes |
| `%server%` | yes | yes |
| `%timestamp%` | yes | yes |

In-game broadcast text is then passed through PlaceholderAPI for each recipient when it is installed. Discord is event-global and uses only the built-in values above; it does not resolve a player-specific PAPI context.

## OberonLive expansion

When PlaceholderAPI is present at server startup, OberonLive registers:

| Placeholder | Result |
|---|---|
| `%oberonlive_receiving%` | `true` or `false` |
| `%oberonlive_cooldown%` | remaining seconds, or `0` |
| `%oberonlive_last_link%` | last successful stream URL |
| `%oberonlive_last_platform%` | last configured platform display name |
| `%oberonlive_announcement_count%` | lifetime successful announcements |

These values are **self-only**. They read the online player's already-loaded cache and never perform a database query on PlaceholderAPI's call path. An offline or not-yet-loaded player returns an empty string. An unknown placeholder suffix returns `null` so PlaceholderAPI can handle it normally.

Install PlaceholderAPI before enabling OberonLive. Adding it to a running server requires a restart, not `/olive reload`.

