---
title: "Commands & Permissions"
description: "Commands are registered at runtime, so there is no commands: block in plugin.yml to keep in sync and"
---

Commands are registered at runtime, so there is no `commands:` block in `plugin.yml` to keep in sync and
no conflict with another plugin's `/sell` unless it also registers at runtime.

## Player commands

| Command | Aliases | Permission | Does |
|---|---|---|---|
| `/worth` | `/itemworth` | `ddonutworth.worth` | What the held item is worth |
| `/worth <material>` | | `ddonutworth.worth` | Look up any material |
| `/worth gui` | `list`, `prices` | `ddonutworth.gui` | The paginated price list |
| `/sell` | | `ddonutworth.sell` | Sell the held stack |
| `/sell hand` | | `ddonutworth.sell` | The same, explicitly |
| `/sell all` | `inventory`, `everything` | `ddonutworth.sell` | Sell your whole inventory |
| `/sellall` | | `ddonutworth.sell` | Shorthand for the above |
| `/sellgui` | `/sellmenu` | `ddonutworth.sellgui` | Drop-items-in-here menu |
| `/sellhistory [player]` | `/worthhistory` | `ddonutworth.history` | What you have sold |
| `/sellmultipliers` | `multipliers`, `sellmulti` | `ddonutworth.multipliers` | Multiplier progress pages |
| `/toggleworth` | `/worthtoggle` | `ddonutworth.toggleworth` | Turn your worth lore on or off |

`/sellhistory <player>` for someone else needs `ddonutworth.history.others`.

`/worth` on a stack of more than one also reports what the whole stack is worth.

## Admin commands

| Command | Permission | Does |
|---|---|---|
| `/setworth <price>` | `ddonutworth.setworth` | Price the held item |
| `/setworth <key> <price>` | `ddonutworth.setworth` | Price a key; tab-completes existing keys |
| `/delworth` | `ddonutworth.setworth` | Remove the price for the held item |
| `/delworth <key>` | `ddonutworth.setworth` | Remove one entry |
| `/sellaxe give <player> <duration>` | `ddonutworth.sellaxe` | Hand out a sell axe |
| `/ddonutworth reload` | `ddonutworth.admin` | Reload configs, drop cached prices |
| `/ddonutworth cleanup [radius]` | `ddonutworth.admin` | Strip leftover worth lore nearby |

`/ddonutworth` also answers to `/donutworth` and `/dworth`.

### /setworth

Two shapes. With one argument it prices the item in your hand — the useful form, and the one that works on
custom items. With two, the first is a price key:

```
/setworth 500
/setworth POTATO 500
/setworth "mmoitems:SWORD/CUTLASS" 12000
```

### /delworth

```
/delworth              the item in your hand
/delworth POTATO       by key
```

Tab completion lists the keys that actually exist — which is the point of readable keys.

### /ddonutworth cleanup

```
/ddonutworth cleanup           8 blocks
/ddonutworth cleanup 20        20 blocks (max 32)
```

The backstop for a crash while a container was open. See [Worth Lore](/plugins/ddonutworth/features/worth-lore/).

## Permissions

| Node | Default | Grants |
|---|---|---|
| `ddonutworth.use` | everyone | Basic use |
| `ddonutworth.worth` | everyone | `/worth` |
| `ddonutworth.gui` | everyone | The prices GUI |
| `ddonutworth.sell` | everyone | `/sell`, `/sellall` |
| `ddonutworth.sellgui` | everyone | `/sellgui` |
| `ddonutworth.history` | everyone | Own sell history |
| `ddonutworth.history.others` | op | Anyone's sell history |
| `ddonutworth.multipliers` | everyone | Multiplier pages |
| `ddonutworth.toggleworth` | everyone | `/toggleworth` |
| `ddonutworth.setworth` | op | `/setworth`, `/delworth` |
| `ddonutworth.sellaxe` | op | `/sellaxe` |
| `ddonutworth.admin` | op | `/ddonutworth` |

### The multiplier node

```
ddonutworth.multiplier.1.5
ddonutworth.multiplier.2
```

A flat sell multiplier. The highest node a player has wins, capped by `multipliers.permission-cap`
(default `10.0`). A non-numeric node is ignored.

Typical LuckPerms setup:

```
/lp group vip permission set ddonutworth.multiplier.1.25 true
/lp group mvp permission set ddonutworth.multiplier.1.5 true
```

See [Sell Multipliers](/plugins/ddonutworth/features/sell-multipliers/).
