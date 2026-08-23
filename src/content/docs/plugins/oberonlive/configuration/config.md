---
title: "config.yml"
description: "Reference for OberonLive platforms, URL security, permission cooldowns, broadcast output, history, Discord webhook and message presentation."
---

`config.yml` controls every runtime behavior except the database connection and the wording of command replies. `/olive reload` validates the candidate before replacing the active settings.

## Global keys

| Key | Default | Meaning |
|---|---|---|
| `config-version` | `2` | Schema marker. A value newer than the running jar is refused. |
| `debug` | `false` | Reserved diagnostic flag. |
| `server-name` | `server` | `%server%` in broadcasts and Discord. |

## `platforms`

```yaml
platforms:
  youtube:
    display-name: "YouTube"
    domains:
      - youtube.com
      - "*.youtube.com"
      - youtu.be
    webhook-color: "#FF0000"
```

Platform ids use lower-case letters, numbers, `_` or `-`. Every platform needs a non-empty display name, at least one valid hostname rule and a six-digit webhook color.

An exact root and its wildcard may appear in the same platform. The same root cannot belong to two platforms. See [Platforms & Link Safety](/plugins/oberonlive/features/platforms-and-link-safety/).

## `url-security`

| Key | Default | Range |
|---|---|---|
| `max-length` | `2048` | clamped to 128–8192 characters |
| `duplicate-window-seconds` | `30` | 0 disables; maximum 315,360,000 |

Bare links and HTTP links are upgraded to HTTPS before validation. Stored, displayed and compared links are therefore always HTTPS. Duplicate protection compares those normalized links globally across all players. The cooldown bypass permission also bypasses this window.

## `cooldowns`

```yaml
cooldowns:
  default-seconds: 30
  tiers: {}
```

Each tier is a named section containing `permission` and a non-negative `seconds` value. The shortest tier whose permission the player holds wins. `0` disables the delay for that tier. Maximum values are ten years to prevent overflow from a malformed config.

## Static moderation

```yaml
blocked-domains: []
blocked-urls: []
```

Domain values are lower-cased and IDN-normalized; one value blocks its subdomains too. Bare and HTTP URL entries are upgraded to HTTPS and compare in normalized form. Database blocks are separate and managed through `/olive block`.

## `broadcast`

```yaml
broadcast:
  console: true
  chat:
    enabled: true
    lines:
      - "                    "
      - "<#FD3DB5><bold>Media</bold> <#FD3DB5>%player% <#DA70D6>is live!"
      - "<#AAAAAA><underlined>%link%"
      - "                    "
    link-hover: "<gray>Open %player%'s %platform% stream"
  action-bar:
    enabled: false
    message: "<#FD3DB5><bold>%player%</bold> <#DA70D6>is live on %platform%!"
  sound:
    enabled: false
    name: "BLOCK_NOTE_BLOCK_CHIME"
    volume: 1.0
    pitch: 1.0
```

The chat list may contain any number of MiniMessage lines, but cannot be empty while chat is enabled. A line containing `%link%` or `{link}` receives the configured hover and a click action that opens the validated URL.

Available values are `%player%`, `%display_name%`, `%uuid%`, `%link%`, `%platform%`, `%platform_id%`, `%server%` and `%timestamp%`. PlaceholderAPI is also resolved per recipient when installed.

When broadcast sound is enabled, it plays to all online players currently receiving announcements and always to the streamer, including an opted-out streamer. Enum-style names such as `BLOCK_NOTE_BLOCK_CHIME` and registry keys such as `minecraft:block.note_block.chime` are supported. Volume must be positive; pitch must be greater than zero and at most `2.0`.

## `history`

| Key | Default | Meaning |
|---|---|---|
| `page-size` | `10` | Rows in history and blocked views; clamped to 1–50. |
| `retention-days` | `0` | 0 keeps rows forever; maximum 36,500. |
| `timezone` | `Europe/Bratislava` | IANA zone used by stats and history output. |
| `time-format` | `yyyy-MM-dd HH:mm` | Java `DateTimeFormatter` pattern used for visible timestamps. |

Retention deletes detail rows only, not player lifetime counters.

## `discord-webhook`

```yaml
discord-webhook:
  enabled: false
  url: ""
  username: "OberonLive"
  avatar-url: ""
  mention-role-id: ""
  content:
    enabled: false
    message: "%player% is live on %platform%: %link%"
  retry:
    max-attempts: 3
    connect-timeout-seconds: 5
    request-timeout-seconds: 8
    backoff-millis: 1500
  embed:
    enabled: true
    title-enabled: true
    title: "%player% is live on %platform%!"
    description-enabled: true
    description: "[%link%](%link%)"
    url-enabled: true
    color-enabled: true
    color: ""
    timestamp-enabled: true
    thumbnail-enabled: true
    thumbnail-url: "https://mc-heads.net/avatar/%uuid%/128"
    footer-enabled: true
    footer: "%server%"
    fields:
      player:
        enabled: true
        name: "Player"
        value: "%player%"
        inline: true
```

`content.enabled` controls the optional plain message. `embed.enabled` controls the whole embed. Title, description, clickable URL, color, timestamp, thumbnail and footer each have an independent switch, and each field has `enabled`. Empty enabled color selects the current platform's color. Discord allows at most 25 enabled fields.

Attempts are clamped to 1–5, connect timeout to 1–30 seconds, request timeout to 1–60 seconds and backoff to 0–60,000 ms. An enabled webhook must have at least plain content, an embed, or an explicit role mention.

See [Discord Webhooks](/plugins/oberonlive/features/discord-webhooks/) for credential and mention safety.

## `Presentation`

```yaml
Presentation:
  Categories:
    ERROR:
      Channel: CHAT
      Sound:
        Enabled: false
        Name: "BLOCK_NOTE_BLOCK_BASS"
        Volume: 1.0
        Pitch: 0.8
    INFO:
      Channel: CHAT
      Sound:
        Enabled: false
        Name: "BLOCK_NOTE_BLOCK_PLING"
        Volume: 1.0
        Pitch: 1.0
    TOGGLE:
      Channel: CHAT
      Sound:
        Enabled: false
        Name: "BLOCK_NOTE_BLOCK_HAT"
        Volume: 1.0
        Pitch: 1.0
  Overrides:
    usage:
      Channel: ACTION_BAR
      Sound:
        Enabled: true
        Name: "BLOCK_NOTE_BLOCK_BASS"
        Volume: 1.0
        Pitch: 0.8
```

This OberonCore block routes command responses from `messages.yml` to `CHAT`, `ACTION_BAR`, `BOTH` or `NONE` and can add a sound. `ERROR` includes usage, permission, parser, validation, cooldown and failed-operation responses. Unlisted keys use `INFO`; toggles use `TOGGLE`. A per-key override wins over its category, so any single command response can choose its own output and sound.

List-valued messages such as `help` always remain in chat because multiple action-bar writes would overwrite one another, but their configured sound still plays once. This block does not change the live broadcast settings above.
