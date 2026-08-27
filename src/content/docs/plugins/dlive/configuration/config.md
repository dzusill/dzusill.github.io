---
title: "config.yml"
description: "Everything below reloads with /dlive reload. Only database.yml needs a restart."
---

Everything below reloads with `/dlive reload`. Only `database.yml` needs a restart.

## Top level

```yaml
config-version: 2
debug: false
server-name: "server"
```

`server-name` is what `%server%` resolves to in broadcasts and the webhook footer.

## platforms

The allowlist. See [Link Security](/plugins/dlive/features/link-security/) for the full explanation.

```yaml
platforms:
  twitch:
    display-name: "Twitch"
    domains:
      - twitch.tv
      - "*.twitch.tv"
    webhook-color: "#9146FF"
```

| Key | Is |
|---|---|
| the section key | the platform id, used by `%platform_id%` and by [saved links](/plugins/dlive/features/saved-links/) |
| `display-name` | what `%platform%` shows |
| `domains` | hostnames to accept, `*.` accepts subdomains |
| `webhook-color` | the Discord embed colour when `color` is left empty |

## url-security

```yaml
url-security:
  max-length: 2048
  duplicate-window-seconds: 30
```

`duplicate-window-seconds: 0` switches duplicate protection off.

## cooldowns

```yaml
cooldowns:
  default-seconds: 30
  tiers: {}
```

See [Cooldowns & Duplicates](/plugins/dlive/features/cooldowns-and-duplicates/).

## blocked-domains / blocked-urls

```yaml
blocked-domains: []
blocked-urls: []
```

The static half of the blocklist. A blocked domain also blocks its subdomains. The runtime half lives
in the database and is managed with `/dlive block`.

## broadcast

```yaml
broadcast:
  console: true
  chat:
    enabled: true
    lines: [...]
    link-hover: "<gray>Open %player%'s %platform% stream"
    face:
      enabled: false
      pixel: "█"
      lines: [...]
  action-bar:
    enabled: false
    message: "..."
  sound:
    enabled: false
    name: "BLOCK_NOTE_BLOCK_CHIME"
    volume: 1.0
    pitch: 1.0
```

`link-hover` is applied to whichever line contains `%link%`; you do not write the click or hover into
the line itself.

`sound.name` accepts both Bukkit enum names and namespaced keys —
`BLOCK_NOTE_BLOCK_CHIME` and `block.note_block.chime` both work.

The `face` block is [Skin Face](/plugins/dlive/features/skin-face/).

## history

```yaml
history:
  page-size: 10
  retention-days: 0
  timezone: "Europe/Bratislava"
  time-format: "yyyy-MM-dd HH:mm"
```

`retention-days: 0` keeps everything. `timezone` is an IANA zone name.

## discord-webhook

See [Discord Webhook](/plugins/dlive/features/discord-webhook/).

## Presentation

Controls how each category of message from `messages.yml` is delivered:

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
  Overrides: {}
```

`Channel` is `CHAT`, `ACTION_BAR`, `BOTH` or `NONE`. Lists always stay in chat regardless.

`Overrides` targets one individual message key and beats its category — useful for moving a single
noisy message to the action bar without touching the rest.
