---
title: "DRotatingShop"
description: "DRotatingShop is a rotating GUI shop. A command opens a menu of items that rotate on a timer — every rotation swaps in a fresh random set from your item…"
---

**DRotatingShop** is a rotating GUI shop. A command opens a menu of items that **rotate on a timer** — every rotation swaps in a fresh random set from your item pool. Players buy with Vault currency, you control global stock and per-player limits, and any item (vanilla, enchanted, or custom/NBT) can go in the pool.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 🛒 **Rotating shop** — `/market` opens a 54-slot GUI of up to 7 items that swap out every rotation, with a live countdown clock.
- 💰 **Buy-only economy** — purchases charge Vault currency. No selling.
- 📦 **Stock & limits** — per-item global stock plus a per-player purchase limit that **resets every rotation**. Sold-out items stay visible, greyed-out.
- ✨ **Any item** — add vanilla items by editing `items.yml`, or hold a custom/enchanted/NBT item and run `/dshop additem` to serialise it straight into the pool.
- ⏱️ **Restart-safe** — the rotation timer, stock and purchases persist; a restart resumes the current rotation with the time it had left.
- 🔌 **Placeholders & metrics** — optional PlaceholderAPI countdown and bStats.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | required (hard dependency) |
| Vault + economy plugin | **required** — the shop is disabled without one |
| PlaceholderAPI | optional — for the countdown placeholder |

See [Requirements](/plugins/drotatingshop/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/drotatingshop/getting-started/installation/)
- [Quick Start](/plugins/drotatingshop/getting-started/quick-start/)
- [The Shop Menu](/plugins/drotatingshop/features/the-shop-menu/)
- [config.yml reference](/plugins/drotatingshop/configuration/config/)
- [Commands & Permissions](/plugins/drotatingshop/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/drotatingshop/faq/)
