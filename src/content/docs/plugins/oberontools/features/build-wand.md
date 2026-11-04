---
title: "Build Wand"
description: "behavior: BUILDWAND copies a block the player places into a square around it. The shipped Andromeda Builder's Wand (id wand, a blaze rod) sits in the off…"
---

`behavior: BUILD_WAND` copies a block the player places into a square around it. The shipped **Andromeda Builder's Wand** (id `wand`, a blaze rod) sits in the **off hand**; the player builds with the **main hand** as usual, and every extra block is paid for out of their inventory.

```yaml
tools:
  wand:
    behavior: BUILD_WAND
    item:
      material: BLAZE_ROD
      expires-after: 7d
      expired-policy: REMOVE
    recipe:
      enabled: false
    build-wand:
      blacklist: []
      radius: 1
      max-radius: 3
      require-support: true
```

`item.material` must not be a placeable block. The wand lives in the off hand, where a block would be placed by every right-click the main hand does not use, so a block material is refused at load.

## How a place plays out

```
main-hand place accepted by vanilla and every protection plugin
  └─ wand in the off hand?  access · combat · block rules
     └─ one tick later: is the centre still standing, is there anything to pay with?
        └─ plan the square on the clicked face, nearest the centre first
           └─ submit to the job queue — one block per turn, tick-budgeted
              └─ each block: checks → synthetic BlockPlaceEvent → take one item
```

The wand reacts at `MONITOR` priority to a place nobody cancelled and never changes the outcome of the player's own place. The centre block is always vanilla's.

## Orientation

The **clicked face** decides the plane, and the placed block is its centre:

| Face clicked | Square |
|---|---|
| Top or bottom | Horizontal X/Z layer at the placed block's Y |
| North or south | Vertical X/Y square on the wall |
| East or west | Vertical Y/Z square on the wall |

A floor gives a flat layer, a wall gives an upright square. When the block was placed into something replaceable (tall grass, a snow layer, water) the clicked block and the placed block are the same, so the face falls back to the player's dominant look axis.

A wall square next to the top or bottom of the world is cut off at the build height rather than refused.

## Widths

`radius: 1` is a 3×3 square, `2` is 5×5, `3` is 7×7. The wand uses the shared [Radius Tiers](/plugins/oberontools/features/radius-tiers/) scan:

| Node | Effect |
|---|---|
| `oberontools.radius.wand.<n>` | Raise the wand to radius `n` |
| `oberontools.radius.*.<n>` | Raise every radius tool, the wand included |

`radius` and `max-radius` are capped at **8** (17×17). A square of side `s` places at most `s² − 1` extra blocks, since the centre is the player's own. `/oberontools inspect` reports it:

```
 • permitted: 7x7 (up to 48 extra blocks)
 • radius: 5x5 (up to 24 extra blocks)
```

A player narrows or widens the wand with `/radius` or `/wand radius`; see [Radius Tiers](/plugins/oberontools/features/radius-tiers/#cycling-with-radius).

## What it costs

Every extra block takes **one matching item** from the player's inventory.

- Only the 36 **storage slots** are searched. Armour and the off hand (where the wand is) are not.
- Stacks other than the selected slot are used first; the stack in the main hand is used **last**, so the block you are building with runs out last.
- The item is taken only **after** the block stands. A place a protection plugin refuses removes nothing, so there is nothing to refund.
- A stack must be `isSimilar` to what was placed. A named or enchanted stack never matches a plain one.
- **Creative mode pays nothing.**
- When items run out part-way, the wand places as many as it can: nearest the centre first, so a short supply leaves a tidy patch around the centre instead of a ragged row.

If nothing at all is left for the extra blocks, the player sees `tool.wand-no-blocks` and no use is spent.

## What gets skipped

Each target block is checked again when the queue reaches it, not when the square was planned. A spot is skipped silently when:

| Condition | Detail |
|---|---|
| Occupied | Anything that is not air or replaceable (water, lava, grass, a single snow layer). The wand never overwrites a block somebody built |
| No support | With `require-support: true`, the block *behind* the target (opposite the clicked face) must be solid |
| Falling block with nothing below | Sand and gravel are not placed over air |
| Cannot survive | Vanilla placement rules via `isSupported`: carpet and rails need a floor, flowers need soil, cactus needs sand |
| An entity is in the way | Any living entity, vehicle, falling block or end crystal inside the target (spectators do not count) |
| Outside the world border | |
| Not loaded | Chunks are never loaded for a square |
| Nothing to pay with | The inventory has no matching item left |
| Protection said no | The synthetic `BlockPlaceEvent` was cancelled or `canBuild` was false |

`require-support: false` places into thin air too. The default extends the surface you clicked instead of building a floating sheet past its edge.

### Waterlogging

A waterloggable copy (a slab or stairs, say) is waterlogged **per target**, never copied from the centre block:

- It is waterlogged only where it replaces a **water source**, **seagrass**, **tall seagrass** or a **bubble column**.
- It is never waterlogged in an ultrawarm world (the Nether), where water evaporates.

So a dry slab placed beside a pond does not drag water onto the dry blocks of the square, and a slab copied from inside the water does not delete a source it lands in.

## Blocks the wand refuses

The wand copies one plain block placed as itself. For anything below it does nothing extra, and the player gets `tool.wand-unsupported` on the action channel (not chat, since builders place a chest with the wand in hand all the time).

| Refused | Why |
|---|---|
| Blocks with a block entity (chests, signs, spawners, banners) | Their data would be lost or duplicated |
| Doors, tall flowers and other two-part blocks; beds | A copy would cut them in half |
| Fences, walls, glass panes, iron bars | Their shape comes from their neighbours |
| Redstone wire and tripwire | Same: connections would not exist where the copy lands |
| Items that become a different block (string, seeds, redstone dust) | Cannot be paid for one-for-one |
| Named, enchanted or otherwise customised items | Their data would be copied for free or lost |
| Anything in `build-wand.blacklist` | Your own list |

Stairs, trapdoors, logs, slabs and other single blocks copy with their **facing, axis and half** intact.

One case stays quiet instead of showing the refusal: when the place **grew a block that was already there** (a slab becoming a double slab, another candle, a snow layer), the wand does nothing and says nothing.

## Rules and protection

- **Protection plugins.** Each extra block fires a synthetic `BlockPlaceEvent` as the player, with the block behind it as the clicked block and a one-item copy of the placed item. WorldGuard, GriefPrevention, Towny and logging plugins decide per block, and CoreProtect logs the block as placed by the player. With `processing.fire-protection-events: false` the events are skipped and **every extra block is allowed** — see [The Job Queue](/plugins/oberontools/features/job-queue/#turning-it-off).
- **Access.** `use-permission`, the world whitelist and blacklist, and the stamped deadline are checked as for every tool. An expired `REMOVE` wand is deleted from the off hand.
- **Combat.** While `combat.block-tools` withholds abilities, the player simply places their one block with no square. See the `combat` section of `config.yml`.
- **Crate or give only.** The shipped wand has `recipe.enabled: false`, `expires-after: 7d` and `expired-policy: REMOVE`, like the other Andromeda tools. `max-uses: -1`: one use is spent per accepted square, none for a refused one.
- **Anti-duplication.** The wand is frozen while its square is placing, so it cannot be swapped out of the off hand mid-job. See [Anti-Duplication](/plugins/oberontools/features/anti-duplication/).
- **Queue.** A square drains through the shared [job queue](/plugins/oberontools/features/job-queue/) at the server's tick budget. A click that lands while the player's previous square is still draining places its own block and nothing more.

The completion message is `tool.wand-complete`, with `%blocks%` including the centre block.

## Vulcan

If Vulcan is installed (`softdepend`), the wand places a whole square for one click, which is exactly what its **FastPlace**, **AirPlace** and **Scaffold** checks exist to catch. OberonTools cancels a flag of those three checks for a player **only while a wand job is running for them**, plus a short grace of 10 ticks after each wand placement. Every other check, and those three for anyone not using the wand, is left to Vulcan.

Without Vulcan nothing is loaded; the hook is installed only when the plugin manager reports Vulcan present.

## Tools are not ingredients or fuel

A wand is a blaze rod, which the crafting grid turns into blaze powder and furnaces and brewing stands burn as fuel. OberonTools closes both routes for **every** tool, not only the wand: a tool in any crafting grid empties the result slot (and the craft is cancelled if another plugin puts it back), and a tool in a furnace or brewing stand fuel slot is never burned.

## Adding the wand to an existing config

`tools` is a [never merged on update](/plugins/oberontools/configuration/config/#tools): the plugin's own merge never adds a tool to a live `config.yml`. A server updating from a version without the wand must paste the block in itself:

```yaml
tools:
  wand:
    enabled: true
    behavior: BUILD_WAND
    use-permission: oberontools.use
    craft-permission: oberontools.craft
    worlds:
      whitelist: []
      blacklist: []
    item:
      material: BLAZE_ROD
      name: "<gradient:#1F4277:#1C3B6B>Andromeda Builder's Wand</gradient>"
      lore:
        - "<#7e7e7e>Places a %size% Area"
        - "<dark_gray>Self Destruct:</dark_gray>"
        - "<dark_gray>%expires_at%</dark_gray>"
      custom-model-data: 0
      enchant-glint: true
      enchants: []
      item-flags: []
      unbreakable: true
      max-uses: -1
      expires-after: 7d
      expired-policy: REMOVE
    recipe:
      enabled: false
    messages:
      action: ACTION_BAR
      error: CHAT
      overrides: {}
    build-wand:
      blacklist: []
      radius: 1
      max-radius: 3
      require-support: true
```

Then `/oberontools reload` and `/oberontools give <player> wand`. The `/wand` shortcut is registered at startup only, so it needs a restart to appear.

## Server owners with a command whitelist

`/radius`, `/drill`, `/excavator`, `/bucket` and `/wand` are new command labels. A whitelist that blocks unlisted commands (for example OberonWhitelist in strict mode) must allow them for players, or `/radius` and the shortcuts will be refused before OberonTools sees them.
