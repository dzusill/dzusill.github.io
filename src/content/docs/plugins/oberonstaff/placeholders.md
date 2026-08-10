---
title: "Placeholders"
description: "PlaceholderAPI placeholders for staff chat mode, teleport blocking, vanish state and the formatted rank line."
---

Requires [PlaceholderAPI](https://www.spigotmc.org/resources/6245/). Without it the plugin works fine — the placeholders just aren't registered.

The expansion is registered by OberonStaff itself, so there is nothing to download from `/papi ecloud` and it survives `/papi reload`.

## Available

| Placeholder | Returns |
|---|---|
| `%oberonstaff_staffchat%` | `on` or `off` — is staff chat mode on for the viewing player |
| `%oberonstaff_tptoggle%` | `blocked` or `open` — are incoming teleports refused |
| `%oberonstaff_vanished%` | `yes` or `no` |
| `%oberonstaff_rank%` | The player's rank line, already formatted |
| `%oberonstaff_staffchat_users%` | How many online players have staff chat mode on |

All except the last are per-viewing-player.

## Notes on each

**`%oberonstaff_vanished%`** is answered only for an online player — vanish is a live state and there is nothing to read for somebody who is not on the server. Offline returns `no`.

**`%oberonstaff_rank%`** returns the full MiniMessage rank line with `%player%` already substituted, e.g.:

```
<gradient:#D92C2C:#F13131><bold>Admin</bold></gradient> <#F13131>Alice</#F13131>
```

Your scoreboard or tab plugin has to render MiniMessage for that to look right. If it only handles legacy `&` codes, this placeholder will show the tags literally — use a plain `%luckperms_prefix%` there instead.

**`%oberonstaff_staffchat_users%`** counts online players only.

## Examples

Tab list suffix for staff with the mode on:

```yaml
suffix: "%oberonstaff_staffchat%"
```

Staff scoreboard:

```yaml
- "&fStaff chat: &a%oberonstaff_staffchat%"
- "&fTeleports: &a%oberonstaff_tptoggle%"
```

## Verifying

```
/papi parse me %oberonstaff_tptoggle%
```

If that returns the literal text rather than `blocked` or `open`, the expansion did not register — check the console at startup for:

```
[OberonStaff] Registered PlaceholderAPI expansion.
```

No such line means PlaceholderAPI was not installed when OberonStaff started. Install it and restart; the check happens once, at enable.
