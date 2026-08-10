---
title: "messages.yml"
description: "Every string a player or staff member sees, in MiniMessage format, with the placeholders each one accepts."
---

`plugins/OberonChat/messages.yml`. MiniMessage format — `<red>`, `<#C21807>`, `<bold>`, `<gradient:#a:#b>`. Reload with `/oberonchat reload`.

`<prefix>` anywhere in a message is replaced by the `prefix` key at the top of the file.

## Word filter

```yaml
filter:
  blocked: "<prefix><red>Watch your language — that message was not sent."
  censored: "<prefix><gray>Some of that was filtered out."
  warned: "<prefix><yellow>Keep it civil, please."
```

> The rule that matched is available as `%word%`, but the shipped messages deliberately don't use it. Telling a player exactly which word tripped tells them exactly what to work around. Staff get it in the alert; the player does not need it.

## Caps

`%percent%` — how much of the message was upper case. `%threshold%` — the configured limit.

```yaml
caps:
  blocked: "<prefix><red>Please don't shout — that message was <gray>%percent%%</gray> caps."
  lowercased: "<prefix><gray>No need to shout."
  warned: "<prefix><yellow>Easy on the caps."
```

## Anti-spam

`%seconds%` — wait remaining. `%max%` — the length limit. `%length%` — the actual length.

```yaml
spam:
  cooldown: "<prefix><red>Slow down — <gray>%seconds%s</gray> to go."
  duplicate: "<prefix><red>You already said that."
  flood: "<prefix><red>You are sending messages too fast."
  too-long: "<prefix><red>That message is too long <gray>(%length%/%max%)</gray>."
```

## Staff alert

Sent to everyone holding `oberonchat.alerts`.

`%player%` `%reason%` `%source%` `%message%` `%outcome%`

```yaml
staff:
  alert: "<#C21807><bold>Filter</bold></#C21807> <dark_gray>»</dark_gray> <#C21807>%player%</#C21807> <dark_gray>(<gray>%source%</gray>, <gray>%reason%</gray>)</dark_gray><dark_gray>:</dark_gray> <gray>%message%"
```

`%source%` is `chat`, `command`, `sign`, `book` or `anvil`. `%reason%` is `word:<the rule>` or `spam:flood` and so on.

## Punishment broadcast

Sent to everyone when a threshold with `Broadcast: true` fires.

`%player%` `%total%` `%threshold%` `%reason%` `%message%`

```yaml
violations:
  broadcast: "<prefix><gray>%player% was punished for repeated chat violations <dark_gray>(%total% points)</dark_gray>."
```

## Command output

```yaml
command:
  usage: [ ... ]                # a list — each entry is one line
  reloaded: "…%rules% rule(s) active."
  check:
    clean: "…%text%"
    hit: "…%reason% %outcome% %weight% %result%"
  history:
    header: "…%player% %total% %count%"
    line: "…%when% %reason% %weight% %source% %message%"
    empty: "…%player%"
    unavailable: "…"
  cleared: "…%player%"
```

`usage` is a list, so it renders as several lines. Any message key can be a list.

## Action bar

The same key is used for the chat line and the action bar. The action bar version has `<prefix>` stripped — there is no room for it above the hotbar — and everything else renders identically.

If you want them to differ, turn one channel off in `config.yml` under `Feedback`.

## DzusillCore built-ins

The bottom of the file holds the framework's own messages: `no-permission`, `players-only`, `invalid-usage` and friends. Restyle them freely; don't rename the keys.

## If a message shows as its key

Seeing `filter.blocked` in-game instead of the text means the key is missing from the file. That is deliberate — a missing message is visible rather than silent. Add the key back, or delete the file and restart to regenerate it.
