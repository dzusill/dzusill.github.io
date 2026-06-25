---
title: "Installation"
description: "Drop these into your plugins/ folder and start the server once so they generate their files:"
---

## 1. Install the dependencies first

Drop these into your `plugins/` folder and start the server once so they generate their files:

1. **Vault** + an economy plugin (e.g. EssentialsX) — needed to charge for applying a stattrack.
2. **NBTAPI** — needed to store counters on items.

## 2. Drop in dStattrack

Place `dStattrack-1.3.jar` into `plugins/` and restart the server.

On first start the plugin creates:

```
plugins/dStattrack/
├── config.yml      # price, tracked items, lore, sounds, GUI
└── messages.yml    # all player-facing text (MiniMessage)
```

## 3. Verify it loaded

```
/plugins
```

`dStattrack` should be green. Then, holding a sword:

```
/dstattrack add
```

If you have the price and permission, the sword gains a **dStattrack** lore block. If you see *"Economy (Vault) is not available."*, Vault or your economy plugin isn't installed correctly — see [Requirements](/plugins/dstattrack/getting-started/requirements/).

## 4. Configure (optional)

- Change the price, tracked items, lore lines and sounds in [config.yml](/plugins/dstattrack/configuration/config/).
- Reword any message in [messages.yml](/plugins/dstattrack/configuration/messages/).
- Apply changes without a restart: `/dstattrack` does not have a reload subcommand — see [Reloading](/plugins/dstattrack/configuration/reloading/) for how config changes are applied.

Next: the [Quick Start](/plugins/dstattrack/getting-started/quick-start/).
