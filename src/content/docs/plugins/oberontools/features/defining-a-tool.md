---
title: "Defining a Tool"
description: "A tool is one entry under tools: in config.yml. There is nothing else to install, register or restart for — /oberontools reload picks up a new entry and its…"
---

A tool is one entry under `tools:` in `config.yml`. There is nothing else to install, register or restart for — `/oberontools reload` picks up a new entry and its recipe immediately.

```yaml
tools:
  sponge_bucket:            # the tool id
    enabled: true
    behavior: LIQUID_CLEAR
    use-permission: oberontools.use
    craft-permission: oberontools.craft
    worlds:
      whitelist: []
      blacklist: []
    item: { … }
    recipe: { … }
    liquid-clear: { … }     # required for LIQUID_CLEAR
```

## The id

The section key is the tool id. It is lower-cased on load and must match `[a-z0-9._-]+` — the character set a namespaced key allows, because the id ends up inside one.

The id is used by:

- `/oberontools give <player> <tool>` and every other command
- the radius nodes `oberontools.radius.<tool-id>.<n>`
- the recipe key `oberontools:tool_<tool-id>`
- the `tool_id` tag written into every item of that kind

> **Renaming a tool orphans every copy in circulation.** Existing items still carry the old id, and no definition answers to it any more, so they stop being recognised as tools entirely — they become the plain vanilla item they were built from. Decide on ids before you hand tools out.

## Top-level keys

| Key | Default | |
|---|---|---|
| `enabled` | `true` | `false` keeps the definition loaded but refuses every use and unregisters its recipe. Items already handed out stay in inventories. |
| `behavior` | *required* | `AREA_MINE`, `LIQUID_CLEAR` or `TIMBER`. Decides which settings block is required. |
| `use-permission` | `oberontools.use` | Checked before the ability runs. An empty value means no check at all. |
| `craft-permission` | `oberontools.craft` | Checked in the crafting grid. An empty value means no check at all. |
| `worlds.whitelist` | `[]` | Empty means every world. Non-empty means **only** these. Case-insensitive. |
| `worlds.blacklist` | `[]` | Never usable in these worlds. Applied before the whitelist. |

> **A custom permission name defaults to op.** `oberontools.use` and `oberontools.craft` are declared in `plugin.yml` with `default: true`. If you invent your own — say `use-permission: oberon.donator.sponge` — OberonTools registers it so permission managers can see it, but with **`default: op`**. Grant it explicitly or normal players cannot use the tool.

## `item:`

```yaml
    item:
      material: BUCKET
      name: "<aqua><bold>Abyssal Sponge Bucket</bold></aqua>"
      lore:
        - "<gray>Right-click water or lava to clear</gray>"
        - ""
        - "<dark_gray>Uses: <white>%uses%</white>/<white>%max_uses%</white></dark_gray>"
        - "<dark_gray>Expires in: %expiry%</dark_gray>"
      custom-model-data: 0
      enchant-glint: true
      enchants: []
      item-flags: []
      unbreakable: true
      max-uses: 250
      expires-after: 7d
      expired-policy: KEEP_DISABLED
```

| Key | Default | |
|---|---|---|
| `material` | *required* | Any obtainable item material. Blocks that are not items, and air, are rejected. |
| `name` | *required* | [MiniMessage](https://docs.advntr.dev/minimessage/format.html). Parsed at load — a broken tag refuses the whole config. Italics are switched off for you. |
| `lore` | `[]` | MiniMessage lines. Blank strings are kept as spacing. Supports the [lore placeholders](/plugins/oberontools/placeholders/). |
| `custom-model-data` | `0` | Any value above `0` is set on the item. `0` explicitly **clears** custom model data. Negative values are rejected. |
| `enchant-glint` | `false` | Sets the glint override. The shipped tools use `true`. |
| `enchants` | `[]` | Real enchantments, `ENCHANT` or `ENCHANT:LEVEL`, by Minecraft name. Cosmetic on a tool whose ability the plugin drives. Read from the registry, so a name this build has never heard of still works. |
| `item-flags` | `[]` | What the tooltip hides. `HIDE_ENCHANTS` is the usual one, so a glint-only tool does not list enchantments it never uses. |
| `unbreakable` | `true` | Vanilla durability never applies; `max-uses` is the real budget. |
| `max-uses` | `-1` | `-1` is infinite. `0` and anything below `-1` are rejected. |
| `expires-after` | `PERMANENT` | `PERMANENT`, `7d`, `12h30m`, `90s`. See [Expiry](/plugins/oberontools/features/expiry/). |
| `expired-policy` | `KEEP_DISABLED` | `KEEP_DISABLED` or `REMOVE`. See [Expiry](/plugins/oberontools/features/expiry/#what-happens-when-it-expires). |

Every tool item is forced to a **maximum stack size of 1**, so two of them can never merge into a stack and share one use counter.

### Uses

Uses live in the item's persistent data, not the config. One use is spent per successful activation — a right-click that actually queued liquid to clear, or a log break that actually started a fell. A refused activation (no permission, wrong world, nothing in range, queue busy) costs nothing.

When the last use is spent the item is destroyed and `entity.item.break` plays. If it happened to be sitting in a stack larger than one, the stack shrinks by one instead.

## `recipe:`

Omit the block entirely, or set `enabled: false`, and the tool is give-only.

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
| `enabled` | `false` | Registers `oberontools:tool_<id>` with the server. |
| `type` | `SHAPED` | `SHAPED` or `SHAPELESS`. |
| `shape` | — | Shaped only. 1–3 rows, all the same width, 1–3 wide. At least one non-space character. |
| `ingredients` | — | Shaped: a map of **one non-space character** to a material. Every symbol used in `shape` must be mapped. Shapeless: a plain list of 1–9 materials. |

Shapeless form:

```yaml
    recipe:
      enabled: true
      type: SHAPELESS
      ingredients: [ SPONGE, SPONGE, BUCKET ]
```

Recipe registration is **all or nothing**. If Bukkit refuses one recipe during a reload, every recipe from that attempt is removed and the previous set is put back, so you are never left with half a tool set.

`craft-permission` is enforced twice: the result slot goes empty while the grid is filled by somebody without it, and the craft itself is cancelled with a message if they get that far.

## `messages:`

Where this tool talks. Per tool, so a bucket used constantly can stay quiet while an axe still explains
itself.

```yaml
    messages:
      action: ACTION_BAR
      error: CHAT
      overrides:
        area-complete: BOTH
        tool.busy: NONE
```

| Key | Default | |
|---|---|---|
| `action` | `ACTION_BAR` | Confirmations: blocks drained, logs felled. |
| `error` | `CHAT` | Refusals: no permission, wrong world, expired, busy, nothing found. |
| `overrides` | `{}` | Exact message-key channels for this tool only. Short keys imply the `tool.` prefix. |

Each takes `CHAT`, `ACTION_BAR`, `BOTH` or `NONE`. `NONE` is genuinely silent — every message a tool produces goes
through one place, so nothing slips past it.

They are split because they are read differently. A confirmation fires on every use and suits the bar,
where it appears and fades without filling the chat log. A refusal is something the player needs to read,
and usually wants to stay put.

Setting `error: NONE` silences *all* refusals, including the ones worth seeing — "you do not have
permission", "this tool has expired". A player who cannot tell a refusal from a broken tool will report it
as broken.

## `area-mine:`, `liquid-clear:` and `timber:`

Required for their matching behavior and rejected as missing if absent. They are documented in full on their own pages:

- [Area Mine](/plugins/oberontools/features/area-mine/)
- [Liquid Clear](/plugins/oberontools/features/liquid-clear/)
- [Timber](/plugins/oberontools/features/timber/)

## Why persistent data, not names

The `tool_id` and the remaining uses live in the item's `PersistentDataContainer` under the `oberontools` namespace. Nothing about recognising a tool reads its display name or its lore.

That is the whole anti-forgery story: an anvil-renamed bucket called *Abyssal Sponge Bucket* has no `tool_id`, so it is a bucket. A tool whose lore you edited with a third-party item editor still has its `tool_id`, so it still works. Nobody can craft a tool by typing its name.

The same tag is what makes `/oberontools refresh` safe: it re-renders the display name, lore, model and flags from the current config while preserving the item's own uses, its instance id and its stamped expiry.
