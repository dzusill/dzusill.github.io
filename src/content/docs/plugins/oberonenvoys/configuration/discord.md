---
title: "discord.yml"
description: "Posts an embed to a Discord channel at each stage of an envoy: spawn, land, unlock and"
---

Posts an embed to a Discord channel at each stage of an envoy: **spawn**, **land**, **unlock** and
**looted**. Each one names the envoy type.

Off by default. Nothing is posted until you set a URL and `enabled: true`.

## Setup

1. In Discord, open the channel's settings, then **Integrations**, then **Webhooks**, then **New Webhook**.
2. Copy the webhook URL.
3. Paste it into `url` in `discord.yml` and set `enabled: true`.
4. Run `/envoy reload`.

> **The URL is a password.** Anyone who has it can post to that channel. Keep it out of screenshots
> and support tickets. The plugin never writes it to the console. If it leaks, delete the webhook in
> Discord and make a new one.

Only `https://discord.com/api/webhooks/...` URLs are accepted (also `ptb.`, `canary.` and
`discordapp.com`). Anything else is refused with a warning, and the rest of the plugin is unaffected.

## Top-level keys

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `false` | Master switch |
| `url` | blank | The webhook URL |
| `username` | blank | Overrides the webhook's name. Blank keeps the one set in Discord |
| `avatar-url` | blank | Overrides the webhook's picture |
| `show-coordinates` | `true` | `false` blanks `{world} {x} {y} {z}` and drops every field marked `coordinates: true` |
| `timeout-seconds` | `5` | How long to wait for Discord before dropping one message |

`show-coordinates` is separate from `notifications.reveal-coordinates` in `config.yml`. A Discord
channel can be read by people who are not on the server, so you may want the location in game only.

## Events

```yaml
events:
  looted:
    enabled: true
    colour: "#F11800"
    title: "{tier_name} envoy has been looted"
    description: ""
    ping-role-id: ""
    fields:
      - { name: "Opened by", value: "{player}", inline: true }
      - { name: "Time since landing", value: "{duration}", inline: true }
```

| Event | Posted when |
|---|---|
| `spawn` | The envoy is announced and the crate is on its way down |
| `land` | The crate is on the ground and the countdown is running |
| `unlock` | The countdown is over and anyone can loot it |
| `looted` | The crate has been emptied |

Delete an event, or set `enabled: false`, to stop posting it. A crate nobody claimed, or one cleared
by staff, is not posted.

| Key | Meaning |
|---|---|
| `colour` | `#RRGGBB` for the bar down the left side, or `tier` to use that tier's own colour |
| `title`, `description` | The embed's heading and body |
| `ping-role-id` | Optional Discord role id to ping. Blank means no ping. Nothing else can ping; `@everyone` and `@here` are never allowed |
| `fields` | Small labelled boxes. `inline: true` puts them side by side. `coordinates: true` marks a location field |

Empty fields are dropped, since Discord rejects the whole message otherwise. Text over Discord's
limits is shortened.

## Tokens

Usable in titles, descriptions and field names and values.

| Token | Value |
|---|---|
| `{tier_name}` | The envoy type, plain text |
| `{tier_id}` | The tier's id from `tiers.yml` |
| `{world}` `{x}` `{y}` `{z}` | Where the crate is |
| `{seconds}` | Seconds until impact (`spawn`) or until unlock (`land`) |
| `{land_in}` | A live "in 2 minutes" countdown to landing |
| `{unlock_in}` | A live "in 4 minutes" countdown to unlocking |
| `{player}` | Whoever opened the crate first, or `nobody` |
| `{duration}` | How long the crate has been on the ground |

`{land_in}` and `{unlock_in}` use Discord's own timestamps, so they keep counting after the message
is posted.

Whoever opens a crate first is shown as a row on the embed. It does not reserve the crate. Anyone
can still loot it.

## If it does not post

- The console shows at most one warning a minute. It says `HTTP <code>` or `Could not reach Discord`.
- `HTTP 404` means the webhook was deleted. `HTTP 401` or `403` means the URL is wrong.
- A blank `url` or `enabled: false` is silent. That is "off", not an error.
- Posting happens off the server thread. A slow or dead Discord cannot lag the server. Messages that
  cannot be delivered are dropped, not retried indefinitely.
