---
title: "Oraxen"
description: "Oraxen is optional. WarpGUI detects it at startup and, when it is missing, behaves exactly as it always has — no extra jar, no config change, nothing to…"
---

[Oraxen](https://docs.oraxen.com) is **optional**. WarpGUI detects it at startup and, when it is missing, behaves exactly as it always has — no extra jar, no config change, nothing to disable.

With Oraxen installed you get two things: custom items as icons, and glyphs in menu text.

```
[WarpGUI] Oraxen found — 'oraxen:<id>' icons and glyphs are available.
```

## Custom items as icons

Anywhere a `Material:` is accepted, `oraxen:<id>` works instead — `<id>` being the section name from your `Oraxen/items/*.yml`:

```yaml
Settings:
  Materials:
    DefaultWarp: oraxen:warp_compass     # icon for warps with none of their own
    Topped: oraxen:star
    Back: oraxen:arrow_left
Categories:
  pvp:
    DisplayName: '<red>PvP</red>'
    Material: oraxen:pvp_banner
GUI:
  Filler:
    Material: oraxen:menu_filler
  Globe:
    Material: oraxen:globe_icon
  ChangeItem:
    Material: oraxen:paintbrush
```

Unknown id, or Oraxen removed later? The icon falls back to that key's default material and the menu opens as normal.

## Custom items as warp icons

Holding an Oraxen item and clicking **Change Icon** stores it as `oraxen:<id>` rather than as a copy of the item. The icon then *follows the definition*: change the model or texture in Oraxen, run `/oraxen reload`, and every warp using that item updates. WarpGUI clears its icon cache automatically when Oraxen reloads.

Vanilla items are still stored as a full copy, so their custom model data, head texture and enchantments survive — see [Editing Warps](/plugins/warpgui/features/editing-warps/#warp-icons).

Admins can also set an icon without holding it:

```
/warpadmin seticon <warp> oraxen:magic_compass
/warpadmin seticon <warp> DIAMOND_SWORD
```

Tab completion offers your Oraxen ids first, then matching materials. The command works from console and needs `warpgui.edit.material`.

## Glyphs in menu text

Glyph placeholders in **config text** — menu titles, button names, lore, category names — are replaced with the glyph's character:

```yaml
GUI:
  AllWarpsDisplayName: '<glyph:globe> <blue>Player Warps</blue>'
  Globe:
    lore:
      - ' :heart: <gray>Click to browse</gray>'
```

Both forms work: the `<glyph:name>` tag and any chat placeholder you configured for the glyph (`:heart:`).

{% hint style="warning" %}
The glyph must use `font: minecraft:default` (Oraxen's default). WarpGUI menu text is rendered as a legacy colour-coded string, a format that cannot carry a font, so a glyph from a custom font is left as written and reported once in the console. This also means Oraxen `<shift:…>` tags — and therefore fully textured GUI backgrounds — are not available in WarpGUI menus yet; they need a DzusillCore release that renders menus as Adventure components.
{% endhint %}

Warp names and descriptions are **player** input and are deliberately never expanded, so nobody can smuggle a glyph into the menu by naming a warp after one.

## What is stored

A warp's icon lives in two fields, which is why nothing breaks if Oraxen is uninstalled:

| Field | Value |
|---|---|
| `Icon` | `oraxen:<id>`, a Base64 copy of a vanilla item, or empty |
| `Item` | the plain material name — feeds `%warpgui_<warp>_material%` and is the fallback |

Removing Oraxen leaves every warp on its plain material. Reinstalling it restores the custom icons; nothing is lost in between.

## Building from source

Oraxen is a compile-only dependency from `https://repo.oraxen.com/releases` (`io.th0rgal:oraxen`). Its transitive dependencies are excluded — some are not resolvable from any public repository, and only the API classes are needed. The first build must run online to cache the artifact; after that `mvn -o package` works as before.
