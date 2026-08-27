---
title: "Placeholders"
description: "Requires PlaceholderAPI. The expansion"
---

Requires [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/). The expansion
registers itself when PlaceholderAPI is present; there is nothing to download.

## Available

| Placeholder | Returns |
|---|---|
| `%dlive_receiving%` | whether this player receives announcements |
| `%dlive_cooldown%` | seconds left on their cooldown, `0` when ready |
| `%dlive_last_link%` | the last link they announced |
| `%dlive_last_platform%` | the platform of their last announcement |
| `%dlive_announcement_count%` | their lifetime announcement count |

All five resolve for the viewing player.

`%dlive_announcement_count%` is a lifetime counter and is never reduced by history retention — a
server keeping thirty days of history still reports the true total.

## Broadcast placeholders

These are a different set. They work inside `broadcast.*` strings and the webhook, not through
PlaceholderAPI, and are documented in [Announcing](/plugins/dlive/features/announcing/):

`%player%` `%display_name%` `%uuid%` `%link%` `%platform%` `%platform_id%` `%server%` `%timestamp%`

PlaceholderAPI placeholders also work inside broadcast strings when the plugin is installed, so you
can mix a `%luckperms_prefix%` into an announcement line.

## Examples

TAB, showing who is streaming:

```
%dlive_receiving%
```

A scoreboard line that only means something while a cooldown is running:

```
Next announcement in %dlive_cooldown%s
```

A chat format badge for players who stream:

```
%dlive_last_platform%
```
