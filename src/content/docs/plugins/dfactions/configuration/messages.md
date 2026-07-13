---
title: "Messages & Languages"
description: "All user-facing text is MiniMessage-formatted and fully translatable. Language files live in"
---

All user-facing text is **MiniMessage-formatted** and fully translatable. Language files live in
`plugins/PvPIndexFactions/messages/`.

## Bundled locales

Eight locales ship out of the box:

`en` · `es` · `de` · `fr` · `pt-BR` · `ja` · `zh` · `ru`

Each is a file `messages_<locale>.yml`. Missing keys fall back to English.

## Server default & per-player language

```yaml
factions:
  language:
    default: en                   # server-wide default
    allow-player-override: true   # players choose their own
    command-opens-gui: true       # /f language with no args opens a picker GUI
    visible-locales: []           # empty = offer all loaded locales
```

Players switch their personal language with:

```
/f language           # open the language picker (if enabled)
/f language de        # switch to German
/f language reset     # back to server default
```

## Editing text

1. Open the locale file you want, e.g. `messages/messages_en.yml`.
2. Edit the value — keep the **placeholder names** (`{faction}`, `{player}`, …) intact.
3. Use [MiniMessage](https://docs.advntr.dev/minimessage/format.html) tags for color/format, e.g.
   `<red>`, `<gradient:#7bd10a:#2e7d32>`, `<bold>`.
4. `/fa reload` to apply.

> When adding a new custom string, mirror it across all locale files you use; any locale missing the
> key falls back to the English value.
