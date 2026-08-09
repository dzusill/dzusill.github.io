---
title: "dStore"
description: "dStore delivers webstore purchases to your Minecraft server. A player buys a rank or a crate key on the website, and dStore gives it to them in game —…"
---

**dStore** delivers webstore purchases to your Minecraft server. A player buys a rank or a crate key on the website, and dStore gives it to them in game — reliably, exactly once, even if the network drops halfway through.

It is the Paper-side fulfilment client for the **Phalanx** commerce stack. It polls the API over HTTPS, executes typed actions, and writes a local receipt **before** reporting success, so a lost HTTP response can never repeat a consumable side effect.

---

## What it does

- 🛒 **Delivers purchases** — ranks, permissions, items and console commands, driven entirely by what the website says was bought.
- 🧾 **At-most-once execution** — a SQLite receipt ledger on disk. If a job is retried after a lost response, dStore recognises it and replays the recorded result instead of running it again.
- 📡 **Outbound polling only** — no open ports, no inbound webhooks to firewall. The plugin reaches out on a schedule and heartbeats in between.
- 🎁 **Offline-safe** — purchases for offline players stay queued until they can actually be delivered.
- 🔄 **Self-updating** — `/dstore update` downloads a signed-by-hash jar over HTTPS and stages it for the next restart.
- 🪶 **Standalone** — dStore does **not** require DzusillCore. One jar, one config, no framework.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Purpur / Folia **1.21.x** |
| Java | **21+** |
| Phalanx API | **required** — the store backend |
| LuckPerms | optional — needed for rank/permission actions |

---

## Why the receipt ledger exists

```
API: "run job 8842"
  └─ dStore executes it            ← side effect happens here
       └─ writes receipt to SQLite ← durable, before the network
            └─ reports success to the API
                 └─ response lost? API retries job 8842
                      └─ dStore finds the receipt → replays the result, runs nothing
```

Any fulfilment client without that middle step will eventually give someone two ranks or two crate keys. The ledger is the whole reason dStore is a separate plugin rather than a few lines in a webhook handler.

---

## Quick links

- [Requirements](/plugins/dstore/getting-started/requirements/)
- [Installation](/plugins/dstore/getting-started/installation/)
- [Quick Start](/plugins/dstore/getting-started/quick-start/)
- [How Fulfilment Works](/plugins/dstore/features/fulfilment/)
- [The Receipt Ledger](/plugins/dstore/features/receipt-ledger/)
- [Action Types](/plugins/dstore/features/action-types/)
- [Commands & Permissions](/plugins/dstore/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dstore/faq/)
