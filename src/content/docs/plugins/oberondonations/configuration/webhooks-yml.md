---
title: "webhooks.yml"
description: "Discord embeds. See Discord Webhooks for how it fits together — this page is the file laid out in full."
---

Discord embeds. See [Discord Webhooks](/plugins/oberondonations/features/discord-webhooks/) for how it fits together — this page is the file laid out in full.

```yaml
webhook:
  url: ''
  create-thread-post: false
  thread-name: '<player> | <product>'
  thread-id: ''

skin:
  render-url: 'https://crafthead.net/armor/body/{player_uuid_compact}'
  head-url: 'https://crafthead.net/helm/{player_uuid_compact}'
  cache-bust: true

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

  goal-milestone:
    enabled: false
    message:
      content: 'Community goal **<goal_name>** reached **<milestone>%**'
      embed:
        color: 0xFBBF24
        title: 'Goal milestone'
        description: '<goal_name> is at <goal_percent>% (<goal_current> / <goal_target> <currency>)'
        image-url: ''
        thumbnail-url: ''
        footer: ''
        fields: []

  goal-complete:
    enabled: false
    message:
      content: 'Community goal **<goal_name>** completed!'
      embed:
        color: 0x4ADE80
        title: 'Goal complete'
        description: '<goal_name> reached <goal_target> <currency>.'
        image-url: ''
        thumbnail-url: ''
        footer: ''
        fields: []

  hype-start:
    enabled: false
    message:
      content: ''
      embed:
        color: 0xFBBF24
        title: '🚂 Hype Train started!'
        description: 'Every purchase pushes it further.'
        fields: []

  hype-level:
    enabled: false
    message:
      content: ''
      embed:
        color: 0xFBBF24
        title: '🚂 Hype Level <hype_level>'
        description: '<hype_total> from <hype_donors> donors. Top: <hype_top_name>'
        fields: []

  hype-complete:
    enabled: false
    message:
      content: ''
      embed:
        color: 0x4ADE80
        title: '🚂 Hype Train complete — level <hype_level>'
        description: '<hype_total> from <hype_donors> donors.'
        fields: []

  hype-expired:
    enabled: false
    message:
      content: ''
      embed:
        color: 0x94A3B8
        title: '🚂 Hype Train ended at level <hype_level>'
        description: ''
        fields: []

  refund:
    enabled: false
    message:
      content: ''
      embed:
        color: 0xF87171
        title: 'Payment reversed'
        description: '<player> — <amount> <currency>'
        fields: []
```

Placeholders use `<angle>` brackets here, deliberately different from `announcements.yml`'s `{braces}` — see [Discord Webhooks](/plugins/oberondonations/features/discord-webhooks/#angle-placeholders-not-braces). `color` is a hex integer (`0xRRGGBB`).

## See also

- [Discord Webhooks](/plugins/oberondonations/features/discord-webhooks/)
- [Reloading](/plugins/oberondonations/configuration/reloading/)
