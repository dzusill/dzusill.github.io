---
title: "Commands & Permissions"
description: "Main command /lottery, aliases /lot, /blot, /loterie."
---

Main command `/lottery`, aliases `/lot`, `/blot`, `/loterie`.

---

## Commands

| Command | Permission | Description |
|---|---|---|
| `/lot` | `blottery.gui` | Open the lottery GUI |
| `/lot help` | — | Command help |
| `/lot buy <amount>` | `blottery.buy` | Buy tickets (1–9999, capped by your tier) |
| `/lot status` | `blottery.status` | Current round status |
| `/lot history` | `blottery.history` | Recent rounds and winners |
| `/lot top [sort]` | `blottery.top` | Leaderboard |
| `/lot admin` | `blottery.admin` | Admin command help |
| `/lot shuffle` | `blottery.shuffle` | Force a draw now |
| `/lot reset` | `blottery.reset` | Cancel the round and refund every ticket |

`/lot buy` is player-only. `/lot help` needs no permission, so console and every player can always discover the commands.

`/lot top` accepts a sort argument — winnings (default), tickets, win count or biggest win.

---

## Permissions

| Permission | Default | Grants |
|---|---|---|
| `blottery.gui` | `true` | the GUI and the bare `/lottery` |
| `blottery.buy` | `true` | buying tickets |
| `blottery.status` | `true` | round status |
| `blottery.history` | `true` | winner history |
| `blottery.top` | `true` | leaderboard |
| `blottery.admin` | `op` | admin help page |
| `blottery.shuffle` | `op` | force a draw |
| `blottery.reset` | `op` | reset and refund |

`blottery.admin` grants the **help page only**. Shuffle and reset are separate nodes, so a helper can see what exists without being able to move anyone's money.

## Ticket-cap permissions

These come from `settings.yml`, not `plugin.yml`. Each key under `maxTickets.blottery` doubles as a permission:

```yaml
maxTickets:
  blottery:
    default: 1
    iron: 2
    gold: 3
    diamond: 4
    emerald: 5
```

| Permission | Cap |
|---|---|
| `blottery.default` | 1 |
| `blottery.iron` | 2 |
| `blottery.gold` | 3 |
| `blottery.diamond` | 4 |
| `blottery.emerald` | 5 |

A player's cap is the **highest** tier they hold — caps do not add. No tier at all means 1.

---

## A working setup

Everyone plays:

```
lp group default permission set blottery.default true
```

Ranks buy more:

```
lp group vip     permission set blottery.gold true
lp group vip+    permission set blottery.emerald true
```

Moderators see the admin page but cannot touch rounds:

```
lp group mod permission set blottery.admin true
```

Admins can intervene:

```
lp group admin permission set blottery.shuffle true
lp group admin permission set blottery.reset true
```

## Next

- [FAQ & Troubleshooting](/plugins/blottery/faq/)
