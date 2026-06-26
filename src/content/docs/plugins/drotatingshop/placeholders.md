---
title: "Placeholders"
description: "With PlaceholderAPI installed, DRotatingShop registers the drotatingshop expansion. Use it anywhere PAPI is supported — scoreboards, tab, chat, holograms."
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, DRotatingShop registers the `drotatingshop` expansion. Use it anywhere PAPI is supported — scoreboards, tab, chat, holograms.

| Placeholder | Returns |
|---|---|
| `%drotatingshop_next_rotation%` | Time until the next [rotation](/plugins/drotatingshop/features/rotations/), formatted compactly — e.g. `1h 5m 3s`. |

### Example

```
Next market refresh: %drotatingshop_next_rotation%
```

renders as e.g. `Next market refresh: 1h 5m 3s`.

> The expansion is only registered when PlaceholderAPI is present at startup; it is a soft dependency, so DRotatingShop runs fine without it. It is also the same value shown on the countdown clock in the [shop menu](/plugins/drotatingshop/features/the-shop-menu/).
