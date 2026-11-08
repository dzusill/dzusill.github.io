---
title: "config.yml"
description: "Every key, what it does, and the default. Reload with /oberontools reload."
---

Every key, what it does, and the default. Reload with `/oberontools reload`.

Validation is **all or nothing**. A config with a single bad value is refused as a whole: at startup the plugin does not enable, and on reload the previously active tools and recipes stay live. All problems found in one pass are reported together.

## Header

```yaml
# OberonTools 1.0
config-version: 2
debug: false
```

| Key | Default | |
|---|---|---|
| `config-version` | `2` | Schema stamp, bumped by the plugin itself; leave it alone. A file below `2` is migrated on start: the untouched shipped lore lines `- "<#7e7e7e>Mines a 3x3 Area"` and `- "<gray>a <white>3x3x3</white> cube around it.</gray>"` are rewritten in place to use `%size%`, and the console logs `Updated config.yml to config-version 2`. Each rule matches one shipped line exactly, so lore you reworded is left untouched. A file with no `config-version` counts as `1`. The migration runs before the merge, edits only those lines and keeps comments, ordering and line endings. |
| `debug` | `false` | Parsed and stored, but **nothing in this build reads it**. Setting it to `true` changes no output. |

## Processing

```yaml
processing:
  max-block-attempts-per-tick: 96
  max-active-jobs-per-player: 1
  fire-protection-events: true
  expiry-refresh-interval-ticks: 20
  expiry-refresh-scope: HOTBAR
```

| Key | Default | |
|---|---|---|
| `max-block-attempts-per-tick` | `96` | Block operations per tick, shared by every job on the server. Range 1–4096. |
| `max-active-jobs-per-player` | `1` | Jobs one player may have queued at once. Range 1–8. |
| `fire-protection-events` | `true` | Fire a `BlockBreakEvent` for each secondary block, so protection plugins decide. |
| `freeze-in-containers` | `true` | Pause a tool's countdown while it is stored (container, ender chest, ground, auction listing) and resume it when a player carries it again. See [Expiry](/plugins/oberontools/features/expiry/#paused-while-stored). |
| `freeze-on-commands` | `ah sell`, `auction sell`, `auctionhouse sell`, `axah sell`, `axauctions sell` | Commands that take the held item to list it. The held tool is paused just before one runs. Matched at the start of the typed command, with or without a `plugin:` prefix. |
| `expiry-refresh-interval-ticks` | `20` | Ticks between countdown redraws. Range 1–1200. |
| `expiry-refresh-scope` | `HOTBAR` | `NONE`, `HELD`, `HOTBAR` or `INVENTORY`. Periodic countdown redraws always skip both held hands to prevent hand bobbing. `%size%` lore is checked on the same interval across the whole inventory and both hands at any scope. |

See [The Job Queue](/plugins/oberontools/features/job-queue/) and [Expiry](/plugins/oberontools/features/expiry/#keeping-the-countdown-ticking).

## Tools

```yaml
tools:
  <tool-id>:
    enabled: true
    behavior: LIQUID_CLEAR
    use-permission: oberontools.use
    craft-permission: oberontools.craft
    worlds:
      whitelist: []
      blacklist: []
```

| Key | Default | |
|---|---|---|
| `<tool-id>` | — | Section key. Lower-cased on load; must match `[a-z0-9._-]+`. |
| `enabled` | `true` | `false` refuses every use and unregisters the recipe. |
| `behavior` | *required* | `AREA_MINE`, `BUILD_WAND`, `LIQUID_CLEAR` or `TIMBER`. |
| `use-permission` | `oberontools.use` | Empty means no check. A custom node is registered with `default: op`. |
| `craft-permission` | `oberontools.craft` | Empty means no check. A custom node is registered with `default: op`. |
| `worlds.whitelist` | `[]` | Empty means everywhere; non-empty means only these. |
| `worlds.blacklist` | `[]` | Never usable here. Applied before the whitelist. |

> **`tools` is never merged on update.** Every other section gets new keys added automatically when you update the plugin; the tool list is deliberately left alone so a tool you deleted stays deleted. The trade-off is that new *example* tools from an update will not appear either — copy them out of the jar's bundled `config.yml`. The [Build Wand](/plugins/oberontools/features/build-wand/#adding-the-wand-to-an-existing-config) is exactly this case: a server updating from a version without it must add the `wand` block itself.

See [Defining a Tool](/plugins/oberontools/features/defining-a-tool/).

### `tools.<id>.item`

```yaml
    item:
      material: BUCKET
      name: "<aqua><bold>Abyssal Sponge Bucket</bold></aqua>"
      lore: []
      custom-model-data: 0
      enchant-glint: true
      unbreakable: true
      max-uses: 250
      expires-after: 7d
      expired-policy: KEEP_DISABLED
```

| Key | Default | |
|---|---|---|
| `material` | *required* | Must be a usable item material; air and non-item blocks are rejected. `BUILD_WAND` also rejects any placeable block. |
| `name` | *required* | MiniMessage. Validated at load. |
| `lore` | `[]` | MiniMessage lines; blanks kept as spacing. Supports the [lore placeholders](/plugins/oberontools/placeholders/), including `%size%`. |
| `custom-model-data` | `0` | Above `0` is set; `0` clears it. Negative is rejected. |
| `enchant-glint` | `false` | The shipped tools set `true`. |
| `enchants` | `[]` | Real enchantments written as `ENCHANT` or `ENCHANT:LEVEL`. |
| `item-flags` | `[]` | Bukkit item flags such as `HIDE_ENCHANTS`. |
| `unbreakable` | `true` | Vanilla durability never applies. |
| `max-uses` | `-1` | `-1` is infinite. `0` and values below `-1` are rejected. |
| `expires-after` | `PERMANENT` | `PERMANENT`, `never`, `none`, `-1`, or `7d` / `12h30m` / `90s`. |
| `expired-policy` | `KEEP_DISABLED` | `KEEP_DISABLED` or `REMOVE`. |

Tools are always forced to a maximum stack size of 1.

See [Expiry](/plugins/oberontools/features/expiry/).

### `tools.<id>.messages`

```yaml
    messages:
      action: ACTION_BAR
      error: CHAT
      overrides:
        area-complete: BOTH
        tool.busy: NONE
```

`action` and `error` accept `CHAT`, `ACTION_BAR`, `BOTH`, or `NONE`. `overrides` routes one key for this tool only; a short key such as `area-complete` is normalized to `tool.area-complete`. Per-tool exact overrides win over global `Presentation.Overrides`, which win over `action`/`error`.

### `tools.<id>.area-mine`

Required when `behavior: AREA_MINE`.

```yaml
    area-mine:
      tool: PICKAXE
      vertical-anchor: FLOOR
      radius: 1
      max-radius: 3
```

| Key | Default | |
|---|---|---|
| `tool` | *required* | `PICKAXE` or `SHOVEL`; the item material must match. |
| `vertical-anchor` | `FLOOR` | `FLOOR` keeps the bottom row one block below what you mined at every radius; `CENTERED` centres the square on it. Wall faces only. |
| `radius` | `1` | The square everyone gets. `1` creates the shipped 3×3 plane. Range 1–8. |
| `max-radius` | same as `radius` | Permission ceiling. Must be ≥ `radius`, ≤ 8. Equal to `radius` means no tiers exist. |

There is no `max-blocks` for this behavior — a square is always exactly `(2 × radius + 1)²` blocks, so there is nothing to cap separately.

See [Area Mine](/plugins/oberontools/features/area-mine/) and [Radius Tiers](/plugins/oberontools/features/radius-tiers/).

### `tools.<id>.build-wand`

Required when `behavior: BUILD_WAND`.

```yaml
    build-wand:
      blacklist: []
      radius: 1
      max-radius: 3
      require-support: true
```

| Key | Default | |
|---|---|---|
| `blacklist` | `[]` | Block materials the wand never copies. Chests, doors, beds, fences, walls, panes, redstone and customised items are refused regardless. |
| `radius` | `1` | The square everyone gets. `1` is 3×3. Range 1–8. |
| `max-radius` | same as `radius` | Permission ceiling. Must be ≥ `radius`, ≤ 8. Equal to `radius` means no tiers exist. |
| `require-support` | `true` | Each extra block needs a solid block behind it (below it on a floor). `false` also places into thin air. |

A square has at most `(2 × radius + 1)² − 1` extra blocks; there is no `max-blocks`. The shipped `wand` is a `BREEZE_ROD` with `expires-after: 7d`, `expired-policy: REMOVE`, `recipe.enabled: false` and the lore `Places a %size% Area`.

See [Build Wand](/plugins/oberontools/features/build-wand/) and [Radius Tiers](/plugins/oberontools/features/radius-tiers/).

### `tools.<id>.recipe`

```yaml
    recipe:
      enabled: true
      type: SHAPED
      shape: ["SIS", "IBI", "SIS"]
      ingredients:
        S: SPONGE
        I: IRON_INGOT
        B: BUCKET
```

| Key | Default | |
|---|---|---|
| `enabled` | `false` | Omit the block entirely for a give-only tool. |
| `type` | `SHAPED` | `SHAPED` or `SHAPELESS`. |
| `shape` | — | Shaped only. 1–3 rows of equal width, 1–3 wide, at least one non-space character. |
| `ingredients` | — | Shaped: single non-space character → material, covering every symbol in `shape`. Shapeless: a list of 1–9 materials. |

Registration is atomic: if any recipe is refused during a reload the whole set rolls back to the previous one.

### `tools.<id>.liquid-clear`

Required when `behavior: LIQUID_CLEAR`.

```yaml
    liquid-clear:
      radius: 1
      max-radius: 3
      max-blocks: 0
      clear-waterlogged-blocks: true
      materials: [WATER, LAVA]
      sound: item.bucket.empty
      volume: 0.9
      pitch: 1.0
```

| Key | Default | |
|---|---|---|
| `radius` | `1` | Everyone's cube. `1` is 3×3×3. Range 0–8. |
| `max-radius` | same as `radius` | Permission ceiling. Must be ≥ `radius`, ≤ 8. |
| `max-blocks` | `0` | `0` derives 27/125/343 from the effective radius. Otherwise 1–4913. |
| `clear-waterlogged-blocks` | `true` | Also un-waterlog blocks inside the cube. |
| `materials` | *required* | Must not be empty. |
| `sound` | `item.bucket.empty` | A **resource key**, lower-cased on load. Empty plays nothing. |
| `volume` | `0.9` | Must not be negative. |
| `pitch` | `1.0` | Range 0.5–2.0. |

See [Liquid Clear](/plugins/oberontools/features/liquid-clear/) and [Radius Tiers](/plugins/oberontools/features/radius-tiers/).

### `tools.<id>.timber`

Required when `behavior: TIMBER`.

```yaml
    timber:
      minimum-logs: 2
      max-logs: 256
      max-leaves: 1024
      log-search-radius: 16
      leaf-search-radius: 6
      include-leaves: true
      natural-leaves-only: true
      require-natural-leaves: true
      abort-when-log-limit-reached: true
      sound: entity.zombie.break_wooden_door
      volume: 0.45
      pitch: 1.25
```

| Key | Default | |
|---|---|---|
| `minimum-logs` | `2` | Must be ≥ 1. A smaller group is not a tree. |
| `max-logs` | `256` | Must be ≥ `minimum-logs`, ≤ 4096. |
| `max-leaves` | `1024` | `0` disables leaves. Range 0–8192. |
| `log-search-radius` | `16` | Per axis, from the broken block. Range 1–64. |
| `leaf-search-radius` | `6` | Chebyshev distance from the nearest felled log. Range 1–8. |
| `include-leaves` | `true` | `false` fells trunks only. |
| `natural-leaves-only` | `true` | Skip player-placed (persistent) leaves. |
| `require-natural-leaves` | `true` | Refuse trunks with no natural leaves within ±2 blocks. |
| `abort-when-log-limit-reached` | `true` | `true` breaks nothing extra when over the cap; `false` fells the first `max-logs`. |
| `sound` | `entity.zombie.break_wooden_door` | A **resource key**, lower-cased on load. Empty plays nothing. |
| `volume` | `0.45` | Must not be negative. |
| `pitch` | `1.25` | Range 0.5–2.0. |

See [Timber](/plugins/oberontools/features/timber/).

## Presentation

```yaml
Presentation:
  Categories:
    TOGGLE:
      Channel: ACTION_BAR
    ERROR:
      Channel: BOTH
  Overrides: {}
```

The DzusillCore message-presentation block. Every message OberonTools sends belongs to a category, and each category can be routed to `CHAT`, `ACTION_BAR`, `BOTH` or `NONE`. `Overrides` does the same for a single message key.

OberonTools categorises `tool.locked` as `TOGGLE` — which is why the lock warning lands on the action bar with the shipped settings — and puts the refusal messages (`command.not-holding`, `command.unknown`, `command.reload-failed`, `tool.no-use-permission`, `tool.no-craft-permission`, `tool.wrong-world`, `tool.timber-limit`, `tool.expired`, `tool.in-combat`, `command.invalid-duration`, `command.radius-denied`, `command.radius-fixed`, `command.radius-none`) in `ERROR`. Everything else is `INFO`, which is plain chat.

Overriding one key:

```yaml
Presentation:
  Overrides:
    tool.timber-not-natural:
      Channel: ACTION_BAR
```

For command messages, resolution order is override, then category, then plain chat. Tool messages may additionally have a more-specific `tools.<id>.messages.overrides` rule.
