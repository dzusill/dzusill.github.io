---
title: "How It Talks to AxAuctions"
description: "Worth reading once, because it explains a failure mode that is unusual for a Minecraft plugin — and why that"
---

Worth reading once, because it explains a failure mode that is unusual for a Minecraft plugin — and why that
failure mode is safe.

## AxAuctions has no API for this

AxAuctions' published developer API exposes two limit getters and six events. It has exactly one public method for
creating a listing:

```java
AuctionManager.create(Player player, double price, Integer amount, CurrencyIntegration integration)
```

That takes the item **out of an online player's hand**. There is no way to ask it for a server-owned listing of an
arbitrary item, which is the entire job of this plugin.

## So it uses the internals

Everything dAuctionFeed needs lives in AxAuctions' internal classes — the item DAO, the user DAO, the currency
cache, the live listing cache. Creating a listing is two steps, both required:

1. **Insert into the database**, so the listing is permanent — it survives restarts and shows up for players who
   were offline.
2. **Register it with the in-memory cache** the auction house GUI actually reads. Doing only the first would hide
   the listing until the next AxAuctions reload.

## Why reflection, specifically

Not laziness. AxAuctions **relocates** several of its own dependencies when it builds its jar —
`CurrencyIntegration`, `WrappedItemStack` and others end up under `com.artillexstudios.axauctions.libs.*`. A
plugin compiled against the published API would hold references to the *un*relocated names, which do not exist at
runtime.

Reflection sidesteps that, and buys the property that matters most on a production server: **an AxAuctions update
that moves something turns into a logged warning, not a crash.**

## The startup check

Every member the plugin needs is resolved once, shortly after the server finishes loading:

```
[dAuctionFeed] Attached to AxAuctions (currency 'vault').
```

If anything cannot be found:

```
[dAuctionFeed] Seeding is switched OFF: AxAuctions changed a member this plugin needs: insert
[dAuctionFeed] Everything else keeps running. Fix the cause and run /auctionfeed reload.
```

**Seeding stops. Nothing else does.** The server boots, AxAuctions works normally, players are unaffected,
`/auctionfeed status` explains the situation, and existing listings stay where they are.

To see exactly what was resolved — useful when reporting a compatibility break:

```yaml
advanced:
  log-bridge-details: true
```

## Why the startup delay

```yaml
advanced:
  startup-delay-seconds: 10
```

AxAuctions initialises its database on a background thread, so its DAOs can still be null while other plugins are
enabling. Attaching during `onEnable` would be a race. The delay also gives AxAuctions time to finish loading its
listing cache, so [market-aware pricing](/plugins/dauctionfeed/features/market-pricing/) sees a complete auction house on the first
restock.

Raise it on a slow server if the startup check reports the database is not initialised yet.

## Events

The three AxAuctions events this plugin listens to are registered **by class name** rather than with
`@EventHandler`, for the same reason — an annotated method needs the event class at load time and would fail the
whole listener on a server where it has moved.

| Event | What it is used for |
|---|---|
| `AxAuctionsLoadEvent` | AxAuctions reloaded; re-attach before touching its caches again |
| `AxAuctionsPrePurchaseEvent` | Enforce the [purchase limit](/plugins/dauctionfeed/features/purchase-limits/) |
| `AxAuctionsPurchaseEvent` | Count the purchase, settle the [money sink](/plugins/dauctionfeed/features/sellers-and-money-sink/), strip the [item marker](/plugins/dauctionfeed/features/item-markers/) |

A missing event is logged and that one hook is disabled — the others keep working.

## Recovering without a restart

Because `AxAuctionsLoadEvent` is one of the hooks, an AxAuctions that finishes loading late or gets reloaded by an
admin re-attaches on its own.

Otherwise:

```
/auctionfeed reload
```

re-runs the whole check. This is the fix for a wrong `auctions.currency`, a slow startup, or a database that was
still initialising — no restart needed.

## Seller names

One detail worth knowing, because it looks like a bug otherwise.

AxAuctions stores the seller's name in its own users table. A synthetic seller has never joined the server, so
`Bukkit.getOfflinePlayer(uuid).getName()` is null for it — and a listing created that way would show **no seller
name at all**.

dAuctionFeed therefore writes the name onto the user record and pushes it back, once per seller at startup. If
that fails you get:

```
[dAuctionFeed] Seller 'Blacksmith' could not be registered with AxAuctions — its listings may show without a name.
```

## Versions

Verified against **AxAuctionsAPI 8**. Later versions are very likely fine — the members used are core to how
AxAuctions stores listings — but the startup check is what actually decides, on your server, at boot.
