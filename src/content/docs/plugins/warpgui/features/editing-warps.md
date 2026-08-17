---
title: "Editing Warps"
description: "Right-click a warp in My Warps to open its edit menu. Each button is permission-gated, so players only see the actions they're allowed to use. Opening the…"
---

Right-click a warp in **My Warps** to open its edit menu. Each button is permission-gated, so players only see the actions they're allowed to use. Opening the menu needs `warpgui.edit`; editing **someone else's** warp needs `warpgui.edit.others`.

## Edit buttons

| Button | What it does | Permission |
|---|---|---|
| **Change Icon** | Sets the warp's icon to the item in your main hand. | `warpgui.edit.material` |
| **Edit Description** | Prompts you to type a new description in chat (max length `Settings.DescriptionMaxLength`, default 30). | `warpgui.edit.description` |
| **Choose Category** | Opens a category picker. | `warpgui.edit.category` |
| **Rate** | Opens the 1–5 star [rating](/plugins/warpgui/features/favorites-and-ratings/) menu. | — |
| **Toggle Hidden** | Hide the warp from others (still yours). | `warpgui.sethidden` |
| **Toggle Permission** | Lock teleporting behind a permission. | `warpgui.setpermissions` |
| **Recommend My Warp** | Promote the warp ([paid](/plugins/warpgui/features/recommended-warps/)). | `warpgui.edit.top` |
| **Delete Warp** | Double-click to permanently delete. | `warpgui.delwarp` |

Slots, icons, names and lore for every button are configurable under `GUI:` in [config.yml](/plugins/warpgui/configuration/config/).

## Warp icons

**Change Icon** stores the *whole* held item, not just its type — a `/give` item keeps its custom model data, a textured `PLAYER_HEAD` keeps its skin, and enchantments, potion colour, trims and any other component survive into the menus. The **Change Icon** button itself previews the real icon.

- Set `Settings.Icons.PreserveCustomItems: false` to keep only the material name (pre-2.5.0 behaviour).
- Items whose stored form exceeds 8 KB (a filled shulker box, a long written book) fall back to the plain material, with a console warning.
- The material name is always stored too — it feeds `%warpgui_<warp>_material%` and is the fallback if the stored item can't be read back.
- An icon whose material has no item form (`FIRE`, `WATER`, `POTTED_CACTUS`, …) is rejected and the default icon is used; see [config.yml](/plugins/warpgui/configuration/config/).
- An [Oraxen](/plugins/warpgui/compatibility/oraxen/) item is stored by id instead, so the icon follows the item's definition across resource-pack updates.
- `/warpadmin seticon <warp> <material|oraxen:id>` sets an icon by name, from console too.

## Hidden warps

A hidden warp doesn't appear in the public All Warps / Trending lists, but the owner still sees it in My Warps and can teleport to it. Toggle with the **Hidden** button or:

```
/warpadmin sethidden <warp>
```

## Permission-locked warps

Toggling **Permission** on a warp means only players with `warpgui.teleport.<warpname>` (or the wildcard `warpgui.teleport.*`) can teleport to it. See [Teleporting](/plugins/warpgui/features/teleporting/). Toggle with the button or:

```
/warpadmin setpermission <warp>
```

## Editing cooldowns

To stop spam, icon and description edits have a per-action cooldown (`Settings.CooldownsInSeconds.EditItem` / `EditDescription`, default 30s each). Promotion has its own short cooldown (`SetTopped`, default 5s).
