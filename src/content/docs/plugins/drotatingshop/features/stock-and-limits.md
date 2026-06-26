---
title: "Stock & Purchase Limits"
description: "Every item carries two independent caps: a global stock and a per-player limit. Both are set per item (in items.yml or when you /dshop additem) and both use…"
---

Every item carries two independent caps: a **global stock** and a **per-player limit**. Both are set per item (in [items.yml](/plugins/drotatingshop/configuration/items/) or when you `/dshop additem`) and both use `-1` to mean *unlimited*.

## Global stock

`stock` is how many copies are available **across the whole server** for the current rotation.

- Each purchase decrements it by one.
- At `0` the item is **sold out** — it stays in the GUI, greyed-out and unclickable, until the next rotation.
- `stock: -1` = unlimited; it never decrements and never sells out.
- On every [rotation](/plugins/drotatingshop/features/rotations/) the shown items' stock is reset to its configured starting value.

## Per-player limit

`per-player-limit` is how many times **one player** may buy that item **per rotation**.

- Counts up per purchase, per player.
- At the limit, that player gets the *"reached your purchase limit"* message; others are unaffected.
- `per-player-limit: -1` = no cap.
- **Resets every rotation** — a new rotation gives everyone a clean slate.

## Example

```yaml
items:
  diamond_sword:
    display-name: "<aqua>Rotation Sword"
    material: DIAMOND_SWORD
    price: 2500.0
    stock: 50             # 50 available this rotation, server-wide
    per-player-limit: 1   # each player may buy 1 per rotation
  diamond:
    display-name: "<aqua>Diamond"
    material: DIAMOND
    price: 250.0
    stock: -1             # unlimited
    per-player-limit: -1  # no per-player cap
```

## Persistence

Live stock and per-player counts are written to [data.yml](/plugins/drotatingshop/configuration/data/) on every purchase and every rotation, so they survive restarts. You never edit that file by hand — change the **starting** values in `items.yml` (then [reload](/plugins/drotatingshop/configuration/reloading/)); the new numbers take effect on the next rotation.
