---
title: "dNicks"
description: "dNicks gives players colored and gradient nicknames that show up everywhere their name appears — in chat, on the floating nametag above their head, in the…"
---

**dNicks** gives players **colored and gradient nicknames** that show up *everywhere* their name appears — in chat, on the floating nametag above their head, in the tab list, in `/msg`, and in join / quit / death messages. Pick a style from an in-game GUI or type a full [MiniMessage](https://docs.papermc.io/adventure/minimessage/) nick by hand.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 🎨 **Gradient & hex nicks** — `/nick <gradient:#ff5fa2:#a18fff>Name</gradient>`, `<rainbow>`, hex `<#ff0000>` and all 16 named colors, rendered with true hex (not downsampled).
- 💬 **Everywhere** — one styled name pushed to chat, the tab list, `/msg`, and join/quit/death broadcasts.
- 🏷️ **Real gradient nametag** — a floating nametag above the head that vanilla *can't* do (vanilla allows one team color only), via a `TextDisplay` entity. No packet library needed.
- 🖼️ **Picker GUI** — `/nick picker` opens a swatch menu of colors and gradient presets, plus a "type your own in chat" option.
- 🔒 **Permission-gated colors** — make gradients, hex and styles a donor perk; plain nicks stay free.
- 🔌 **Plays nice** — exposes `%dnicks_name%` for PlaceholderAPI, and wins chat over EssentialsX; cooperative mode for the TAB plugin.
- 🔎 **Reverse lookup** — `/realname <nick>` finds the player behind a nickname.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21.x** |
| Java | **17+** (runtime is Java 21 for Paper 1.21) |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** (required, installed separately) |
| PlaceholderAPI | optional — exposes `%dnicks_name%` to other plugins |
| EssentialsX · TAB | optional — dNicks coexists with both |

See [Requirements](/plugins/dnicks/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/dnicks/getting-started/installation/)
- [Quick Start](/plugins/dnicks/getting-started/quick-start/)
- [Gradient & Color Nicks](/plugins/dnicks/features/gradient-nicks/)
- [The Floating Nametag](/plugins/dnicks/features/nametag/)
- [config.yml reference](/plugins/dnicks/configuration/config/)
- [Commands & Permissions](/plugins/dnicks/commands-and-permissions/)
- [Integrations (TAB · EssentialsX · PlaceholderAPI)](/plugins/dnicks/integrations/)
- [FAQ & Troubleshooting](/plugins/dnicks/faq/)
