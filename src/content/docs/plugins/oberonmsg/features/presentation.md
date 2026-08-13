---
title: "Action bar, chat & sounds"
description: "Where each kind of message is shown and what it sounds like — and why the messages themselves stay in chat."
---

Every message this plugin sends has a **channel** and an optional **sound**, set in the `Presentation` block at the top
of `config.yml`. They apply per *category*, so styling every toggle is one edit rather than four.

**This does not touch private messages.** Those are built under `Formats` and always go to chat: a conversation needs
history, and the action bar has none.

## Channels

| Channel | Where |
|---|---|
| `CHAT` | in chat, as normal |
| `ACTION_BAR` | above the hotbar. One line, no history, gone in a couple of seconds |
| `BOTH` | both — noticed now, and still findable by scrolling back |
| `NONE` | nowhere. Silences one message without deleting it |

## Categories

| Category | Covers |
|---|---|
| `TOGGLE` | `/msgtoggle`, `/socialspy`, and the confirmation when you ignore or unignore somebody |
| `ERROR` | anything refused — nobody to reply to, recipient has messages off, you are ignoring them |
| `INFO` | everything else, and the default — the ignore list, `/oberonmsg status`, the log pages |

## What ships

```yaml
Presentation:
  Categories:
    TOGGLE:
      Channel: ACTION_BAR
      Sound:
        Enabled: true
        Name: "entity.experience_orb.pickup"
        Volume: 0.6
        Pitch: 1.6
    ERROR:
      Channel: BOTH
      Sound:
        Enabled: true
        Name: "entity.villager.no"
        Volume: 0.8
        Pitch: 1.0
    INFO:
      Channel: CHAT
  Overrides: {}
```

Errors go to **both** on purpose. *"You have nobody to reply to"* explains why nothing happened; if it scrolls past
unread, `/r` looks like it silently failed.

## Overrides

For the one message that should not behave like the rest of its category:

```yaml
  Overrides:
    message.no-reply-target:
      Channel: CHAT
    ignore.added:
      Sound:
        Enabled: false
```

An override that names only a channel **keeps its category's sound**, and the other way round.

## Sounds

Either spelling works: `entity.villager.no` or `ENTITY_VILLAGER_NO`. A name this server does not have is silent, not
an error.

## Lists stay in chat

The ignore list, the log pages and `/oberonmsg status` are sent to chat whatever their category says. The action bar
holds one line and replaces it on every write, so a list would show only its last entry.
