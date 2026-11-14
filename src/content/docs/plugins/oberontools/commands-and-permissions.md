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
| `/oberontools radius [tool] [radius\|auto]` | — | See and narrow your own tool widths. Player only |
| `/radius [radius\|auto]` | — | Cycle the width of the tool you hold, or pick one. Player only |
| `/drill`, `/excavator`, `/bucket`, `/wand` `radius [radius\|auto]` | — | The same, for one named tool, held or not. Player only |
| `/oberontools refresh` | `oberontools.admin` | Rewrite the held tool from the current config. Player only |
| `/oberontools reload` | `oberontools.admin` | Re-read config and messages, rebuild recipes and permission nodes |

`<tool>` tab-completes from the configured ids. `[amount]` is 1–64. Anything that does not fit in the target's inventory is dropped at their feet.

`/radius` and the four shortcuts are registered with the server at startup and have fixed labels. A label another plugin already owns is not taken; OberonTools logs `Command name clash: …` and `/oberontools:<name>` still reaches it. A shortcut exists only for a tool that is configured and enabled. If your server runs a command whitelist (for example OberonWhitelist in strict mode), allow `/radius`, `/drill`, `/excavator`, `/bucket` and `/wand` for players.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberontools.use` | `true` | The default `use-permission` on every shipped tool |
| `oberontools.craft` | `true` | The default `craft-permission` on every shipped tool |
| `oberontools.admin` | `op` | Every subcommand |
| `oberontools.combat.bypass` | `false` | Keep tool abilities working while combat-tagged. Only consulted when `combat.block-tools` is on. See [Combat](/plugins/oberontools/features/combat/) |
| `oberontools.radius.<tool-id>.<n>` | `false` | Raise that tool's radius to `n` |
| `oberontools.radius.*.<n>` | `false` | Raise every radius tool to `n`, the wand included |

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
 • permitted: 7x7x7 (up to 343 blocks)
 • radius: 5x5x5 (up to 125 blocks)
```

| Line | What it tells you |
|---|---|
| `instance` | The per-item id used by the job lock. Two identical tools differ here. `-` means no id was stamped. |
| `uses` | Remaining over maximum, or `∞` for an infinite tool |
| `expires` | The absolute deadline stamped on **this** item, in the server's time zone |
| `remaining` | Time left, or the permanent / expired wording from `messages.yml` |
| `status` | `Active`, `Expired` or `Never` |
| `permitted` | The widest **this player's permissions** allow on this tool right now |
| `radius` | What they actually get, after any width they picked with `/oberontools radius`. Equal to `permitted` unless they narrowed it themselves |

These two lines together are the fastest way to answer "why is my donator bucket still 3×3×3". If `permitted` is also small the grant never landed; if `permitted` is wide and `radius` is not, the player narrowed it themselves and `/oberontools radius <tool> auto` puts it back. A `TIMBER` tool prints neither line, because it has no tier to resolve. A `BUILD_WAND` prints its square as `5x5 (up to 24 extra blocks)`, since the centre block is the player's own.

## Choosing your own width

The quickest way is `/radius` with the tool in hand: it steps to the next width you may use and wraps back to the narrowest. See [Radius Tiers](/plugins/oberontools/features/radius-tiers/#cycling-with-radius) for what counts as held, the per-tool shortcuts and `auto`.

```
/radius                  next width
/radius 2                pick radius 2
/radius auto             follow the rank
/wand radius             cycle the wand without holding it
```

The long form lists every tool of yours and sets one by name:

```
/oberontools radius
```

```
Your tool widths
 • pickaxe: 7x7 (up to 49 blocks) — you may pick 1, 2, 3
 • sponge_bucket: 3x3x3 (up to 27 blocks) — you may pick 1
```

```
/oberontools radius pickaxe 1     narrow to 3x3 and keep it there
/oberontools radius pickaxe auto  follow the rank again, whatever it is worth today
```

No permission node of its own, because none of these commands **can widen anything**. See [Radius Tiers](/plugins/oberontools/features/radius-tiers/#letting-a-donor-choose).

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
