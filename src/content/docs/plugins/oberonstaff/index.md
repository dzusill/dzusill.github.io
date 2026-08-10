---
title: "OberonStaff"
description: "Staff chat with rank-coloured names, the full teleport suite with working override variants, and vanish visibility that holds everywhere — teleports, messages and tab completion."
---

**OberonStaff** is the staff toolkit: staff chat, the teleport suite, and vanish visibility that actually holds everywhere it should.

---

## What it does

- 💬 **Staff chat** — `/staffchat` sends one line, or with no arguments switches the mode on. Rank-coloured names, every gradient in the config.
- 🧭 **Teleport suite** — `/tp`, `/tpo`, `/tphere`, `/tpohere`, `/s`, `/back`, `/tptoggle`.
- 👻 **Vanish** — PremiumVanish and SuperVanish through their real API, with the level ladder honoured in teleports, messages **and tab completion**.
- 🎨 **Ranks in config** — restyle a rank or add one without touching code.
- 📜 **Action log** — optional record of who teleported to whom and when.
- 🔧 **Everything renameable** — command names, aliases and permissions all come from the config.

---

## Four things the old script got wrong

**Staff chat could be injected.** Player text was concatenated into a string and then parsed as MiniMessage, so anyone could put colours — or a `<click:run_command>` — into staff chat by typing it. Now the message goes in as an unparsed placeholder the parser never looks inside.

**Settings were keyed by name.** A rename silently lost them; a restart lost everyone's. Now keyed by UUID and stored.

**`/tpo` overrode nothing.** It was a byte-identical copy of `/tp`, as were `/tpohere`, `/s` and `/tphere` — so a staff member with `/tptoggle` on could not be reached by anybody.

**Tab completion filtered nothing.** The handler looped over a variable it never filled, so every vanished player stayed in every suggestion list.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper, Purpur or Folia **1.21.x** |
| Java | **21** |
| DzusillCore | **1.5.0** or newer — required |
| PremiumVanish / SuperVanish | optional |
| PlaceholderAPI | optional |

See [Requirements](/plugins/oberonstaff/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/oberonstaff/getting-started/installation/)
- [Quick Start](/plugins/oberonstaff/getting-started/quick-start/)
- [Staff chat](/plugins/oberonstaff/features/staff-chat/)
- [Teleports](/plugins/oberonstaff/features/teleports/)
- [Vanish](/plugins/oberonstaff/features/vanish/)
- [Commands & Permissions](/plugins/oberonstaff/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/oberonstaff/faq/)
