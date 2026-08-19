---
title: "Server Warps"
description: "An optional, staff-managed tab for the server's own destinations — spawn, shops, the arena — kept apart from"
---

An optional, staff-managed tab for the server's own destinations — spawn, shops, the arena — kept apart from
player-created warps.

Off by default:

```yaml
Settings:
  ServerWarps:
    Enabled: true
    OnlyInOwnMenu: true
```

Turning it on adds a **Server Warps** tab to the bottom navigation bar of every warp menu and enables the two commands
below.

## Creating them

| Command | Permission | What it does |
|---|---|---|
| `/setserverwarp <name>` (alias `/setswarp`) | `warpgui.serverwarp` | Creates a server warp at your location. From console: `/setserverwarp <name> <World,X,Y,Z,Yaw,Pitch>`. |
| `/warpadmin setserver <warp>` | `warpgui.serverwarp` | Turns an existing warp into a server warp, or hands it back. |

Players without the permission cannot create one — an ordinary `/setwarp` always makes a normal player warp.

A server warp behaves like any other warp once created: everyone can browse and teleport to it (subject to the usual
[access level](/plugins/warpgui/features/warp-menu/) and `warpgui.teleport.<warp>` rules), it can have a description, an icon, a
category and a cost.

Two things are deliberately different:

- **It does not count against anyone's warp limit.** `/setserverwarp` skips the `warpgui.setwarp.max.<n>` check, and
  the warp does not appear in the creator's **My Warps**.
- **It skips the name blacklist and length limits**, which exist to police player warp names.

The creator is still recorded as the owner, so they can open the edit menu for it.

## Deleting them

Deleting a server warp needs its own permission, **`warpgui.serverwarp.delete`**.

`warpgui.delwarp.others` is the permission you hand to moderators so they can clean up player warps — it deliberately
does **not** reach server warps, so nobody accidentally removes `spawn`. Ownership does not help either: even the
staff member who created the warp needs `warpgui.serverwarp.delete` to remove it.

This applies to both routes:

- `/delwarp <name>` replies *"This is an official server warp — you cannot delete it."*
- the **Delete Warp** button in the edit menu is not shown at all.

Ordinary player warps are unaffected — owner, or `warpgui.delwarp.others`, exactly as before.

> Editing a server warp (icon, description, category, cost) still follows the normal rules: the owner, or anyone with
> `warpgui.edit.others`.

## Where they show up

`OnlyInOwnMenu` decides how separate they are:

| Value | Effect |
|---|---|
| `true` *(default)* | Server warps appear **only** in the Server Warps tab — not in All Warps, Trending, Recommended, Favourites, Recent, categories or search. |
| `false` | They also appear in the normal lists, like any other warp. |

Turning the whole feature off never hides a warp: flagged warps simply go back to showing in the normal lists.

## Opening it by default

`/warp` and `/warps` can open straight into this tab:

```yaml
Settings:
  DefaultMenu: server
```

See [config.yml](/plugins/warpgui/configuration/config/) for every accepted value.

## Appearance

The tab and its title are configurable like any other menu:

```yaml
GUI:
  ServerWarpsDisplayName: '<blue>Server Warps</blue> <dark_gray>- Page: {0}/{1}</dark_gray>'
  ServerWarps:
    displayName: '<blue>Server Warps</blue>'
    Material: BEACON        # or oraxen:<id>
    Slot: -1                # -1 = auto-fill a free bottom-row slot
    lore:
      - ''
      - '<gray>Click to view the official server warps</gray>'
```

## Storage

The flag is stored per warp: `ServerWarp: true` in `data.yml`, or the `server_warp` column in MySQL/PostgreSQL.
Existing database tables gain that column automatically on startup — see
[Storage & Database](/plugins/warpgui/configuration/storage/).
