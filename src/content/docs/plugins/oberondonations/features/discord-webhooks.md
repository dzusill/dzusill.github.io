---
title: "Discord Webhooks"
description: "Every announcement event can also post a rich embed to Discord, configured in webhooks.yml — a separate file from announcements.yml, with its own…"
---

Every announcement event can also post a rich embed to Discord, configured in `webhooks.yml` — a separate file from `announcements.yml`, with its own placeholder syntax.

## Setup

```yaml
webhook:
  url: ''
  create-thread-post: false
  thread-name: '<player> | <product>'
  thread-id: ''
```

Paste a Discord webhook URL (Server Settings → Integrations → Webhooks) into `url`. Leave `create-thread-post` off to post straight into the webhook's channel; turn it on to have each post open a named thread instead — or set `thread-id` to post into one specific existing thread every time.

## `<angle>` placeholders, not `{braces}`

Deliberately different from `announcements.yml`: this file is usually edited by whoever manages the Discord server, not necessarily the same person editing chat announcements, so the two are visually distinct at a glance.

```
<player> <product> <packages> <amount> <currency> <store>
<player_uuid> <player_uuid_compact> <skin_render_url> <skin_head_url>
<goal_name> <goal_percent> <goal_current> <goal_target> <goal_remaining> <milestone>
<hype_level> <hype_percent> <hype_total> <hype_donors> <hype_top_name>
```

## The donor's skin, rendered as an image

```yaml
skin:
  render-url: 'https://crafthead.net/armor/body/{player_uuid_compact}'
  head-url: 'https://crafthead.net/helm/{player_uuid_compact}'
  cache-bust: true
```

[crafthead.net](https://crafthead.net/) needs no API key and accepts a name or a compact UUID directly in the URL — used for `<skin_render_url>` (a full-body render, good as an embed's main image) and `<skin_head_url>` (just the head, good as a small author icon). `cache-bust: true` appends a changing query parameter so Discord does not keep showing a cached image from a donor's previous skin.

## Events

Each event has its own `enabled` switch (`purchase` is on by default; everything else is off) and its own embed:

```yaml
events:
  purchase:
    enabled: true
    message:
      content: ''
      embed:
        color: 0xFBBF24
        author:
          name: ''
          icon-url: '<skin_head_url>'
        title: '🎉 Recent Donation'
        description: 'Thank you **<player>** for your support!'
        image-url: '<skin_render_url>'
        thumbnail-url: ''
        footer: '<goal_name>: <goal_percent>% / 100%'
        fields:
          - name: 'Package'
            value: '<product>'
            inline: false
```

The full event list: `purchase`, `goal-milestone`, `goal-complete`, `hype-start`, `hype-level`, `hype-complete`, `hype-expired`, `refund`. `content` is the plain message text above the embed (leave blank for an embed-only post); `fields` is a list of `name` / `value` / `inline` entries.

## See also

- [Announcements](/plugins/oberondonations/features/announcements/) — the same events, presented in-game
- [webhooks.yml reference](/plugins/oberondonations/configuration/webhooks-yml/)
