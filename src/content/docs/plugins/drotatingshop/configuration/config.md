---
title: "config.yml"
description: "The settings file at plugins/DRotatingShop/config.yml. Display strings are MiniMessage. Two sections: shop and gui."
---

The settings file at `plugins/DRotatingShop/config.yml`. Display strings are [MiniMessage](https://docs.advntr.dev/minimessage/format.html). Two sections: `shop` and `gui`.

```yaml
shop:
  command: "market"               # players open the shop with this command
  rotation-interval: 3600          # seconds between rotations (default: 1 hour)
  items-per-rotation: 7            # items shown per rotation (max 7)

gui:
  title: "<dark_gray><bold>ROTATING MARKET</bold></dark_gray>"
  fill-material: BLACK_STAINED_GLASS_PANE
```

## shop

| Key | Default | Description |
|---|---|---|
| `command` | `market` | The command that opens the shop GUI. Registered at runtime, so changing it just works after a restart (it is **not** in `plugin.yml`). |
| `rotation-interval` | `3600` | Seconds between [rotations](/plugins/drotatingshop/features/rotations/). |
| `items-per-rotation` | `7` | How many items a rotation shows. The GUI has **7** item slots, so larger values are capped at 7. |

> Changing `command` needs a **restart** to re-register the command. The other keys take effect on [reload](/plugins/drotatingshop/configuration/reloading/) (the new interval applies at the next reschedule).

## gui

| Key | Default | Description |
|---|---|---|
| `title` | `ROTATING MARKET` | MiniMessage title of the shop inventory. |
| `fill-material` | `BLACK_STAINED_GLASS_PANE` | Material used to fill the empty slots around the items and clock. |

See [The Shop Menu](/plugins/drotatingshop/features/the-shop-menu/) for the slot layout.
