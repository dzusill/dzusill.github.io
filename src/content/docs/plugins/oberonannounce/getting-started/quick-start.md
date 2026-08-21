---
title: "Quick Start"
description: "Five minutes from install to your own rotation."
---

Five minutes from install to your own rotation.

## 1. See what is scheduled

```
/announcements list
```

```
Announcements (Europe/Bratislava)
 ⏵ chat-announcements [interval] — enabled
```

The whole `chat-announcements` channel is **one** announcement whose entries are its variants. That is why the list shows one row, not eleven.

```
/announcements next
```

```
Next: chat-announcements at 2026-08-20 14:31:07 CEST (12m 4s).
```

## 2. Look at one without waiting

```
/announcements preview discord
```

Sends it to you alone, ignoring every audience rule, without moving the rotation on.

To send it for real, to everyone eligible:

```
/announcements send discord
```

`send` also leaves the rotation where it was — it shows the variant that would come next, so testing does not reorder what players see.

## 3. Add an announcement

Every entry under `chat-announcements` that is not a channel setting is a variant of the rotation. Add one:

```yaml
chat-announcements:
  interval-seconds: 900
  mode: random
  min-players: 2
  vote:
    title: "<b><gradient:#C21807:#F11800>Vote</gradient></b>"
    lines:
      - "<#F13131>Vote daily for rewards!"
    click:
      text: "<#C21807>⏵ <#8e8e8e><underlined>/vote"
      command: "/vote"
```

```
/announcements reload
```

`title` here becomes the **first chat line**, not an on-screen title. `click.text` is appended as its own line and runs `click.command` when clicked.

## 4. Slow it down, or raise the floor

```yaml
chat-announcements:
  interval-seconds: 600     # every ten minutes
  mode: rotate              # in file order instead of random
  min-players: 1            # fire even with one player online
```

`random` never picks the same entry twice running. `rotate` walks the list in file order and remembers where it was across restarts.

## 5. Turn the MOTD on

```yaml
motd:
  enabled: true
  lines:
    - "<#7e7e7e>────────────────────────"
    - ""
    - "<#9e9e9e>Welcome to <b><gradient:#C21807:#F11800>Oberon SMP</gradient></b>"
    - "<#8e8e8e>Check out our <#C21807>/rules"
    - "<#7e7e7e>────────────────────────"
```

Blank lines are kept as spacing. The MOTD honours the same per-player opt-out as everything else.

## 6. Schedule something for a fixed moment

Interval announcements live in the channel. Anything with a real calendar goes in the separate `announcements:` section:

```yaml
announcements:
  reset:
    mode: ONCE
    schedule:
      at: "2026-09-01T18:00:00"
    variants:
      main:
        chat:
          - "<red>Season reset at 18:00. Log out safely.</red>"
```

> **Quote the timestamp.** An unquoted `at: 2026-09-01T18:00:00` is parsed by YAML as a timestamp in **UTC**, not as a string, and OberonAnnounce refuses it rather than guessing. See [Known Limitations](/plugins/oberonannounce/limitations/#an-unquoted-at-timestamp-is-rejected).

`DAILY` and `WEEKLY` work the same way — see [Schedules](/plugins/oberonannounce/features/schedules/).

## 7. Let players opt out

```
/announcements               # toggles messages
/announcements toggle sound  # toggles just the sound
```

Both need `oberonannounce.use`, which defaults to everyone, and both persist across restarts. Give a staff broadcast account `oberonannounce.bypass-toggle` to keep receiving regardless.

Next: [Channels](/plugins/oberonannounce/features/channels/).
