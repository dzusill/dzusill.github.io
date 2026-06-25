---
title: "Commands & Permissions"
description: "Base command /lottery, aliases /lot, /dlottery, /dlot."
---

## Commands

Base command `/lottery`, aliases `/lot`, `/dlottery`, `/dlot`.

| Command | Permission | Description |
|---|---|---|
| `/lottery` | `dlottery.gui` | Open the lottery GUI. |
| `/lottery help` | — | Show the help page. |
| `/lottery buy <amount>` | `dlottery.buy` | Buy tickets for the current round. |
| `/lottery status` | `dlottery.status` | Show current round info. |
| `/lottery history` | `dlottery.history` | View recent winner history. |
| `/lottery top [sort]` | `dlottery.top` | Open the leaderboard (sort: `winnings`/`tickets`/`wins`/`biggest`). |
| `/lottery admin` | `dlottery.admin` | Show admin commands. |
| `/lottery shuffle` | `dlottery.shuffle` | Draw the current round now. |
| `/lottery reset` | `dlottery.reset` | Cancel the round and refund all tickets. |

Commands are registered at runtime by DzusillCore — no `plugin.yml` entries.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `dlottery.gui` | everyone | Open the lottery GUI (and the no-arg `/lottery`). |
| `dlottery.buy` | everyone | Buy tickets. |
| `dlottery.status` | everyone | View round status. |
| `dlottery.history` | everyone | View winner history. |
| `dlottery.top` | everyone | View the leaderboard. |
| `dlottery.admin` | op | View the admin help. |
| `dlottery.shuffle` | op | Force a draw. |
| `dlottery.reset` | op | Reset the round with refunds. |
| `dlottery.tickets.<tier>` | — | Raise the ticket cap (`iron`/`gold`/`diamond`/`emerald`). |

### Suggested setup

Defaults are player-friendly — everyone can play, only ops can force/reset draws. Grant VIP ticket caps per rank:

```
/lp group iron    permission set dlottery.tickets.iron true     # 2 tickets
/lp group gold    permission set dlottery.tickets.gold true     # 3 tickets
/lp group diamond permission set dlottery.tickets.diamond true  # 4 tickets
/lp group emerald permission set dlottery.tickets.emerald true  # 5 tickets
```

See [Buying Tickets](/plugins/dlottery/features/buying-tickets/) for how caps work.
