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
