---
title: "Messages & Sounds"
description: "The text and sounds live in the Messages and Sounds sections of config.yml."
---

The text and sounds live in the `Messages` and `Sounds` sections of [config.yml](/plugins/toolsnotifier/configuration/config/).

## Placeholders

Message text uses `&` colour codes, `&#RRGGBB` hex, and four positional placeholders:

| Token | Value |
|---|---|
| `{0}` | Item name |
| `{1}` | Remaining durability |
| `{2}` | Max durability |
| `{3}` | Remaining percentage |

## Warn messages

```yaml
Messages:
  ChatMessage:
    - '&#7a271dToolNotifier &8&l» &cBe careful!'
    - '  &7Your &#1d7a25{0} &7is about to break (&#1d7a25{1}&7/{2})!'
  ActionBarMessage: '{0} &7is about to break (&#1d7a25{1}&7/{2})!'
  Title:
    MainMessage: '&#52C1CDCareful {3}% to break!'
    SubMessage: '&#7a271d{0} is about to break ({1}/{2})!'
  BossBarMessage: '&e⚠ {0} is about to break! ({1}/{2})'
```

`ChatMessage` is a list — one entry per line.

## Critical messages

```yaml
Messages:
  Critical:
    ChatMessage:
      - '&#7a271dToolNotifier &8&l» &4&lCRITICAL!'
      - '  &7Your &#ff0000{0} &7is about to BREAK (&#ff0000{1}&7/{2})!'
    ActionBarMessage: '&4&l{0} CRITICAL! ({1}/{2})'
    Title:
      MainMessage: '&4&l{0} BREAKING!'
      SubMessage: '&#ff0000{1}/{2} durability left!'
    BossBarMessage: '&4&l⚠ {0} about to break! ({1}/{2})'
```

The Critical set mirrors the Warn set and is used once an item passes its critical threshold.

## Sounds

```yaml
Sounds:
  Warn: ENTITY_CHICKEN_EGG/0.5/1.0
  Critical: ENTITY_ITEM_BREAK/1.0/1.0
```

Format `SOUND/volume/pitch`, any valid [Bukkit Sound](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Sound.html) name. (The old single `NotifySound` key is still read as a fallback for backward compatibility.) A malformed spec logs a console warning rather than erroring.
