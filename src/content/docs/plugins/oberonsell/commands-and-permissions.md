---
title: "Commands & Permissions"
description: "Commands are registered at runtime through OberonCore, so there is no commands: block in plugin.yml to"
---

Commands are registered at runtime through OberonCore, so there is no `commands:` block in `plugin.yml` to
keep in sync and no conflict with another plugin's `/sell` unless it also registers at runtime.

## Player commands

| Command | Aliases | Permission | Does |
|---|---|---|---|
| `/worth` | `/itemworth` | `oberonsell.gui` | The paginated price list |
| `/worth hand` | `item` | `oberonsell.worth` | What the held item is worth |
| `/worth <material>` | | `oberonsell.worth` | Look up any material |
| `/worth gui` | `list`, `prices` | `oberonsell.gui` | The price list, spelled out |
| `/sell` | | `oberonsell.sell` | Open the drop-items-in-here menu |
| `/sell hand` | | `oberonsell.sell` | Sell the held stack |
| `/sell all` | `inventory`, `everything` | `oberonsell.sell` | Sell your whole inventory |
| `/sell auto` | `autosell` | `oberonsell.autosell` | Toggle selling items as you pick them up |
| `/sellall` | | `oberonsell.sell` | Shorthand for `/sell all` |
| `/sellgui` | `/sellmenu` | `oberonsell.sellgui` | Drop-items-in-here menu |
| `/sellhistory [player]` | `/worthhistory` | `oberonsell.history` | What you have sold |
| `/selltop [money\|items] [page]` | `/sellleaderboard` | `oberonsell.selltop` | The all-time sell leaderboard |
| `/sellmultipliers` | `multipliers`, `sellmulti` | `oberonsell.multipliers` | Multiplier progress pages |
| `/toggleworth` | `/worthtoggle` | `oberonsell.toggleworth` | Turn your worth lore on or off |

`/sellhistory <player>` for someone else needs `oberonsell.history.others`.

`/worth hand` on a stack of more than one also reports what the whole stack is worth.

Every one of these is player-only except `/setworth` and `/delworth` with an explicit key.

> **There is no top-level `/autosell` command.** The toggle is `/sell auto` (or `/sell autosell`).

## Admin commands

| Command | Permission | Does |
|---|---|---|
| `/setworth <price>` | `oberonsell.setworth` | Price the held item |
| `/setworth <key> <price>` | `oberonsell.setworth` | Price a key; tab-completes existing keys |
| `/delworth` | `oberonsell.setworth` | Remove your override for the held item |
| `/delworth <key>` | `oberonsell.setworth` | Remove one `items` entry |
| `/sellaxe give <player> <duration>` | `oberonsell.sellaxe` | Hand out a sell axe |
| `/oberonsell reload` | `oberonsell.admin` | Reload configs and repaint open menus |
| `/oberonsell cleanup [radius]` | `oberonsell.admin` | Strip leftover worth lore nearby |
| `/oberonsell doctor` | `oberonsell.admin` | Config, hooks, storage and price-table health |
| `/oberonsell migrate <prices\|playerdata>` | `oberonsell.admin` | Move data between backends |
| `/oberonsell resetmultiplier <player> [category\|all]` | `oberonsell.admin` | Reset a sell ladder, banking what was earned |
| `/oberonsell resethistory <player>` | `oberonsell.admin` | Clear a player's sell history. Online or offline |

`/oberonsell` also answers to `/ow` and `/worthadmin`. `/delworth` also answers to `/removeworth`.

### /setworth

Two shapes. With one argument it prices the item in your hand — the useful form, and the one that works on
custom items. With two, the first is a price key:

```
/setworth 500
/setworth POTATO 500
/setworth "mmoitems:SWORD/CUTLASS" 12000
```

Either shape writes into the `items` section, which always wins over the shipped tables. A negative price
is refused.

**`/setworth <key> 0` is how you make a shipped price unsellable** — see
[prices.yml](/plugins/oberonsell/configuration/prices/#making-a-migrated-price-unsellable).

### /delworth

```
/delworth              the item in your hand
/delworth POTATO       by key
```

Tab completion lists the keys that actually exist — which is the point of readable keys.

It only removes entries from your own `items` section. A key that is priced only by the shipped
`prices.by-material` or `prices.by-serialized` table cannot be deleted, and the command says so rather than
reporting a removal that the next upgrade would undo:

```
[ᴡᴏʀᴛʜ] DIAMOND has no price of its own to remove.
```

### /oberonsell cleanup

```
/oberonsell cleanup           8 blocks
/oberonsell cleanup 20        20 blocks (max 32)
```

The backstop for a crash while a container was open. See [Worth Lore](/plugins/oberonsell/features/worth-lore/).

### /oberonsell resetmultiplier

```
/oberonsell resetmultiplier <player>            every category they have touched
/oberonsell resetmultiplier <player> ores       just that category
/oberonsell resetmultiplier <player> all        the same as omitting it
```

Works on an offline player. Refused outright when `multipliers.reset.enabled: false`. See
[Sell Multipliers](/plugins/oberonsell/features/sell-multipliers/#resetting-a-players-ladder).

### /oberonsell resethistory

```
/oberonsell resethistory <player>
/oberonsell clearhistory <player>     the same command
```

Empties one player's [`/sellhistory`](/plugins/oberonsell/features/sell-history/). Works on an offline player — the record is
loaded, cleared and written back whether or not they are connected.

**History only.** Lifetime totals behind `/selltop` and the multiplier ladders are untouched; they live in
the same record but are a different feature, and clearing a transaction log is not the same as taking away
what someone earned. Use `/oberonsell resetmultiplier` for the ladder.

A player with nothing to clear is reported as such rather than answered with a success message, so a
mistyped name is visible.

### /oberonsell doctor

Reports, in one place:

- config settings whose effective value differs from what is written in the file
- which hooks answered — Vault is reported by whether a provider actually replied, not by whether the
  plugin is present
- the storage backend, with a live connectivity probe run off the server thread
- leaderboard state and how old the snapshot is
- the price-table audit: table sizes, items that are **explicitly unsellable** (a configured `0`), keys
  this Minecraft version does not know, and keys naming a block with no item form

"Explicitly unsellable" and "no price configured" are listed separately. They look alike in a config and
mean opposite things.

### /oberonsell migrate

```
/oberonsell migrate prices        adopt both shipped price tables into your own items section
/oberonsell migrate playerdata    move player records into whichever backend is live
```

`migrate prices` is idempotent and never overwrites an override you already set. `migrate playerdata` works
in either direction, so switching `storage.type` is reversible.

## Permissions

One node per feature, so a rank can carry individual features.

| Node | Default | Grants |
|---|---|---|
| `oberonsell.worth` | everyone | `/worth`, `/worth hand`, `/worth <material>` |
| `oberonsell.gui` | everyone | The prices GUI |
| `oberonsell.sell` | everyone | `/sell`, `/sell hand` |
| **`oberonsell.sellall`** | **nobody** | `/sellall` and `/sell all` |
| `oberonsell.sellgui` | everyone | `/sellgui` |
| `oberonsell.history` | everyone | Own sell history |
| `oberonsell.history.others` | op | Anyone's sell history |
| `oberonsell.selltop` | everyone | `/selltop` |
| `oberonsell.multipliers` | everyone | Multiplier pages |
| `oberonsell.toggleworth` | everyone | `/toggleworth` |
| **`oberonsell.autosell`** | **nobody** | `/sell auto`, and being auto-sold for |
| **`oberonsell.sellaxe.use`** | **nobody** | Swinging a sell axe at a container |
| `oberonsell.setworth` | op | `/setworth`, `/delworth` |
| `oberonsell.sellaxe` | op | `/sellaxe` — handing axes out |
| `oberonsell.admin` | op | `/oberonsell` and its subcommands |
| `oberonsell.admin.reset` | op | `resethistory`, `resetmultiplier` |
| `oberonsell.*` | op | All of the above |

`oberonsell.autosell` is checked on every pickup as well as on the toggle, so revoking it stops an
already-opted-in player from being auto-sold for.

### Rank perks

The three nodes in bold ship **off**. They are the ones servers hand out to a rank:

```bash
lp group donator permission set oberonsell.sellall true
lp group donator permission set oberonsell.autosell true
lp group donator permission set oberonsell.sellaxe.use true
```

To give them to everyone instead — which is how the plugin behaved before 1.1 — point the same three
lines at `default`:

```bash
lp group default permission set oberonsell.sellall true
lp group default permission set oberonsell.autosell true
lp group default permission set oberonsell.sellaxe.use true
```

Nothing else changed default, so no rank loses anything it already had.

### Two pairs that look like one node

**`oberonsell.sell` and `oberonsell.sellall`.** Selling the item in your hand and emptying a whole
inventory in one keystroke are separate privileges. They shared a node until 1.1, which made Sell All
impossible to sell as a perk — granting it granted plain selling with it.

`oberonsell.sellall` covers **both spellings**, `/sellall` and `/sell all`. The node describes the
feature, not the command; gating only one of two words for the same action is not a gate.

**`oberonsell.sellaxe` and `oberonsell.sellaxe.use`.** The first is who may *hand out* axes; the second
is who may *swing* one. Both are needed, because an axe is an item: gating only the command leaves the
axe working for whoever it is dropped, traded or stored for. A player without the second node gets a
refusal message rather than an axe that silently does nothing.

### The multiplier node

```
oberonsell.multiplier.1.5
oberonsell.multiplier.2
```

A flat sell multiplier. The highest node a player has wins, capped by `multipliers.permission-cap`
(default `10.0`). A non-numeric node — a wildcard, say — is ignored.

Typical LuckPerms setup:

```
lp group vip permission set oberonsell.multiplier.1.25 true
lp group mvp permission set oberonsell.multiplier.1.5 true

# admins
lp group admin permission set oberonsell.admin true
lp group admin permission set oberonsell.setworth true
lp group admin permission set oberonsell.sellaxe true
```

See [Sell Multipliers](/plugins/oberonsell/features/sell-multipliers/).
