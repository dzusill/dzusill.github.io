---
title: "messages.yml"
description: "The admin command's own output. The death messages are not here — they are in config.yml."
---

`plugins/OberonKills/messages.yml`. MiniMessage format. Reload with `/oberonkills reload`.

> **The death messages are not in this file.** They are `Messages` in
> [`config.yml`](/plugins/oberonkills/configuration/config/), next to the settings that shape them — the item name
> mode, the rank list, the vanilla fallback. Splitting them across two files would mean editing both to change one
> line's behaviour.

This file holds what `/oberonkills` says to whoever ran it.

## Command output

```yaml
command:
  usage: [ … ]                    # a list — each entry is one line
  reloaded: "…%keys%"
  status:                         # also a list — three lines
    - "…%enabled% %keys%"
    - "…%item_mode% %hover%"
    - "…%vanilla%"
  preview:
    header: "…%category% %key%"
    none: "…%category% %key%"
```

| Placeholder | Is |
|---|---|
| `%keys%` | how many message keys are loaded |
| `%enabled%` | `yes` or `no` |
| `%item_mode%` | `TRANSLATE` or `PRETTY` |
| `%hover%` | `on` or `off` |
| `%vanilla%` | `kept` or `suppressed` |
| `%category%` `%key%` | what was previewed |

Any message key can be a list, and renders as several lines.

## The preview line itself

`/oberonkills preview` prints the header from this file, then the death message from `config.yml` rendered with
stand-in names. The second line is the one you are checking; the header is just context.

## DzusillCore built-ins

The bottom of the file holds the framework's own messages: `no-permission`, `invalid-usage` and friends. Restyle them
freely; don't rename the keys.

## If a message shows as its key

Seeing `command.reloaded` in-game means the key is missing. That is deliberate — a missing message is visible rather
than silent. Add it back, or delete the file and restart to regenerate it.
