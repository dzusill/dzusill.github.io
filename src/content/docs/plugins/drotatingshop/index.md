---
title: "dRotatingShop"
description: "dRotatingShop is a rotating GUI shop. A command opens a menu of items that rotate on a timer — every rotation swaps in a fresh random set from your item…"
---

**dRotatingShop** is a rotating GUI shop. A command opens a menu of items that **rotate on a timer** — every rotation swaps in a fresh random set from your item pool. Players pick how many to buy in a styled quantity menu, pay with Vault currency, and you control global stock, per-player limits, sounds, and even *when* the market is open.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 🛒 **Rotating shop** — `/market` opens a 54-slot GUI of up to 7 items that swap out every rotation, with a live countdown clock.
- 🧮 **Quantity buy menu** — click an item to open a picker: `+/-` stepper buttons (1 / half-stack / full-stack), a live preview that updates the amount and total price, then click to buy. Fully styled in [quantity-menu.yml](/plugins/drotatingshop/configuration/quantity-menu/).
- 📦 **Stock & limits** — per-item global stock plus a per-player limit that **resets every rotation**. A single purchase is capped at one stack. Sold-out items stay visible, greyed-out.
- 🗂️ **Ships with a catalogue** — on first start the pool is **seeded from a bundled 1.21 price list** ([prices_1_21.yml](/plugins/drotatingshop/configuration/default-prices/)); ~1,200 vanilla items priced and ready. Add your own any time.
- ✨ **Any item** — vanilla, enchanted, or custom/NBT from other plugins via `/dshop additem`.
- ⏱️ **Opening hours** — keep the market always open, or open it for a window (e.g. 2 minutes) after each rotation and close it in between.
- 🔊 **Sounds** — configurable sounds for clicks, purchases, errors and warnings.
- 💾 **Restart-safe** — the rotation timer, open window, stock and purchases all persist.
- 🔌 **Placeholders & metrics** — optional PlaceholderAPI placeholders and bStats.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | required (hard dependency) |
| Vault + economy plugin | **required** — the shop is disabled without one |
| PlaceholderAPI | optional — for the placeholders |

See [Requirements](/plugins/drotatingshop/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/drotatingshop/getting-started/installation/)
- [Quick Start](/plugins/drotatingshop/getting-started/quick-start/)
- [The Shop Menu](/plugins/drotatingshop/features/the-shop-menu/) · [The Buy Menu](/plugins/drotatingshop/features/the-buy-menu/)
- [config.yml reference](/plugins/drotatingshop/configuration/config/)
- [Commands & Permissions](/plugins/drotatingshop/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/drotatingshop/faq/)
