---
title: "Requirements"
description: "dLottery is built on the DzusillCore framework, but the framework is bundled inside the jar — you do not install DzusillCore separately."
---

| Requirement | Version | Notes |
|---|---|---|
| Server software | Paper / Spigot **1.16.5 – 1.21.x** | |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin (EssentialsX, CMI, …) | latest | **Required** — tickets cost money and prizes are paid through Vault. |
| MySQL **5.7+** or MariaDB **10.3+** | — | **Required** — all rounds, tickets and stats are stored in the database. |

dLottery is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework, but the framework is **bundled inside the jar** — you do **not** install DzusillCore separately.

> **MySQL is mandatory.** Unlike some DzusillCore plugins, dLottery has no flat-file mode — it needs a database for its rounds, tickets, history and player stats. There is no SQLite option. Have a MySQL/MariaDB database and credentials ready before installing.
