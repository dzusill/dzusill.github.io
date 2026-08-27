---
title: "Reloading"
description: "Reloads config.yml and messages.yml atomically: the new settings are parsed and validated first,"
---

```
/dlive reload
```

Reloads `config.yml` and `messages.yml` atomically: the new settings are parsed and validated first,
and only swapped in if they are good. A file with a mistake in it leaves the running configuration
alone and reports the problem rather than half-applying and leaving the plugin in a broken state.

## What reloads

- platforms, and therefore what `/live` accepts
- the static blocklist
- cooldowns and the duplicate window
- every broadcast string, the skin face block, the sound
- history page size, timezone and format
- the Discord webhook, including its URL
- every message

## What does not

- **`database.yml`** — needs a restart. See [database.yml](/plugins/dlive/configuration/database/).
- **Command names and aliases** — Bukkit builds its command map once at enable.

## Failure

If validation fails you get the reason back in chat and the console, and the plugin keeps running on
the previous configuration. Fix the file and reload again; there is no restart needed to recover.

Common causes: a `platforms` entry with no `domains`, a sound name that is not a real Bukkit sound or
namespaced key, or an empty `broadcast.chat.lines` while chat is enabled.
