---
title: "bLottery"
description: "bLottery is a server-wide lottery. Players buy tickets, a timer runs down, and one weighted draw picks a winner who takes the pot minus tax."
---

**bLottery** is a server-wide lottery. Players buy tickets, a timer runs down, and one weighted draw picks a winner who takes the pot minus tax.

More tickets means better odds — not a guaranteed win. Every round, every ticket, every payout and every player's lifetime stats are stored in MySQL, so history survives restarts and works across a network.

Built on [DzusillCore](https://dzusill.github.io/plugins/dzusillcore/) for **BasicLand.cz**. Runs on Paper, Purpur and Folia.

---

## What it does

- 🎰 **Weighted draws** — each ticket is one entry. Ten tickets means ten chances, not a guarantee.
- 🎟️ **Permission-tiered ticket caps** — `blottery.iron` buys 2, `blottery.emerald` buys 5. Rank perks without a separate plugin.
- 🖥️ **Live GUI** — `/lot` shows the pot, the countdown, your tickets and your odds.
- 💸 **Configurable tax** — a percentage of the pot is taken before payout, as a money sink.
- 📴 **Offline payouts** — win while offline and the money is queued, then paid the moment you rejoin.
- ⏰ **Countdown reminders** — configurable warnings before the draw, with an optional on-screen title.
- 🏆 **Leaderboard & stats** — winnings, tickets bought, wins and biggest single win, all tracked per player.
- 📜 **Round history** — every past round and winner, queryable in game.
- 🛠️ **Admin controls** — force a draw, or reset the round and refund every ticket.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Purpur / Folia **1.16.5 – 1.21.x** |
| Java | **21+** |
| DzusillCore | **required** |
| MySQL | **required** |
| Vault | **required** — on Folia, VaultUnlocked |

---

## How a round works

```
OPEN  ── players buy tickets ──► timer expires
   │                                  │
   │                          enough players?
   │                          ├─ no  → TOO_FEW_PLAYERS, refunded next round
   │                          └─ yes → weighted draw
   │                                     └─ pot − tax → winner
   │                                          ├─ online  → paid now
   └── cooldown ──► next round               └─ offline → queued, paid on join
```

A round that cannot draw — nobody bought a ticket, or fewer than `minPlayers` took part — ends without a winner rather than handing the pot to the only participant.

---

## Quick links

- [Requirements](/plugins/blottery/getting-started/requirements/)
- [Installation](/plugins/blottery/getting-started/installation/)
- [Quick Start](/plugins/blottery/getting-started/quick-start/)
- [How a Round Works](/plugins/blottery/features/how-a-round-works/)
- [Buying Tickets](/plugins/blottery/features/buying-tickets/)
- [Winning & Payouts](/plugins/blottery/features/winning-and-payouts/)
- [Commands & Permissions](/plugins/blottery/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/blottery/faq/)
