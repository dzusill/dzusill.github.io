---
title: "Action bar, chat & sounds"
description: "Where each kind of message is shown and what it sounds like — set four things instead of forty."
---

Every message this plugin sends has a **channel** and an optional **sound**. Both are set in the `Presentation` block
at the top of `config.yml`, and both apply per *category* rather than per message, so styling all your toggles is one
edit rather than five.

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
| `TOGGLE` | a preference was switched — `/staffchat`, `/tptoggle` |
| `TELEPORT` | `/tp`, `/tphere`, `/back` confirmations |
| `ERROR` | anything refused — denied teleports, missing permissions, bad usage |
| `INFO` | everything else, and the default — `/oberonstaff status`, the log pages |

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
    TELEPORT:
      Channel: ACTION_BAR
      Sound:
        Enabled: false
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

Errors go to **both** on purpose. A refusal explains why nothing happened — if it scrolls past unread, the command
looks like it silently did nothing at all.

`TELEPORT` has no sound of its own because the teleport already makes one where the player lands, under
`Teleport.Sound`. Turning both on plays two.

## Overrides

For the one message that should not behave like the rest of its category. Keyed by its `messages.yml` key:

```yaml
  Overrides:
    teleport.denied:
      Channel: CHAT
    staffchat.enabled:
      Sound:
        Enabled: false
```

An override that names only a channel **keeps its category's sound**, and one that names only a sound keeps its
channel. Writing two lines does not silently decide the other two.

`Sound: { Enabled: false }` is a decision rather than an absence — it silences that one message instead of inheriting
the category's sound back.

## Sounds

Either spelling works: `entity.villager.no` or `ENTITY_VILLAGER_NO`. A name this server does not have is silent, not
an error — a typo costs you the cue, never the message.

## Two things worth knowing

**The action bar is one line the whole server shares.** Coordinates, combat timers and boss-bar substitutes all live
there, and whichever plugin wrote last wins. That is why the defaults put short confirmations there and leave lists in
chat.

**Lists always go to chat**, whatever their category says. The action bar holds one line and replaces it on every
write, so a five-line list would show only its last line — silently, and only to the person it was meant to inform.
