---
title: "messages.yml"
description: "Player-facing text at plugins/dDeathPenalty/messages.yml, in MiniMessage."
---

Player-facing text at `plugins/dDeathPenalty/messages.yml`, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html).

## Prefix & placeholders

```yaml
prefix: "<gray>[<red>dDeathPenalty</red>]</gray> "
```

- `<prefix>` is replaced by the `prefix` string.
- Named placeholders use `%name%`.

## Keys

| Key | Placeholders | Shown when |
|---|---|---|
| `penalty-money` | `%money_lost%`, `%world%`, `%killer%` | A player dies and loses money. |
| `penalty-exempt` | `%world%` | An [exempt](/plugins/ddeathpenalty/features/exemptions/) player dies. |
| `check-header` | — | First line of `/dp check`. |
| `check-line` | `%player%`, `%deaths%`, `%money_lost%` | The `/dp check` stat line. |
| `check-usage` | `%label%` | `/dp check` from console with no player. |

```yaml
penalty-money: "<prefix><red>You died and lost <yellow>%money_lost%</yellow>."
penalty-exempt: "<prefix><green>You kept everything — you're exempt in <yellow>%world%</yellow>."
check-line: "<gray>%player%<dark_gray>: <white>%deaths%</white> deaths, lost <yellow>%money_lost%</yellow>"
```

## Framework keys

The top of the file holds DzusillCore command keys — `no-permission`, `players-only`, `player-not-found` (`%name%`), `invalid-usage` (`%usage%`), `invalid-number` (`%input%`), `command-error`, `reload-success`, `reload-failed`. Reword freely; keep the placeholder tokens.
