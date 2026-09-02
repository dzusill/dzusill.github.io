---
title: "FAQ & Troubleshooting"
description: "Start with /auctionfeed status. Everything that can stop a restock is on that one screen with its current value."
---

Start with `/auctionfeed status`. Everything that can stop a restock is on that one screen with its current value.

---

## Nothing is being listed

### `status` says AxAuctions is **not attached**

The line tells you why.

| Reason | Fix |
|---|---|
| `AxAuctions is not installed` | Install it. |
| `AxAuctions' database is not initialised yet` | Raise `advanced.startup-delay-seconds`, then `/auctionfeed reload`. |
| `AxAuctions has no currency named 'x'` | Set `auctions.currency` to a name from AxAuctions' own currencies config, then `/auctionfeed reload`. |
| `AxAuctions changed a member this plugin needs` | An AxAuctions update moved something. See [How It Talks to AxAuctions](/plugins/dauctionfeed/axauctions-integration/). |

`/auctionfeed reload` re-runs the check — no restart needed.

### `status` says the pool is empty

```
/auctionfeed seed
```

Fills it from the bundled price list. If that reports `Nothing to seed`, everything in the list is already in the
pool and you have deleted it since — add items with `/auctionfeed additem`.

### A restock says `no tier in tiers.yml has a weight above zero`

Every tier has `weight: 0`. Give at least one a positive weight.

### A restock says `today's cap has already been reached`

`daily.max-items` (default 50) or `daily.max-total-value`. Today's usage is on `/auctionfeed status`.

### A restock says `no item could be rolled`

Either the pool is smaller than the batch size once duplicates are excluded, or every price came out under
`pricing.minimum-price`. Try `/auctionfeed preview` — it fails the same way and is faster to iterate on.

---

## Prices

### Everything is tagged `(raised by price floor)`

Your tier multipliers are pitched below your sell prices. The [floor](/plugins/dauctionfeed/features/price-floor/) is holding the
economy up single handed. Raise the item prices in `items.yml` (or `seed.price-multiplier` before a fill), or
lower `pricing.floor.multiplier` — but not below 1.2.

### Prices look far too high

Check three things in order:

1. `pricing.floor.assumed-sell-ratio` — too high inflates the floor for every item dDonutWorth cannot price.
2. `enchantments.per-level-bonus` in `tiers.yml` — at 0.35 a Sharpness V / Unbreaking III sword is **3.8×**.
3. The prices in `items.yml` themselves.

### A sale is on but prices did not change

A sale changes what the **next** restock produces. Existing listings keep the price they were created with. Run
`/auctionfeed clear` then `/auctionfeed restock` to redo the current batch.

### `status` says the floor source is `pool`, not `dDonutWorth`

dDonutWorth is missing, disabled, or changed shape. The floor is still enforced, just from an estimate. The
console says which at startup.

---

## Items

### Legendary items are listed one at a time

Two reasons, both correct:

- **Enchanted gear does not stack**, so a rolled enchantment forces a single-item listing.
- **The item's own stack size is the ceiling** — a potion or a tool in a 16–64 tier is still listed singly.

### An item shows up too often

Lower its `weight` in `items.yml`, or its tier's `weight` in `tiers.yml`. `weight: 0.0` on an item keeps the entry
but never lists it — better than deleting, because the market comparison and the price floor still read its price.

### Something I do not want sold keeps appearing

```
/auctionfeed removeitem <id>
```

`seed.exclude` only affects the **fill**; it does not remove items already in the pool.

### Enchanted books look blank

An `enchantments` block on `ENCHANTED_BOOK` is written as a *stored* enchantment, which is what makes a book show
as enchanted. If you wrote the entry by hand against a different material, check it is `ENCHANTED_BOOK`.

### A potion is just a water bottle

It is missing `potion-type`. See [items.yml](/plugins/dauctionfeed/configuration/items/#potions-and-tipped-arrows).

---

## Purchases

### A bought stack will not merge with the player's other items

Turn on marker stripping:

```yaml
marker:
  strip-on-purchase: true
```

It sweeps on purchase, on inventory close and on join, so it catches items delivered through a claim window too.
Existing marked items are cleaned the next time that player closes an inventory or rejoins.

### Players say the limit blocked a normal auction

It cannot — the limit only applies to listings owned by this plugin's sellers. If a player is convinced otherwise,
`%dauctionfeed_purchases%` shows their actual count.

### One player bought the whole batch

`purchase-limit.per-restock` is `-1`, or they have `dauctionfeed.limit.bypass`. Note it is off for everyone by
default *including operators* — check whether a permission plugin grants `*`.

---

## Money

### `/baltop` shows a fake seller with a balance

`seller.payout` is `KEEP`, or `sink-sweep-minutes` is `0`, or there is no Vault economy. `status` shows which.

### Money is not being sunk

`status` reports `Payout: SINK` and `Sunk this session`. A zero there after real purchases usually means no Vault
economy is registered.

### Can seeded sales make the server richer?

Only with `payout: ACCOUNT`. The default `SINK` removes the money from the economy — this feature is deliberately
deflationary.

---

## Schedule

### The restock fires at the wrong time

`restock.timezone` is blank (machine's zone) or set to something unrecognised, which also falls back to the
machine's zone. `status` prints the resolved zone next to the next restock time.

### It restocked twice / not at all after a restart

`catch-up-on-startup: true` runs a restock missed while the server was down — once, never a burst, even after a
week offline. Set it to `false` to skip missed restocks instead.

### It restocked the moment I installed it

Deliberate. On a brand-new install the plugin does not wait for the configured hour, so you can see it working
immediately. From then on it follows the schedule.

---

## Still stuck

```yaml
advanced:
  verbose-logging: true
  log-bridge-details: true
```

The first prints one line per created listing; the second prints every AxAuctions member the startup check
resolved. Both are what to include when reporting a problem, along with `/auctionfeed status`.
