---
title: "messages.yml"
description: "Every string except the three message lines, and the one pair you should keep identical."
---

`plugins/OberonMSG/messages.yml`. MiniMessage format. Reload with `/oberonmsg reload`.

> The three private-message lines are **not** here — they are `Formats` in `config.yml`, because they are built from
> MiniMessage tags rather than being plain strings.

## Delivery refusals

`%player%` — who the message was for.

```yaml
message:
  not-online: "<prefix><red>This player is not online."
  self: "<prefix><red>You can't message yourself."
  empty: "<prefix><red>This message can't be empty."
  recipient-disabled: "<prefix><red>This player has private messages disabled."
  you-ignore-them: "<prefix><red>You are ignoring this player. <gray>Use /unignore %player% first."
  cannot-message: "<prefix><red>You can't message this player."
  no-reply-target: "<prefix><red>You have nobody to reply to."
  recipient-afk: "<#808080>This player is away and might not reply."
```

### Keep these two identical

```yaml
message:
  not-online: "<prefix><red>This player is not online."
# …
player-not-found: "<prefix><red>This player is not online."
```

`message.not-online` is sent when the recipient is vanished above your level. `player-not-found` is DzusillCore's own
message when a name doesn't resolve at all.

**If they differ, the difference tells the sender that somebody invisible is online.** Restyle both together.

### `cannot-message` is worded carefully

It is what somebody gets when the *recipient* is ignoring them. It deliberately does not say "they have ignored you"
— that would turn ignoring into a notification.

## Ignore list

```yaml
ignore:
  added: "…%player%"
  already: "…%player%"
  removed: "…%player%"
  not-ignored: "…%player%"
  self: "…"
  exempt: "…%player%"
  list:
    header: "…%count%"
    line: "…%player%"
    empty: "…"
```

## Toggles

```yaml
msgtoggle:
  disabled: "…"      # private messages are now REFUSED
  enabled: "…"
socialspy:
  enabled: "…"
  disabled: "…"
```

## Command output

```yaml
command:
  usage: [ … ]
  reloaded: "…%timeout%"
  status:                       # a list — three lines
    - "…%vanish% %vanish_enabled% %afk%"
    - "…%storage% %log%"
    - "…%msgtoggle% %socialspy%"
  log:
    header: "…%count%"
    line: "…%when% %sender% %recipient% %message%"
    empty: "…"
    unavailable: "…"
```

Any message key can be a list, and renders as several lines.

## DzusillCore built-ins

The bottom of the file holds the framework's own messages. Restyle freely; don't rename the keys — and mind
`player-not-found`, noted above.

## If a message shows as its key

Seeing `message.self` in-game means the key is missing. That is deliberate — a missing message is visible rather than
silent. Add it back, or delete the file and restart to regenerate it.
