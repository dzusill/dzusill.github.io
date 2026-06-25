---
title: "Requirements"
description: "dStattrack is built on the DzusillCore framework, but the framework is bundled inside the jar — you do not install DzusillCore separately for this plugin."
---

## Server

| Requirement | Version | Notes |
|---|---|---|
| Server software | Paper **1.21.1** | Spigot works, but Paper is recommended. |
| Java | **21** | Required by Paper 1.21.1. |

dStattrack is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework, but the framework is **bundled inside the jar** — you do **not** install DzusillCore separately for this plugin.

## Dependencies

| Plugin | Required for | If missing |
|---|---|---|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin (EssentialsX, CMI, …) | Charging the price to **apply** a stattrack | Applying fails with *"Economy (Vault) is not available."* |
| [NBTAPI](https://www.spigotmc.org/resources/nbt-api.7939/) | **Storing** the counters on items | Counters can't be written/read; stattracks won't work. |

Both are declared as **soft dependencies** in `plugin.yml`, so the plugin loads and degrades gracefully rather than crashing if one is absent — but for full functionality, install both.

> **Why NBTAPI?** dStattrack keeps its counters in the item's raw NBT (under the legacy tag names `Playerkills`, `Mobkills`, `Block`, `Fishing`). NBTAPI provides stable cross-version access to those tags and preserves the original item format, so items stattracked on older servers keep working.

## Version notes (1.21.1)

dStattrack was updated from the original 1.16.2 plugin. Newer content is handled automatically:

- **Mace** (1.21) is tracked in the kills group.
- **Hoe / Shears** are tracked in the block group (they fire `BlockBreakEvent`).
- **New mobs** (warden, breeze, sniffer, camel, …) need no config — any non-player death counts as a mob kill.
- **New blocks** (deepslate, copper, sculk, cherry, …) need no config — any broken block counts.
- **Brushing** (archaeology) is **not** tracked: there is no stable block-break event for it.
