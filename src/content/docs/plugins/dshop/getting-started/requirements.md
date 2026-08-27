---
title: "Requirements"
description: "Without DzusillCore the plugin will not enable — Bukkit reports the missing dependency by name."
---

## Required

| | |
|---|---|
| **Server** | Paper 26.2, or 1.21.x. Purpur and Folia work. |
| **Java** | 25 |
| **DzusillCore** | The framework this is built on. It is a separate plugin jar. |

Without DzusillCore the plugin will not enable — Bukkit reports the missing dependency by name.

## Strongly recommended

| | Why |
|---|---|
| **Vault** and an economy plugin | Every shipped price is in `money`, which is Vault. Without it the shop opens and nothing can be bought. |

`/adminshop doctor` says so plainly if this is missing, rather than leaving you to work it out from a
purchase that quietly fails.

## Optional

| | What it adds |
|---|---|
| **ExcellentEconomy** | Currencies like Stardust. Only needed if a category is priced in one. |
| **PlaceholderAPI** | The `%dshop_...%` placeholders. |
| **ItemsAdder / Oraxen / Nexo / MMOItems** | Only if a product names one of their items. |

Nothing on the optional list is needed for the plugin to enable. All of it changes what the plugin can
do, and `/adminshop doctor` reports which of them it actually found.

## Storage

SQLite by default, in `plugins/DShop/dshop.db`. Nothing to install — Paper already ships the
driver.

MySQL is a config change; see [config.yml](/plugins/dshop/configuration/config/#database).

**If storage cannot be opened the plugin still enables.** Stock, purchase limits, favourites, recently
bought and dynamic pricing switch off and the shop keeps selling at its configured prices, with the
reason logged and repeated in `/adminshop doctor`. A shop that refuses to start over a locked file would
be the worse outcome.
