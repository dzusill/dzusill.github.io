---
title: "Commands & Permissions"
description: "Every command and every node, including the ones carried over unchanged from the Skript setup."
---

## Teleport

| Command | Permission | Does |
|---|---|---|
| `/spawn` | none | Teleport yourself to spawn, after the countdown |
| `/spawn <player>` | `spawn.others` | Send someone to spawn immediately, no countdown |
| `/setspawn` | `spawn.setspawn` | Set spawn to where you stand, facing included |
| `/delspawn` | `spawn.delspawn` | Unset spawn |
| `/warp` | none | Open the warps menu |
| `/warp <name>` | none, or the warp's own | Teleport to a warp |
| `/setwarp <name>` | `warp.setwarp` | Create or move a warp |
| `/delwarp <name>` | `warp.delwarp` | Delete a warp |
| `/kothcooldown` | `warp.clearcooldown` | Clear your own warp cooldowns |
| `/kothcooldown <player>` | `warp.clearcooldown` | Clear someone else's |

`warp.bypass` skips the teleport countdown **and** warp cooldowns. One node, both jobs — deliberately
kept that way.

## Kill

| Command | Permission | Does |
|---|---|---|
| `/suicide` | none | Confirmation menu for yourself |
| `/kill` | none | Same as `/suicide` |
| `/kill <player>` | `staff.kill.others` | Confirmation menu for someone else |

`/suicide` reads as a suicide death. `/kill <player>` deliberately does not.

## The rest

| Command | Permission | Does |
|---|---|---|
| `/nightvision`, `/nv` | none | Toggle permanent night vision |
| `/nv <player>` | `oberonutils.admin` | Toggle it for someone else |
| `/ping` | none | Your latency |
| `/ping <player>` | none | Someone else's |
| `/keyall time\|next\|force\|reset` | `oberonutils.admin` | Inspect or control the drop timer |
| `/oberonutils reload` | `oberonutils.admin` | Reread every config |
| `/oberonutils migrate [path]` | `oberonutils.admin` | Import Skript data |
| `/oberonutils hooks` | `oberonutils.admin` | Show which integrations connected |

## Permission nodes

Nodes carried over from the Skript setup, unchanged — nothing in your permissions plugin needs
touching:

| Node | Default | Gates |
|---|---|---|
| `staff.kill.others` | op | `/kill <player>` |
| `spawn.others` | op | `/spawn <player>` |
| `spawn.setspawn` | op | `/setspawn` |
| `spawn.delspawn` | op | `/delspawn` |
| `warp.setwarp` | op | `/setwarp` |
| `warp.delwarp` | op | `/delwarp` |
| `warp.bypass` | op | Skip the teleport countdown and warp cooldowns |
| `warp.clearcooldown` | op | `/kothcooldown` |

Added, because nothing equivalent existed:

| Node | Default | Gates |
|---|---|---|
| `oberonutils.admin` | op | `/oberonutils`, `/keyall`, `/nv <player>` |
| `oberonutils.warp.<name>` | unset | A specific warp, when you add `permission:` to it |

Recognised but owned by other plugins:

| Node | From | Used for |
|---|---|---|
| `pv.see` | PremiumVanish | Seeing vanished players in `/ping` |
| `pvpmanager.exempt` | PvPManager | Exemption from combat tagging |

## Deliberately ungated

`/ping`, `/nightvision`, `/suicide` and `/warp <name>` have **no permission** — open to every player,
matching the Skript setup exactly.

Each can be gated if you want:

```yaml
ping:
  permission: oberonutils.ping
  permission-others: oberonutils.ping.others

nightvision:
  permission: oberonutils.nightvision
```

For a warp, add `permission:` to its entry in `warps.yml`.
