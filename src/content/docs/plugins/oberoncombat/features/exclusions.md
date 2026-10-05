---
title: "Exclusions"
description: "Exclusions say where the plugin does not apply. They are one section, not one per feature:"
---

Exclusions say **where** the plugin does not apply. They are one section, not one per feature:

```yaml
exclusions:
  profiles:
    tournament:
      worlds: []
      regions: [tourny]
    arenas:
      worlds: ["Arenas*"]
    spawn:
      worlds: []
      regions: [spawn]
  global: [tournament, arenas]
  features:
    money-steal: [spawn]
    kill-effect: [spawn]
```

- **Profiles** are named places. A profile matches a spot when **either** one of its world patterns **or** one of its
  regions matches.
- **`global`** lists profiles where the whole plugin is off: no tagging, no cooldowns, no blacklist, nothing.
- **`features`** lists, per feature, the profiles where that one feature is off.

## Matching rules

- **Worlds** are matched by glob (`Arenas*`, `world_*`), case-insensitive.
- **Regions** are matched by **exact id**, never by substring: a region called `spawn_pvp` is not `spawn`.
- Region ids need WorldGuard. Without it, only worlds are checked and the console says so at startup.
- A mistake is reported by key name and skipped: a profile named under `global` or `features` that does not exist, or a
  feature name that is not one of those below.

## Features

| Key | Switches off |
|---|---|
| `tag` | tagging |
| `command-blacklist` | the command blacklist |
| `item-cooldowns` | the item cooldowns |
| `money-steal` | money steal |
| `exp-steal` | experience steal |
| `kill-effect` | the lightning |
| `soup` | soup PvP and `/soup` |
| `barrier` | the barrier, and the [vulnerable](/plugins/oberoncombat/features/barrier/) rule |
| `combat-log` | the combat log punishment |
| `restrictions` | [restrictions](/plugins/oberoncombat/features/restrictions/) |
| `tag-effects` | [tag effects](/plugins/oberoncombat/features/restrictions/) |
| `kill-abuse` | the [kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/) |
| `event-commands` | every [command on an event](/plugins/oberoncombat/features/event-commands/) |

For effects that involve two players (money, experience, lightning, kill abuse, `on-kill`) it is enough that **either** the killer or
the victim stands in an excluded place.

## Per-player exemptions

Where exclusions are about places, [permissions](/plugins/oberoncombat/reference/permissions/) are about people:
`oberoncombat.exempt.tag`, `.commands`, `.combatlog`, `.moneysteal`, `.expsteal`, `.pve`, `.restrictions`, `.tageffects`,
`.killabuse`, `.pvpcooldown`. The parent `oberoncombat.exempt` grants all of them. The `oberoncombat.*` wildcard does
**not** include them: an admin group with `oberoncombat.*` is still tagged.
