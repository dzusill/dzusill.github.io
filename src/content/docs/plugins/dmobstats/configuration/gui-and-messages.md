---
title: "gui.yml & messages.yml"
description: "Every chat line the plugin sends. All text is MiniMessage. <prefix> expands to the prefix key. Named placeholders use %name%. A missing key renders as the…"
---

## messages.yml

Every chat line the plugin sends. All text is MiniMessage. `<prefix>` expands to the `prefix` key. Named placeholders use `%name%`. A missing key renders as the key itself.

```yaml
prefix: "<dark_gray>[<gold>dMobStats</gold>]</dark_gray> "
no-permission: "<prefix><red>You don't have permission to do that.</red>"
reload-done: "<prefix><green>Reloaded <white>%mobs%</white> mob profiles.</green> <gray>Warnings: <white>%warnings%</white> (see console). Existing mobs are not changed.</gray>"
gui-saved: "<prefix><green>Saved <white>%what%</white> of <white>%mob%</white> (%scope%).</green> <gray>Only new spawns use it; existing mobs keep their values.</gray>"
```

The file has sections for the framework, core commands, GUI/inspect/test spawn, presets/validate/debug and the GUI prompts. When you edit a line, keep its placeholders.

## gui.yml

Layout and texts of the admin GUI. Everything is MiniMessage, placeholders use `%name%`, slots count from `0` (top left) and `-1` hides an icon.

| Block | |
|---|---|
| `filler` | Background item of every menu (`GRAY_STAINED_GLASS_PANE`; `NONE` = empty slots). A menu can set its own with `menus.<menu>.filler`. |
| `inspect.range` | How many blocks far `/dms inspect` looks. Default `16`. |
| `steps` | Steps for chance (`0.01` / `0.1`) and weight (`1` / `10`) controls that have none of their own. Ranges use `gui.step` in `config.yml`. |
| `sounds` | `enabled` plus `open`, `click`, `save` and `error` sounds with `sound`, `volume`, `pitch`. |
| `texts` | Words reused inside other texts (yes/no, vanilla, inherited, scope names, filter names). |
| `common` | Icons shared by every menu (back, save, vanilla, previous/next page, info). |
| `menus` | One block per menu: `mob-list`, `mob`, `properties`, `range`, `chance`, `weighted`, `equipment`, `equipment-slot`, `drops`, `extra-drop`, `effects`, `effect`, `effect-picker`, `spawn`, `overrides`, `world-picker`, `biome-picker`, `confirm`. |

An icon is looked up in `menus.<menu>.items.<role>` first, then in `common.<role>`, field by field. A menu can therefore move a shared button by giving only its `slot`. A lore line that is exactly `%details%` is replaced by computed lines (or removed when there are none). The mob list's `neutral`, `bosses` and `water` lists decide the category filters; hostile is every monster not listed as neutral or boss, passive is the rest.

```yaml
menus:
  mob:
    items:
      save:
        slot: 49
```

Keep a scalar key after any list in these files: DzusillCore's config merge mishandles a YAML section that ends in a list.

Reload with `/dms reload`.
