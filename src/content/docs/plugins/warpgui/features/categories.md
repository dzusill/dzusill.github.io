---
title: "Categories"
description: "Categories group warps under admin-defined headings (PvP, Shops, Farms, …), each with its own icon and an optional view permission. Enable them with…"
---

Categories group warps under admin-defined headings (PvP, Shops, Farms, …), each with its own icon and an optional view permission. Enable them with `Settings.Categories.Enabled`.

## Defining categories

Categories live under the `Categories:` section of [config.yml](/plugins/warpgui/configuration/config/):

```yaml
Categories:
  pvp:
    DisplayName: '<red>PvP</red>'
    Material: DIAMOND_SWORD
    Permission: ''          # leave empty for "anyone can view"
    Slot: 11
    Lore:
      - ''
      - ' <gray>Click to view PvP warps</gray>'
  shops:
    DisplayName: '<gold>Shops</gold>'
    Material: EMERALD
    Permission: ''
    Slot: 13
    Lore: [' <gray>Click to view shop warps</gray>']
```

| Key | Description |
|---|---|
| *(id)* | The category id (`pvp`) — used in commands and on warps. Lower-case. |
| `DisplayName` | MiniMessage title shown in the menu. |
| `Material` | Icon item. |
| `Permission` | If set, only players with this permission see/enter the category. Empty = public. |
| `Slot` | Fixed slot (0–53) in the category list menu. |
| `Lore` | MiniMessage lore lines. |

## Assigning a warp to a category

Three ways:

1. **At creation** — `/setwarp <name> <category>`.
2. **Admin command** — `/warpadmin category <warp> <category|none>` (needs `warpgui.category`).
3. **Edit menu** — the **Choose Category** button (needs `warpgui.edit.category`).

Use `none` to remove a warp from its category. A warp belongs to **at most one** category.

> Assigning an unknown category id gives *"Unknown category `<id>`."* — the id must match a key under `Categories:`.
