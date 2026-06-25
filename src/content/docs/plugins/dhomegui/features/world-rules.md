---
title: "World Rules"
description: "Control where players may set homes, under Settings.Worlds in config.yml."
---

Control where players may set homes, under `Settings.Worlds` in [config.yml](/plugins/dhomegui/configuration/config/).

```yaml
Settings:
  Worlds:
    Disallowed:
      - blacklisted_world
    WhitelistOnly: false
    Allowed:
      - world
      - world_nether
      - world_the_end
    RespectWorldGuard: true
```

## Blacklist vs whitelist

| Key | Effect |
|---|---|
| `Disallowed` | Homes **cannot** be created in these worlds. |
| `WhitelistOnly` | If `true`, homes can **only** be created in the `Allowed` worlds. |
| `Allowed` | The permitted worlds when `WhitelistOnly` is on. |

Blocked attempts show *"You can't set homes in this world."* The permission `dhomegui.bypass.worlds` ignores all world restrictions.

## Nether & End

Setting homes in the nether or end is gated behind dedicated permissions (both `default: true`):

| Permission | Allows |
|---|---|
| `dhomegui.world.nether` | Setting homes in the nether. |
| `dhomegui.world.end` | Setting homes in the end. |

Revoke them to stop a rank from setting homes there (*"You don't have permission to set homes in the nether/end."*).

## WorldGuard regions

With `RespectWorldGuard: true` and WorldGuard installed, `/sethome` is blocked inside regions where the player **cannot build** — stopping players from homing into claims and protected areas. Blocked attempts show *"You can't set a home inside this protected region."*

> WorldGuard is optional; with it absent, `RespectWorldGuard` simply has no effect.
