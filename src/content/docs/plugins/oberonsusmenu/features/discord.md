---
title: "Discord"
description: "OberonSusMenu posts to Discord through a webhook. It only sends; nothing comes back from Discord, so there are no buttons and no bot to install. Every embed…"
---

OberonSusMenu posts to Discord through a **webhook**. It only sends; nothing comes back from Discord, so there are no buttons and no bot to install. Every embed about a case carries `/sus case <id>`, which staff type in game to open that player.

If Discord is down, the game is never affected. Messages wait in a queue on their own thread and are sent once Discord answers again.

## Setup (server owner)

1. In Discord, open the channel's settings: **Edit Channel → Integrations → Webhooks → New Webhook**. Give it a name and a picture if you like, then click **Copy Webhook URL**.
2. In `plugins/OberonSusMenu/config.yml`, paste it and switch Discord on:
   ```yaml
   discord:
     enabled: true
     webhook-url: 'https://discord.com/api/webhooks/…'
   ```
3. Optional, separate channels: create a webhook in a second channel and put the URLs in `alerts-webhook-url` (suspicious players, Vulcan punishments, client detections) and `actions-webhook-url` (freezes, kicks, mutes, bans, case changes). An empty one falls back to `webhook-url`.
4. Optional, ping a role on CRITICAL: turn on Discord **Settings → Advanced → Developer Mode**, then **Server Settings → Roles → right-click the role → Copy Role ID**, and set:
   ```yaml
   discord:
     role-ping:
       role-id: '123456789012345678'
   ```
5. Run `/sus reload`. The console says `Discord webhook is on.`, and `/sus health` shows the webhook state, messages sent and dropped, and the last success.

**Keep the URL secret.** Whoever has it can post into the channel. OberonSusMenu never writes it to the console. If it leaks, delete the webhook in Discord and create a new one.

## What gets posted

| Event | Channel | When |
| --- | --- | --- |
| `case-high` | Alerts | A case reaches the Discord level (`reactions.discord` in `score.yml`, HIGH by default), below CRITICAL. Shows the check, VL, ping, TPS, client, location, Vulcan's info and the top checks in the score |
| `case-critical` | Alerts | A case reaches CRITICAL. Pings the role by default |
| `vulcan-punishment` | Alerts | Vulcan punished a player by itself |
| `client-detection` | Alerts | A client rule matched on join (confirmed or suspicious, or a FLAG or KICK rule) |
| `freeze` / `unfreeze` | Actions | Staff froze or unfroze a player |
| `frozen-logout` | Actions | A frozen player logged out |
| `kick` / `mute` / `ban` | Actions | Staff kicked, (temp)muted or (temp)banned from `/sus`. Mutes and bans are posted once LiteBans applied them |
| `case-status` | Actions | A case was opened, put under review, resolved or dismissed |

Each level is posted once per case: a case that jumps from MEDIUM straight to CRITICAL only posts `case-critical`. Bedrock players are marked as such in every embed.

## Changing the embeds

Each event has its own section under `discord.events.<event>`: `enabled`, `title`, `description`, `color` (`risk` or `'#RRGGBB'`), `fields` and `ping-role`.

```yaml
discord:
  username: 'OberonSusMenu'   # name the messages are posted with
  avatar-url: ''              # picture; empty = the webhook's own
  footer: 'OberonSusMenu'     # empty = no footer
  timestamp: true
  events:
    case-high:
      enabled: true
      title: 'Suspicious player: {player}'
      description: 'Case **#{case_id}** reached **{risk}** (score {score}). Open it in game: `{case_command}`'
      color: risk
      fields:
        - {name: 'Player', value: '{player} ({platform})', inline: true}
        - {name: 'Check', value: '{check}', inline: true}
        - {name: 'VL', value: '{vl}/{max_vl}', inline: true}
        - {name: 'Location', value: '{coords}', inline: false}
      ping-role: false
```

Titles, descriptions and fields may use Discord markdown. Placeholder values are escaped, so a name like `x_Pro_x` shows as typed. A field whose placeholders are all unknown for that event is left out: a case without a check has no "Check" field.

To switch an event off, set `enabled: false`. A deleted section comes back on restart with the shipped layout.

All placeholders are listed under [`discord`](/plugins/oberonsusmenu/configuration/config/#discord).

## Safety

- Only the configured role can ever be pinged. `@everyone` in a player name or in Vulcan's info text does nothing.
- Embeds never contain IP addresses.
- Texts are cut to Discord's limits (title 256, description 4096, 25 fields, field value 1024, 6000 characters per embed) rather than refused.

## When Discord fails

- **Rate limits:** a 429 waits for Discord's `Retry-After` and sends the same message again.
- **Discord or network errors** are retried after 1, 2, 4 and 8 seconds, then the message is dropped.
- **A wrong or deleted webhook** (401, 403, 404) and a refused message (400) are dropped at once.
- Failures are logged as **one warning** (`Discord webhook failed: …`) until a message gets through again, then one line saying it delivers again.
- When Discord is down long enough to fill the queue (`queue-size`, 100), new messages are dropped. `/sus health` counts them.
