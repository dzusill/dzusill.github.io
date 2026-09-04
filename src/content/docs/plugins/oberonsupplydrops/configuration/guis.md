---
title: "Menus"
description: "Two layout files, both restylable without a rebuild."
---

Two layout files, both restylable without a rebuild.

## gui/preview.yml

`/supplydrop preview` — one icon per tier, showing the real chance of that tier and everything it can
contain.

```yaml
rows: 3
title: "<#C21807>◆ <b><gradient:#C21807:#F11800>Supply Drops</gradient></b>"
filler:
  item: "BLACK_STAINED_GLASS_PANE"
  name: " "
slots: [ 11, 13, 15 ]
```

`slots` places the tier icons in order. A tier beyond the list spills into the next free slot rather
than being dropped silently, so adding a fourth tier still shows up before you get round to editing
the layout.

The icon's material is the tier's own `crate-material` — a legendary ender chest looks different from
a common chest without any extra configuration.

### Lore templates

| Key | Tokens |
|---|---|
| `tier.name` | `{tier}`, `{chance}`, `{rolls}` |
| `tier.lore-header` | the same |
| `tier.guaranteed-line` | `{amount}`, `{item}` |
| `tier.guaranteed-chance-line` | the same plus `{chance}` |
| `tier.pool-header` | `{rolls}` |
| `tier.pool-line` | `{amount}`, `{item}`, `{chance}` |
| `tier.lore-footer` | none |

Percentages are computed from `tiers.yml` at render time, so this menu cannot drift out of date with
the loot. Pool entries show their share of **one draw**, which is what the weights actually describe
and which sums to 100% across the pool.

## gui/top.yml

`/supplydrop top` — the claim leaderboard.

```yaml
rows: 6
title: "<#C21807>⚑ <b><gradient:#C21807:#F11800>Drop Leaderboard</gradient></b>"
entry:
  material: "PLAYER_HEAD"
  name: "<#C21807>#{rank} <white>{player}"
  lore:
    - "<#AAAAAA>Crates claimed: <#00F986>{claims}"
    - "<#AAAAAA>Items taken: <#00A3FB>{items}"
```

### Placement

| Key | Default | Meaning |
|---|---|---|
| `entry-slots` | every slot above the bottom row | Where the ranked rows go, in order |
| `self-slot` | middle of the bottom row | The viewer's own row; `-1` hides it |
| `empty-slot` | middle of the menu | Where the "nobody has claimed anything" item goes |

```yaml
entry-slots: [ 10, 11, 12, 13, 14, 15, 16, 19, 20, 21 ]
self-slot: 49
```

A slot outside the inventory is clamped rather than throwing, so a typo costs a misplaced icon and
not a menu that refuses to open.

`self.name-none` and `self.lore-none` are used instead of `self.name` / `self.lore` when the viewer
has never claimed a crate. `empty.item` / `empty.name` are shown when nobody has.

Heads are set to the ranked player, so the menu reads as a list of people rather than a table of
numbers.

## Both files

- `rows` is clamped to 1–6.
- `filler` is optional; leave it out for a bare inventory background.
- Titles and every name and lore line accept MiniMessage, legacy codes and bare hex.
