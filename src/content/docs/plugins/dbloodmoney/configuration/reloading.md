---
title: "Reloading"
description: "Apply config and message changes with:"
---

Apply config and message changes with:

```
/dbm reload
```

Permission: `dbloodmoney.admin`.

## What reloads instantly

These pick up the moment you run `/dbm reload`:

- All **`Steal`** numbers — `Percent`, `Min-Victim-Balance`, `Max-Per-Kill`, `Server-Tax-Percent`.
- `Anti-Farm.Enabled` and the same-IP toggle.
- Every message in `messages.yml` (including the prefix).
- PRO bounty limits, streak tiers, leaderboard size.

## What needs a restart

A few structural settings are wired once at startup and need a **full server restart** to change:

| Setting | Why |
|---|---|
| `Anti-Farm.Cooldown-Seconds` | The cooldown timer is created at startup. |
| `Combat-Tag.*` | The combat listeners are registered at startup. |
| `Safezone.*` | The safezone rules are read once on enable. |

> A quick rule: **values** reload live; **on/off structural behaviour** (combat tagging, safezones, cooldown length) needs a restart.

## Tip

When tuning the steal rate during an event, change `Steal.Percent` and `/dbm reload` repeatedly — no restart, no downtime.
