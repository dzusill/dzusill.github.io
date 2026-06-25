---
title: "messages.yml"
description: "Player-facing text and sounds at plugins/WarpGUI/messages.yml, in MiniMessage format."
---

Player-facing text and sounds at `plugins/WarpGUI/messages.yml`, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html) format.

## Prefix & placeholders

```yaml
prefix: "<red><bold>Server</bold></red> <dark_gray><bold>»</bold></dark_gray> "
```

- `<prefix>` is replaced by the `prefix` string.
- Positional placeholders use `{0}`, `{1}`, … (e.g. `{0}` is usually the warp name).
- Framework keys at the top (`no-permission`, `invalid-usage` with `{usage}`, `invalid-number` with `{input}`, etc.) come from DzusillCore.

## Message groups

| Section | Covers |
|---|---|
| Top-level keys | Teleport, create/delete, name validation, cooldowns, max-warps, permissions. |
| `Teleport` | Warmup title/subtitle and cancel message. |
| `Category` | Set / unknown-category replies. |
| `Favorites`, `Ratings` | Add/remove and rating confirmations. |
| `ExtraLocation` | Create/edit/remove/list of [extra locations](/plugins/warpgui/features/extra-locations/). |
| `ExportWarps` | [Import](/plugins/warpgui/features/importing/) results. |
| `Topped` | Promotion success / already-promoted. |
| `Icons`, `EditDescription`, `Search` | GUI edit prompts and results. |
| `Warps` | Small display tokens (`NoDescription`, `YesL`/`NoL`, …). |

## Sounds

The `Sounds:` section maps events to `SOUND/volume/pitch`:

```yaml
Sounds:
  Teleported: ITEM_CHORUS_FRUIT_TELEPORT/1.0F/1.0F
  ChangedIconSuccess: ENTITY_PLAYER_LEVELUP/1.0F/1.0F
  PageChanged: ITEM_BOOK_PAGE_TURN/1.0F/1.0F
  ToppedSuccess: BLOCK_BEACON_POWER_SELECT/1.0F/1.0F
  DeletedSuccess: ENTITY_PLAYER_LEVELUP/1.0F/1.0F
  ERROR: BLOCK_ANVIL_PLACE/0.5F/1.0F
  EditDescription: { ENTER: ..., ERROR: ..., SUCCESS: ... }
```

Use any valid [Bukkit Sound](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Sound.html) name. A missing key falls back to the key text in-game, so typos are visible.
