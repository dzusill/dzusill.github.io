---
title: "dLottery"
description: "dLottery is a server-wide lottery. Players buy tickets into a shared pool; when the round draws, a winner is picked weighted by tickets — the more you buy,…"
---

**dLottery** is a server-wide lottery. Players buy tickets into a shared pool; when the round draws, a winner is picked **weighted by tickets** — the more you buy, the better your odds — and takes the (taxed) pool. It's MySQL-backed, so rounds, tickets and stats survive restarts, and winners get paid even if they're offline.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework (bundled — no separate install).

---

## What it does

- 🎟️ **Weighted draws** — each ticket is a chance; ticket count directly drives win probability.
- 🖥️ **Live GUI** — `/lottery` opens an interactive menu that refreshes as tickets are bought.
- 👑 **VIP tiers** — per-permission ticket caps (default → iron → gold → diamond → emerald).
- 💰 **Tax / money sink** — a configurable % is skimmed from the pool each round.
- ⏰ **Countdown reminders** — broadcast announcements at set intervals before the draw.
- 🏆 **Leaderboard** — sort by winnings, tickets bought, win count or biggest win.
- 📜 **Round history** — a full log of past winners, prizes and ticket counts.
- 🗄️ **MySQL-backed** — rounds, tickets and player stats persist across restarts.
- 📭 **Offline payouts** — winners are paid the next time they log in if they were away.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Spigot **1.16.5 – 1.21.x** |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin | required |
| MySQL **5.7+** / MariaDB **10.3+** | required |

See [Requirements](/plugins/dlottery/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/dlottery/getting-started/installation/)
- [Quick Start](/plugins/dlottery/getting-started/quick-start/)
- [How a Round Works](/plugins/dlottery/features/how-a-round-works/)
- [settings.yml reference](/plugins/dlottery/configuration/settings/)
- [Commands & Permissions](/plugins/dlottery/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dlottery/faq/)
