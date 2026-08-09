---
title: "dMentions"
description: "dMentions makes @name work in Minecraft chat. Type someone's name with an @ in front and they get a sound, a highlighted message and — if they missed it — a…"
---

**dMentions** makes `@name` work in Minecraft chat. Type someone's name with an `@` in front and they get a sound, a highlighted message and — if they missed it — a message that actually stands out in the scrollback.

It also covers `@nearby` for everyone within a radius, `@everyone` for the whole server, and `@rank` for a permission group.

Rebuilt on [DzusillCore](https://dzusill.github.io/plugins/dzusillcore/) from the original DMentions by **desaxx**. Runs on Paper, Purpur and Folia.

---

## What it does

- 🙋 **Player mentions** — `@Steve` highlights the name in chat and pings Steve with a configurable sound.
- 📍 **@nearby** — everyone within a radius (default 20 blocks). Good for "anyone at spawn?"
- 📣 **@everyone** — the whole server, behind its own permission so it is not a spam vector.
- 👥 **Group mentions** — `@admin`, `@vip`, `@builder`. Driven by LuckPerms groups, with a per-group sound, colour and cooldown.
- 🎨 **Per-player display** — players can customise how their own mention tag looks with `/dm customize`.
- 🔕 **Opt-out** — `/dm toggle` turns mentions off for a player who does not want them.
- 🖥️ **Settings GUI** — `/dm config` edits the live configuration in game, no file editing.
- 🤝 **Respects vanish, AFK and ignore** — a vanished staff member is not revealed by an `@everyone`.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Purpur / Folia **1.21.x** |
| Java | **21+** |
| DzusillCore | **required** |
| LuckPerms | optional — needed for group mentions |
| EssentialsX | optional — AFK and ignore respect (not available on Folia) |
| StaffPlusPlus / PlaceholderAPI | optional |

---

## The four mention types

| Type | Keyword | Who it pings |
|---|---|---|
| Player | `@Steve` | one player |
| Nearby | `@nearby` | everyone within `radius` blocks |
| Everyone | `@everyone` | the whole server |
| Group | `@vip` | every online member of a LuckPerms group |

Each type has its own toggle, permission, sound, colour, display text and cooldown. Turn off the ones you do not want and the keyword stops being special.

---

## Quick links

- [Requirements](/plugins/dmentions/getting-started/requirements/)
- [Installation](/plugins/dmentions/getting-started/installation/)
- [Quick Start](/plugins/dmentions/getting-started/quick-start/)
- [Player Mentions](/plugins/dmentions/features/player-mentions/)
- [Group Mentions](/plugins/dmentions/features/group-mentions/)
- [Nearby & Everyone](/plugins/dmentions/features/nearby-and-everyone/)
- [Cooldowns & Limits](/plugins/dmentions/features/cooldowns-and-limits/)
- [Commands & Permissions](/plugins/dmentions/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dmentions/faq/)
