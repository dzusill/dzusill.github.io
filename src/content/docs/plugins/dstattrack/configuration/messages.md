---
title: "messages.yml"
description: "Every player-facing string lives in plugins/dStattrack/messages.yml, in MiniMessage format."
---

Every player-facing string lives in `plugins/dStattrack/messages.yml`, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html) format.

## Prefix & placeholders

```yaml
prefix: '<dark_purple><bold>dStattrack:</bold></dark_purple> '
```

- `<prefix>` inside any message is replaced with the `prefix` string.
- Named placeholders use `%name%` (e.g. `%item%`, `%missing%`, `%category%`, `%amount%`, `%tags%`).
- A missing key falls back to showing the key name in-game, so typos are visible rather than silent.

## dStattrack messages

| Key | Placeholders | Shown when |
|---|---|---|
| `no-item` | — | Player isn't holding an item. |
| `not-stattrackable` | `%item%` | The held item's type can't be tracked. |
| `already-has` | — | The item already has a stattrack. |
| `no-money` | `%missing%` | Player can't afford the price. |
| `no-economy` | — | Vault / economy plugin is missing. |
| `no-stattrack` | — | `remove`/`check` on an item with no stattrack. |
| `not-in-category` | — | `set` with a category the item's group doesn't have. |
| `applied` | `%item%` | A stattrack was applied. |
| `removed` | — | A stattrack was removed. |
| `set` | `%category%`, `%amount%` | A counter was set to a value. |
| `check` | `%tags%` | Output of `/dstattrack check`. |
| `info-header`, `info-category` | `%category%` | Output of `/dstattrack info`. |
| `help` | — | The `/dstattrack help` list. |

## Framework messages

These come from DzusillCore and cover command errors — `no-permission`, `players-only`, `console-only`, `unknown-command`, `invalid-usage` (`%usage%`), `invalid-number` (`%input%`), `player-not-found`, `command-error`, and the `reload-*` keys. Reword them freely; keep the placeholder tokens intact.
