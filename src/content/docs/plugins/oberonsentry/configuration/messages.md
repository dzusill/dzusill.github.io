---
title: "messages.yml"
description: "Every chat line OberonSentry sends is in messages.yml, in English, in MiniMessage with {placeholders}. <prefix> is replaced by prefix: at the top of the…"
---

Every chat line OberonSentry sends is in `messages.yml`, in English, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html) with `{placeholders}`. `<prefix>` is replaced by `prefix:` at the top of the file. `/sus reload` applies changes, and new keys from updates are added to your file automatically.

| Section | What it holds |
| --- | --- |
| `risks`, `risk-colors` | Names of the levels, and the colour tag used by `{risk_color}` |
| `platforms` | How `{platform}` reads: `java` and `bedrock` |
| `categories`, `statuses`, `states`, `sorts` | Names shown in menus |
| `menus`, `filters`, `prompts`, `confirm` | Menu texts, chat prompts, confirmation questions |
| `search-dialog` | Title, label and buttons of the search box |
| `alerts` | `alerts.level`: the silent alert line, with clickable `[PROFILE]` / `[ACTIONS]` |
| `actions`, `cases` | Results of actions and case changes |
| `freeze`, `spectate` | What frozen players and spectating staff see |
| `profile`, `history` | Lines inside the profile and history items |
| `health` | `/sus health` |
| `debug` | `/sus debug` replies |

For example, the alert line:

```yaml
alerts:
  level: '<prefix>{risk_color}{risk} <white>{player}</white> <gray>· score {score} · {check} ({anticheat}) · case {case_id}</gray> <click:run_command:''/sus {player}''>…[PROFILE]…</click> …'
```

The freeze title and subtitle are `freeze.title` and `freeze.subtitle`. A kicked cheat client sees its rule's `reason` from `clients.yml`.

Discord embeds are not here: their text lives in `config.yml` under [`discord.events`](/plugins/oberonsentry/configuration/config/#discord).
