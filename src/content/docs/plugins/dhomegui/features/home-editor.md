---
title: "The Home Editor"
description: "Right-click a home in the menu to open its editor — a 45-slot bordered menu with one button per property. Buttons that have a current state (Default, Pin,…"
---

Right-click a home in the menu to open its editor — a 45-slot bordered menu with one button per property. Buttons that have a current state (Default, Pin, Visibility) show their active label/lore when toggled on.

## Buttons

| Button | Slot | What it does |
|---|---|---|
| **Teleport** | 10 | Teleport to the home. |
| **Rename** | 12 | Type a new name in chat (same [name rules](/plugins/dhomegui/features/setting-homes/)). |
| **Change Icon** | 14 | Set the icon to the item in your main hand. |
| **Edit Description** | 16 | Type a multi-line description in chat. |
| **Set Type** | 19 | Pick a cosmetic [type](#home-types). |
| **Set as Default** | 21 | Make this the home used by bare `/home`. |
| **Pin** | 23 | Pin it to the top of the list (also Shift-click in the menu). |
| **Visibility** | 30 | Toggle Private ↔ Whitelist — see [Visibility](/plugins/dhomegui/features/visibility/). |
| **Whitelist** | 32 | Manage allowed players (when whitelisted). |
| **Delete** | 34 | Delete the home (confirmation). |

Slots, icons, names and lore are all configurable under `GUI:` in [config.yml](/plugins/dhomegui/configuration/config/). Icon and description edits have short anti-spam cooldowns (`Settings.CooldownsInSeconds.EditIcon` / `EditDescription`, default 5s).

## Descriptions

Descriptions are multi-line. Limits live in `Settings.Description`:

- `MaxLines` (default 3)
- `MaxLineLength` (default 50)

The description shows in the home's lore; an empty one uses `Settings.Description.Default`.

## Home types

Types are cosmetic tags (with their own icon and coloured name) defined under `Settings.Types`:

```yaml
Settings:
  Types:
    base: { DisplayName: '<gradient:#2C99F8:#8CCAFF>Base</gradient>', Material: COBBLESTONE }
    farm: { DisplayName: '<#5BE585>Farm</#5BE585>', Material: WHEAT }
    mine: { DisplayName: '...', Material: IRON_PICKAXE }
    shop: { ... }
    other: { ... }
```

The chosen type appears in the home's lore and powers the **Filter by Category** button in the [menu](/plugins/dhomegui/features/homes-menu/). Add or rename types freely.

## Default & pinned

- The **default** home (★) is used by `/home` with no name. Each player has at most one.
- **Pinned** homes (✦) sort above the rest, so favourites stay at the top.
