---
title: "Installation"
description: "dBloodMoney depends on these being present in your plugins/ folder:"
---

## 1. Install the required plugins first

dBloodMoney depends on these being present in your `plugins/` folder:

1. **DzusillCore** (`DzusillCore-1.1.0.jar`)
2. **Vault**
3. An **economy plugin** (e.g. EssentialsX)

> ⚠️ **Order matters.** dBloodMoney `depend`s on DzusillCore. If DzusillCore is missing, dBloodMoney is disabled at startup with an "unknown/invalid plugin DzusillCore" error.

## 2. Drop in dBloodMoney

Copy **one** edition into `plugins/`:

```
plugins/
├── DzusillCore-1.1.0.jar
├── Vault.jar
├── EssentialsX-x.x.x.jar
└── dBloodMoney-PRO.jar      ← or dBloodMoney.jar for the free edition
```

## 3. Start the server

Start (or restart) the server. On enable you'll see the banner:

```
  dBloodMoney v1.0.0 (PRO)
  Powered by DzusillCore
```

The `(PRO)` / `(FREE)` tag confirms which edition loaded. The PRO edition also logs:

```
[dBloodMoney] PRO edition detected — bounty, leaderboards and kill streak enabled.
```

## 4. Verify it works

Run `/dbm info` in-game or console:

```
[dBloodMoney] dBloodMoney v1.0.0 (PRO)
```

Then give two test players some money and have one kill the other — the killer should receive a reward message.

## Hot-loading without a restart

If you use **PlugManX** (or similar), you can load without restarting — **DzusillCore first**:

```
/plugman load DzusillCore
/plugman load dBloodMoney
```

> Some framework internals register at startup; if anything behaves oddly after a hot-load, do a full restart.

## Configuration files

On first run dBloodMoney generates everything under `plugins/dBloodMoney/`:

| File | Purpose |
|---|---|
| `config.yml` | All settings — see [config.yml](/plugins/dbloodmoney/configuration/config/). |
| `messages.yml` | Every message, in MiniMessage — see [messages.yml](/plugins/dbloodmoney/configuration/messages/). |
| `database.yml` | Optional MySQL/PostgreSQL storage (PRO) — see [database.yml](/plugins/dbloodmoney/configuration/database/). |
| `stats.yml` | PRO flat-file leaderboard data (auto-managed). |
| `bounties.yml` | PRO flat-file bounty data (auto-managed). |

Next: [Quick Start](/plugins/dbloodmoney/getting-started/quick-start/).
