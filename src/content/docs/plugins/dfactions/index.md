---
title: "dFactions"
description: "dFactions is a modern factions plugin for Paper, Folia and Spigot 1.21.x — territory control, a"
---

**dFactions is a modern factions plugin for Paper, Folia and Spigot 1.21.x** — territory control, a
physical Beacon HQ, faction leveling and prestige, declared wars, purchasable shields and contested
supply drops, backed by an embedded database that needs zero setup.

Built for competitive PvP servers, it stores everything through an embedded **H2** database out of
the box (MySQL/MariaDB optional) and plugs into Vault, PlaceholderAPI, WorldGuard, EssentialsX,
dynmap, DiscordSRV and LWC — every integration fully optional.

---

## What it does

- 🧱 **Territory** — chunk claiming, safe & war zones, optional WorldGuard region sync.
- 📈 **Leveling & prestige** — deposit resources into a Resource Chest for XP, prestige for permanent
  perks and a recolored tag. Prestige sets your claim capacity.
- 🛰️ **Beacon HQ** — a physical, protected beacon block is your faction's heart and, during wars, the
  objective enemies must destroy.
- ⚔️ **Declared wars** — prep window, level-range gating, per-kill bank steal, beacon-destroy victory.
- 🛡️ **Shields** — buy timed protection tiers (6 / 12 / 24 / 48h) from the faction bank.
- 🎁 **Supply drops** — timed, contested loot chests spawn in the world.
- 💰 **Economy** — faction bank, create/claim costs, tax and interest through Vault.
- 👥 **Roles & relations** — custom roles, promote/demote, ally / truce / enemy / neutral, merges.
- 🖥️ **GUI** — a full in-game menu: overview, members, statistics, storage, bank, activity log.

## Requirements

- **Server:** Paper / Folia / Spigot **1.21.x**
- **Java:** 21+
- **Database:** none required — embedded H2 (MySQL/MariaDB optional)

New here? Start with **[Requirements](/plugins/dfactions/getting-started/requirements/)**, then
**[Installation](/plugins/dfactions/getting-started/installation/)** and the **[Quick Start](/plugins/dfactions/getting-started/quick-start/)**.

> Several flagship systems — Beacon HQ, shields, declared wars, supply drops — ship **disabled by
> default**. Turn them on in [config.yml](/plugins/dfactions/configuration/config/) when you're ready.
