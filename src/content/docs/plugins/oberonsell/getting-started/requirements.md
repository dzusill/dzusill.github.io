---
title: "Requirements"
description: "Spigot and CraftBukkit are not supported. OberonSell uses Paper's runtime command registration and"
---

## Server

| | |
|---|---|
| Software | Paper, Purpur or Folia **1.21+** |
| Java | **21** or newer |

Spigot and CraftBukkit are not supported. OberonSell uses Paper's runtime command registration and
Adventure text, neither of which exists on plain Spigot.

## OberonCore (DzusillCore)

**Required.** OberonSell is a plugin *on* the framework, not a copy of it — the core jar must sit in
`plugins/` next to it. Without it the server refuses to enable OberonSell and logs
`Unknown/missing dependency: OberonCore`.

## Vault

**Also required, and a hard dependency.** With no economy provider there is nothing to pay players with, so
the plugin logs an error and disables itself rather than pretending to work:

```
[OberonSell] Vault economy not found — OberonSell needs one to pay players. Disabling.
```

Install Vault plus any Vault-compatible economy (EssentialsX Economy, CMI, and so on) and restart.

## Optional

| | What it adds |
|---|---|
| **ProtocolLib** | Packet-mode [worth lore](/plugins/oberonsell/features/worth-lore/) and the sign search prompt. See below |
| **PlaceholderAPI** | All `%oberonsell_*%` [placeholders](/plugins/oberonsell/placeholders/). Without it the plugin works fine — they just aren't registered |
| **MMOItems / Oraxen / Nexo / ItemsAdder** | Readable price keys for their items. Not dependencies — see below |

### About ProtocolLib

Optional, and worth installing. It buys two things, and the plugin works without it either way:

- **[Worth lore](/plugins/oberonsell/features/worth-lore/) sent per player** instead of written into items. Items are
  never modified, so a price line can show the total for a whole stack without stopping stacks of
  different sizes from merging, and there is nothing to strip on close, on quit or after a crash.
- **A sign to type item searches into**, rather than closing the GUI and typing in chat. See
  [`search.input`](/plugins/oberonsell/configuration/config/#search).

Which mode is live is logged at startup, so you never have to guess:

```
[OberonSell] Worth lore is sent per player through ProtocolLib; items are never modified.
[OberonSell] Item searches are typed into a sign.
```

### About custom-item plugins

MMOItems, Oraxen, Nexo and ItemsAdder need **nothing installed on our side** and are not dependencies —
they are soft dependencies for load order only. Each writes its item id into the item's persistent data,
which plain Bukkit can read. See [Custom Items](/plugins/oberonsell/features/custom-items/).

## What it does *not* need

- **A price feed.** Prices come from [`prices.yml`](/plugins/oberonsell/configuration/prices/) alone, and it ships with
  the full migrated table already in it. Nothing external supplies or moves a price.
- **A database.** Storage is YAML only — there is no SQLite or MySQL backend yet. Player records live in
  `playerdata.yml`.
- **A permissions plugin** — not required, though you will want one for the
  `oberonsell.multiplier.<value>` rank perks.
