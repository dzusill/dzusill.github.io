---
title: "Commands & Permissions"
description: "Main command: /oberontools, aliases /otools and /ot."
---

Main command: `/oberontools`, aliases `/otools` and `/ot`.

| Command | Permission | Description |
|---|---|---|
| `/oberontools` | — | Usage help. Open to everyone. |
| `/oberontools list` | `oberontools.admin` | Every configured tool, its behaviour and whether it is enabled |
| `/oberontools give <player> <tool> [amount] [duration]` | `oberontools.admin` | Create tools directly into an online player's inventory |
| `/oberontools inspect` | `oberontools.admin` | Everything the held tool knows about itself. Player only |
| `/oberontools refresh` | `oberontools.admin` | Rewrite the held tool from the current config. Player only |
| `/oberontools reload` | `oberontools.admin` | Re-read config and messages, rebuild recipes and permission nodes |

`<tool>` tab-completes from the configured ids. `[amount]` is 1–64. Anything that does not fit in the target's inventory is dropped at their feet.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberontools.use` | `true` | The default `use-permission` on both shipped tools |
| `oberontools.craft` | `true` | The default `craft-permission` on both shipped tools |
| `oberontools.admin` | `op` | Every subcommand |
| `oberontools.radius.<tool-id>.<n>` | `false` | Raise that tool's radius to `n` |
| `oberontools.radius.*.<n>` | `false` | Raise every radius tool to `n` |

`oberontools.use` and `oberontools.craft` default to everyone because they are what the shipped tools reference — locking them would make a crafted tool inert for normal players. Restrict a specific tool by giving it its own `use-permission` instead.

Radius nodes are registered at runtime from `config.yml`, so LuckPerms tab-completes them and `oberontools.radius.<tool>.*` has something to expand to. They are registered with `default: false` so a donator tier nobody was granted does not fall through to operators. See [Radius Tiers](/plugins/oberontools/features/radius-tiers/).

> **A custom `use-permission` or `craft-permission` defaults to op.** OberonTools registers unknown permission names so they are discoverable, but with `default: op` — registering them as `false` would quietly revoke a node an operator had a moment earlier. Grant your custom node explicitly.

## `give` with a duration

The optional fourth argument overrides the definition's `expires-after` **for these items only**:

```
/oberontools give Steve sponge_bucket 1 30d
/oberontools give Steve sponge_bucket 1 PERMANENT
/oberontools give Steve lumber_axe 1 12h30m
```

`PERMANENT` there hands out a permanent copy of an otherwise expiring tool. Omitting it uses the definition's own value. An unparseable duration is refused before anything is given:

```
Invalid duration: 7x (use PERMANENT, 7d, 12h30m, 90s)
```

This is the only supported way to change the deadline on a tool, because the deadline is stamped per item — see [Expiry](/plugins/oberontools/features/expiry/).

## Reading `inspect`

```
/oberontools inspect
```

```
sponge_bucket
 • instance: 5f1c8a2e-9b1d-4f00-9e21-7c4a1b2d3e4f
 • uses: 247/250
 • expires: 2026-08-27 14:03
 • remaining: 6d 23h 59m 58s
 • status: Active
 • radius: 5x5x5 (up to 125 blocks)
```

| Line | What it tells you |
|---|---|
| `instance` | The per-item id used by the job lock. Two identical tools differ here. `-` means no id was stamped. |
| `uses` | Remaining over maximum, or `∞` for an infinite tool |
| `expires` | The absolute deadline stamped on **this** item, in the server's time zone |
| `remaining` | Time left, or the permanent / expired wording from `messages.yml` |
| `status` | `Active`, `Expired` or `Never` |
| `radius` | For `LIQUID_CLEAR` and `AREA_MINE`. The cube or square **this player** resolves to, after their radius nodes, and the block cap that applies at it |

The `radius` line is the fastest way to answer "why is my donator bucket still 3×3×3", or "why is the donator pickaxe still 3×3" — it reports what the permission check actually returned for the player holding the item. A `TIMBER` tool prints no `radius` line, because it has no tier to resolve.

## Reading `list`

```
/oberontools list
```

```
Configured tools
 • sponge_bucket [liquid_clear] — enabled
 • lumber_axe [timber] — disabled
```

This is the definitions in memory, not the file on disk. After editing `config.yml`, run `/oberontools reload` and check here that the change actually landed.
