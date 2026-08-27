---
title: "Requirements"
description: "No database, no economy, no Vault. The only file DAnnounce writes outside its config folder is nothing at all — its state lives in plugins/DAnnounce/state.yml."
---

| Requirement | Version | Why |
|---|---|---|
| Paper | **26.2+** | `plugin.yml` declares `api-version: '26.2'`; the jar is compiled against `paper-api 26.2` |
| Java | **25+** | Compile target |
| DzusillCore (DzusillCore) | **1.12.0+** | The framework DAnnounce is built on — a separate jar in `plugins/`, declared as a hard `depend` |
| PlaceholderAPI | 2.12+ | Optional `softdepend`. When present, every announcement line is passed through it before rendering |
| Folia | — | **Not supported.** `folia-supported: false` |

No database, no economy, no Vault. The only file DAnnounce writes outside its config folder is nothing at all — its state lives in `plugins/DAnnounce/state.yml`.

## PlaceholderAPI

The hook is lazy: DAnnounce registers it at enable and uses it only if PlaceholderAPI is actually installed. Without it, announcements still work — the plugin's own `%player%`, `%online%`, `%max_players%`, `%announcement%` and `%variant%` are always substituted, and any `%…%` PlaceholderAPI would have resolved is left as literal text. See [Placeholders](/plugins/dannounce/placeholders/).

## A note on Folia

The plugin declares itself Folia-incompatible and will not enable on a Folia server. Delivery already schedules per player (`atEntity`), but the announcement engine owns a single global repeating task.

## Time zone

`timezone` in `config.yml` must be an IANA zone id such as `Europe/Bratislava` or `America/New_York`, not an abbreviation like `CET`. Every `DAILY`, `WEEKLY` and unqualified `ONCE` time is evaluated in it. An invalid value refuses the config.
