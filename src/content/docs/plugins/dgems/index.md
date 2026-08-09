---
title: "dGems"
description: "dGems is a premium currency with a shop that sells things Minecraft cannot give you — gift cards, physical merch, custom builds, anything a staff member…"
---

**dGems** is a premium currency with a shop that sells things Minecraft cannot give you — gift cards, physical merch, custom builds, anything a staff member fulfils by hand.

Gems live **only in the database**. They are never an item, never a scoreboard value, never anything a duplication glitch can touch. Every movement is written to an append-only ledger, every admin action is audited, and every purchase is idempotent.

Built on [DzusillCore](https://dzusill.github.io/plugins/dzusillcore/); runs on Paper, Purpur and Folia.

---

## What it does

- 💎 **A real currency** — balances, transfers between players, a leaderboard, and your own name and colour scheme for it.
- 🛒 **A shop for real rewards** — items in the shop are things staff deliver manually. The plugin handles the money and the paperwork.
- 📋 **An order queue** — every purchase becomes an order that staff claim, deliver or cancel. Cancelling refunds automatically.
- 🧾 **Append-only ledger** — ten transaction types, atomic SQL, no balance is ever written without a matching ledger row.
- 🔍 **Audit log and reconciliation** — `/gems admin verify` re-adds the ledger and compares it against stored balances.
- 🔑 **Idempotent external grants** — Tebex and other webstores grant by reference id, so a retried callback never pays twice.
- 🔔 **Discord webhooks** — new and resolved orders posted to a staff channel, with an optional role mention.
- 🧩 **PlaceholderAPI** — balances for scoreboards, TAB and chat formats.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Purpur / Folia **1.21.x** |
| Java | **21+** |
| DzusillCore | **required** |
| MySQL / PostgreSQL | **required** — gems exist only in the database |
| PlaceholderAPI | optional |

---

## Money-adjacent by design

dGems is written on the assumption that a bug here costs somebody real money:

```
every balance change
  └─ inside one SQL transaction
       ├─ ledger row written   (append-only, typed, never updated)
       └─ balance updated
            └─ audit entry for anything an admin did
```

Balances may be cached for **display** — placeholders, scoreboards — but spending always re-reads the database. The cache can be stale on a scoreboard; it can never be stale in a purchase.

---

## Quick links

- [Requirements](/plugins/dgems/getting-started/requirements/)
- [Installation](/plugins/dgems/getting-started/installation/)
- [Quick Start](/plugins/dgems/getting-started/quick-start/)
- [The Currency](/plugins/dgems/features/currency/)
- [Transfers](/plugins/dgems/features/transfers/)
- [The Shop](/plugins/dgems/features/shop/)
- [Orders](/plugins/dgems/features/orders/)
- [Ledger & Audit](/plugins/dgems/features/ledger-and-audit/)
- [Commands & Permissions](/plugins/dgems/commands-and-permissions/)
- [Placeholders](/plugins/dgems/placeholders/)
