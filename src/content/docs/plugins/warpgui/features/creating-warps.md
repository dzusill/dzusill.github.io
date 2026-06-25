---
title: "Creating & Deleting Warps"
description: "Creates a warp at your current location. Requires warpgui.setwarp. The optional [category] must be an existing category id (or none)."
---

## Creating a warp

```
/setwarp <name> [category]
```

Creates a warp at your current location. Requires `warpgui.setwarp`. The optional `[category]` must be an existing category id (or `none`).

A name is validated against several rules before the warp is created:

| Rule | Default | Config |
|---|---|---|
| Minimum length | 2 | `Settings.SetWarp.MinLength` |
| Maximum length | 16 | `Settings.SetWarp.MaxLength` |
| Allowed characters | letters, digits, `_` and spaces | fixed |
| Blacklisted names | `reload`, `search`, `admin`, `set`, … | `Settings.SetWarp.Blacklist` |

If a warp with that name already exists, you need `warpgui.setwarp.overwrite` to replace it — otherwise you get *"This warp already exists."*

### Console

From console, pass an explicit location instead of a category:

```
/setwarp <name> <World,X,Y,Z,Yaw,Pitch>
```

## Warp limits

This is the important part: **warp limits are permission-based**, not a single config number.

- A player's limit is the **highest** `warpgui.setwarp.max.<n>` permission they have.
- With **no** `warpgui.setwarp.max.*` permission, the limit is **0** — they can't create any warp.
- `warpgui.setwarp.unlimited` bypasses the limit entirely.

```
# let default players keep up to 5 warps
/lp group default permission set warpgui.setwarp.max.5 true

# VIPs get 15
/lp group vip permission set warpgui.setwarp.max.15 true

# staff: no cap
/lp group staff permission set warpgui.setwarp.unlimited true
```

Hitting the cap shows *"You cannot create more than `<n>` warps."*

## Deleting a warp

```
/delwarp <name>
```

Deletes a warp. Requires `warpgui.delwarp`. Ownership is checked by **UUID** (so renaming a player doesn't lose their warps); `warpgui.delwarp.others` lets staff delete anyone's. Deleting also removes the warp from every player's favourites.

You can also delete from the [edit menu](/plugins/warpgui/features/editing-warps/) (double-click **Delete Warp**).
