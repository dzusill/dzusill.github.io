---
title: "Commands & Permissions"
description: "One command per toggle plus the admin command. Every name and permission comes from the config."
---

## Player commands

One per configured toggle. These two ship:

| Command | Aliases | Default permission | Default |
|---|---|---|---|
| `/mob` | `/mobs` | `oberonmob.toggle.mobs` | everyone |
| `/phantoms` | `/phantom` | `oberonmob.toggle.phantoms` | everyone |

Each toggles that kind of mob around the player, and confirms with an action bar and a sound.

Names, aliases and permissions are all set per toggle in `config.yml` — see [Adding your own toggle](/plugins/oberonmob/features/custom-toggles/).

## Admin command

`/oberonmob`, aliases `/omob` and `/om`. Everything under it needs `oberonmob.admin`.

| Command | Description |
|---|---|
| `/oberonmob` | Show the usage list. |
| `/oberonmob reload` | Reload `config.yml` and `messages.yml`. |
| `/oberonmob status` | Every toggle: mode, radius, entity count, your state, how many players have it off. |

### `status` is the one to run first

```
2 toggle(s), stored in database:
» mobs (/mob) | CANCEL_SPAWN | 256 blocks | 74 entities | you: on | 0 off
» phantoms (/phantoms) | CANCEL_SPAWN | 256 blocks | 1 entities | you: on | 0 off
```

**The entity count is the useful number.** It is the quickest way to confirm that `#ENEMY` and your exclusions produced the list you meant. A number far lower than expected means a typo in `Entities`; check the console for `Unknown entity or group`.

`stored in database` vs `stored in memory` tells you whether toggles will survive a restart.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonmob.admin` | op | `/oberonmob` and all subcommands. |
| `oberonmob.toggle.mobs` | everyone | Use `/mob`. |
| `oberonmob.toggle.phantoms` | everyone | Use `/phantoms`. |
| `oberonmob.*` | op | Everything above. |

### A toggle you add

`plugin.yml` cannot declare a node for a toggle you invent — it is written before the config is read. Grant it yourself:

```
/lp group default permission set oberonmob.toggle.creepers true
```

Without that, only ops can use the new command.

### Restricting a toggle

The shipped toggles default to everyone, which is usually what you want. To make one a perk:

```
/lp group default permission set oberonmob.toggle.phantoms false
/lp group vip permission set oberonmob.toggle.phantoms true
```

A player who loses the permission keeps whatever they had set — the toggle stays in whatever state it was in, they just cannot change it. Use `Default-Disabled` if you want a specific starting state instead.

## Tab completion

Both subcommands of `/oberonmob` tab-complete. The toggle commands take no arguments.
