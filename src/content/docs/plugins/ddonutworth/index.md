---
title: "dDonutWorth"
description: "dDonutWorth gives every item a sell price. Players check what something is worth, sell it from their"
---

**dDonutWorth** gives every item a sell price. Players check what something is worth, sell it from their
hand, their inventory or a drop-in menu, and see a `Worth: $x` line on their items as they play — including
the **total worth of a packed shulker box**. Sell into a category often enough and your multiplier there
goes up.

Its headline trick: prices are **derived live from [dRotatingShop](/plugins/drotatingshop/)**. Raise your
shop's prices and every sell price moves with them, in the same tick, with nothing to change here.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

> **No license key.** The plugin never contacts a remote server, so it cannot stop working because a key
> server had a bad day.

---

## What it does

- 💵 **Prices that follow your shop** — sell worth is a configurable fraction of dRotatingShop's buy price
  (20% by default). Its `temporary-adjustment` is read live, so a weekend markup moves buy *and* sell prices
  together. See [Price Sources](/plugins/ddonutworth/features/price-sources/).
- 📝 **A price file you can actually read** — one line per item, keyed by name: `POTATO: 500.0`. Find an
  item, change it, delete it. See [Readable Item Keys](/plugins/ddonutworth/features/item-keys/).
- 🏷️ **Worth lore everywhere** — tooltips show what an item is worth in chests, ender chests, barrels, the
  player's own inventory and any GUI you list. See [Worth Lore](/plugins/ddonutworth/features/worth-lore/).
- 📦 **Shulker box totals** — a packed box shows the summed worth of everything inside it, nested boxes
  included.
- 🪄 **`/setworth` on anything** — vanilla, enchanted, custom-model-data, or a sword from MMOItems, Oraxen,
  Nexo or ItemsAdder. See [Custom Items](/plugins/ddonutworth/features/custom-items/).
- 📈 **Per-category sell multipliers** — nine categories out of the box, each with a twenty-tier ladder and
  its own progress page. See [Sell Multipliers](/plugins/ddonutworth/features/sell-multipliers/).
- 🪓 **A sell axe** — right-click a container to sell everything inside. The expiry lives on the item, so it
  survives restarts and can be traded. See [The Sell Axe](/plugins/ddonutworth/features/the-sell-axe/).
- 🖼️ **Sortable, filterable GUIs** — prices (by name / highest / lowest, filtered by category), a drop-in
  sell menu, and sell history.
- 🔌 **Placeholders & metrics** — optional PlaceholderAPI placeholders and bStats.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21+** (Purpur and Folia work too) |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.3.0** — required (hard dependency) |
| Vault + economy plugin | **required** — payouts go through it |
| [dRotatingShop](/plugins/drotatingshop/) | optional, but the default price source |
| PlaceholderAPI | optional — for the placeholders |
| MMOItems / Oraxen / Nexo / ItemsAdder | optional — recognised with no dependency at all |

See [Requirements](/plugins/ddonutworth/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/ddonutworth/getting-started/installation/) · [Quick Start](/plugins/ddonutworth/getting-started/quick-start/)
- [Price Sources](/plugins/ddonutworth/features/price-sources/) · [Readable Item Keys](/plugins/ddonutworth/features/item-keys/)
- [prices.yml reference](/plugins/ddonutworth/configuration/prices/) · [config.yml reference](/plugins/ddonutworth/configuration/config/)
- [Commands & Permissions](/plugins/ddonutworth/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/ddonutworth/faq/)
