---
title: "Discord Webhooks"
description: "Mirror successful live announcements to a Discord Incoming Webhook with plain content, custom identity, role mention and independently switchable embed sections."
---

OberonLive uses a standard Discord **Incoming Webhook URL**. It does not run a bot and does not require DiscordSRV or JDA.

> A webhook URL is a credential. Anyone holding it can post to that Discord channel. Never paste it in support chat, commit it to Git, or publish a diagnostic archive containing `config.yml`.

## Basic setup

```yaml
discord-webhook:
  enabled: true
  url: "https://discord.com/api/webhooks/…/…"
  username: "OberonLive"
  avatar-url: ""
  mention-role-id: ""
  content:
    enabled: false
    message: "%player% is live on %platform%: %link%"
```

The URL must use HTTPS, a Discord-owned hostname and the `/api/webhooks/` path. Invalid enabled webhook settings refuse startup or reload.

`username` and `avatar-url` override the identity displayed for this post. `mention-role-id` accepts a numeric role id, not `<@&…>` markup.

## Plain content and embed

```yaml
discord-webhook:
  content:
    enabled: false
    message: "%player% is live on %platform%: %link%"
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

Set `embed.enabled: false` to remove the whole embed and enable `content` for a plain Discord message. Within an enabled embed, title, description, clickable URL, color, timestamp, thumbnail and footer have independent `*-enabled` switches. Every field also has its own `enabled` switch.

The broadcast placeholders are available throughout the identity, content and embed. Empty enabled `color` uses the announced platform's `webhook-color`. A fixed six-digit hex value overrides it globally. Discord limits are enforced by truncating text, and no more than 25 enabled fields are accepted. Reload is refused if an enabled webhook would produce no content, embed or configured role mention.

## Mentions

The payload disables Discord's automatic mention parsing. When `mention-role-id` is set, only that exact role is included in `allowed_mentions`, which prevents a player or placeholder value from turning into `@everyone`, `@here` or a different role ping.

## Failure behavior

Webhook delivery runs on its own single-thread executor with connect/request timeouts, bounded retries and linear backoff. A failure is logged without intentionally printing the configured URL. It does not cancel or delay the in-game broadcast and does not roll back history.

All webhook settings are reloadable with `/olive reload`.
