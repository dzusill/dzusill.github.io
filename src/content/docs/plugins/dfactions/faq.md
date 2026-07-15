---
title: "FAQ & Troubleshooting"
description: "What server software and version do I need?"
---

## General

**What server software and version do I need?**
Paper, Folia, or Spigot **1.21.x** on **Java 21+**. Paper recommended.

**Do I need MySQL?**
No. The embedded **H2** database works out of the box. MySQL/MariaDB is optional — see
[database.yml](/plugins/dfactions/configuration/database/).

**Does it work on Folia?**
Yes. dFactions never calls the Bukkit scheduler directly; it uses a Folia-aware abstraction.
`folia-supported: true` is declared.

## Setup

**Money commands (create cost, bank) do nothing.**
Install [Vault](https://www.spigotmc.org/resources/vault.34315/) **and** an economy plugin, then
restart. Without a provider, money features no-op.

**Placeholders show as raw `%pvpindex_...%` text.**
Install PlaceholderAPI — the `pvpindex` expansion registers automatically once PAPI is present.

**I enabled beacons / wars / shields / supply drops but nothing happens.**
These systems are **off by default**. After setting `enabled: true`, run `/fa reload` or restart, and
check the value is under the right section in `config.yml`.

**Changes to `config.yml` don't apply.**
Run `/fa reload`. A few structural settings — **database type** and **`worldguard-sync-regions`** —
require a full restart (noted in their comments).

## Gameplay

**Why can't my faction claim more land?**
Claim capacity is **prestige-gated** (`factions.claims.per-prestige`), not power-based. Level up and
prestige to raise the cap. Power governs raidability instead. See
[Leveling & Prestige](/plugins/dfactions/features/progression/).

**How do we earn XP?**
Deposit items into the Resource Chest via `/f resources`. XP per item is set in
`factions.leveling.item-xp`, and any material not listed falls back to `item-xp-default` — so every
deposited item grants at least some XP (rarer items are worth more).

**A war declaration was rejected. Why?**
Common causes: wars disabled, either side already at war, too few members, factions outside
`level-range`, the defender is shielded, or you're within `cooldown-hours` of a prior war. See
[Wars, Shields & Stats](/plugins/dfactions/features/wars-and-shields/).

**How do bans work?**
`/f ban <player>` (leader only) is name-based and persistent — it kicks the player if they're a
member and blocks re-joining (open or invited) until `/f unban <player>`.

## Data & maintenance

**How do I back up?**
Stop the server and copy `plugins/dFactions/data/` (H2), or `mysqldump` your database
(MySQL). Keep a copy of `config.yml` too.

**How do I reset a season?**
Stop the server, delete `plugins/dFactions/data/` (H2) or drop/recreate the MySQL database,
then start again. Config is preserved.

**Where do I change the language?**
The plugin runs **English-only** for now — edit `messages/messages_en.yml`. Player-side language
switching (`/f language`) is disabled.

## Still stuck?

- Check the server console for warnings/errors around plugin enable.
- Temporarily set `debug.jaloquent-logging: true` in `database.yml` to trace SQL (very noisy).
- Verify optional-plugin versions match your server version (Vault, PAPI, WorldGuard, …).
