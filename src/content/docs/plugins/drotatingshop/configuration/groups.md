---
title: "groups.yml"
description: "plugins/dRotatingShop/groups.yml defines perk groups — better pricing and/or a per-player limit override, matched by permission. See Pricing & Perks for the…"
---

`plugins/dRotatingShop/groups.yml` defines **perk groups** — better pricing and/or a per-player limit override, matched by permission. See [Pricing & Perks](/plugins/drotatingshop/features/pricing-and-perks/) for the concept. Reloads with `/dshop reload`.

It **ships empty** (`groups: {}`) with commented examples, so there's no effect until you add a group and grant its permission.

```yaml
groups:
  vip:
    permission: "drotatingshop.group.vip"   # grant this to put a player in the group
    priority: 10                              # highest wins if a player matches several
    price:
      mode: percent                           # percent | fixed
      value: 10                               # percent: 10% off  |  fixed: the final price
    limit: 16                                 # flat per-player limit for every item (-1 = unlimited)
  mvp:
    permission: "drotatingshop.group.mvp"
    priority: 20
    price: { mode: fixed, value: 50 }         # everything costs 50 for MVP
    limit: 32
```

## Fields

| Field | Required | Description |
|---|---|---|
| `permission` | no | Node a player must have. Default: `drotatingshop.group.<name>`. |
| `priority` | no | Higher wins when a player matches multiple groups. Default `0`. |
| `price.mode` | no | `percent` (a discount) or `fixed` (the final price). Omit the whole `price` block for no price perk. |
| `price.value` | with `price` | For `percent`, the discount % (10 = 10% off). For `fixed`, the final price. |
| `limit` | no | Flat per-player limit override for **every** item (`-1` = unlimited). Omit to keep each item's own `per-player-limit`. |

## Notes

- **Fixed price ignores** both the item's base price and the [global adjustment](/plugins/drotatingshop/configuration/config/#pricing) — the group simply pays `value`.
- **Percent** stacks *after* the global adjustment.
- Groups are matched on **every** permission you grant, so they work per-world/per-rank if your permission plugin does.
- Stock is a shared server-wide pool — it isn't per-group. Only price and per-player limit change.

## Granting a group

```
/lp user <player> permission set drotatingshop.group.vip true
# or to a whole rank:
/lp group vip permission set drotatingshop.group.vip true
```

Then `/dshop reload` (or just edit `groups.yml` and reload).
