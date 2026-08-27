---
title: "Discord Webhook"
description: "Mirrors every announcement into a Discord channel as a rich embed, so the part of your community that"
---

Mirrors every announcement into a Discord channel as a rich embed, so the part of your community that
is not online still hears about it.

```yaml
discord-webhook:
  enabled: false
  url: ""
```

## Setting it up

1. In Discord: **Server Settings → Integrations → Webhooks → New Webhook**, pick the channel, copy the URL.
2. Paste it into `discord-webhook.url` and set `enabled: true`.
3. `/dlive reload`.

> **The webhook URL is a credential.** Anybody holding it can post to that channel as your bot. Do not
> paste it into a public config, a screenshot or a support ticket. If it leaks, delete the webhook in
> Discord and make a new one — rotating it is the only fix.

## The embed

Every part is switchable, so you can strip it down to a single line or keep the full card:

| Key | Default | Notes |
|---|---|---|
| `title-enabled` / `title` | on | `%player% is live on %platform%!` |
| `description-enabled` / `description` | on | `[%link%](%link%)` |
| `url-enabled` | on | makes the embed itself clickable |
| `color-enabled` / `color` | on, empty | empty uses the platform's own `webhook-color` |
| `timestamp-enabled` | on | |
| `thumbnail-enabled` / `thumbnail-url` | on | defaults to the player's head via mc-heads.net |
| `footer-enabled` / `footer` | on | `%server%` |
| `fields` | player, platform, link | each switchable, with its own name, value and inline flag |

Placeholders are the same set as the chat body — see [Announcing](/plugins/dlive/features/announcing/).

## Role mentions and plain text

```yaml
  mention-role-id: ""
  content:
    enabled: false
    message: "%player% is live on %platform%: %link%"
```

`mention-role-id` takes a numeric Discord role id. Leave it empty for no mention.

The `content` block is the plain message above the embed. It is off by default because the embed
already says everything — turn it on if you want a mention to actually ping, or if you plan to disable
the embed entirely.

## Delivery and failure

```yaml
  retry:
    max-attempts: 3
    connect-timeout-seconds: 5
    request-timeout-seconds: 8
    backoff-millis: 1500
```

Sending is asynchronous and never blocks the announcement. If Discord is down, the in-game
announcement still goes out and the webhook failure is logged — a broken webhook cannot break `/live`.
