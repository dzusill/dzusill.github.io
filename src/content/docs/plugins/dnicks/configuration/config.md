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
  nametag: true        # the floating nametag above the head
  join-message: true
  quit-message: true
  death-message: true
```

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
  nametag: "%name%"
  join: "<dark_gray>[<green>+</green>]</dark_gray> %name%"
  quit: "<dark_gray>[<red>-</red>]</dark_gray> %name%"
  death: "<gray>%player% died.</gray>"
```

## Floating nametag

```yml
nametag-display:
  y-offset: 0.30
  billboard: CENTER      # CENTER | VERTICAL | HORIZONTAL | FIXED
  see-through: false
  shadowed: true
  view-range: 1.0
  hide-on-sneak: true
  sneak-opacity: 64
  background: false
  spawn-only-when-nicked: true
```

See [The Floating Nametag](/plugins/dnicks/features/nametag/).

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
