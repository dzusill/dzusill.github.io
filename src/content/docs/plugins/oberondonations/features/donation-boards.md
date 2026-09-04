---
title: "Donation Boards"
description: "A donation board is one rank position rendered in the world — a top-3 podium is three separate boards, each created individually where you stand."
---

A donation board is **one rank position** rendered in the world — a top-3 podium is three separate boards, each created individually where you stand.

```
/donations board create <id> [metric] [period] [rank]
```

## Renderers

Set per board (falls back to `boards.yml` → `default-renderer` when not specified), and a board asking for one whose plugin is missing falls back to `TEXT_DISPLAY` automatically:

| Renderer | Shows | Needs |
|---|---|---|
| `TEXT_DISPLAY` | Native floating text, nothing else | Nothing — works everywhere, including Folia |
| `HEAD` | A player head on an armour stand, plus the text | Nothing extra |
| `NPC` | A full-body character, plus the text | **Citizens** |

**`NPC` needs Citizens specifically.** FancyNpcs and ZNPCsPlus are detected but have no adapter; a board asking for `NPC` on a server running only those logs one line and renders native text. For a donor's face without installing anything, use `HEAD` — it works everywhere. See [Known Limitations](/plugins/oberondonations/limitations/).

## What a board shows

```yaml
general:
  lines:
    - '<#C21807>#{rank} {player}'
    - '<#AAAAAA>{metric}: <#00FC00>{value}'
```

Placeholders: `{board} {metric} {period} {rank} {player} {value}`. `rank-lines` overrides `general.lines` for a specific rank (a `#1` board glowing gold while the rest share one style, for instance). `empty` is what shows when nobody holds that rank yet — its own lines, name, value, and optionally a `skin-name` for a `HEAD` or `NPC` board's placeholder head/body.

`metric-names` and `period-names` map the plugin's internal identifiers onto display labels — `spent` → `Donated`, `alltime` → `All Time`, and so on — so nothing internal ever reaches a player as-is.

## NPC skin resolution (NPC renderer, `npc.type: skin` only)

`npc.skin-backend: auto` tries FancyNpcs, then ZNPCsPlus, then Citizens, in that order — but only Citizens actually spawns a body, so set `citizens` explicitly if you have several installed. Beyond that:

- `skinsrestorer-integration` — use SkinsRestorer's own skin data when present, instead of resolving one directly.
- `mojang-username-skin-lookup` (with a hard kill switch, `mojang-username-skin-lookup-disabled`) and `sessionserver-skin-fallback` — how a real skin is found when neither of the above applies. `async-profile-skin-lookup` keeps this off the main thread.
- `skin-fetch-delay-ms`, `skin-fetch-retry-pause-ms`, `skin-retry-delays-seconds` — timing for a lookup that does not succeed immediately.
- `head-cache-ttl-seconds` — how long a resolved head/skin is cached before being re-checked.
- `fancy-skin-refresh-enabled` / `fancy-skin-refresh-delays-seconds` — FancyNpcs specifically re-applies a skin a few times shortly after spawn; some backends drop the very first attempt, so this repeats the application rather than trusting it once.
- `animate-refresh: false` (the default) — a board refresh does not play a move/punch animation, so a leaderboard does not visibly twitch every time it updates.

## Text placement (hologram)

`hologram.position` (`above` / `below`), `billboard` and `alignment`, `always-face-viewer`, `see-through`, `shadow`, `scale`, `view-range`, plus `base-offset-y` and `line-spacing-y`. `skin-base-offset-y` is separate and larger, since text needs to sit higher above a full-body NPC than above a bare head.

## The armour stand (`HEAD` renderer)

`small`, `marker`, `visible`, `gravity`, `invulnerable`, `base-plate` — standard armour-stand properties, defaulting to an invisible, non-gravity, invulnerable stand that only exists to carry the head.

## Click actions (optional, off by default)

```yaml
actions:
  enabled: false
  right-click:
    console: []
    player: []
```

`%player%` is substituted. Off by default — a board is usually meant to be looked at, not interacted with.

## Commands

| Command | Does |
|---|---|
| `/donations board list` | Every configured board |
| `/donations board create <id> [metric] [period] [rank]` | Places one where you stand (in game) |
| `/donations board remove <id>` | Deletes one |
| `/donations board move <id>` | Moves an existing board to where you stand |
| `/donations board tp <id>` | Teleports you to a board |
| `/donations board refresh` | Recomputes and redraws every board now |
| `/donations board cleanup` | Removes orphaned entities left behind by a config edit or a crash |

## Placeholders

`%odonations_board_<id>_name%` and `%odonations_board_<id>_value%` — useful for repeating a board's top line elsewhere, like a scoreboard.

## See also

- [boards.yml reference](/plugins/oberondonations/configuration/boards-yml/)
