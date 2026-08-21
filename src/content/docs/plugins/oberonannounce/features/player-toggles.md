---
title: "Player Toggles"
description: "Two independent preferences, one per player, both persisted."
---

Two independent preferences, one per player, both persisted.

```
/announcements               # toggle messages
/announcements toggle        # the same thing, spelled out
/announcements toggle sound  # toggle just the sound
```

Both need `oberonannounce.use`, which defaults to everyone.

## Why the bare command toggles

`/announcements` with no arguments does not print a menu — it flips the message preference and says so.

The subcommand list is almost entirely administration (`list`, `next`, `preview`, `send`, `reload`), so showing it to a player would be showing them six things they cannot run. The one thing a player can do is opt out, so that is what the bare command does.

A console sender, or a player without `oberonannounce.use`, gets the usage lines instead.

## Messages

```
/announcements
```

```
Announcements disabled.
```

While muted, a player receives none of:

- scheduled announcements,
- `/announcements send`, including `send <id> <player>` aimed at them,
- the join announcement,
- the MOTD — see [MOTD & Join Delivery](/plugins/oberonannounce/features/motd-and-join/#it-honours-the-announcement-mute).

They still receive `/announcements preview`, which bypasses everything by design, and they still see the command's own replies.

### `oberonannounce.bypass-toggle`

```
oberonannounce.bypass-toggle    default: false
```

A holder keeps receiving announcements even while their own toggle says off. It exists for staff and broadcast accounts that must not be able to silence themselves.

It applies to the message mute only. It does not override the sound preference.

## Sound

```
/announcements toggle sound
```

```
Announcement sounds enabled.
```

Toggles only the sound that plays with an announcement. The messages keep arriving.

The check happens at delivery, right before the sound is played, and there is no bypass node for it — a player who has switched the sound off has switched it off.

See [Sound](/plugins/oberonannounce/features/sound/).

## The `toggle` argument

| Typed | Effect |
|---|---|
| `/announcements toggle sound` | flips the sound preference |
| `/announcements toggle messages` | flips the message preference |
| `/announcements toggle` | flips the message preference |
| `/announcements toggle anything-else` | flips the message preference |

Only the exact word `sound` selects the sound; everything else falls through to the messages. Tab completion offers `messages` and `sound`.

## Where the preferences live

`plugins/OberonAnnounce/state.yml`:

```yaml
muted-players:
  - 6a1c5e4b-9f21-4f6e-8f0a-2c7b1d3e4f50
muted-sounds:
  - 6a1c5e4b-9f21-4f6e-8f0a-2c7b1d3e4f50
```

UUIDs, sorted, one list each. To clear somebody's preference by hand, stop the server and remove their UUID.

Writes are **debounced**: a change marks the store dirty and queues a single write about five seconds later, performed off the main thread with an atomic file replace. Serialising and moving a file on the tick thread every time an announcement fires is invisible on an empty test server and very visible on a full one.

The only synchronous write is a flush on shutdown, so a clean stop always saves. A hard crash loses at most that five-second window — one toggle, at worst.

An unreadable UUID in the file is logged and skipped rather than failing the whole load:

```
[OberonAnnounce] Ignoring invalid UUID in state.yml: not-a-uuid
```

## How the confirmations are shown

`command.toggled-on`, `command.toggled-off`, `command.sound-toggled-on` and `command.sound-toggled-off` are categorised as `TOGGLE`, and the shipped `Presentation` block routes that category to the action bar:

```yaml
Presentation:
  Categories:
    TOGGLE:
      Channel: ACTION_BAR
```

A preference confirmation is worth one glance and not worth a line of chat history. Change it to `CHAT` or `BOTH` if you disagree — see [messages.yml](/plugins/oberonannounce/configuration/messages/).
