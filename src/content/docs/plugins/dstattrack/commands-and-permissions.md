---
title: "Commands & Permissions"
description: "Base command /dstattrack, with aliases /dstat and /stattrack."
---

## Commands

Base command `/dstattrack`, with aliases `/dstat` and `/stattrack`.

| Command | Permission | Player only | Description |
|---|---|:---:|---|
| `/dstattrack` | — | ✅ | Open the apply/remove [GUI](/plugins/dstattrack/features/the-gui/). |
| `/dstattrack help` | — | — | Show the command list. |
| `/dstattrack info` | `dstattrack.info` | — | List the stat categories. |
| `/dstattrack add` | `dstattrack.add` | ✅ | Apply a stattrack to the held item (charges the price). |
| `/dstattrack remove` | `dstattrack.remove` | ✅ | Remove the stattrack from the held item. |
| `/dstattrack set <category> <amount>` | `dstattrack.set` | ✅ | Set a counter to an exact value. |
| `/dstattrack check` | `dstattrack.check` | ✅ | Print the raw tags on the held item. |

`<category>` tab-completes to `Playerkills`, `Mobkills`, `Block`, `Fishing` (accepted case-insensitively). `<amount>` is a non-negative integer.

> Commands are registered at runtime by DzusillCore — there are no command entries in `plugin.yml`, so nothing clashes with other plugins unless they use the exact same name/alias.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `dstattrack.info` | everyone | List categories with `/dstattrack info`. |
| `dstattrack.add` | op | Apply a stattrack. |
| `dstattrack.remove` | op | Remove a stattrack. |
| `dstattrack.set` | op | Set a counter to an exact value. |
| `dstattrack.check` | op | Inspect raw tags. |

### Suggested setup

- **Players** — leave defaults. With `dstattrack.info` they can list categories; granting `dstattrack.add` and `dstattrack.remove` lets them stattrack their own gear (they still pay the price).
- **Staff** — `dstattrack.set` and `dstattrack.check` for fixing or auditing values.

```
/lp group default permission set dstattrack.add true
/lp group default permission set dstattrack.remove true
/lp group staff permission set dstattrack.set true
/lp group staff permission set dstattrack.check true
```

The **Add** and **Remove** buttons in the GUI are hidden from players who lack `dstattrack.add` / `dstattrack.remove`.
