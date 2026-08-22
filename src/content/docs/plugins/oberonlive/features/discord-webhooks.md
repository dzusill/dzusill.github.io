---
title: "Discord Webhooks"
description: "Mirror successful live announcements to a Discord Incoming Webhook with a custom name, avatar, role mention, platform color and embed fields."
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
```

The URL must use HTTPS, a Discord-owned hostname and the `/api/webhooks/` path. Invalid enabled webhook settings refuse startup or reload.

`username` and `avatar-url` override the identity displayed for this post. `mention-role-id` accepts a numeric role id, not `<@&…>` markup.

## Embed

```yaml
embed:
  title: "%player% is live on %platform%!"
  description: "[%link%](%link%)"
  color: ""
  thumbnail-url: "https://mc-heads.net/avatar/%uuid%/128"
  footer: "%server%"
  fields:
    player:
      name: "Player"
      value: "%player%"
      inline: true
```

The broadcast placeholders are available throughout the identity and embed. Empty `color` uses the announced platform's `webhook-color`. A fixed six-digit hex value overrides it globally. Discord limits are enforced by truncating text, and no more than 25 configured fields are accepted.

## Mentions

The payload disables Discord's automatic mention parsing. When `mention-role-id` is set, only that exact role is included in `allowed_mentions`, which prevents a player or placeholder value from turning into `@everyone`, `@here` or a different role ping.

## Failure behavior

Webhook delivery runs on its own single-thread executor with connect/request timeouts, bounded retries and linear backoff. A failure is logged without intentionally printing the configured URL. It does not cancel or delay the in-game broadcast and does not roll back history.

All webhook settings are reloadable with `/olive reload`.

