---
title: "Reloading"
description: "Requires dfate.admin. Re-reads config.yml and messages.yml and clears the ban service's warning latch, so a duration you have just fixed is reported again…"
---

```
/fate reload
```

Requires `dfate.admin`. Re-reads `config.yml` and `messages.yml` and clears the ban service's warning latch, so a duration you have just fixed is reported again if it is still wrong.

## What applies immediately

- Every `config.yml` value — filters, ban command, lock settings, delays, display names.
- Every `messages.yml` string, including the dialog text. The next screen shown uses the new wording.
- `Death.Commands` and `Ignored-Causes`.

Nothing is cached across the reload except the loaded player modes, which are read from storage at startup and kept in memory by design.

## What does not

| Change | Needs |
|---|---|
| `database.yml` | Full server restart — the connection pool is built during enable. |
| Switching between flat file and SQL | Full server restart. |
| Anything in `modes.yml` edited by hand | Full server restart, and stop the server before editing. |
| A new DzusillCore or dDialogs jar | Full server restart. |

## Players locked right now

A reload does not release them. The choice screen stays up and the re-ask sweep continues on the new `Reask-Seconds`.

Disabling the plugin **does** release everyone — every locked player is unlocked and their invulnerability flag restored. A player must never be left frozen by a plugin that is no longer running.

## Default merging

DzusillCore merges any keys missing from your on-disk file back in on every load, keeping comments intact. So an upgrade that adds a setting does not require you to regenerate the file, and your edits survive.

Note this applies to *missing* keys. A list you emptied on purpose stays empty — including `Choice.Lock.Allowed-Commands`, where an empty list genuinely means "no commands at all".
