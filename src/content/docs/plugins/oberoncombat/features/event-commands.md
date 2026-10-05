---
title: "Commands on events"
description: "Run your own commands when something happens in a fight."
---

Run your own commands when something happens in a fight.

```yaml
event-commands:
  on-tag: ["!CONSOLE broadcast {player} is fighting {enemy}"]
  on-untag: []
  on-kill: ["!CONSOLE eco give {killer} 10"]
  on-respawn: ["!PLAYER spawn"]
  on-combat-log: ["!CONSOLE ban {player} 1h Combat logging"]
```

One command per list entry. Write the lists on **one line** (`[a, b]`), as everywhere in this config.

## When each runs

| Key | Runs | `!PLAYER` runs as |
|---|---|---|
| `on-tag` | when a fight **begins** for a player, for each side; not on a renewal | the tagged player |
| `on-untag` | when the tag ends, for any reason | the untagged player |
| `on-kill` | on every PvP kill that rewards (see the notes) | the killer |
| `on-respawn` | when a player **killed by a player** respawns, once per kill | the respawned player |
| `on-combat-log` | when a combat log is punished | nobody: only console lines run, the player is leaving |

## Who runs it

A line may start with `!CONSOLE` or `!PLAYER`. Without either, it runs as the console. A leading `/` is dropped. A `!PLAYER`
line with nobody to run as is skipped. Console commands go to the main thread and player commands to the player's own, so
this is safe on Folia.

## Tokens

Written in braces, replaced before the command runs:

| Token | Value |
|---|---|
| `{player}` | the player the event is about |
| `{enemy}` | the other side, or empty |
| `{killer}`, `{victim}` | for `on-kill` and `on-respawn` |
| `{item}` | for `on-kill`: the material of the killer's item in hand, such as `DIAMOND_SWORD`, or `AIR` for an empty hand. Never the item's own name: a player can rename an item to anything |

The [kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/) uses the same mechanism for its own `commands`.

## Notes

- `on-kill` runs only for a kill that is allowed to reward: not in a [duel](/plugins/oberoncombat/features/duels/), not past the
  [kill-abuse](/plugins/oberoncombat/features/kill-abuse/) limit, not in a place excluded for `event-commands`. A farmed kill hands out nothing.
- A place excluded for `event-commands` (see [Exclusions](/plugins/oberoncombat/features/exclusions/)) runs none of the five.
- Commands run with the permissions of whoever runs them. A `!PLAYER` line is only as powerful as that player.
