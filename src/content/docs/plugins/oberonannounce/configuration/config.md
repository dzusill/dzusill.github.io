---
title: "config.yml"
description: "Everything OberonAnnounce sends, and when. The shipped file is the live Oberon SMP configuration, so it is also the best worked example of every key on this…"
---

Everything OberonAnnounce sends, and when. The shipped file is the live Oberon SMP configuration, so it is also the best worked example of every key on this page.

Parsing is **all or nothing**. Every problem in the file is collected in one pass and reported together, and an invalid file refuses to enable rather than starting with half a set of announcements. On `/announcements reload`, an invalid file leaves the running configuration untouched — see [Reloading](/plugins/oberonannounce/configuration/reloading/).

## The whole file

```yaml
debug: false

world-filter: allow-list
worlds: []

timezone: Europe/Bratislava

commands:
  aliases:
    - announce

clickable-messages:
  enabled: true
  hover: true

scheduler:
  tick-seconds: 1
  missed-one-time: SKIP

chat-announcements:
  interval-seconds: 900
  mode: random
  min-players: 2
  discord:
    title: "<b><gradient:#C21807:#F11800>Discord</gradient></b>"
    lines:
      - "<#F13131>Be Apart Of The OberonSMP Community!"
    click:
      text: "<#C21807>⏵ <#8e8e8e><underlined>/discord"
      command: "/discord"
  # … ten more entries

bossbar-announcements:
  interval-seconds: 180
  mode: rotate
  min-players: 1

motd:
  enabled: false
  lines: [ … ]

sound:
  enabled: true
  type: BLOCK_NOTE_BLOCK_CHIME
  volume: 1.0
  pitch: 1.0

Presentation:
  Categories:
    TOGGLE:
      Channel: ACTION_BAR
    ERROR:
      Channel: BOTH
  Overrides: {}

update-checker:
  enabled: true

config-version: 3
```

Two further sections may be added by hand — `announcements:` for individually scheduled announcements, and `join:` for join delivery. Neither ships in the file.

## Global

| Key | Default | Meaning |
|---|---|---|
| `debug` | `false` | **Nothing reads it.** The key is parsed and exposed, and no code path consults it. It is not a switch for anything today. |
| `world-filter` | `allow-list` | `allow-list` or `deny-list`. `whitelist` / `blacklist` also load. Anything else refuses the config. |
| `worlds` | `[]` | The list that filter applies to. Empty means every world. Case-insensitive. |
| `timezone` | `Europe/Bratislava` | IANA zone id. Not an abbreviation — `CET` is refused. Every `DAILY`, `WEEKLY` and unqualified `ONCE` time is resolved in it, and it is what `/announcements list` and `next` print in. |
| `config-version` | `0` | Schema stamp. See below. |

The world filter applies to `chat-announcements`. An announcement in the `announcements:` section carries its own `audience.worlds` block instead. See [Audience & World Filtering](/plugins/oberonannounce/features/audience/).

## `commands`

```yaml
commands:
  aliases:
    - announce
```

Extra labels the command answers to, on top of `/announcements` and its built-in `/oberonannounce` and `/oa`. Entries are trimmed and lower-cased; blanks are skipped.

> **Read once, at server start.** Bukkit builds its command map when a plugin enables, so a label added here does not exist until the next restart. `/announcements reload` deliberately does not pretend otherwise. See [Known Limitations](/plugins/oberonannounce/limitations/#command-aliases-need-a-restart).

An **empty** list means no extra labels: `aliases: []` registers none, and only `/announcements` (plus the built-in `/oberonannounce` and `/oa`) answers. Removing the key entirely is different — that means you never chose, so the `announce` default applies.

## `clickable-messages`

Two switches over every `click:` block in the file at once, without editing a single one of them.

```yaml
clickable-messages:
  enabled: true
  hover: true
```

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | The click line itself. `false` sends the announcement without it — the body lines, action bar, title and sound all still arrive. |
| `hover` | `true` | The tooltip on that line. `false` keeps the line clickable and keeps running the same command, and shows nothing on hover. |

The two are independent: `enabled: false` hides the line whatever `hover` says, and `hover: false` on its own only drops the tooltip.

Both apply to every announcement, in `chat-announcements` and in `announcements:` alike, and every individual `click:` block stays in the file untouched for whenever the switch goes back on. Both are live on `/announcements reload`.

`hover: false` turns off the tooltip an entry writes for itself as well, not only the built-in `Click to run …` default. There is no per-entry switch — an entry that should not offer a click at all simply omits its `click:` block.

Entry-level `click.text`, `click.command` and `click.hover` are on [Writing an Announcement](/plugins/oberonannounce/features/announcements/#the-click-line).

## `scheduler`

| Key | Default | Meaning |
|---|---|---|
| `tick-seconds` | `1` | How often due announcements are checked. Minimum 1. A resolution, not a schedule. |
| `missed-one-time` | `SKIP` | `SKIP` or `SEND_ON_STARTUP`, for a `ONCE` announcement whose time passed while the server was down. `FIRE_ON_START` is accepted for the latter. |

Occurrences missed while the server was down or frozen collapse into a single delivery rather than being replayed one after another. See [Schedules](/plugins/oberonannounce/features/schedules/).

## `chat-announcements`

One rotating channel. Its own keys say how often it fires and who is eligible; every other key under it is an entry of the rotation.

| Key | Default | |
|---|---|---|
| `enabled` | `true` | |
| `interval-seconds` | `900` | Minimum 1. |
| `initial-delay-seconds` | same as `interval-seconds` | `0` fires on the next tick. |
| `mode` | `rotate` | `random` or `rotate`. `selection` is an explicit alias. |
| `min-players` | `1` | `min-online` is an alias. |
| `permission` | `""` | |
| `gamemodes` | `[]` | `SURVIVAL`, `CREATIVE`, `ADVENTURE`, `SPECTATOR`. |

`color`, `style`, `overlay`, `progress` and `duration-ticks` are also treated as channel settings rather than entries, so a boss-bar section written against a future build is not mistaken for a list of announcements.

Full detail: [Channels](/plugins/oberonannounce/features/channels/). Entry keys — `title`, `lines`, `line`, `click`, `action-bar`, `sound` — are on [Writing an Announcement](/plugins/oberonannounce/features/announcements/).

## `bossbar-announcements`

**Parsed and ignored.** The section is read so an existing file still loads and its keys round-trip, but nothing under it is ever turned into an announcement and no boss bar is ever shown. See [Known Limitations](/plugins/oberonannounce/limitations/#boss-bar-output-is-not-implemented).

## `announcements`

Individually scheduled announcements — `INTERVAL`, `ONCE`, `DAILY`, `WEEKLY`, with their own audience rules, on-screen titles and action bars.

```yaml
announcements:
  restart:
    enabled: true
    mode: INTERVAL
    selection: SEQUENTIAL
    schedule:
      every: 30m
      initial-delay: 5m
    audience:
      min-online: 1
      permission: ""
      gamemodes: []
      worlds:
        mode: all
        values: []
    variants:
      main:
        chat:
          - "<gray>Scheduled restart approaching.</gray>"
        click:
          text: "<gray>/restarts"
          command: "/restarts"
        action-bar: "<yellow>Restart in 5 minutes"
        title:
          header: "<red><bold>RESTART"
          subtitle: "<gray>in 5 minutes"
          fade-in-ticks: 10
          stay-ticks: 60
          fade-out-ticks: 10
```

| Key | Default | |
|---|---|---|
| `enabled` | `true` | |
| `mode` | `INTERVAL` | The schedule kind — unless `schedule.type` is set, in which case `mode` is read as the **selection** instead. |
| `schedule.type` | — | An alternative place to write the kind. |
| `selection` | `SEQUENTIAL` | `SEQUENTIAL` / `ROTATE`, or `RANDOM`. |
| `schedule.*` | — | Per mode. See [Schedules](/plugins/oberonannounce/features/schedules/). |
| `audience.*` | see below | See [Audience & World Filtering](/plugins/oberonannounce/features/audience/). |
| `variants` | *required* | A section of named variants, or a YAML list whose entries name themselves with `id:`. |

`audience` defaults to `min-online: 1` and no other restriction. `variants` must contain at least one variant, and each variant must produce some output — an entry whose chat lines are all blank, with no action bar and no title, is refused with `variant has no enabled output`.

Ids here are lower-cased on load; lookups are case-insensitive everywhere.

## `motd` and `join`

```yaml
motd:
  enabled: false
  lines: [ … ]

join:
  enabled: false
  delay-ticks: 20
  announcement: chat-announcements
```

See [MOTD & Join Delivery](/plugins/oberonannounce/features/motd-and-join/). `join.announcement` must name an announcement (a channel, or a key in `announcements:`), not an entry inside one, and a wrong value refuses the config.

## `sound`

```yaml
sound:
  enabled: true
  type: BLOCK_NOTE_BLOCK_CHIME
  volume: 1.0
  pitch: 1.0
```

`enabled` defaults to `false`, so the block does nothing until it is switched on. `type` is a registry key and a name the registry does not recognise plays nothing, silently — read [Sound](/plugins/oberonannounce/features/sound/) before changing it.

## `Presentation`

```yaml
Presentation:
  Categories:
    TOGGLE:
      Channel: ACTION_BAR
    ERROR:
      Channel: BOTH
  Overrides: {}
```

The DzusillCore message-presentation block: how the **command's own replies** are delivered. It has nothing to do with announcement content, which configures its own output above.

Every message belongs to a category, and each category routes to `CHAT`, `ACTION_BAR`, `BOTH` or `NONE`. `Overrides` does the same for a single `messages.yml` key. Resolution order is override, then category, then plain chat. See [messages.yml](/plugins/oberonannounce/configuration/messages/).

## `update-checker`

```yaml
update-checker:
  enabled: true
```

**Parsed and ignored.** Kept so your file round-trips; this build never contacts a remote service. See [Known Limitations](/plugins/oberonannounce/limitations/#update-checker-does-nothing).

## `config-version`

The schema stamp. This build understands version **3**.

An older file is stamped once on start-up and says so:

```
[OberonAnnounce] Stamped config.yml as schema version 3.
```

Nothing else is rewritten — every key added since version 1 is optional and defaults to the previous behaviour.

A file written by a **newer** build is refused:

```
config-version 4 was written by a newer build; this one understands 3
```

That is deliberate. A newer file may use keys this build would silently ignore, which would quietly change what players see; refusing is the safer failure, and on reload the previous configuration stays live.

## Sections that are never merged

`announcements`, `chat-announcements`, `bossbar-announcements` and `motd` are **ignored sections**. On update, new keys are merged into every other part of the file, but those four are left exactly as you wrote them.

An announcement you deleted stays deleted, and no bundled example is merged back in. It also means a genuinely new key inside one of those sections will not appear in your file after an update — read the changelog rather than diffing against the bundled default.

## Preset announcements

The bottom of the shipped file carries a large block of commented-out example entries — `support`, `help`, `skills`, `jobs`, `rules`, `spawn`, `warps`, `kits`, `balance`, `homes`, `tpa` and more. Uncomment one and paste it into `chat-announcements`. They are written with `line:` rather than `lines:`, which is the single-line spelling and loads the same way.
