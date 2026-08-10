---
title: "OberonChat"
description: "OberonChat is a chat filter that does not get bypassed. It folds leetspeak, inserted punctuation, repeated letters, accents and lookalike characters down to one form before matching, and it reads commands, signs, books and anvils as well as chat."
---

**OberonChat** is a chat filter that does not get bypassed in five seconds.

Most word filters compare what a player typed against a list. That fails the moment somebody writes `f.u.c.k`, `fuuuck`, `fück` or `f u c k`. OberonChat folds all of those down to the same word *before* it matches — and it reads command arguments, signs, books and anvil renames too, because a filter that only watches public chat is bypassed by typing `/msg` first.

---

## What it does

- 🧠 **Anti-bypass matching** — leetspeak, inserted punctuation, repeated letters, accents, full-width text and Cyrillic/Greek lookalikes all fold to one form.
- 🎚️ **Four match modes per word** — from "never surprises anyone" to "catches a word spread across spaces".
- ✅ **Whitelist** — so `class` survives a rule about `ass`.
- 🧯 **Anti-spam** — cooldown, near-duplicate detection, flood window and message length, each switchable on its own.
- 📢 **Caps control** — with online player names excluded, so a loud username doesn't make everyone who greets them a violator.
- 🕸️ **Five inputs covered** — chat, command arguments, signs, books, anvil renames.
- ⚖️ **Violations that decay** — offences add up over a window and run the punishment commands you choose.
- 🔔 **Staff alerts** — see attempts as they happen.
- 🗂️ **History** — stored in an embedded database, no setup required.

---

## What it does *not* do

**It does not format your chat.** OberonChat only ever says yes, no, or "use this text instead". Your existing chat plugin keeps deciding what messages look like — the two do not fight, and you do not have to replace one to use the other.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper, Purpur or Folia **1.21.x** |
| Java | **21** |
| DzusillCore | **1.5.0** or newer — required |
| PlaceholderAPI | optional |

See [Requirements](/plugins/oberonchat/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/oberonchat/getting-started/installation/)
- [Quick Start](/plugins/oberonchat/getting-started/quick-start/)
- [How the word filter works](/plugins/oberonchat/features/word-filter/)
- [What gets checked](/plugins/oberonchat/features/what-gets-checked/)
- [filter.yml reference](/plugins/oberonchat/configuration/filter/)
- [Commands & Permissions](/plugins/oberonchat/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/oberonchat/faq/)
