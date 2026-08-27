---
title: "Announcing"
description: "/live <link> is the whole player-facing feature. Everything else exists to make that command safe"
---

`/live <link>` is the whole player-facing feature. Everything else exists to make that command safe
to hand out.

## What happens when somebody runs it

1. The input is normalised — trimmed, upgraded to HTTPS, and rejected outright if it contains
   whitespace, control characters, quotes, angle brackets or a `javascript:` scheme.
2. The hostname is matched against your configured [platforms](/plugins/dlive/features/link-security/). No match, no
   announcement.
3. The link is checked against the blocklist, both the static one in `config.yml` and the runtime one
   in the database.
4. The player's [cooldown](/plugins/dlive/features/cooldowns-and-duplicates/) is checked, then the duplicate window.
5. The announcement is written to history, then delivered.

Every one of those steps can stop the announcement, and each has its own message in `messages.yml`
so the player is told which one it was.

## Where it goes

- **Chat**, to every online player who has not opted out, plus the streamer themselves
- **The console**, if `broadcast.console` is on
- **The action bar**, if `broadcast.action-bar.enabled` is on
- **Discord**, if a [webhook](/plugins/dlive/features/discord-webhook/) is configured

Each recipient is rendered separately, so PlaceholderAPI values resolve per viewer rather than once
for everybody.

## The body

`broadcast.chat.lines` is a MiniMessage list. Any line containing `%link%` becomes clickable and picks
up the hover text from `broadcast.chat.link-hover` — you do not add the click yourself.

Available placeholders in every broadcast string:

| Placeholder | Is |
|---|---|
| `%player%` | the streamer's name |
| `%display_name%` | their display name |
| `%uuid%` | their UUID |
| `%link%` | the normalised HTTPS link |
| `%platform%` | the platform's display name, e.g. `Twitch` |
| `%platform_id%` | the platform's config key, e.g. `twitch` |
| `%server%` | `server-name` from `config.yml` |
| `%timestamp%` | when it was announced |

## Presets

`config.yml` ships a **Broadcast presets** section at the bottom: five alternative bodies (framed,
two line, single line, platform coloured, minimal) written out as comments. Paste one over
`broadcast.chat.lines` and reload.

Because they are comments rather than keys, they are not merged into an existing `config.yml` on
upgrade — look at a freshly generated file if you want to see them.
