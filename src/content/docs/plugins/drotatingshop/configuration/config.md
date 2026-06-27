---
title: "config.yml"
description: "The settings file at plugins/dRotatingShop/config.yml. Display strings are MiniMessage. Sections: shop, gui, pricing, seed, sounds."
---

The settings file at `plugins/dRotatingShop/config.yml`. Display strings are [MiniMessage](https://docs.advntr.dev/minimessage/format.html). Sections: `shop`, `gui`, `pricing`, `seed`, `sounds`.

```yaml
shop:
  command: "market"               # players open the shop with this command
  rotation-interval: 3600          # seconds between rotations (default: 1 hour)
  open-duration: 0                 # seconds the market is open after each rotation (0 = always open)
  items-per-rotation: 7            # items shown per rotation (max 7)
  list-page-size: 20               # results per page in /dshop list and /dshop search

gui:
  title: "<dark_gray><bold>ROTATING MARKET</bold></dark_gray>"
  fill-material: BLACK_STAINED_GLASS_PANE

seed:
  default-stock: 64                # stock given to each item seeded from prices_1_21.yml
  default-per-player-limit: 8      # per-player limit for each seeded item

sounds:
  enabled: true                    # master toggle (see the Sounds page)
  # ... per-event sound / volume / pitch ...
```

## shop

| Key | Default | Description |
|---|---|---|
| `command` | `market` | The command that opens the shop GUI. Registered at runtime, so changing it just works after a restart (it is **not** in `plugin.yml`). |
| `rotation-interval` | `3600` | Seconds between [rotations](/plugins/drotatingshop/features/rotations/). |
| `open-duration` | `0` | Seconds the market stays **open** after each rotation; `0` = always open. See [Opening Hours](/plugins/drotatingshop/features/opening-hours/). |
| `items-per-rotation` | `7` | How many items a rotation shows. The GUI has **7** item slots, so larger values are capped at 7. |
| `list-page-size` | `20` | Results per page in `/dshop list` and `/dshop search`. |

> Changing `command` needs a **restart** to re-register the command. The other keys take effect on [reload](/plugins/drotatingshop/configuration/reloading/) (the new interval / open window apply at the next rotation).

## gui

| Key | Default | Description |
|---|---|---|
| `title` | `ROTATING MARKET` | MiniMessage title of the shop inventory. |
| `fill-material` | `BLACK_STAINED_GLASS_PANE` | Material used to fill the empty slots around the items and clock. |

See [The Shop Menu](/plugins/drotatingshop/features/the-shop-menu/) for the slot layout. The **buy menu** is styled separately in [quantity-menu.yml](/plugins/drotatingshop/configuration/quantity-menu/).

## pricing

A temporary blanket adjustment to **every** item's price.

```yaml
pricing:
  temporary-adjustment:
    enabled: false      # turn the adjustment on/off
    percent: 20         # signed: 20 = +20% markup, -15 = 15% sale
```

| Key | Default | Description |
|---|---|---|
| `temporary-adjustment.enabled` | `false` | Whether the blanket adjustment is active. |
| `temporary-adjustment.percent` | `20` | Signed percent applied to every base price while enabled. |

Per-group pricing and limit perks live in their own file — see [Pricing & Perks](/plugins/drotatingshop/features/pricing-and-perks/) and [groups.yml](/plugins/drotatingshop/configuration/groups/).

## seed

Used only by the one-time first-run seed and by `/dshop seed` — these fill in stock/limit for items copied from the bundled price list (which only carries prices).

| Key | Default | Description |
|---|---|---|
| `default-stock` | `64` | Starting global stock for each seeded item. |
| `default-per-player-limit` | `8` | Per-player limit for each seeded item. |

See [Default Prices](/plugins/drotatingshop/configuration/default-prices/).

## sounds

A `sounds.enabled` toggle plus a block per event. Documented on its own page — see [Sounds](/plugins/drotatingshop/configuration/sounds/).
