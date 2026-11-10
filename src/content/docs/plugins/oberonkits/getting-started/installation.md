---
title: "Installation"
description: "OberonCore is a separate plugin jar and must already be in plugins/. It is not shaded into this plugin,"
---

## Requirements

| Item | Value |
|---|---|
| Server software | Paper 26.2 or newer (tested on Paper 26.3) |
| Java | 25 or newer |
| Required dependencies | **OberonCore** 1.14.4 or newer, **EssentialsX** (the kits live in its `kits.yml`) |
| Needed in practice | **Multiverse-Core** and **Multiverse-Inventories**, so the kit world keeps its own inventory |
| Optional dependencies | ExcellentEconomy (Stardust kits), PlaceholderAPI |

OberonCore is a separate plugin jar and must already be in `plugins/`. It is not shaded into this plugin,
so the two are updated independently.

- **EssentialsX** holds the kits. OberonKits reads them through the Essentials API, so `slot:N` lines,
  enchantments and every item Essentials can store work as they do with `/kit`.
- **Multiverse-Inventories** is what lets a player leave the arena with their survival inventory intact.
  OberonKits reads its `groups.yml` at start-up and refuses to clear inventories in a kit world that
  shares them with a survival world — see [Inventory guard](/plugins/oberonkits/features/kit-worlds/#inventory-guard).
- **ExcellentEconomy** is only needed for [Stardust kits](/plugins/oberonkits/features/stardust-kits/). Without it the
  free kits work and paid kits say they are unavailable.
- **PlaceholderAPI** adds the [placeholders](/plugins/oberonkits/reference/placeholders/) and lets messages use other
  plugins' placeholders.

## Steps

1. Drop `OberonKits.jar` into `plugins/` next to OberonCore and EssentialsX.
2. Start the server. The default files are written to `plugins/OberonKits/`, with a ready profile for
   a world named `ffa` and the kits `ffa1`–`ffa5`.
3. If your arena world or kits are named differently, edit `profiles.yml` (see
   [Quick start](/plugins/oberonkits/getting-started/quick-start/)), then run `/okits reload`.
4. Run `/okits list`. Your profile should be listed without **[disabled]**, and the console should show
   no warnings.
5. Walk into the arena. The kit menu opens.

## Storage

The last kit each player used, a kit queued for their next respawn and their Stardust kit uses are kept
in embedded H2 by default — one file in the plugin folder, nothing to install. Switch to MySQL or
PostgreSQL in [`database.yml`](/plugins/oberonkits/configuration/database/) only if you already run one.

## Upgrading

`config.yml`, `messages.yml` and `menus.yml` are merged on load: keys added by a new version appear with
their defaults and your own values stay.

`profiles.yml` is never merged — it is yours. The only thing that writes it is the
[admin GUI](/plugins/oberonkits/features/admin-gui/), one key per change. When a new version adds a profile key (as 1.1.0 added
`regen`), the default comes from `defaults` in `config.yml`, so the profile works without changes; add
the key to the profile only to set it differently.

Command names (`commands` in `config.yml`) are read at start-up; changing them needs a restart. Every
other setting is applied by `/okits reload`.
