---
title: "Placeholders"
description: "Requires PlaceholderAPI. The expansion registers itself as dfate when PAPI is installed; nothing is registered — and no PAPI class is ever loaded — when it…"
---

Requires **PlaceholderAPI**. The expansion registers itself as `dfate` when PAPI is installed; nothing is registered — and no PAPI class is ever loaded — when it is not.

## Per-player

| Placeholder | Example | Notes |
|---|---|---|
| `%dfate_mode%` | `Hardcore` | The display name from `Display.Mode-Names`. |
| `%dfate_mode_raw%` | `HARDCORE` | `HARDCORE`, `NORMAL` or `UNCHOSEN`. Use this in comparisons. |
| `%dfate_is_hardcore%` | `true` | `true` / `false`. |
| `%dfate_chosen%` | `true` | Whether they have answered the choice screen. |
| `%dfate_deaths%` | `2` | Hardcore deaths this account has taken, across bans. |

## Server-wide

| Placeholder | Example | Notes |
|---|---|---|
| `%dfate_hardcore_players%` | `37` | Accounts on hardcore. Not "online right now" — every stored record. |
| `%dfate_normal_players%` | `412` | Accounts on normal. |
| `%dfate_ban_duration%` | `24h` | The configured `Ban.Duration`, for a scoreboard warning line. |

## Notes worth knowing

**Offline players resolve.** Everything is served from the in-memory cache, so a leaderboard or a hologram naming an offline player works.

**Unchosen is not normal.** A player who has not answered yet reads as `UNCHOSEN` / `false`, never as `NORMAL`. If you compare, compare against `%dfate_mode_raw%` and handle the third value.

**Unknown placeholders return nothing**, so PlaceholderAPI leaves the raw text on screen. A typo shows as `%dfate_mdoe%` in your scoreboard rather than hiding behind a blank — which is how you notice it.

## Examples

TAB prefix:

```yaml
tabprefix: '%luckperms_prefix%<red>[%dfate_mode%] </red>'
```

Only mark the hardcore ones, using a conditional expansion:

```
%javascript_hardcore_tag%
// return '%dfate_is_hardcore%' === 'true' ? '&4☠ ' : '';
```

Scoreboard line:

```yaml
- '&7Mode: &f%dfate_mode%'
- '&7Deaths: &c%dfate_deaths%'
- '&7Hardcore on server: &f%dfate_hardcore_players%'
```

Chat format (EssentialsX):

```yaml
format: '&8[&4%dfate_mode%&8] {DISPLAYNAME}&7: {MESSAGE}'
```
