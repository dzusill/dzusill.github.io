---
title: "Quick Start"
description: "A short production setup: grant the media permission, check the default platforms, tune the cooldown, test opt-out and optionally enable Discord."
---

## 1. Grant stream access

`oberonlive.use` defaults to `false`. Grant it only to trusted streamers:

```text
/lp group media permission set oberonlive.use true
```

Everyone can use `/live toggle` by default.

## 2. Check the platform list

The shipped `config.yml` accepts YouTube, Twitch, TikTok and Kick. It includes the trusted first-party short hosts `youtu.be` and `vm.tiktok.com`.

```yaml
platforms:
  twitch:
    display-name: "Twitch"
    domains:
      - twitch.tv
      - "*.twitch.tv"
    webhook-color: "#9146FF"
```

## 3. Choose cooldowns

The migrated default is 30 seconds:

```yaml
cooldowns:
  default-seconds: 30
  tiers:
    media:
      permission: oberonlive.cooldown.media
      seconds: 15
    partner:
      permission: oberonlive.cooldown.partner
      seconds: 5
```

Granting both tier permissions selects five seconds. `oberonlive.cooldown.bypass` skips both the cooldown and duplicate-link window.

## 4. Reload and test

```text
/olive reload
/live https://kick.com/your_channel
/live toggle
```

The toggle changes receiving, not publishing. The sender always sees their own announcement.

## 5. Optional Discord mirror

Create a Discord Incoming Webhook, copy its URL to `discord-webhook.url`, set `enabled: true`, and reload. Keep that URL private: it is a credential that can post to the channel.

```yaml
discord-webhook:
  enabled: true
  url: "https://discord.com/api/webhooks/…/…"
  username: "OberonLive"
  avatar-url: ""
  mention-role-id: ""
```

See [Discord Webhooks](/plugins/oberonlive/features/discord-webhooks/) before enabling a role mention.

