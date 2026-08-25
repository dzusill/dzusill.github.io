---
title: "OberonAnnounce"
description: "OberonAnnounce rotates announcements through chat on a timer, and can also schedule individual ones for a fixed date, a time of day, or a day of the week.…"
---

**OberonAnnounce** rotates announcements through chat on a timer, and can also schedule individual ones for a fixed date, a time of day, or a day of the week. Every announcement is a title, some lines and an optional clickable call to action, and players can switch the whole thing off for themselves.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore) (shipped as **OberonCore**).

---

## What it does

- 🔁 **A rotating chat channel** — `chat-announcements` fires every `interval-seconds`, picking the next entry in order or at random, and only above a minimum player count.
- 🖱️ **Clickable lines** — each announcement can end in a call-to-action line that runs a command when clicked, with a hover tooltip. Both the line and the tooltip have a global off switch.
- 📅 **Real schedules** — beyond the interval channel, an individual announcement can be `INTERVAL`, `ONCE`, `DAILY` or `WEEKLY`, evaluated against a configurable IANA time zone.
- 🌍 **World filtering** — one global `allow-list` / `deny-list`, plus per-announcement audience rules for permission, game mode and minimum online count.
- 🔕 **Per-player opt-out** — `/announcements` toggles messages, `/announcements toggle sound` toggles the sound separately, and both survive a restart.
- 🔊 **One global sound** — configured once, overridable per announcement.
- 👋 **MOTD on join** — a block of lines shown to a joining player, which honours the same opt-out.
- 🧩 **PlaceholderAPI** — optional. Every line is passed through it before it is rendered.
- 💾 **Crash-safe state** — rotation cursors, one-time completion and player opt-outs are debounced and written off the main thread.

---

## What it does not do

Documented plainly rather than left to be discovered:

- **Boss bar output is not implemented.** The `bossbar-announcements` section is read and ignored so an existing config still loads. Nothing is shown.
- **`update-checker` does nothing.** It is parsed and kept so your file round-trips; this build never contacts a remote service.
- **Command aliases need a restart**, not a reload — Bukkit builds its command map once at enable.

The full list, with what to do about each, is on [Known Limitations](/plugins/oberonannounce/limitations/).

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **26.2+** (`api-version: '26.2'`) |
| Java | **25+** |
| OberonCore (DzusillCore) | **1.12.0+** (required, separate jar) |
| PlaceholderAPI | optional — announcements resolve its placeholders when it is present |
| Folia | **not supported** — `folia-supported: false` |

See [Requirements](/plugins/oberonannounce/getting-started/requirements/).

---

## The idea in one picture

```
every scheduler.tick-seconds
  └─ is anything due?              next fire time per announcement, in your timezone
     └─ pick a variant             rotate (in order) or random (never twice running)
        └─ for each online player
           ├─ have they muted announcements?      unless oberonannounce.bypass-toggle
           ├─ is oberonannounce.receive.<id> denied?   unset = yes, receive it
           └─ does the audience allow them?       min-players · permission · world · gamemode
              └─ render  %player% → PlaceholderAPI → MiniMessage
                 └─ chat lines · click line · action bar · title · sound
```

The next fire time is anchored on the moment an announcement was **due**, not on the tick that noticed it — otherwise every cycle drifts later by the rounding error, and a ten-minute announcement quietly loses fires over a day.

---

## Quick links

- [Requirements](/plugins/oberonannounce/getting-started/requirements/)
- [Installation](/plugins/oberonannounce/getting-started/installation/)
- [Quick Start](/plugins/oberonannounce/getting-started/quick-start/)
- [Channels](/plugins/oberonannounce/features/channels/)
- [Schedules](/plugins/oberonannounce/features/schedules/)
- [Sound](/plugins/oberonannounce/features/sound/)
- [config.yml reference](/plugins/oberonannounce/configuration/config/)
- [Commands & Permissions](/plugins/oberonannounce/commands-and-permissions/)
- [Known Limitations](/plugins/oberonannounce/limitations/)
- [FAQ & Troubleshooting](/plugins/oberonannounce/faq/)
