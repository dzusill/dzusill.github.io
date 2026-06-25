---
title: "Free vs PRO"
description: "dBloodMoney comes as two jars built from the same plugin. Install one."
---

dBloodMoney comes as two jars built from the same plugin. Install **one**.

| File | Edition |
|---|---|
| `dBloodMoney.jar` | Free |
| `dBloodMoney-PRO.jar` | PRO |

## Feature comparison

| Feature | Free | PRO |
|---|:---:|:---:|
| Kill-to-steal — % of balance | ✅ | ✅ |
| Minimum balance + per-kill cap | ✅ | ✅ |
| Server tax (money sink) | ✅ | ✅ |
| Farm cooldown (anti-feeding) | ✅ | ✅ |
| Combat tagging | ✅ | ✅ |
| Combat-log punishment | ✅ | ✅ |
| World safezones | ✅ | ✅ |
| Same-IP alt blocking | ✅ | ✅ |
| `/dbm reload` & `/dbm info` | ✅ | ✅ |
| **Bounty system** (`/bounty`) | — | ✅ |
| **Leaderboards + stats** (`/killtop`) | — | ✅ |
| **Kill streak multipliers** | — | ✅ |
| **PlaceholderAPI** | — | ✅ |
| **MySQL / PostgreSQL** storage | — | ✅ |

## Which edition am I running?

The console banner and `/dbm info` both show the tag:

```
  dBloodMoney v1.0.0 (PRO)
```

The PRO jar additionally logs `PRO edition detected …` on enable.

## Upgrading free → PRO

Both jars use the same plugin name and the same `config.yml`, so upgrading is a swap:

1. Stop the server.
2. Delete `dBloodMoney.jar` from `plugins/`.
3. Add `dBloodMoney-PRO.jar`.
4. Start the server.

Your `config.yml`, `messages.yml` and data are kept. The PRO settings live under the `Pro:` section of `config.yml` (already present, simply ignored by the free edition).

> **Downgrading PRO → free** works the same way. Bounty and stats data files stay on disk but are no longer used.
