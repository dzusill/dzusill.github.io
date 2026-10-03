---
title: "Installation"
description: "OberonCore is a separate plugin jar and must already be in plugins/. It is not shaded into this"
---

## Requirements

| Item | Value |
|---|---|
| Server software | Paper 1.21+ (built and tested against Paper 26.2) |
| Java | 21 or newer |
| Required dependency | **OberonCore** 1.14.4 or newer |
| Needed in practice | **WorldGuard** — zones are its regions; without it the plugin still starts, but nobody can be inside a zone |
| Optional dependencies | PlaceholderAPI, PvPManager, EssentialsX, MMOItems, ItemsAdder, Oraxen, ExecutableItems |

OberonCore is a separate plugin jar and must already be in `plugins/`. It is not shaded into this
plugin, so the two are updated independently. If the core on the server is older than the one this
plugin was built against, OberonAFK refuses to enable and says which jar the core classes came from —
a server with both `DzusillCore` and `OberonCore` installed can end up using the older one.

None of the optional plugins is needed to run:

- PlaceholderAPI adds the [placeholders](/plugins/oberonafk/reference/placeholders/).
- PvPManager lets [`/afk`](/plugins/oberonafk/features/teleport/) refuse a player who is combat-tagged.
- EssentialsX is only listed so OberonAFK loads after it; see [taking over `/afk`](/plugins/oberonafk/features/teleport/#taking-over-afk).
- The four item plugins make [`hook:` rewards](/plugins/oberonafk/configuration/rewards/#item-rewards) available.

Each is picked up when present and ignored when not.

## Steps

1. Drop `OberonAFK.jar` into `plugins/`.
2. Start the server. The default configuration is written to `plugins/OberonAFK/` and an example zone
   with a ready-made reward table is loaded.
3. Create the region in WorldGuard (`/rg define afk`) in the world named in `zones.yml`, or edit the
   shipped zone to point at a region you already have.
4. Stand in it and run `/afk zone list`. The zone should read **active**.
5. Stand where `/afk` should land players and run `/afk zone setspawn afk`.
6. Replace the example commands in `rewards.yml` with the ones your economy and crates plugins use.
7. Behind Velocity or BungeeCord, check that the proxy forwards player addresses, or the alt guard sees
   every player as one: [Setting up the alt guard](/plugins/oberonafk/getting-started/alt-guard-setup/).

## Storage

The claim storage, the drop history and the per-player totals use embedded H2 by default — a single
file inside the plugin folder, with nothing to install and no credentials. Switch to MySQL or
PostgreSQL in [`database.yml`](/plugins/oberonafk/configuration/database/) only if you already run one.

Do not switch the database off on a live server: items waiting in storage and all statistics then
live only until the next restart.

## Upgrading

Configuration files are merged on load, so new keys from a new version appear with their defaults and
your own values are kept. A few sections are owner-curated and never default-merged, so what you
delete stays deleted: `zones` in `zones.yml` (and the shipped `zones.afk`), `tables` in `rewards.yml`
(and the shipped `tables.default`), `decorations` in `gui.yml`, and `Presentation.Overrides` and
`titles` in `config.yml`.

`data.yml` is written by the plugin itself and is never merged.
