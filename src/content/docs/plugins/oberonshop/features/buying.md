---
title: "Buying"
description: "Middle click is not used anywhere. It only fires in creative mode, so a feature bound to it silently does"
---

## The clicks

| Click | What happens |
|---|---|
| **Left** | Opens the buy screen |
| **Right** | Quick-buys `purchase.quick-buy-amount` — no screen |
| **Shift + left** | Quick-buys a full stack, or `purchase.stack-buy-amount` |
| **Q** (drop) | Toggles a favourite |

Middle click is not used anywhere. It only fires in creative mode, so a feature bound to it silently does
nothing for every survival player — including if you configure `favorites.toggle-click: MIDDLE`, which is
quietly read as `DROP`.

**An item with variants can never be quick-bought.** There is nothing to buy yet — which flight, which
strength — so every click opens the first choice.

## The buy screen

Shows the item, the quantity, the unit price, the total, your balance, and the stock and limit lines when
those apply. Quantity buttons are `-64 / -10 / -1 / +1 / +10 / +64`, plus **type an amount** and **buy as
many as I can**.

Every button is wired by its `action:` key rather than by its block name, so you can move it, rename the
block, or add a second button with the same action. Anything with an action the plugin does not know is
placed as decoration, which is how you drop a filler pane or an info book into the screen without
touching code. See [GUIs](/plugins/oberonshop/configuration/guis/).

After a purchase the screen stays open with the amount reset to 1, so a player buying repeatedly does not
have to reopen it. `purchase.keep-open-after-purchase: false` closes it instead.

## Safety

Every check runs **before** any money moves, and they run in a fixed order:

```
 1  maintenance, world, game mode
 2  permissions — shop, category, product
 3  the product is re-resolved from the catalog, by id
 4  the amount is sane
 5  the price is recomputed server-side
 6  stock
 7  your purchase limit
 8  your balance
 9  the whole result fits in your inventory
10  ── the money moves here, and not before ──
11  the goods are handed over
12  counters, recents, last purchase
```

Three of those are worth spelling out.

### The price is never the client's to name

Step 3 re-resolves the product from the catalog using ids, not from the item you clicked. The clicked
item is something a modified client can shape freely; the catalog is the server's. Step 5 then prices
*that*, from scratch.

If the buy screen was showing a price that no longer holds — a sale ended while it sat open — the
purchase is refused and the screen redraws with the real number. Nothing is charged.

### The whole purchase has to fit

Step 9 measures the complete result against your inventory — every item of a bundle, every stack a large
order splits into — by simulating Bukkit's own merge against a copy of your inventory. If any of it would
not fit, the purchase is refused and **no money is taken**.

This is the fix for the bug where a full inventory holding one partial stack could be topped up without
being charged correctly. There is no second stack-space calculation to drift out of step with the real
one, because the check *is* the real one.

### Nothing is half-delivered

If handing the goods over fails after payment — which should not happen, since step 9 just proved it
fits, but a tick can pass on a busy server — the money is returned and you are told. If the refund also
fails, a row goes into an error ledger that `/adminshop failures` lists, so an admin can settle it by
hand. Money is never quietly kept.

**One case cannot be protected**: a currency whose balance cannot be read. See
[Currencies](/plugins/oberonshop/features/currencies/#command-currencies).

## One purchase at a time

A duplicated click — a double-click, a laggy packet, a macro — buys once. A short cooldown after a
completed purchase stops the second one, and the cooldown **only starts when money actually moved**: a
refused click leaves you free to click something else immediately, because nothing happened and there is
nothing to duplicate.
