---
title: "OberonAntiXray"
description: "OberonSMP's build of Imanity's Raytraced AntiXray for Paper 26.3: hides ores, chests and spawners until a player can actually see them, and culls entities and block entities behind walls."
---

**OberonAntiXray** is OberonSMP's maintained build of **Raytraced AntiXray by Imanity** (`0.24.0beta`), with its two
culling addons. The server hides valuable blocks until a ray from the player's eyes reaches them, so x-ray texture
packs and mods see stone and fake ores instead.

The plugin is Imanity's work and keeps their credit. The Oberon build fixes bugs that broke it on OberonSMP; it does
not change the licence code.

---

## What it does

- ⛏️ **Ray-traced ore hiding**: ores, chests, spawners and other listed blocks are sent as stone or deepslate until
  the player has a line of sight to them.
- 🎭 **Fake ore veins**: hidden areas are filled with decoy ores, so x-ray users see noise instead of empty stone.
- 👤 **Entity culling** (`raytraced-entity-culling`): players and mobs behind walls are not sent to the client.
- 📦 **Tile culling** (`raytraced-tile-culling`): chests, signs and banners behind walls are not sent either.
- 🌍 **Per-world configs**: each world has its own file, with defaults for overworld, nether and end.

## What the Oberon build fixes

| Version | Fix |
| --- | --- |
| `oberon1` | Runs on Paper 26.3. Players are no longer kicked by Vulcan on join (`invalid confirmation packet`). |
| `oberon2` | Ores and chests in a structure you dig into show up while you stand still. Before, they stayed stone until you moved. |
| `oberon3` | Ores directly behind glass (blocks, panes, stained and tinted glass) show up when you look at them. Players and mobs no longer show around a wall corner before you can actually see them. |

Details and test steps: [Changelog & testing](/plugins/oberonantixray/changelog/).

## Jars

| Jar | Plugin name | Config folder |
| --- | --- | --- |
| `OberonAntiXray.jar` | OberonAntiXray | `plugins/OberonAntiXray/` |
| `raytraced-entity-culling.jar` | raytraced-entity-culling | `plugins/raytraced-entity-culling/` |
| `raytraced-tile-culling.jar` | raytraced-tile-culling | `plugins/raytraced-tile-culling/` |
| `fairy-lib-plugin.jar` | fairy-lib-plugin | (library, required) |

Next: [Installation](/plugins/oberonantixray/installation/) · [Configuration](/plugins/oberonantixray/configuration/)
