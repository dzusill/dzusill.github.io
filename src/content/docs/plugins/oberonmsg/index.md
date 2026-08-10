---
title: "OberonMSG"
description: "Private messages with UUID-keyed ignore lists, social spy, and delivery that respects vanish and AFK through their real APIs — one implementation instead of seven copies."
---

**OberonMSG** is private messaging done once. `/msg`, `/tell`, `/whisper`, `/dm`, `/w`, `/r`, `/reply` — one command
with aliases, not seven copies of the same logic that drift apart.

---

## What it does

- 💬 **Messages** — `/msg` and every alias you want, plus `/reply` with a timeout that survives reconnecting.
- 🚫 **Ignore** — `/ignore` and `/unignore`, keyed by UUID, stored, and hiding public chat too.
- 🕵️ **Social spy** — for staff, excluding the two people actually in the conversation.
- 👻 **Vanish & AFK** — PremiumVanish/SuperVanish and EssentialsX through their real APIs, not placeholder strings.
- 📜 **Log** — optional record of private messages, off by default.
- 🔧 **Everything renameable** — command names, aliases and permissions all from the config.

---

## Five things the old script got wrong

**Seven copies of the same command.** They had already drifted: `/whisper` said "toggled private messages off" where
`/msg` said "has private messages disabled", and `/reply` played a different sound from `/r`.

**Player text was colour-parsed.** Typing `&c` changed the colour of the line for whoever received it — including the
social spy copy a staff member saw.

**`/ignore` was a toggle.** Running it twice quietly un-ignored somebody, and running it on an already-ignored name
looked identical to ignoring them for the first time.

**Reply targets were wiped on join.** Log out mid-conversation, log back in, and `/r` had forgotten who you were
talking to.

**Ignore lists were name-based.** A rename on either side silently broke the entry.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper, Purpur or Folia **1.21.x** |
| Java | **21** |
| DzusillCore | **1.5.0** or newer — required |
| PremiumVanish / SuperVanish | optional |
| EssentialsX | optional — for the AFK note |
| PlaceholderAPI | optional |

See [Requirements](/plugins/oberonmsg/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/oberonmsg/getting-started/installation/)
- [Quick Start](/plugins/oberonmsg/getting-started/quick-start/)
- [Sending messages](/plugins/oberonmsg/features/messages/)
- [Ignore lists](/plugins/oberonmsg/features/ignore/)
- [Social spy](/plugins/oberonmsg/features/social-spy/)
- [Commands & Permissions](/plugins/oberonmsg/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/oberonmsg/faq/)
