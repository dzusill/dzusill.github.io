---
title: "profiles.yml"
description: "One entry under profiles: per group of kit worlds. A profile sets its worlds and kits, and any key"
---

One entry under `profiles:` per group of kit worlds. A profile sets its `worlds` and `kits`, and any key
from `defaults` in [config.yml](/plugins/oberonkits/configuration/config/) it wants different. Keys it leaves out keep the default, including
sibling keys: overriding `choose.timeout` keeps the default `choose.timeout-action`.

The plugin never merges keys into this file. The [admin GUI](/plugins/oberonkits/features/admin-gui/) writes it, one key
per change, keeping comments above keys.

## worlds

A list of world names; `*` is a wildcard (`"ffa_*"`). See [Worlds](/plugins/oberonkits/features/kit-worlds/#worlds).

## mode

`choose` — the [kit menu](/plugins/oberonkits/features/kit-menu/). `random` — a weighted random kit, no menu.

## kits

```yaml
kits:
  - kit: ffa1                     # name in Essentials kits.yml (required)
    display-name: "<white>FFA 1"  # MiniMessage; defaults to the kit name
    icon: kit-first-item          # a MATERIAL, or kit-first-item (the default)
    lore: []                      # extra menu lines
    slot: 11                      # menu slot; leave out for automatic
    weight: 1                     # chance in random picks
    permission: ""                # needed to use it; "" = everyone
    price: 0                      # > 0 makes it a Stardust kit
    currency: stardust            # from config.yml economy.currencies
    uses: 1                       # lives per purchase
    console-commands: []          # run after this kit is given (%player%, %kit%)
```

A kit that does not exist in Essentials, a kit listed twice, or a paid kit with a currency that is not set
up is skipped with a console warning.

## triggers

`enter`, `respawn` and `join`, each with `enabled` and `delay-ticks`. See
[Triggers](/plugins/oberonkits/features/kit-worlds/#triggers).

## on-return

`keep` — a player who comes back with items keeps them. `new-kit` — every entry resets and gives a kit.

## conditions

| Key | Meaning |
|---|---|
| `gamemodes` | Only players in these game modes get kits |
| `permission` | Only players with it; `""` = everyone |
| `from-worlds` | Only when entering from one of these worlds; `[]` = from anywhere |
| `except-from-worlds` | Never when entering from one of these worlds |

## reset

What is cleared or refilled right before a kit: `inventory`, `effects`, `health`, `food`, `fire`,
`fall-distance`, `xp` (all `true`/`false`), and `set-gamemode` (`SURVIVAL`, `ADVENTURE`..., `""` =
unchanged).

## after-give

| Key | Meaning |
|---|---|
| `effects` | `TYPE:LEVEL:DURATION`, level from 0, e.g. `"SPEED:0:30s"` |
| `console-commands` | Run as console. `%player%`, `%kit%`, `%profile%`, `%world%` |
| `player-commands` | Run as the player |
| `message` | `messages.yml` key, `""` = none |

## choose

| Key | Default | Meaning |
|---|---|---|
| `open-on` | `[enter, respawn, join]` | Triggers that open the menu |
| `remember-last` | `true` | Remember the last kit per player |
| `skip-if-remembered` | `false` | Give the remembered kit without the menu |
| `timeout` | `15s` | Time to pick; `0s` = no limit |
| `timeout-action` | `last` | `last`, `random`, `first` or `none` |
| `close-action` | `reopen` | `reopen`, `timeout-action` or `none` |
| `invulnerable-while-choosing` | `true` | No damage while the menu is open |
| `allow-change` | `on-respawn` | `anytime`, `on-respawn` or `never` |
| `change-cooldown` | `0s` | Wait between changes with `allow-change: anytime` |

See [The kit menu](/plugins/oberonkits/features/kit-menu/).

## random

| Key | Default | Meaning |
|---|---|---|
| `include-paid` | `false` | Random picks may roll a Stardust kit (spends a use) |
| `avoid-repeat` | `false` | Never the same kit twice in a row |

## kit-items

`prevent-drop` — no dropping items in this world.

## death

See [Deaths and killer XP](/plugins/oberonkits/features/deaths/).

## regen

See [Arena regen](/plugins/oberonkits/features/arena-regen/).

## The shipped FFA profile

```yaml
profiles:
  ffa:
    worlds: [ffa]
    mode: choose
    on-return: keep
    kits:
      - { kit: ffa1, display-name: "<white>FFA 1", icon: kit-first-item, slot: 11, weight: 1 }
      - { kit: ffa2, display-name: "<white>FFA 2", icon: kit-first-item, slot: 12, weight: 1 }
      - { kit: ffa3, display-name: "<white>FFA 3", icon: kit-first-item, slot: 13, weight: 1 }
      - { kit: ffa4, display-name: "<white>FFA 4", icon: kit-first-item, slot: 14, weight: 1 }
      - { kit: ffa5, display-name: "<white>FFA 5", icon: kit-first-item, slot: 15, weight: 1 }
    choose:
      timeout: 15s
      timeout-action: last
    kit-items:
      prevent-drop: true
    regen:
      enabled: false
      every: 30m
      commands:
        - "sduels arena regen ffa"
    death:
      drop-items: false
      drop-xp: false
      killer-xp:
        enabled: true
        type: bottles
        amount: 10-15
```
