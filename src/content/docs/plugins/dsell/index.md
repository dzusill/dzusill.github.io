---
title: "DSell"
description: "DSell gives every item a sell price. Players check what something is worth, sell it from their"
---

**DSell** gives every item a sell price. Players check what something is worth, sell it from their
hand, their inventory, a drop-in menu or automatically as they pick things up, and see a `Worth: $x` line
on their items as they play — including the **total worth of a packed shulker box**. Sell into a category
often enough and your multiplier there goes up.

Prices live in one file — `prices.yml` — and it ships with the client's full migrated table already in it:
**1,480 material prices, 136 potion variants and 40 enchantment values** out of the box. Nothing derives
from another plugin, so a price is exactly what the file says and nothing moves underneath it.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework and works on Paper,
Purpur and Folia.

> **No license key.** The plugin never contacts a remote server, so it cannot stop working because a key
> server had a bad day.

---

## What it does

- 💵 **One price file, already filled in** — `prices.yml` ships 1,616 item prices plus an enchantment
  table. Edit a line, delete a line, or add your own under `items:`. See [Pricing](/plugins/dsell/features/pricing/).
- 📝 **Keys you can actually read** — `POTATO: 500.0`, not `item_17: 7000.0`. Find an item, change it,
  delete it. See [Readable Item Keys](/plugins/dsell/features/item-keys/).
- 🧮 **Exact money** — every price, payout, category total and lifetime total is held as a `BigDecimal`
  and rounded once, at a scale you choose. A season of sales cannot drift.
- 🏷️ **Worth lore everywhere** — tooltips show what an item is worth in chests, ender chests, barrels, the
  player's own inventory and any GUI you list. See [Worth Lore](/plugins/dsell/features/worth-lore/).
- 📦 **Shulker box totals** — a packed box shows the summed worth of everything inside it, nested boxes
  included, and selling it pays for the contents too.
- ✨ **Enchantments are worth money** — an Efficiency V, Unbreaking III pickaxe sells for the pickaxe price
  plus what those enchantments are worth. See [Enchantment Worth](/plugins/dsell/features/enchantment-worth/).
- 🛒 **Five ways to sell** — `/sell` (menu), `/sell hand`, `/sellall`, a sell axe, and
  [auto-sell on pickup](/plugins/dsell/features/auto-sell/).
- 🔒 **Paid before items are taken** — the deposit lands first and a refused deposit aborts the sale, so an
  economy plugin can never eat an inventory. Per-container locks and a click cooldown stop a double payout.
- 🪄 **`/setworth` on anything** — vanilla, enchanted, custom-model-data, or a sword from MMOItems, Oraxen,
  Nexo or ItemsAdder. See [Custom Items](/plugins/dsell/features/custom-items/).
- 📈 **Per-category sell multipliers** — nine categories out of the box, each with a twenty-tier ladder and
  its own progress page. See [Sell Multipliers](/plugins/dsell/features/sell-multipliers/).
- 🪓 **A sell axe** — right-click a container to sell everything inside. The expiry lives on the item, so it
  survives restarts and can be traded. See [The Sell Axe](/plugins/dsell/features/the-sell-axe/).
- 🖼️ **Sortable, filterable GUIs** — prices (by name / highest / lowest, filtered by category), a drop-in
  sell menu, sell history and a sell leaderboard.
- 🔌 **Placeholders & metrics** — optional PlaceholderAPI placeholders and bStats.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21+** (Purpur and Folia work too) |
| Java | **21+** |
| [DzusillCore (DzusillCore)](https://github.com/dzusill/DzusillCore) | required (hard dependency) |
| Vault + economy plugin | **required** — payouts go through it |
| PlaceholderAPI | optional — for the placeholders |
| ProtocolLib | **required for worth lore** (no fallback); optional beyond that, for the sign search prompt |
| MMOItems / Oraxen / Nexo / ItemsAdder | optional — recognised with no dependency at all |

See [Requirements](/plugins/dsell/getting-started/requirements/).

---

## The idea in one picture

```
what is this item worth?
  └─ walk the item's keys, most specific first
     ├─ items:              the owner's own overrides, plus /setworth blobs
     ├─ prices.by-serialized  potion and tipped-arrow variants
     └─ prices.by-material    the migrated material table
        └─ found a price?
           ├─ 0     → explicitly unsellable
           ├─ >0    → add the enchantment bonus, unless the key already named the enchantments
           └─ none  → unsellable; enchantments add to a price, they never create one
```

Then, on a sale: `worth × amount × category tier × permission multiplier × global multiplier`.

---

## Quick links

- [Installation](/plugins/dsell/getting-started/installation/) · [Quick Start](/plugins/dsell/getting-started/quick-start/)
- [Pricing](/plugins/dsell/features/pricing/) · [Readable Item Keys](/plugins/dsell/features/item-keys/)
- [prices.yml reference](/plugins/dsell/configuration/prices/) · [config.yml reference](/plugins/dsell/configuration/config/)
- [Commands & Permissions](/plugins/dsell/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dsell/faq/)
