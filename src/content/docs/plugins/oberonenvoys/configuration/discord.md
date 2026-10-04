---
title: "discord.yml"
description: "Posts a message to a Discord channel at each stage of an envoy: spawn, land, unlock and"
---

Posts a message to a Discord channel at each stage of an envoy: **spawn**, **land**, **unlock** and
**looted**. Each one can name the envoy type.

Every word of every message is in this file. Titles, descriptions, field labels, colours, pictures,
pings and even the word shown when nobody has opened the crate are all yours to change, with no
restart.

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
| `texts.nobody` | `nobody` | What `{player}` shows when nobody has opened the crate yet |

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

### Every setting of an event

Everything except `enabled` is optional. Set a key to `""` and that part is left out.

| Key | Meaning |
|---|---|
| `enabled` | `false` stops this event without deleting it |
| `colour` | `#RRGGBB` for the bar down the left side, or `tier` to use that tier's own colour |
| `title` | Bold heading |
| `title-url` | Makes the title a link |
| `description` | Body text under the title |
| `content` | Plain message text **above** the embed. This is where a ping goes. Discord markdown works |
| `ping-role-id` | Shortcut that starts `content` with a ping for this role. A Discord role id, blank for none |
| `allow-everyone` | `true` lets `@everyone` and `@here` in `content` really ping. Off unless you turn it on |
| `author.name`, `author.icon-url` | Small line above the title, with an optional icon |
| `footer.text`, `footer.icon-url` | Small line at the bottom, with an optional icon |
| `thumbnail-url` | Small picture at the top right |
| `image-url` | Large picture under the text |
| `timestamp` | `true` adds Discord's "today at 14:02" beside the footer |
| `fields` | Small labelled boxes. `inline: true` puts them side by side. `coordinates: true` marks a location field, hidden when `show-coordinates` is `false` |

Links must be `http://` or `https://`. A link that is not is left out, and the console says which key.

Empty fields are dropped, since Discord rejects the whole message otherwise. Text over Discord's
limits is shortened. A message needs at least one of: a title, a description, a field, an
author, a footer or `content`.

## Tokens

Usable in every text and every link.

| Token | Value |
|---|---|
| `{tier_name}` | The envoy type, plain text |
| `{tier_id}` | The tier's id from `tiers.yml` |
| `{world}` `{x}` `{y}` `{z}` | Where the crate is |
| `{seconds}` | Seconds until impact (`spawn`) or until unlock (`land`) |
| `{land_in}` | A live "in 2 minutes" countdown to landing |
| `{unlock_in}` | A live "in 4 minutes" countdown to unlocking |
| `{land_at}` | The clock time of landing, in each reader's own timezone |
| `{unlock_at}` | The clock time of unlocking, in each reader's own timezone |
| `{player}` | Whoever opened the crate first, or the `texts.nobody` word |
| `{duration}` | How long the crate has been on the ground |

`{land_in}`, `{unlock_in}`, `{land_at}` and `{unlock_at}` use Discord's own timestamps, so they keep
counting, and show the right time for each reader, after the message is posted.

Whoever opens a crate first is shown as a row on the embed. It does not reserve the crate. Anyone
can still loot it.

## Pings

- Nothing pings by default.
- To ping a role, put its id in `ping-role-id`, or write `<@&roleid>` in `content`. To ping one
  person, write `<@userid>` in `content`. Only what **you** wrote in the file pings.
- `@everyone` and `@here` ping only with `allow-everyone: true` on that event.
- Nothing a player can type, such as a name, can ever ping anyone. A name that arrives through `{player}`
  is plain text.

To copy a role id: Discord settings, Advanced, turn on Developer Mode, then right-click the role in
Server Settings and choose **Copy Role ID**.

## Examples

### A different picture for each tier

```yaml
events:
  land:
    thumbnail-url: "https://example.com/envoys/{tier_id}.png"
```

Put one image per tier, named after the tier's id in `tiers.yml`, on any site you control.

### Ping a role when the crate opens, with no embed

```yaml
events:
  unlock:
    content: "<@&123456789012345678> **{tier_name} envoy** is open! Go go go"
    title: ""
    description: ""
    fields: []
```

### The looter's head

```yaml
events:
  looted:
    thumbnail-url: "https://mc-heads.net/avatar/{player}"
```

### Hide where it is

```yaml
show-coordinates: false
```

### Another language

```yaml
texts:
  nobody: "nikto"
events:
  looted:
    title: "{tier_name} zásielka bola vyloupená"
    fields:
      - { name: "Otvoril", value: "{player}", inline: true }
```

## Mistakes in the file

The file is checked when the server starts and on every `/envoy reload`. A problem is a console
warning that names the key and says what the plugin does instead:

```
discord.yml: events.land.colour 'orange' is not #RRGGBB or the word tier — using grey.
discord.yml: events.unlock.description uses {unlock}, which is not a token — it is posted as written.
discord.yml: events.land.color is not a setting — it is ignored. Did you mean colour?
```

A key you leave out of an event counts as blank, except `enabled` (on), `colour` (`tier`) and
`timestamp` (on). Deleting a whole event stops that event, and it stays deleted. Top-level keys
such as `texts.nobody` are put back with their default if you delete them.

## If it does not post

- The console shows at most one warning a minute. It says `HTTP <code>` or `Could not reach Discord`.
- `HTTP 404` means the webhook was deleted. `HTTP 401` or `403` means the URL is wrong.
- A blank `url` or `enabled: false` is silent. That is "off", not an error.
- Posting happens off the server thread. A slow or dead Discord cannot lag the server. Messages that
  cannot be delivered are dropped, not retried indefinitely.
