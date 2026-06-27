---
title: "Commands & Permissions"
description: "Commands are registered at runtime by DzusillCore — there are no entries in plugin.yml. Renaming the shop command (shop.command) therefore needs a restart."
---

## Commands

| Command | Permission | Description |
|---|---|---|
| `/market` | `drotatingshop.use` | Open the rotating shop. The name is set by `shop.command` in [config.yml](/plugins/drotatingshop/configuration/config/) — `market` is the default. Refused while the market is [closed](/plugins/drotatingshop/features/opening-hours/). |
| `/dshop seed` | `drotatingshop.admin` | Load the bundled [1.21 price list](/plugins/drotatingshop/configuration/default-prices/) into the pool (skips ids that already exist). |
| `/dshop additem <price> <stock> [limit]` | `drotatingshop.admin` | Add the item in your hand to the pool. `stock`/`limit` use `-1` for unlimited; `limit` defaults to `-1`. |
| `/dshop removeitem <id>` | `drotatingshop.admin` | Remove an item from the pool (tab-completes ids). |
| `/dshop list [page]` | `drotatingshop.admin` | List the pool (prices, stock, limits), **paginated** with clickable `[◀ Prev] [Next ▶]`. Page size = `shop.list-page-size` (default 20). |
| `/dshop search <keyword> [page]` | `drotatingshop.admin` | Paginated list of items whose **id or display name** contains the keyword. |
| `/dshop rotate` | `drotatingshop.admin` | Force a rotation now (also opens a fresh window if you use opening hours). |
| `/dshop reload` | `drotatingshop.admin` | Reload `config.yml` / `items.yml` / `quantity-menu.yml` / `messages.yml`. |

Commands are registered at runtime by DzusillCore — there are **no entries in `plugin.yml`**. Renaming the shop command (`shop.command`) therefore needs a **restart**.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `drotatingshop.use` | **everyone** | Open the shop and buy. |
| `drotatingshop.admin` | op | Every `/dshop` subcommand (seed, additem, removeitem, list, search, rotate, reload). |
| `drotatingshop.group.<name>` | — | Marks a player as part of a perk [group](/plugins/drotatingshop/features/pricing-and-perks/) (e.g. `drotatingshop.group.vip`). Grant it to give better pricing / limits. |

### Suggested setup

```
# everyone can already open and buy (drotatingshop.use is default true)

# give your staff rank the admin commands
/lp group admin permission set drotatingshop.admin true
```

> To **close** the shop to a group, negate the default: `/lp group <group> permission set drotatingshop.use false`.
