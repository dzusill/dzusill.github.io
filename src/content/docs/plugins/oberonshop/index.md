---
title: "OberonShop"
description: "OberonShop is a category shop your players open with /shop. It sells items, bundles of items and"
---

**OberonShop** is a category shop your players open with `/shop`. It sells items, bundles of items and
perks that run commands — priced in Vault money, in an ExcellentEconomy currency such as Stardust, or in
both at once from different categories.

Products can branch before they are bought. A firework asks which flight level, a potion asks which
effect, then which level, then how long. That is one generic engine, not a hard-coded special case per
item, so the same tree works for anything you can describe.

It is built on the [OberonCore](https://github.com/dzusill/DzusillCore) framework and works on Paper,
Purpur and Folia.

> **No license key.** The plugin never contacts a remote server, so it cannot stop working because a key
> server had a bad day.

---

## What it does

- 🛒 **Left click buys, right click quick-buys** — the buy screen shows quantity, unit price, total,
  stock, your remaining limit and your balance. See [Buying](/plugins/oberonshop/features/buying/).
- 🌳 **Variants, any depth** — Firework → Flight III, or Potion → Strength → Level II → 8 minutes. Every
  final choice sets its own price. See [Variants](/plugins/oberonshop/features/variants/).
- 📦 **Bundles and perks** — several items for one price, delivered whole or not at all; or no item at
  all and a list of commands that run after payment. See
  [Bundles & Perks](/plugins/oberonshop/features/bundles-and-perks/).
- 💱 **Two economies at once** — Blocks in money, Potions and Perks in Stardust. A category sets the
  default, an item overrides it. See [Currencies](/plugins/oberonshop/features/currencies/).
- 🔒 **Purchases are atomic** — every check runs before a coin moves, and the last of them measures
  whether the *whole* purchase fits in the player's inventory. See [Buying](/plugins/oberonshop/features/buying/#safety).
- 📉 **Stock, limits, sales, dynamic pricing** — all optional, all off by default. See
  [Stock & Limits](/plugins/oberonshop/features/stock-and-limits/) and [Pricing & Sales](/plugins/oberonshop/features/pricing-and-sales/).
- 🔎 **Search, favourites, recently bought, popular** — and `/shop repeat` to reopen your last purchase.
  See [Finding Things](/plugins/oberonshop/features/finding-things/).
- 🎨 **Every menu is a YAML file** — titles, rows, slots, materials, model data, glow, lore, sounds. See
  [GUIs](/plugins/oberonshop/configuration/guis/).
- 📊 **`%oshop_...%` placeholders** — prices, stock, limits, balances, favourites. See
  [Placeholders](/plugins/oberonshop/placeholders/).

## Coming from PerfShop

Your existing `shops/*.yml` files load unchanged, and `/adminshop import perfshop` brings your purchase
history across so the Popular and Recently Bought menus are not empty on switch day. See
[Migrating from PerfShop](/plugins/oberonshop/migrating-from-perfshop/).

## What it does not do

- **No selling.** OberonShop is purchase-only. Selling is [OberonSell](https://github.com/dzusill/OberonSell)'s job.
- **No in-game shop editor.** Administration is config files plus `/adminshop`.
- **No transaction history.** Counters, not a log — see the note in
  [Finding Things](/plugins/oberonshop/features/finding-things/#popular-items).
- **No cross-server sync.** One server, one database.
