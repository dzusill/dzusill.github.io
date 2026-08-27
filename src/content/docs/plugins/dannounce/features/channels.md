---
title: "Channels"
description: "A channel is a whole section of config.yml treated as one rotating announcement. The section's own keys say how often it fires and who is eligible; every…"
---

A channel is a whole section of `config.yml` treated as **one** rotating announcement. The section's own keys say how often it fires and who is eligible; every other key under it is one entry of the rotation.

```yaml
chat-announcements:
  interval-seconds: 900
  mode: random
  min-players: 2
  discord:                     # ← an entry, not a setting
    title: "…"
    lines: [ "…" ]
    click: { text: "…", command: "/discord" }
  info:
    …
```

This is why `/announcements list` shows one row called `chat-announcements` rather than eleven rows. The channel is the announcement; the entries are its variants.

## The two channels

| Section | Status |
|---|---|
| `chat-announcements` | Fully implemented |
| `bossbar-announcements` | **Not implemented.** Parsed and ignored |

`bossbar-announcements` is read so that an existing config still loads, and its keys are preserved verbatim on update, but nothing under it is ever turned into an announcement and no boss bar is ever shown. See [Known Limitations](/plugins/dannounce/limitations/#boss-bar-output-is-not-implemented).

## Channel settings

These keys configure the channel. Any key **not** on this list is read as an announcement entry.

| Key | Default | |
|---|---|---|
| `enabled` | `true` | `false` switches the whole channel off. It disappears from `/announcements list`. |
| `interval-seconds` | `900` | Seconds between fires. Minimum 1. |
| `initial-delay-seconds` | same as `interval-seconds` | How long after start-up (or a schedule-changing reload) the first fire happens. `0` fires on the next tick. |
| `mode` | `rotate` | `random` or `rotate`. |
| `selection` | — | An explicit alias for `mode`, if you prefer to spell it out. |
| `min-players` | `1` | Do not fire below this many players online. |
| `min-online` | — | An alias for `min-players`. |
| `permission` | `""` | Only players holding this node receive it. Empty means everyone. |
| `gamemodes` | `[]` | Only these game modes receive it. Empty means all. Values are `SURVIVAL`, `CREATIVE`, `ADVENTURE`, `SPECTATOR`. |

Four further names — `color`, `style`, `overlay`, `progress`, `duration-ticks` — are also treated as settings rather than entries. They exist so a boss-bar section written against a future build is not mistaken for a list of announcements.

> An entry whose id collides with one of these names is silently skipped as a setting. If you want an announcement called `style`, rename it.

## `random` vs `rotate`

| Mode | Behaviour |
|---|---|
| `rotate` | Walks the entries in file order. The cursor is stored in `state.yml`, so a restart continues where it left off rather than starting over. |
| `random` | Picks at random, but **never the same entry twice in a row**. The last pick is stored in `state.yml` too. |

`rotate` is spelled `SEQUENTIAL` internally; both spellings are accepted in the config.

## `min-players`

The count is the total number of players **online**, not the number eligible. A channel with `min-players: 2` fires when two people are online even if a world filter means only one of them will see it.

The shipped value is `2`, which is the usual intent: do not talk to an empty server.

## The whole channel shares one schedule

Every entry in a channel fires on the same timer and the same audience rules. If you need one announcement on a different interval, or with its own permission or world list, it belongs in the separate `announcements:` section instead — see [Schedules](/plugins/dannounce/features/schedules/) and [Audience & World Filtering](/plugins/dannounce/features/audience/).

## Turning a channel off

```yaml
chat-announcements:
  enabled: false
```

A channel with no entries is also treated as absent, and that is not an error — the shipped `bossbar-announcements` section is exactly that shape.

> If you disable `chat-announcements`, define at least one announcement under `announcements:` or switch the MOTD on. A config with no announcements at all and no MOTD is refused with `chat-announcements must contain at least one announcement`.
