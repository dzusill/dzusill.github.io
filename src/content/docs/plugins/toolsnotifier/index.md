---
title: "ToolsNotifier"
description: "ToolsNotifier warns players before their gear breaks. When a held or worn item drops below a durability threshold, it fires a notification — in chat, the…"
---

**ToolsNotifier** warns players before their gear breaks. When a held or worn item drops below a durability threshold, it fires a notification — in chat, the action bar, a title, a boss bar, with a sound — so nobody loses a maxed-out tool mid-fight or mid-mine.

It ships in two editions from the same codebase: a free **core** and a **PRO** upgrade that adds per-player preferences, a periodic inventory scan and an admin gear monitor.

---

## What it does

- 🔔 **Low-durability alerts** — two levels, **Warn** and **Critical**, fired as the item wears down.
- 📺 **Four channels** — chat, action bar, title and boss bar, each independently toggleable, plus sounds.
- 🎯 **Granular thresholds** — per-category (Tools / Armor / Elytra) and per-item percentage overrides.
- ✨ **Unbreaking-aware** — accounts for the Unbreaking enchant so enchanted tools warn at the right time.
- 🧮 **Status check** — `/tn status` lists the durability of everything you're carrying.
- 🙈 **Player opt-out** — anyone can mute their own notifications.
- ⚙️ **PRO: preferences GUI** — players choose which channels they receive.
- 🔁 **PRO: inventory scan** — periodically warns about low-durability items anywhere in the inventory.
- 🛡️ **PRO: admin monitor** — inspect any online player's gear durability in a GUI.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Spigot **1.21.x** (API 1.17+) |
| Java | **21** |
| PlaceholderAPI | optional — for `%toolsnotifier_…%` placeholders |

ToolsNotifier is standalone — no framework dependency. See [Requirements](/plugins/toolsnotifier/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/toolsnotifier/getting-started/installation/)
- [Free vs PRO](/plugins/toolsnotifier/getting-started/free-vs-pro/)
- [How Notifications Work](/plugins/toolsnotifier/features/how-notifications-work/)
- [config.yml reference](/plugins/toolsnotifier/configuration/config/)
- [Commands & Permissions](/plugins/toolsnotifier/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/toolsnotifier/faq/)
