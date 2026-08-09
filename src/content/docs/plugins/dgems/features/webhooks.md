---
title: "Discord Webhooks"
description: "Posts order activity to a staff Discord channel, so an order placed at 3am is not discovered at noon."
---

Posts order activity to a staff Discord channel, so an order placed at 3am is not discovered at noon.

---

## Configuration

```yaml
orders:
  # Shown in webhook messages so multi-server networks can tell servers apart.
  server-name: "server"
  webhook:
    enabled: false
    url: ""
    username: "dGems Orders"
    mention-role-id: ""
    notify-on-created: true
    notify-on-resolved: true
```

| Key | Effect |
|---|---|
| `server-name` | included in every message — set it per server on a network |
| `enabled` | master switch |
| `url` | the Discord webhook URL |
| `username` | the name the webhook posts under |
| `mention-role-id` | role id to ping on new orders; empty = no ping |
| `notify-on-created` | post when an order is placed |
| `notify-on-resolved` | post when it is delivered or cancelled |

## Setting it up

1. In Discord: **Channel settings → Integrations → Webhooks → New Webhook**. Copy the URL.
2. Paste it into `url` and set `enabled: true`.
3. For a ping, enable Developer Mode, right-click the role, **Copy ID**, and put it in `mention-role-id`.
4. `/gems admin reload`.

> ⚠️ **A webhook URL is a credential.** Anyone holding it can post into that channel as your bot. Keep `config.yml` readable by the server user only, and never paste it into a support channel or a screenshot.

## Choosing what to post

| Setting | Good for |
|---|---|
| created only | busy shops — the ping is the call to action, resolutions are noise |
| both | small teams who want the channel to double as an order log |
| resolved only | when staff already watch the in-game queue and only want a record |

## Multi-server networks

Point every server at the same channel and set a distinct `server-name` on each. The message tells you where the order came from, which matters when the fulfilment is server-specific.

## Failures

A failed webhook post is logged and never blocks the order. A broken URL costs you notifications, not purchases — the order is already committed to the database before the post is attempted.

## Next

- [config.yml](/plugins/dgems/configuration/config/)
