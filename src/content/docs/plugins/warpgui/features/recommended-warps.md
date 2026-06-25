---
title: "Recommended Warps"
description: "\"Recommended\" (internally Topped) warps are promoted to the front of the menu for a set number of days. Promotion is usually paid, making it a nice money…"
---

"Recommended" (internally *Topped*) warps are promoted to the front of the menu for a set number of days. Promotion is usually **paid**, making it a nice money sink and a way for players to advertise their shops.

Enable the feature and tune it under `Settings.Topped` in [config.yml](/plugins/warpgui/configuration/config/):

```yaml
Settings:
  Topped:
    Enabled: true
    TopDisplayNameColor: '<blue>'
    TopWarpLore:
      - ''
      - ' <white><bold>»</bold></white> <blue><bold>RECOMMENDED WARP</bold></blue>'
    ToppedDays: 30
    UsePrice: true
    Price: 10000
    UseConsoleCommands: false
    ConsoleCommands:
      - 'say {0} promoted warp {2} for {1}$ for {3} days until {4}'
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `true` | Toggle the Recommended tab and promotion. |
| `TopDisplayNameColor` | `<blue>` | Colour applied to a promoted warp's name. |
| `TopWarpLore` | see above | Extra lore appended to promoted warps. |
| `ToppedDays` | `30` | How long a promotion lasts. |
| `UsePrice` | `true` | Charge the player to promote (needs Vault). Set `false` to make it free. |
| `Price` | `10000` | Promotion cost when `UsePrice` is on. |
| `UseConsoleCommands` | `false` | Run console commands on promotion (e.g. broadcast). |
| `ConsoleCommands` | — | Commands to run. Placeholders: `{0}` player, `{1}` price, `{2}` warp, `{3}` days, `{4}` expiry date. |

## Promoting a warp

A player opens their warp's [edit menu](/plugins/warpgui/features/editing-warps/) and **double-clicks "Recommend My Warp"**. If `UsePrice` is on, the `Price` is withdrawn through Vault; without enough money they see *"Not enough money to promote your warp!"*. Promoting requires `warpgui.edit.top`.

A promoted warp:

- appears in the **Recommended** tab and floats to the top of listings,
- shows the recommended colour and lore,
- stays promoted until its expiry (`ToppedDays` from now).

> The displayed price in the button lore is cosmetic — the real cost is `Settings.Topped.Price`.
