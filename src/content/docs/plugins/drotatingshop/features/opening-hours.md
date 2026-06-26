---
title: "Opening Hours"
description: "By default the market is always open — players can /market any time and only the items rotate. Optionally, you can make the market open for a short window…"
---

By default the market is **always open** — players can `/market` any time and only the items rotate. Optionally, you can make the market open for a short **window** after each rotation and close in between, so it feels like a timed event.

## The setting

One key in [config.yml](/plugins/drotatingshop/configuration/config/):

```yaml
shop:
  rotation-interval: 3600     # items rotate every hour
  open-duration: 120          # market is OPEN for 120s after each rotation, then closed
```

| `open-duration` | Behaviour |
|---|---|
| `0` (default) | **Always open.** Only the items rotate. |
| `> 0` | Open for that many **seconds** after each rotation, then **closed** until the next one. |

With the example above the cycle is: rotation → **open 2 minutes** → **closed 58 minutes** → next rotation re-opens.

## What "closed" means

While the market is closed:

- `/market` is **refused** with the `market-closed` message and a countdown — *"The market is closed. Opens in 57m 12s."*
- Any **open shop or buy menus are force-closed** the moment the window ends, so nobody keeps buying past closing time.

When the next rotation fires, the market opens again — and because the rotation also sends the `rotation-broadcast`, online players get pinged exactly when it opens.

## Timing notes

- The open window starts at **each rotation**, so it aligns with `rotation-interval`. Open duration should be **shorter** than the interval (a longer-or-equal value just means always open).
- Changing `open-duration` takes effect from the **next rotation** after a [reload](/plugins/drotatingshop/configuration/reloading/). Run `/dshop rotate` to apply it immediately (and open a fresh window now).
- The window is **restart-safe**: if the server restarts while the market is open, it stays open for the remaining time.

## Placeholders

For scoreboards/holograms (with PlaceholderAPI):

| Placeholder | Returns |
|---|---|
| `%drotatingshop_open%` | `true` while open, `false` while closed. |
| `%drotatingshop_next_open%` | Countdown to the next opening (`0s` while already open). |

See [Placeholders](/plugins/drotatingshop/placeholders/).
