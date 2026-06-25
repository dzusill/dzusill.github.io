---
title: "messages.yml"
description: "Player-facing text at plugins/dLottery/messages.yml, in MiniMessage."
---

Player-facing text at `plugins/dLottery/messages.yml`, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html).

## Prefix & placeholders

```yaml
prefix: "<red><b>Server</b></red> <dark_gray><b>»</b></dark_gray> "
```

- `<prefix>` is replaced by the `prefix` string.
- Named placeholders include `%player%`, `%amount%`, `%tickets%`, `%word%`, `%pool%`, `%players%`, `%minutes%`, `%seconds%`, `%rank%`, `%value%`, `%winner%`, `%round%`.

## Message keys

| Key | Shown when |
|---|---|
| `help`, `admin-help` | The `/lottery help` and `/lottery admin` listings. |
| `status` | `/lottery status`. |
| `buy-success`, `buy-insufficient-funds`, `buy-exceeds-max`, `buy-cooldown` | Ticket purchase results. |
| `shuffle-triggered`, `reset-triggered` | Admin `shuffle` / `reset`. |
| `win`, `no-tickets`, `few-players` | Draw outcomes (broadcast to everyone). |
| `reminder` | Countdown [reminders](/plugins/dlottery/features/reminders/). |
| `offline-payout` | A returning winner is paid. |
| `history-*` | `/lottery history` output. |
| `top-*` | `/lottery top` text output. |

## Ticket-word inflection

```yaml
inflexions:
  default-tickets: tickets
  tickets-no:
    - "1/ticket"
    - "2/tickets"
```

The `inflexions` block handles the noun form for ticket counts (`%word%`) — e.g. "1 ticket" vs "2 tickets". It supports languages with more complex declension than a simple singular/plural (the format is `count/word` pairs), carried over from the original plugin.

## Framework keys

The top of the file holds DzusillCore command keys (`no-permission`, `invalid-usage` with `%usage%`, `invalid-number` with `%input%`, `reload-success`, …). Keep their names and placeholder tokens.
