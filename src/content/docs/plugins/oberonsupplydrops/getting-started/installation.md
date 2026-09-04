---
title: "Installation"
description: "OberonCore is a separate plugin jar and must already be in plugins/. It is not shaded into this"
---

## Requirements

| Item | Value |
|---|---|
| Server software | Paper 1.21+ (built and tested against Paper 26.2) |
| Java | 21 or newer |
| Required dependency | **OberonCore** |
| Optional dependency | PlaceholderAPI |

OberonCore is a separate plugin jar and must already be in `plugins/`. It is not shaded into this
plugin, so the two are updated independently.

## Steps

1. Drop `OberonSupplyDrops.jar` into `plugins/`.
2. Start the server. The default configuration is written to `plugins/OberonSupplyDrops/` and a
   working three-tier example is ready to run.
3. Open `config.yml` and set `worlds` to the world (or worlds) drops should land in. Nothing else has
   to change to see a drop.
4. Run `/supplydrop spawn` to force one immediately and watch it land.

## Storage

Claim statistics use embedded H2 by default — a single file inside the plugin folder, with nothing to
install and no credentials. Switch to MySQL in `database.yml` only if you already run one.

Setting `enabled: false` there is supported: the events run exactly as before, and only the
leaderboard and the claim placeholders go away.

## Upgrading

Configuration files are merged on load, so new keys from a new version appear with their defaults and
your own values are kept. `tiers.yml` and `zones.yml` are the exception — they are never
default-merged, so a tier or zone you deleted stays deleted.
