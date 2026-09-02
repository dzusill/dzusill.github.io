---
title: "Sellers & the Money Sink"
description: "Every auction listing shows a seller name. dAuctionFeed attributes its listings to a rotating cast of fake"
---

## Who appears to be selling

Every auction listing shows a seller name. dAuctionFeed attributes its listings to a rotating cast of fake
traders, picked at random per listing, so a restock reads like several people showed up rather than one server
account dumping stock.

```yaml
seller:
  names:
    - "Blacksmith"
    - "Miner"
    - "Alchemist"
    - "Farmer"
    - "Fisherman"
    - "Wanderer"
```

Add, remove or rename freely. One name is fine if you would rather it read as an official server shop.

### The accounts behind them

Each name gets a UUID derived from it under this plugin's own namespace. Three properties matter:

- **Stable across restarts** — yesterday's listings still belong to the same seller, which is how the plugin
  recognises and clears its own batches.
- **Cannot collide with a real account** — Mojang UUIDs are version 4 and offline-mode ones are derived from a
  different namespace. Neither is this one.
- **Safe against name clashes** — a real player actually called `Blacksmith` is never mistaken for the feed, and
  never has money drained from their account.

{% hint style="warning" %}
Renaming a seller orphans the listings it already created: they stay in the auction house until they expire, but
stop being recognised as this plugin's. Run `/auctionfeed clear` **before** renaming, or accept that one batch
lingers.
{% endhint %}

## Where the money goes

When a player buys a seeded listing, AxAuctions pays that money to the seller — an account nobody can log into.

```yaml
seller:
  payout: SINK
  payout-account: ""
  sink-sweep-minutes: 10
```

| Mode | Behaviour |
|---|---|
| `SINK` *(default)* | The balance is drained. The money is removed from the economy. |
| `KEEP` | Left on the fake seller's account. In practice also a sink — nobody can spend it — just messier to audit. |
| `ACCOUNT` | Moved to the real account named in `payout-account`. |

### Why `SINK` is the default

This is the half of the design that keeps the feature **non-inflationary**. A player spends money into the auction
house and nothing is created to replace it. Every purchase shrinks the money supply slightly, which is the
opposite of what a plugin that simply gives items away would do.

Left as `KEEP`, the balance is still unspendable, but it shows up in `/baltop`, in economy audits, and in anything
that sums player balances. Draining it keeps the books honest.

### The sweep

The per-purchase drain handles the normal path, a second after the sale so AxAuctions has finished crediting.
`sink-sweep-minutes` is the safety net for everything else — a purchase during a reload, a payout AxAuctions
deferred, a restart in between. Without it, money quietly accumulates on the seller accounts and the sink slowly
stops being one.

A final sweep also runs on shutdown, so a purchase in the last seconds before a nightly restart is not left
behind.

Set to `0` to disable the sweep. `KEEP` skips it entirely.

### How much has been sunk

```
/auctionfeed status
```

```
 • Payout: SINK
 • Sunk this session: 1,284,300
```

Counted since the last server start, not for all time.

## Without Vault

Seeding still works — items are still listed, players can still buy them. Only the settlement step is missing, so
proceeds stay on the fake seller's account regardless of `payout`. You get a warning at startup and a red note on
`/auctionfeed status`.
