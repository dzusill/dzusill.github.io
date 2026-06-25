---
title: "dHomeGUI"
description: "dHomeGUI is a modern, GUI-driven homes plugin. Players set, browse, customise and share homes through a clean light-blue menu — with multiple-home…"
---

**dHomeGUI** is a modern, GUI-driven homes plugin. Players set, browse, customise and share homes through a clean light-blue menu — with multiple-home permission tiers, a per-home editor, economy, public/whitelisted homes, world & region rules, and first-class Folia support.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 🏠 **Classic commands** — `/sethome`, `/home`, `/delhome`, `/homes`, `/back`, plus a default home for bare `/home`.
- 🖼️ **GUI for everything** — a paginated homes menu with sort, world/category filters and search, and a per-home editor (icon, rename, description, type, default, pin, visibility, whitelist, delete).
- 🔢 **Permission tiers** — `dhomegui.homes.<n>` sets each rank's home limit; players can buy extra slots in-GUI.
- 👥 **Sharing** — make a home Private or Whitelisted and manage who's allowed.
- ⏳ **Safe teleports** — warmup countdown (cancels on move/damage), per-tier cooldown, and an unsafe-destination warning.
- 💰 **Economy** *(optional)* — charge for setting, teleporting, renaming or buying slots, with confirm prompts.
- 🌍 **World & region control** — blacklist/whitelist worlds, gate the nether/end behind permissions, and respect WorldGuard regions.
- ⚡ **Folia-ready** — auto-detects Folia and uses its region scheduler; falls back to Bukkit otherwise.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **/ Folia 1.21.x** |
| Java | **17+** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** (required, installed separately) |
| Vault + economy | optional — for costs |
| PlaceholderAPI · WorldGuard · LuckPerms · EssentialsX | optional integrations |
| MySQL / PostgreSQL | optional — cross-server storage |

See [Requirements](/plugins/dhomegui/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/dhomegui/getting-started/installation/)
- [Quick Start](/plugins/dhomegui/getting-started/quick-start/)
- [The Homes Menu](/plugins/dhomegui/features/homes-menu/)
- [Home Limits & Buying Slots](/plugins/dhomegui/features/home-limits/)
- [config.yml reference](/plugins/dhomegui/configuration/config/)
- [Commands & Permissions](/plugins/dhomegui/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dhomegui/faq/)
