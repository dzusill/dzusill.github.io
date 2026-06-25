---
title: "Requirements"
description: "Before installing dBloodMoney, make sure your server meets these."
---

Before installing dBloodMoney, make sure your server meets these.

## Server

| Requirement | Version | Notes |
|---|---|---|
| Paper | **1.21.1** | Spigot may work but Paper is the supported target. |
| Java | **21** | Required by Minecraft 1.21. |

## Required plugins

| Plugin | Why |
|---|---|
| **DzusillCore** `1.1.0+` | The framework dBloodMoney is built on. The plugin **will not load** without it. |
| **Vault** | The economy bridge. |
| **An economy plugin** | Vault only provides the API — you also need a provider such as **EssentialsX**, **CMI**, or any Vault-compatible economy. Without one, balances don't exist and stealing is disabled. |

> **No economy?** dBloodMoney still loads, but it logs a warning and disables stealing until Vault + an economy provider are present.

## Optional plugins

| Plugin | Adds |
|---|---|
| **PlaceholderAPI** | PRO placeholders for scoreboards, tab and chat. |
| **MySQL / PostgreSQL** | PRO cross-server storage for stats and bounties (otherwise flat files are used). |

## Editions

dBloodMoney ships as two jars:

- `dBloodMoney.jar` — **Free** edition.
- `dBloodMoney-PRO.jar` — **PRO** edition (bounties, leaderboards, kill streaks, placeholders).

Install **one** of them. They share the same plugin name, so upgrading is a drop-in replacement. See [Free vs PRO](/plugins/dbloodmoney/getting-started/free-vs-pro/).
