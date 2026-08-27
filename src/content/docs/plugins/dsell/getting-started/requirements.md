---
title: "Requirements"
description: "Spigot and CraftBukkit are not supported. DSell uses Paper's runtime command registration and"
---

## Server

| | |
|---|---|
| Software | Paper, Purpur or Folia **1.21+** |
| Java | **21** or newer |

Spigot and CraftBukkit are not supported. DSell uses Paper's runtime command registration and
Adventure text, neither of which exists on plain Spigot.

## DzusillCore (DzusillCore)

**Required.** DSell is a plugin *on* the framework, not a copy of it — the core jar must sit in
`plugins/` next to it. Without it the server refuses to enable DSell and logs
`Unknown/missing dependency: DzusillCore`.

## Vault

**Also required, and a hard dependency.** With no economy provider there is nothing to pay players with, so
the plugin logs an error and disables itself rather than pretending to work:

```
[DSell] Vault economy not found — DSell needs one to pay players. Disabling.
```

Install Vault plus any Vault-compatible economy (EssentialsX Economy, CMI, and so on) and restart.

## ProtocolLib

**Required for [worth lore](/plugins/dsell/features/worth-lore/), nothing else.** Worth lore has exactly one way of
working — it decorates the copy of an item sent to the client, so the item on the server is never modified
— and that needs ProtocolLib. There is no fallback to drop back to. Without it installed, worth lore logs
why and shows nothing; every other part of the plugin — selling, pricing, every menu and command — runs
exactly the same.

```
[DSell] worth-lore.enabled is true but ProtocolLib is not installed. Worth lore has no fallback and
needs it — install ProtocolLib, or set worth-lore.enabled: false to stop seeing this.
```

`/dsell doctor` reports the same thing. With ProtocolLib present, startup instead logs:

```
[DSell] Worth lore is sent per player through ProtocolLib; items are never modified.
```

ProtocolLib also, separately, upgrades the prices-GUI search prompt to a sign you type into rather than
closing the GUI and typing in chat — see [`search.input`](/plugins/dsell/configuration/config/#search). That part
stays fully optional; only worth lore requires ProtocolLib.

## Optional

| | What it adds |
|---|---|
| **PlaceholderAPI** | All `%dsell_*%` [placeholders](/plugins/dsell/placeholders/). Without it the plugin works fine — they just aren't registered |
| **MMOItems / Oraxen / Nexo / ItemsAdder** | Readable price keys for their items. Not dependencies — see below |

### About custom-item plugins

MMOItems, Oraxen, Nexo and ItemsAdder need **nothing installed on our side** and are not dependencies —
they are soft dependencies for load order only. Each writes its item id into the item's persistent data,
which plain Bukkit can read. See [Custom Items](/plugins/dsell/features/custom-items/).

## What it does *not* need

- **A price feed.** Prices come from [`prices.yml`](/plugins/dsell/configuration/prices/) alone, and it ships with
  the full migrated table already in it. Nothing external supplies or moves a price.
- **A database.** Storage is YAML only — there is no SQLite or MySQL backend yet. Player records live in
  `playerdata.yml`.
- **A permissions plugin** — not required, though you will want one for the
  `dsell.multiplier.<value>` rank perks.
