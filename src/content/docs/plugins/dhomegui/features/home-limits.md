---
title: "Home Limits & Buying Slots"
description: "How many homes a player may keep is the sum of a permission tier, an optional LuckPerms meta value, and any slots they've purchased — unless they have the…"
---

How many homes a player may keep is the sum of a permission tier, an optional LuckPerms meta value, and any slots they've purchased — unless they have the unlimited bypass.

## The limit, step by step

1. **Base** — `Settings.SetHome.DefaultLimit` (default `1`): the floor everyone gets.
2. **Permission tier** — the **highest** `dhomegui.homes.<n>` the player has. The effective tier is `max(highest dhomegui.homes.<n>, DefaultLimit)`.
3. **LuckPerms meta** — when LuckPerms is installed, the `homes` meta value is also considered.
4. **Purchased slots** — slots bought in the [Buy Slots](#buying-slots) menu stack on top.
5. **Unlimited** — `dhomegui.homes.unlimited` removes the cap entirely.

```
# everyone can set 1 (DefaultLimit); give ranks more:
/lp group default permission set dhomegui.homes.3 true
/lp group vip     permission set dhomegui.homes.10 true
/lp group mvp     permission set dhomegui.homes.unlimited true

# via LuckPerms meta instead of a numbered node:
/lp group vip meta set homes 10
```

Hitting the cap shows *"You've reached your home limit! (current/limit)"*.

## Buying slots

When [economy](/plugins/dhomegui/features/economy/) is enabled, players can buy extra home slots from the GUI:

```yaml
Settings:
  Economy:
    Enabled: true
    SlotsPerPurchase: 1
    Costs:
      BuySlot: 1000
```

Each purchase adds `SlotsPerPurchase` slot(s) for the `BuySlot` price, on top of their permission tier. Purchased slots are saved per player (in `playerdata.yml` or the database), so they persist.

> `dhomegui.bypass.cost` skips all economy charges, including buying slots (it's effectively free for them).
