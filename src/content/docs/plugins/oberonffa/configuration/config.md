---
title: "config.yml"
description: "The main settings file. Every key has a working default. /ffa admin reload re-reads everything except"
---

The main settings file. Every key has a working default. `/ffa admin reload` re-reads everything except
the `commands` block.

## arena

| Key | Default | Meaning |
|---|---|---|
| `profile` | `ffa` | OberonKits profile whose worlds are the arena |
| `worlds` | `[ "ffa" ]` | Fallback world names (case-insensitive, `*` wildcards) when OberonKits has no such profile |
| `log-worlds` | `true` | Say in the console which worlds are used, at start and reload |

## rules

See [anti-abuse](/plugins/oberonffa/features/anti-abuse/) for what each rule does.

| Key | Default |
|---|---|
| `killer-mode.enabled`, `.gamemodes`, `.ignore-vanished`, `.exempt-permission` | `true`, `[ SURVIVAL, ADVENTURE ]`, `true`, `oberonffa.exempt` |
| `duels.enabled` | `true` |
| `fresh-victim.enabled`, `.min-seconds` | `true`, `10` |
| `same-victim.enabled`, `.cooldown`, `.both-directions` | `true`, `10m`, `true` |
| `alt-guard.enabled`, `.block-kills`, `.rewards-per-ip`, `.ignore-addresses`, `.remember` | `true`, `true`, `true`, private networks, `7d` |
| `combat-log.count` | `true` |
| `pet-kills.count` | `true` |
| `last-hit.seconds` | `15` (0 = only direct kills) |
| `daily-unique-victims` | `true` |
| `streak-reset.on-death`, `.on-leave-arena`, `.on-quit` | `true`, `true`, `true` |
| `notify-rejected` | `true` |

## periods

`timezone` (`""` = the server's), `week-start` (`MONDAY`). Days end at midnight in that zone; weeks are
numbered like ISO weeks starting on `week-start`.

## daily

`enabled`, `kills` (5), `per-kill` (`"1": [ rewards ]` …), `complete` (bonus rewards),
`broadcast-complete`. See [daily first kills](/plugins/oberonffa/features/daily-and-passes/).

## notifications

What each event shows the player it is about: `kill`, `rejected`, `milestone`, `shutdown`, `reward`,
`storage`, `storage-full`, `streak-lost` (with `min-streak`), `daily`, `daily-complete`, `pass-unlocked`,
`pass-auto-claimed`. Each has `chat`, `action-bar`, `title` (true/false) and `sound` (an alias from
sounds.yml). `title-times` sets fade-in, stay and fade-out in ticks. Texts: `notice.<event>` in
messages.yml.

## broadcasts

`milestone`, `shutdown` and `top`, each with `enabled`, `scopes` (streak or place → `SERVER`, `ARENA`
or `NONE`: the highest number at or below the value applies), `chat`, `action-bar`, `title`, `sound`.

## streak-effects

`enabled`, `task-period-ticks`, `particles` (per streak tier: `particle`, `count`, `offset`, `speed`,
`interval-ticks`), `tags` (per streak tier, `{streak}`), `none` (the tag below every tier).

## leaderboard

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | |
| `refresh-seconds` | `30` | How often the snapshot is rebuilt |
| `max-position` | `100` | Highest rank a `top_` placeholder may ask for |
| `page-size` | `10` | Rows per page of `/ffa top` |
| `blank-text` | `""` | What an empty rank shows (all fields of the row) |
| `unranked-position` | `""` | `position_` for a player not on the board |
| `exempt-players` | `[ ]` | Names or UUIDs left out |
| `payouts.<board>` | weekly on, monthly off | `"1": [ rewards ]` … and `enabled` |
| `broadcast-positions` | `3` | Winners listed in the results broadcast |

## Other

- `number-format`: `decimals` (1), `suffixes` (`"", K, M, B, T`), `strip-zero` → 999, 1K, 1.2K, 1M.
- `storage.max-stacks` (54): stacks one player can have waiting in the claim storage.
- `pending.join-delay-ticks` (40): when rewards earned offline are given after a join.
- `commands.main`: `name` (`ffa`), `aliases`, `take-over`. Needs a restart.
- `Presentation`: channel and sound per message category or single message key, like every Oberon plugin.
- `titles`: a title for any message key.
