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
| `%dfate_tag%` | `§4[Hardcore]§r ` | The badge from `Display.Tags`, converted to colour codes. |
| `%dfate_tag_mini%` | `<dark_red>[Hardcore]</dark_red> ` | The same badge, left as MiniMessage. |
| `%dfate_is_hardcore%` | `true` | `true` / `false`. |
| `%dfate_chosen%` | `true` | Whether they have answered the choice screen. |
| `%dfate_deaths%` | `2` | Deaths this account has taken in an at-risk mode, across bans. |
| `%dfate_hearts%` | `7` | Hearts left in [lifesteal](/plugins/dfate/features/lifesteal/). `0` in every other mode. |
| `%dfate_max_hearts%` | `10` | The configured starting hearts, for an "x / y" display. |
| `%dfate_hearts_gained_today%` | `2` | Hearts taken from kills inside the current window. |
| `%dfate_steal_remaining%` | `3` | Hearts they may still take before the daily cap stops them. |

## Server-wide

| Placeholder | Example | Notes |
|---|---|---|
| `%dfate_hardcore_players%` | `37` | Accounts on hardcore. Not "online right now" — every stored record. |
| `%dfate_normal_players%` | `412` | Accounts on normal. |
| `%dfate_ban_duration%` | `24h` | The configured `Ban.Duration`, for a scoreboard warning line. |

## The badge you configure

`%dfate_tag%` is the one to put in a TAB prefix, a scoreboard line or a chat format. You decide what it says, per mode:

```yaml
Display:
  Tags:
    HARDCORE: '<dark_red>[Hardcore]</dark_red> '
    LIFESTEAL: '<red>[❤ %hearts%]</red> '
    NORMAL: '<green>[Normal]</green> '
    UNCHOSEN: ''
```

Tags substitute `%hearts%`, `%max_hearts%`, `%mode%` and `%deaths%`, which is how the lifesteal badge carries a live count — without that, `[❤ %hearts%]` would print the placeholder literally.

Written as MiniMessage, like every other string in this plugin. `%dfate_tag%` converts it to section-sign colour codes on the way out, because that is what TAB, scoreboards and chat plugins actually read — returning raw `<dark_red>` tags would print them on screen. `%dfate_tag_mini%` hands the tags back untouched for the few consumers that speak MiniMessage.

`UNCHOSEN` is empty by default. A player who has not answered the screen yet has no mode, and a badge announcing that would be a label for a state that is not a state — but it is yours to fill in if you would rather mark them.

An empty value produces an empty string, not a stray reset code, so an unused badge costs nothing in the line it sits in.

## Notes worth knowing

**Offline players resolve.** Everything is served from the in-memory cache, so a leaderboard or a hologram naming an offline player works.

**Unchosen is not normal.** A player who has not answered yet reads as `UNCHOSEN` / `false`, never as `NORMAL`. If you compare, compare against `%dfate_mode_raw%` and handle the third value.

**Unknown placeholders return nothing**, so PlaceholderAPI leaves the raw text on screen. A typo shows as `%dfate_mdoe%` in your scoreboard rather than hiding behind a blank — which is how you notice it.

## Examples

TAB prefix — the badge already handles "nothing for unchosen", so no conditional is needed:

```yaml
tabprefix: '%luckperms_prefix%%dfate_tag%'
```

Scoreboard line:

```yaml
- '&7Mode: &f%dfate_mode%'
- '&7Hearts: &c%dfate_hearts%&7/&f%dfate_max_hearts%'
- '&7Deaths: &c%dfate_deaths%'
- '&7Hardcore on server: &f%dfate_hardcore_players%'
```

Chat format (EssentialsX):

```yaml
format: '%dfate_tag%{DISPLAYNAME}&7: {MESSAGE}'
```
