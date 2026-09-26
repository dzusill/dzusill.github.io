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
| Optional dependencies | PlaceholderAPI, WorldGuard, FancyHolograms 2.4.0+ |

OberonCore is a separate plugin jar and must already be in `plugins/`. It is not shaded into this
plugin, so the two are updated independently.

None of the optional plugins is needed to run: PlaceholderAPI adds the placeholders, WorldGuard adds
[region filtering](/plugins/oberonenvoys/features/regions/) for landing sites, and FancyHolograms adds a richer
[hologram backend](/plugins/oberonenvoys/features/holograms/). Each is picked up when present and ignored when not.

## Steps

1. Drop `OberonEnvoys.jar` into `plugins/`.
2. Start the server. The default configuration is written to `plugins/OberonEnvoys/` and a
   working three-tier example is ready to run.
3. Open `config.yml` and set `worlds` to the world (or worlds) drops should land in. Nothing else has
   to change to see a drop.
4. Run `/envoy spawn` to force one immediately and watch it land.

## Storage

Claim statistics use embedded H2 by default — a single file inside the plugin folder, with nothing to
install and no credentials. Switch to MySQL in `database.yml` only if you already run one.

Setting `enabled: false` there is supported: the events run exactly as before, and only the
leaderboard and the claim placeholders go away.

## Upgrading

Configuration files are merged on load, so new keys from a new version appear with their defaults and
your own values are kept. `tiers.yml` and `zones.yml` are the exception — they are never
default-merged, so a tier or zone you deleted stays deleted.

## Upgrading from OberonSupplyDrops (1.x)

OberonEnvoys **is** OberonSupplyDrops — version 2.0 renamed it. Everything you set up carries over:

1. Update **OberonCore** first (1.14.4 or newer).
2. **Delete `OberonSupplyDrops.jar`** and put `OberonEnvoys.jar` in its place. Do not keep both:
   OberonEnvoys refuses to start while the old jar is loaded, and says so in the console.
3. Start the server. On the first start, `plugins/OberonSupplyDrops/` is copied to
   `plugins/OberonEnvoys/` — config, messages, tiers, zones, menus and the claim database, so the
   leaderboard carries on. The old folder is left in place as a backup; delete it once you are happy.
   Nothing is copied if `plugins/OberonEnvoys/config.yml` already exists.

Crates that were on the map when the server stopped are recognised and restored as before. Doing the
swap while no envoy is active is still the tidiest option.

**What changed names, and what to update:**

| Before | After | What to do |
|---|---|---|
| `/supplydrop` | `/envoy` | Nothing. `/supplydrop` and `/drops` still run, they are just no longer offered in tab completion |
| `oberonsupplydrops.*` permissions | `oberonenvoys.*` | Rename the nodes in LuckPerms (below) |
| `%oberonsupplydrops_…%` placeholders | `%oberonenvoys_…%` | Replace the prefix in TAB, scoreboards and holograms; the part after it is unchanged |
| `commands.aliases: ["drops"]` | default `["envoys"]` | Optional — your own list is kept |

LuckPerms can rename each node in place with a bulk update (it asks you to confirm each one):

```
/lp bulkupdate all update permission oberonenvoys.use "permission == oberonsupplydrops.use"
/lp bulkupdate all update permission oberonenvoys.preview "permission == oberonsupplydrops.preview"
/lp bulkupdate all update permission oberonenvoys.next "permission == oberonsupplydrops.next"
/lp bulkupdate all update permission oberonenvoys.locate "permission == oberonsupplydrops.locate"
/lp bulkupdate all update permission oberonenvoys.top "permission == oberonsupplydrops.top"
/lp bulkupdate all update permission oberonenvoys.notify "permission == oberonsupplydrops.notify"
/lp bulkupdate all update permission oberonenvoys.admin "permission == oberonsupplydrops.admin"
/lp bulkupdate all update permission oberonenvoys.* "permission == oberonsupplydrops.*"
```

The database table keeps its old name, `oberonsupplydrops_claims`, so a shared MySQL database needs no
changes at all.
