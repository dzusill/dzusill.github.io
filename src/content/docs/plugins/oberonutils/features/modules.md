---
title: "Modules"
description: "Six independent modules — turn any of them off and the rest carry on."
---

```yaml
modules:
  combat: true
  teleport: true
  keyall: true
  kill: true
  nightvision: true
  ping: true
```

A disabled module registers **nothing** — no commands, no listeners, no scheduled tasks. It is not
loaded and quietly skipping work; it does not exist.

| Module | Commands | Optional integrations |
|---|---|---|
| [Combat](/plugins/oberonutils/features/combat/) | — | PvPManager |
| [Teleport](/plugins/oberonutils/features/teleport/) | `/spawn` `/setspawn` `/delspawn` `/warp` `/setwarp` `/delwarp` `/kothcooldown` | WorldGuard, AxKoth, PvPManager |
| [Key All](/plugins/oberonutils/features/key-all/) | `/keyall` | PlaceholderAPI |
| [Kill](/plugins/oberonutils/features/kill-menu/) | `/kill` `/suicide` | PvPManager |
| [Night Vision](/plugins/oberonutils/features/night-vision/) | `/nightvision` `/nv` | — |
| [Ping](/plugins/oberonutils/features/ping/) | `/ping` | PremiumVanish / SuperVanish |

`/oberonutils` is always registered, regardless of which modules are on.

## Turning one off needs a restart

Not a reload. Commands are registered at startup, so switching a module on or off only takes effect
next boot. Everything else — messages, warps, cooldowns, the crate table — applies with
`/oberonutils reload`.

## Why teleport is one module and not two

`/spawn` and `/warp` are the same feature twice: the same countdown, the same move-cancel, the same
bypass rules. Kept apart, they drifted, and both stored the player's start position in the same
place — which is what produced the console errors this plugin replaced.

Merging them means the fix only has to exist once. It also means anything you can do to a warp —
per-destination cooldowns, arrival effects, custom countdown text — the engine can do for spawn too.

## Running only part of it

Nothing here assumes another module is on. Some combinations are worth knowing:

- **Teleport off, everything else on** — keeps EssentialsX's `/spawn` and `/warp`, and you do not
  need to disable those in its config.
- **Combat off** — the placement cooldowns and the tag fix both go. `teleport.block-while-tagged`
  and `kill.block-in-combat` still work, since they ask PvPManager directly.
- **Key All off** — `%oberon_keyall_timer%` stops being registered. Anything displaying it shows the
  raw placeholder, so clear it from your scoreboard too.
