---
title: "config.yml"
description: "The settings file at plugins/WarpGUI/config.yml. Display strings are MiniMessage. Three top-level sections: Settings, Categories and GUI."
---

The settings file at `plugins/WarpGUI/config.yml`. Display strings are [MiniMessage](https://docs.advntr.dev/minimessage/format.html). Three top-level sections: `Settings`, `Categories` and `GUI`.

---

## Settings

### Materials & colours

`Settings.Materials` maps the menu's structural icons (default warp icon, filler glass, navigation arrows, etc.) to materials. `Settings.DisplayNameColor` is the MiniMessage colour applied to warp names.

### Topped (Recommended)

```yaml
Settings:
  Topped:
    Enabled: true
    ToppedDays: 30
    UsePrice: true
    Price: 10000
    UseConsoleCommands: false
    ConsoleCommands: ['say {0} promoted {2} ...']
```

Paid promotion. Full reference in [Recommended Warps](/plugins/warpgui/features/recommended-warps/).

### SetWarp rules

```yaml
Settings:
  DescriptionMaxLength: 30
  SetWarp:
    MinLength: 2
    MaxLength: 16
    Blacklist: [reload, search, admin, set, del, ...]
```

| Key | Default | Description |
|---|---|---|
| `DescriptionMaxLength` | `30` | Max characters for a warp description. |
| `SetWarp.MinLength` / `MaxLength` | `2` / `16` | Allowed warp-name length. |
| `SetWarp.Blacklist` | see file | Warp names that are rejected. |

See [Creating Warps](/plugins/warpgui/features/creating-warps/).

### Cooldowns

```yaml
Settings:
  CooldownsInSeconds:
    EditItem: 30
    EditDescription: 30
    SetTopped: 5
```

Per-action cooldowns to stop spam.

### Teleport

```yaml
Settings:
  Teleport:
    WarmupSeconds: 3
    CancelOnMove: true
    Particle: PORTAL
```

The teleport warmup — see [Teleporting](/plugins/warpgui/features/teleporting/).

### Feature toggles

```yaml
Settings:
  Trending: { Enabled: true, DecayFactor: 0.9, DecayMinutes: 1440 }
  Favorites: { Enabled: true }
  Ratings: { Enabled: true }
  Categories: { Enabled: true }
  Search: { Enabled: true }
  DescriptionEditing: { Enabled: true }
  DefaultMenu: all
```

| Key | Default | Description |
|---|---|---|
| `Trending` | enabled | Visit-decay popularity — see [Trending](/plugins/warpgui/features/trending/). |
| `Favorites` / `Ratings` | enabled | Per-player [favourites & ratings](/plugins/warpgui/features/favorites-and-ratings/). |
| `Categories` | enabled | [Category](/plugins/warpgui/features/categories/) system. |
| `Search` | enabled | [Search](/plugins/warpgui/features/search/). |
| `DescriptionEditing` | enabled | Allow editing descriptions. |
| `DefaultMenu` | `all` | Landing tab: `all` or `categories`. |

---

## Categories

Admin-defined warp categories. Each entry has a `DisplayName`, `Material`, optional `Permission`, `Slot` and `Lore`. Full reference in [Categories](/plugins/warpgui/features/categories/).

---

## GUI

Layout, titles, icons, names and lore for every menu and button — the warp tabs (Globe, Chest, Topped, Favorites, Trending, Categories, Search), pagination, the edit-menu buttons (ChangeItem, EditDescription, Rate, CategorySelect, ToggleHidden, TogglePermission, SetTopped, DeleteWarp), the info panel and the filler border.

```yaml
GUI:
  Filler:
    Enabled: true
    Material: GRAY_STAINED_GLASS_PANE
    Border: true     # true = edge border only; false = fill every empty slot
  AllWarpsDisplayName: '<blue>Player Warps</blue> <dark_gray>- Page: {0}/{1}</dark_gray>'
  # ... one block per tab/button
```

Positional placeholders like `{0}/{1}` are page numbers; `{2}` is usually the category/warp/query name. Every string is MiniMessage. Tab buttons with `Slot: -1` auto-fill the free bottom-row slots in order.
