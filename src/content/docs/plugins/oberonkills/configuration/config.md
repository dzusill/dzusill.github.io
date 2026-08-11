---
title: "config.yml"
description: "The death messages, item name mode and rank prefixes — the whole plugin, in one file."
---

`plugins/OberonKills/config.yml`. Reload with `/oberonkills reload`. **Nothing here needs a restart.**

The death messages live here rather than in `messages.yml` because they are the thing you will actually spend time
on, and they belong next to the settings that shape them.

## Top level

```yaml
Enabled: true
Debug: false
Keep-Vanilla-When-Unconfigured: true
```

| Key | Default | Does |
|---|---|---|
| `Enabled` | `true` | Rewrite death messages at all. `false` leaves every one vanilla. |
| `Debug` | `false` | Extra console logging. |
| `Keep-Vanilla-When-Unconfigured` | `true` | What happens to a death with no message and no `default` — keep the vanilla line, or say nothing. |

## Combat

```yaml
Combat:
  Remember-Hits-Seconds: 10
  Measure-Distance-At-Death: true
```

| Key | Default | Does |
|---|---|---|
| `Remember-Hits-Seconds` | `10` | How long a recorded blow can still be blamed for a death. Raise it if players regularly die of burning or falling well after the shot that started it. |
| `Measure-Distance-At-Death` | `true` | When a ranged kill's shot was never recorded, measure killer-to-victim at the moment of death instead of leaving `<distance>` blank. |

`Measure-Distance-At-Death` is the answer to a bow message reading *"from  blocks away"*. That happens when no
projectile was ever seen — usually because a custom-item or custom-enchant plugin cancelled the arrow's damage and
applied its own. Details on [Weapons & causes](/plugins/oberonkills/features/weapons/#distance).

## Item-Names

```yaml
Item-Names:
  Mode: TRANSLATE
  Hover: true
  Strip-Styling: true
```

| Key | Default | Does |
|---|---|---|
| `Mode` | `TRANSLATE` | `TRANSLATE` sends the item's translation key so each client renders its own language. `PRETTY` title-cases the material name here. |
| `Hover` | `true` | Attach the item's own hover — enchantments, durability, lore. |
| `Strip-Styling` | `true` | Drop colour the item name carries of its own, so `<item>` takes the colour of the message. Off, an enchanted weapon arrives blue whatever the message says. |

A custom anvil name beats both modes. Full explanation on [Item names](/plugins/oberonkills/features/item-names/).

## Mob-Names

```yaml
Mob-Names:
  Mode: TRANSLATE
  Strip-Styling: true
```

The same two settings, for the mob that killed somebody. Without this the message shows the config key —
`cave-spider` — which is not a name anyone wants broadcast. A name tag wins, exactly as a custom item name does.

## Messages

The main section, and the reason the file exists.

```yaml
Messages:
  Pvp:
    sword:
      - "<#C21807><victim></#C21807> <gray>was slain by</gray> <#C21807><killer></#C21807>"
      - "<#C21807><victim></#C21807> <gray>fell to</gray> <#C21807><killer></#C21807><gray>'s</gray> <item>"
    bow:
      - "…<distance>…"
    mace-smash:
      - "…"
    default:
      - "…"
  Mob:
    creeper: [ … ]
    default: [ … ]
  Environment:
    fall: [ … ]
    default: [ … ]
```

Every key, every tag and the fallback behaviour are on
[Writing messages](/plugins/oberonkills/features/message-sets/); the full key list is on
[Weapons & causes](/plugins/oberonkills/features/weapons/).

> `Messages` is never merged back from the defaults. A message you delete stays deleted.

## Ranks

Optional, empty by default. Two ways to fill it in.

**From your permissions plugin** — one line, and LuckPerms stays the only place a rank is defined:

```yaml
Ranks: []
Default-Rank: "%luckperms_prefix%"
```

Needs PlaceholderAPI and `/papi ecloud download LuckPerms`. Legacy colour codes in the prefix (`&c[Admin]`) are
converted, so it looks the same as it does in chat.

**Or a ladder here**, when the death message should be styled differently from chat:

```yaml
Ranks:
  - Permission: "group.admin"
    Display: "<red>[Admin]</red>"

Default-Rank: ""
```

**Highest rank first** — first match wins, and an owner usually inherits every lower group. See
[Rank prefixes](/plugins/oberonkills/features/ranks/).

> `Ranks` is never merged back from the defaults either.

## Checking a change

```
/oberonkills reload
/oberonkills status
/oberonkills preview pvp mace-smash
```

`status` reports how many message keys loaded. A number lower than you expect means an entry is empty or malformed
and was skipped.
