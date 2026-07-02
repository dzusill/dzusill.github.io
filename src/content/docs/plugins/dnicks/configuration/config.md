---
title: "config.yml"
description: "The full reference for plugins/dNicks/config.yml. After editing, run /dnicks reload."
---

The full reference for `plugins/dNicks/config.yml`. After editing, run `/dnicks reload`.

## Surfaces

Which places dNicks owns. Set one to `false` to delegate it to another plugin.

```yml
surfaces:
  display-name: true   # Player#displayName (chat fallback, /msg in many plugins)
  tablist: true        # the tab list (set false only if the TAB plugin owns it)
  chat: true           # the chat line (rendered at HIGHEST to beat EssentialsX)
  join-message: true
  quit-message: true
  death-message: true
```

> There is no `nametag` surface. The name above the head is owned by your nametag plugin (TAB, etc.), fed by `%dnicks_name%`. See [The Nametag Above the Head](/plugins/dnicks/features/nametag/).

## Nick rules

```yml
nick:
  max-length: 16        # max VISIBLE characters (tags stripped)
  min-length: 3
  allowed-pattern: "^[A-Za-z0-9_]+$"   # regex on the visible text; empty disables the check
  unique: false         # if true, two players can't share the same plain nick
  allowed-tags:  [ color, colour, gradient, rainbow, bold, b, italic, i, underlined, u, strikethrough, st ]
  forbidden-tags: [ click, hover, insertion, font, selector, transition, reset, newline, pride, obfuscated ]
```

`forbidden-tags` is the security blacklist — leave the interactive tags in it. See [Gradient & Color Nicks](/plugins/dnicks/features/gradient-nicks/#safety).

## Formats

[MiniMessage](https://docs.papermc.io/adventure/minimessage/). `%name%` = rendered nick, `%message%` = chat body, `%player%` = real username.

```yml
formats:
  chat: "%name%<dark_gray>:</dark_gray> %message%"
  join: "<dark_gray>[<green>+</green>]</dark_gray> %name%"
  quit: "<dark_gray>[<red>-</red>]</dark_gray> %name%"
  death: "<gray>%player% died.</gray>"
```

## Re-apply ticker

Off by default. Turn on only if a stubborn plugin keeps resetting display names.

```yml
reapply:
  enabled: false
  interval-ticks: 100    # every 5 seconds
```

## Integrations

```yml
integrations:
  essentials-warn: true  # log guidance at startup if EssentialsX is present
  tab-warn: true         # log guidance at startup if the TAB plugin is present
```
