---
title: "Live Announcements"
description: "How /live validates, stores and delivers a clickable stream announcement to opted-in players, the sender and the console."
---

```text
/live youtube.com/live/your-stream
```

The player needs `oberonlive.use`. A bare or HTTP URL is first upgraded to HTTPS. OberonLive then checks the destination, moderation rules, permission-derived cooldown and global duplicate window before storing the normalized announcement.

## Recipients

- Every online player whose receiving state is enabled.
- The streamer, even if their own receiving state is disabled.
- The console when `broadcast.console: true`.
- Discord when its webhook is enabled.

Joining players are loaded asynchronously from storage. Until that finishes, `/live` and `/live toggle` return the configurable `not-ready` message rather than guessing their state.

## Chat lines

The shipped broadcast is migrated from the supplied PerfLive configuration:

```yaml
broadcast:
  chat:
    enabled: true
    lines:
      - "                    "
      - "<#FD3DB5><bold>Media</bold> <#FD3DB5>%player% <#DA70D6>is live!"
      - "<#AAAAAA><underlined>%link%"
      - "                    "
    link-hover: "<gray>Open %player%'s %platform% stream"
```

Every line containing `%link%` or `{link}` receives an `open_url` click event for the validated stream. The click event is applied as a component event, not built by concatenating a MiniMessage click tag around user input.

## Broadcast placeholders

| Placeholder | Value |
|---|---|
| `%player%` | account name at announcement time |
| `%display_name%` | current Bukkit display name |
| `%uuid%` | player's UUID |
| `%link%` | validated, HTTPS-normalized stream URL |
| `%platform%` | configured display name, such as `Twitch` |
| `%platform_id%` | platform section id, such as `twitch` |
| `%server%` | configured `server-name` |
| `%timestamp%` | UTC ISO-8601 announcement time |

When PlaceholderAPI is installed, each player's copy is also passed through it after the built-in values are inserted. That allows recipient-specific placeholders in the same broadcast.

## Other outputs

The same event can show an action bar and play a sound. Both are disabled by default. The sound is played to every receiving online player and to the streamer even when the streamer opted out. It is never played to the console. Bukkit enum names such as `BLOCK_NOTE_BLOCK_CHIME` and registry keys such as `minecraft:block.note_block.chime` are both accepted.

The success message is sent after storage commits. If SQL fails, no broadcast is emitted and the player receives `announcement-failed`.
