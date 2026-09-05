---
title: "Holograms"
description: "The floating label above a crate. Two backends draw it, and the text comes from the same place"
---

The floating label above a crate. Two backends draw it, and the text comes from the same place
either way — `hologram.locked` and `hologram.open` in [messages.yml](/plugins/oberonsupplydrops/configuration/messages/).

## Choosing a backend

```yaml
effects:
  hologram:
    enabled: true
    offset: 1.8
    provider: AUTO
```

| `provider` | Behaviour |
|---|---|
| `AUTO` | FancyHolograms when it is installed, the built-in renderer when it is not. No warning either way |
| `FANCY_HOLOGRAMS` | The same, but says so loudly in the console if it has to fall back |
| `BUILT_IN` | A text display entity this plugin owns. Never touches FancyHolograms |

The console names the choice at startup:

```
[INFO] Crate holograms: FancyHolograms 2.11.0.
[INFO] Crate holograms: built-in text displays.
```

`effects.hologram.enabled: false` turns them off entirely, whichever provider is set.

### The built-in renderer

A real `TextDisplay` entity, tagged and swept on startup so a crash cannot leave a label hovering
over nothing. It needs no other plugin, which is why it is the default and the fallback. Position,
height and text are configurable; nothing else is.

### FancyHolograms

Needs [FancyHolograms](https://modrinth.com/plugin/fancyholograms) **2.4.0 or newer** — 2.11.0 is
what this was built and tested against. Everything under `effects.hologram.fancy` then applies.

Two things change beyond appearance:

- **Nothing is spawned into the world.** FancyHolograms renders by packet, so a crate's label is not
  an entity: `/kill @e` cannot erase it, it counts against no entity limit, and a crash leaves
  nothing to clean up.
- **Crate holograms are never persistent.** They are absent from `/hologram list`, which shows only
  persistent ones. That is deliberate — a persistent hologram is written to FancyHolograms' own
  storage and restored on the next boot, which would leave one label per drop, forever, in a file
  this plugin does not own. Turn on `general.debug` to see them being created and removed:

  ```
  [holograms] created osd_a57cad15… for tier 'legendary' (TEXT, billboard CENTER, scale 1.3) at -4, -60, 23
  [holograms] removed osd_a57cad15…
  ```

If FancyHolograms is missing, disabled, or presents an API this build cannot use, the plugin logs
why and carries on with the built-in renderer. A hologram is decoration; losing it never costs a
crate.

## What FancyHolograms adds

```yaml
effects:
  hologram:
    fancy:
      type: TEXT

      billboard: CENTER
      scale: 1.0
      translation: [ 0.0, 0.0, 0.0 ]
      shadow-radius: 0.0
      shadow-strength: 1.0
      interpolation-duration: 0

      visibility: ALL
      visibility-distance: -1

      brightness:
        enabled: false
        block: 15
        sky: 15

      text:
        background: "transparent"
        alignment: CENTER
        shadow: false
        see-through: false

      item:
        material: NETHERITE_INGOT

      block:
        material: crate
```

### Every key

| Key | Values | Meaning |
|---|---|---|
| `type` | `TEXT`, `ITEM`, `BLOCK` | What the hologram draws |
| `billboard` | `FIXED`, `VERTICAL`, `HORIZONTAL`, `CENTER` | Which way it faces the viewer |
| `scale` | one number, or `[x, y, z]` | Size |
| `translation` | `[x, y, z]` | Offset on top of `offset` |
| `shadow-radius` | number | Drop shadow on the ground |
| `shadow-strength` | number | How dark that shadow is |
| `interpolation-duration` | ticks | Smooths a change instead of snapping. `0` for a countdown |
| `visibility` | `ALL`, `PERMISSION_REQUIRED`, `MANUAL` | Who sees it — see below |
| `visibility-distance` | blocks, `-1` | `-1` keeps FancyHolograms' own default |
| `brightness.enabled` | boolean | Light the hologram itself instead of letting the world light it |
| `brightness.block` / `.sky` | 0–15 | Clamped, and reported if out of range |
| `text.background` | `transparent`, `#RRGGBB`, `#AARRGGBB` | The plate behind the text |
| `text.alignment` | `LEFT`, `CENTER`, `RIGHT` | |
| `text.shadow` | boolean | Drop shadow on the glyphs |
| `text.see-through` | boolean | Visible through blocks |
| `item.material` | an item | `ITEM` holograms only |
| `block.material` | a block, or `crate` | `BLOCK` holograms only; `crate` follows the tier's own `crate-material` |

Values are forgiving about shape: `permission-required`, `PERMISSION_REQUIRED` and
`permission_required` all work. Anything unreadable is named in the console with the values that
would have worked, and the default is used.

### `ITEM` and `BLOCK` have no countdown

Only a `TEXT` hologram can carry `{time}`. Switch a live server to `ITEM` or `BLOCK` and the boss bar
and the proximity action bar become the only places the timer appears. That is a real trade, not an
oversight — decide it deliberately.

### Leave `visibility` on `ALL`

A crate's hologram is named after the drop's generated id (`osd_<id>`), so `PERMISSION_REQUIRED` has
no stable node to grant, and `MANUAL` hides it from everyone because nothing here adds a viewer.
Both are accepted for completeness. To hide drops from players, turn holograms off.

## Per-tier overrides

Any tier in [tiers.yml](/plugins/oberonsupplydrops/configuration/tiers/) may override any of those keys under its own
`hologram` block. The merge is **key by key**: a tier that sets only `scale` keeps every other global
value.

```yaml
tiers:
  legendary:
    hologram:
      scale: 1.3
      brightness:
        enabled: true
        block: 15
        sky: 15
```

That is the shipped example — a legendary crate reads as one from across the valley without
restating the other fifteen properties. Nested keys can be overridden on their own, so
`text: { shadow: true }` in a tier keeps the global `text.alignment`.

Overrides are ignored while the built-in renderer is drawing.

## Changing the text

Both backends read `hologram.locked` and `hologram.open` from `messages.yml`, as lists — one entry
per line:

```yaml
hologram:
  locked:
    - "{tier}"
    - "<#8e8e8e>Unlocks in <#C21807>{time}"
  open:
    - "{tier}"
    - "<#8e8e8e>Unlocked"
```

The plugin substitutes the placeholders and pushes the result twice a second, so the countdown is
exact under either backend. FancyHolograms' own `updateTextInterval` is deliberately switched off —
two writers refreshing the same text would fight.

Keep the lines short. A hologram is read at a glance from thirty blocks away, usually while running.
