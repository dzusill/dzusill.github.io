---
title: "Commands & Permissions"
description: "/nick has the alias /nickname; /nick picker also responds to gui / menu; /realname has /whoisnick; /dnicks has /dnick. Commands are registered at runtime by…"
---

## Commands

| Command | Permission | Description |
|---|---|---|
| `/nick <minimessage>` | `dnicks.nick.self` | Set your own nick (the whole remainder is the nick, so spaces and tags survive). |
| `/nick reset` | `dnicks.nick.self` | Clear your nick. |
| `/nick picker` | `dnicks.picker` | Open the style picker GUI. |
| `/nick <player> <minimessage>` | `dnicks.nick.others` | Set another player's nick. |
| `/realname <nick>` | `dnicks.realname` | Find the player behind a nick. |
| `/dnicks reload` | `dnicks.reload` | Reload config + language and re-apply online players. |

`/nick` has the alias `/nickname`; `/nick picker` also responds to `gui` / `menu`; `/realname` has `/whoisnick`; `/dnicks` has `/dnick`. Commands are registered at runtime by DzusillCore — no `plugin.yml` entries.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `dnicks.nick.self` | everyone | Set / reset your own nick. |
| `dnicks.picker` | everyone | Open the picker GUI. |
| `dnicks.realname` | everyone | Use `/realname`. |
| `dnicks.gradient` | op | Use `<gradient>` and `<rainbow>`. |
| `dnicks.color.<name>` | — | Use a specific named color (e.g. `dnicks.color.red`). |
| `dnicks.color.*` | op | Use any named color. |
| `dnicks.color.hex` | op | Use raw `<#rrggbb>` hex colors. |
| `dnicks.format` | op | Use `<bold>` / `<italic>` / `<underlined>` / `<strikethrough>`. |
| `dnicks.nick.others` | op | Set another player's nick. |
| `dnicks.reload` | op | Reload the configuration. |
| `dnicks.admin` | op | All of the above. |

### Suggested setup

```
# everyone can set a plain nick (default) — nothing to do

# VIP: gradients, hex, all colors and styles
/lp group vip permission set dnicks.gradient true
/lp group vip permission set dnicks.color.* true
/lp group vip permission set dnicks.color.hex true
/lp group vip permission set dnicks.format true

# staff
/lp group staff permission set dnicks.admin true
```

> **Color gotcha:** named colors are checked as `dnicks.color.<name>`. Grant the wildcard `dnicks.color.*` to allow all 16 at once — you don't have to list them individually.
