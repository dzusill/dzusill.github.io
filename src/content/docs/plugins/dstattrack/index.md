---
title: "dStattrack"
description: "dStattrack counts kills, broken blocks and caught fish directly on the item a player is holding, and shows the running totals in the item's lore. Pay once…"
---

**dStattrack** counts kills, broken blocks and caught fish **directly on the item** a player is holding, and shows the running totals in the item's lore. Pay once to apply a stattrack, then watch the numbers climb as you play.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore) (bundled — no separate install) and stores its counters as NBT through NBTAPI, so they survive drops, trades and chests.

---

## What it does

- 📊 **On-item counters** — kills, blocks broken and fish caught are stored on the item itself, not in a database.
- 🗡️ **Tracks the right tools** — swords/bow/crossbow/trident/mace count kills, pickaxe/axe/shovel/hoe/shears count broken blocks, fishing rods count fish.
- 💰 **Pay to apply** — applying a stattrack charges the player through Vault (configurable price).
- 🖼️ **Drag-and-drop GUI** — `/dstattrack` opens a menu: drop an item, click **Add**.
- 🎨 **Custom lore & sounds** — every line of the on-item display and every feedback sound is configurable MiniMessage.
- 🔢 **Admin tools** — set any counter to an exact value, inspect raw tags, or remove a stattrack entirely.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21.1** |
| Java | **21** |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin | required to **apply** a stattrack |
| [NBTAPI](https://www.spigotmc.org/resources/nbt-api.7939/) | required to **store** counters on items |

Both are soft dependencies: the plugin still loads if one is missing, but applying stattracks won't work without them. See [Requirements](/plugins/dstattrack/getting-started/requirements/).

---

## Quick links

- [Requirements](/plugins/dstattrack/getting-started/requirements/)
- [Installation](/plugins/dstattrack/getting-started/installation/)
- [Quick Start](/plugins/dstattrack/getting-started/quick-start/)
- [Tracked Stats](/plugins/dstattrack/features/tracked-stats/)
- [config.yml reference](/plugins/dstattrack/configuration/config/)
- [Commands & Permissions](/plugins/dstattrack/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dstattrack/faq/)
