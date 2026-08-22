---
title: "config.yml"
description: "Reference for OberonLive platforms, URL security, permission cooldowns, broadcast output, history, Discord webhook and message presentation."
---

`config.yml` controls every runtime behavior except the database connection and the wording of command replies. `/olive reload` validates the candidate before replacing the active settings.

## Global keys

| Key | Default | Meaning |
|---|---|---|
| `config-version` | `1` | Schema marker. A value newer than the running jar is refused. |
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

Duplicate protection compares normalized links globally across all players. The cooldown bypass permission also bypasses this window.

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

Domain values are lower-cased and IDN-normalized; one value blocks its subdomains too. URLs must be valid HTTPS URLs and compare in normalized form. Database blocks are separate and managed through `/olive block`.

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
  retry:
    max-attempts: 3
    connect-timeout-seconds: 5
    request-timeout-seconds: 8
    backoff-millis: 1500
  embed:
    title: "%player% is live on %platform%!"
    description: "[%link%](%link%)"
    color: ""
    thumbnail-url: "https://mc-heads.net/avatar/%uuid%/128"
    footer: "%server%"
    fields: {}
```

Attempts are clamped to 1–5, connect timeout to 1–30 seconds, request timeout to 1–60 seconds and backoff to 0–60,000 ms. Fields use arbitrary ids and each has `name`, `value` and `inline`; Discord allows at most 25.

See [Discord Webhooks](/plugins/oberonlive/features/discord-webhooks/) for credential and mention safety.

## `Presentation`

```yaml
Presentation:
  Categories:
    ERROR:
      Channel: CHAT
      Sound:
        Enabled: false
    INFO:
      Channel: CHAT
    TOGGLE:
      Channel: CHAT
  Overrides: {}
```

This OberonCore block routes the messages from `messages.yml` to `CHAT`, `ACTION_BAR`, `BOTH` or `NONE` and can add a sound. It does not change the live broadcast above. A per-key override wins over its category.
