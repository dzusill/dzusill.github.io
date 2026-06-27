---
title: "Pricing & Perks"
description: "Two ways to bend prices: a temporary global adjustment for everyone, and per-group perks (better pricing + higher limits) for VIPs, donors, or any…"
---

Two ways to bend prices: a **temporary global adjustment** for everyone, and **per-group perks** (better pricing + higher limits) for VIPs, donors, or any permission group.

## Temporary global adjustment

A signed percentage applied to **every** item's price while it's enabled — a weekend markup or a sale. In [config.yml](/plugins/drotatingshop/configuration/config/):

```yaml
pricing:
  temporary-adjustment:
    enabled: true       # flip to false to end it
    percent: -20        # 20% off everything   (or 20 for a +20% markup)
```

`/dshop reload` to apply. It affects everyone; group perks still apply on top.

## Group perks

Groups are defined in [groups.yml](/plugins/drotatingshop/configuration/groups/) and matched by **permission**, so you grant them with LuckPerms (or any permission plugin). A player who matches several groups gets the **highest-priority** one.

Each group can give:

- **Better pricing** — either a **percentage discount** (`mode: percent`, e.g. 10% off) or a **fixed final price** (`mode: fixed`, e.g. everything costs 50).
- **A flat per-player limit override** — e.g. VIP can buy up to 16 of any item per rotation, regardless of the item's own limit.

```yaml
groups:
  vip:
    permission: "drotatingshop.group.vip"
    priority: 10
    price: { mode: percent, value: 10 }   # 10% off
    limit: 16
```

Grant it: `/lp user <player> permission set drotatingshop.group.vip` → `/dshop reload`.

## How a final price is worked out

```
if the player's group has a FIXED price → that's the price (ignores base + global)
otherwise:
    start from the item's base price
    apply the global adjustment   (if enabled)
    apply the group's % discount   (if any)
floor at 0, round to 2 decimals
```

So a 100-coin item with a `+20%` global markup and a VIP `10%` discount costs `100 × 1.20 × 0.90 = 108`. An MVP on `mode: fixed, value: 50` always pays `50`.

## Where it shows

Prices and limits are **per viewer** — each player sees their own in the [shop menu](/plugins/drotatingshop/features/the-shop-menu/) and the [buy menu](/plugins/drotatingshop/features/the-buy-menu/), and is charged accordingly. `/dshop list` still shows the **base** values (admin view).

> Stock is a single server-wide pool, so it isn't per-group — only the **price** and the **per-player limit** change per group.
