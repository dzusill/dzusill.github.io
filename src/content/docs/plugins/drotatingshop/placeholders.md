---
title: "Placeholders"
description: "With PlaceholderAPI installed, dRotatingShop registers the drotatingshop expansion. Use it anywhere PAPI is supported — scoreboards, tab, chat, holograms."
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, dRotatingShop registers the `drotatingshop` expansion. Use it anywhere PAPI is supported — scoreboards, tab, chat, holograms.

| Placeholder | Returns |
|---|---|
| `%drotatingshop_next_rotation%` | Time until the next [rotation](/plugins/drotatingshop/features/rotations/), formatted compactly — e.g. `1h 5m 3s`. |
| `%drotatingshop_open%` | `true` while the market is open, `false` while [closed](/plugins/drotatingshop/features/opening-hours/). (Always `true` when `open-duration` is `0`.) |
| `%drotatingshop_next_open%` | Countdown to the next opening — `0s` while already open. |

### Example

```
Market: %drotatingshop_open%
Next refresh: %drotatingshop_next_rotation%
Opens in: %drotatingshop_next_open%
```

renders as e.g.:

```
Market: true
Next refresh: 1h 5m 3s
Opens in: 0s
```

> The expansion is only registered when PlaceholderAPI is present at startup; it is a soft dependency, so dRotatingShop runs fine without it. `%drotatingshop_next_rotation%` is also the value shown on the countdown clock in the [shop menu](/plugins/drotatingshop/features/the-shop-menu/).
