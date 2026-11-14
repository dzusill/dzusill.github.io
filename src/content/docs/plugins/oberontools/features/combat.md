---
title: "Combat"
description: "With combat.block-tools: true, a combat-tagged player keeps the item but loses the ability. They do not lose the click: the break or the place still…"
---

With `combat.block-tools: true`, a combat-tagged player keeps the item but loses the ability. They do not lose the click: the break or the place still happens, exactly as it would with the vanilla item the tool is made from. What they lose is the 3x3, the whole-tree fell and the wand square.

That is the whole trade-off. Cancelling the click outright would leave a player mid-fight unable to mine at all, which is a worse outcome than the one this prevents — a netherite pickaxe clearing a 3x3 escape tunnel while someone is swinging at them.

```yaml
combat:
  block-tools: true
  notify: true
  message-cooldown: 3s
```

Every key is in the [`combat` section of `config.yml`](/plugins/oberontools/configuration/config/#combat). Changes apply on `/oberontools reload`.

## Where the tag comes from

OberonTools never decides who is in combat. It asks, in this order:

1. **OberonCombat**, if installed. Its `CombatService` is found through the Bukkit services manager by class name and asked `isTagged(uuid)`. Nothing of OberonCombat is compiled against — it is a sibling plugin built in another repository, and one method on one interface is a small enough surface to resolve by reflection and pin with a test.
2. **PvPManager**, if installed and OberonCombat is not.
3. **Nobody.** With neither plugin present every player counts as out of combat, so the tools behave exactly as they did before this feature existed, whatever `block-tools` says.

OberonCombat replaces PvPManager, so when it is there it is the only source consulted — a `false` from it is a final answer, not a reason to go asking PvPManager as well. PvPManager is reached only if OberonCombat is absent, or if its service threw while answering; a failure is logged once at startup and the link is left absent rather than re-tried on every click.

### Inside PvPManager

PvPManager itself is three sources, tried in order:

1. `CombatPlayer.get(player).isInCombat()` — PvPManager's own live state, and the source of truth
2. PlaceholderAPI's `%pvpmanager_in_combat%`
3. the tag events OberonTools observed itself, aged out by `tag-cache-ttl` and cleared on death and quit

That ordering is not arbitrary. Trusting the local cache *over* PvPManager caused a real outage in OberonUtils: one leaked entry left a player permanently "in combat" here while PvPManager, and every other plugin, considered them free. With the cache last, the worst a stale entry can do is expire — which is why `tag-cache-ttl` is never consulted on a healthy server, and why it should sit comfortably above PvPManager's own tag duration.

A PvPManager build whose API has moved is handled the same way: named once in the console at startup, then treated as absent.

## What each tool does while tagged

| Tool | While tagged |
|---|---|
| [Area Mine](/plugins/oberontools/features/area-mine/) | The aimed block breaks. No cube, no secondary blocks — it is the netherite pickaxe it looks like. |
| [Timber](/plugins/oberontools/features/timber/) | The log they hit falls. The rest of the tree stays standing. |
| [Build Wand](/plugins/oberontools/features/build-wand/) | The one block they placed stays. No square. |
| [Liquid Clear](/plugins/oberontools/features/liquid-clear/) | **Nothing happens at all.** |

The bucket is the exception because there is nothing vanilla left to fall back on. A liquid tool's interact is cancelled before the ability runs, precisely so the bucket can never become a filled bucket — and that is exactly what should still hold mid-fight. A tagged player clicking it gets the message and no block change.

## The bypass permission

| Node | Default | Grants |
|---|---|---|
| `oberontools.combat.bypass` | `false` | Tool abilities keep working while combat-tagged |

Checked before the combat source is, and locally, so a staff member holding this node never costs a lookup. The order inside the guard is `block-tools` switch, then the bypass node, then the tag — cheapest first, which means a server with the feature off and a player with the node both short-circuit before anything leaves the process.

## The message

`tool.in-combat` in [`messages.yml`](/plugins/oberontools/configuration/messages/), with `%tool%`:

```yaml
tool:
  in-combat: "<prefix><yellow>Your <white>%tool%</white> works as a normal tool while you are in combat.</yellow>"
```

It is categorised `ERROR`, which the shipped `Presentation` block routes to `BOTH`. Route it per tool with that tool's `messages.error`, or one key at a time with `overrides: { in-combat: ACTION_BAR }`.

`message-cooldown` throttles it per player, and the sound rides the same throttle — a player under attack clicks constantly, and a line plus a note block per click is noise, not information. The throttle keeps no quit listener: an entry older than the cooldown can no longer suppress anything, so it is pruned on the next check and the map holds only the players told within the last cooldown.

With `notify: false` the refusal is completely silent. No line, no sound, and the tool simply behaves like the vanilla item — which is what a server that would rather not explain the rule mid-fight wants.

## Turning it off

```yaml
combat:
  block-tools: false
```

The combat lookup is skipped entirely from the next reload. Nothing is asked of OberonCombat or PvPManager, and every tool works in combat as it does anywhere else.
