---
title: "FAQ"
description: "Almost always no Vault, or Vault with no economy plugin registered behind it. Every shipped price is in"
---

### The shop opens but nothing can be bought

Almost always no Vault, or Vault with no economy plugin registered behind it. Every shipped price is in
`money`, which is Vault.

`/adminshop doctor` lists every currency and whether its plugin was found.

### A category is missing from the menu

Two different faults that look the same:

- The **file** exists but nothing in `gui/maingui.yml` has `action: <that id>`. Only `/shop <id>` reaches
  it.
- An **icon** exists but there is no `shops/<id>.yml`, so clicking it opens nothing.

`/adminshop doctor` reports both by name.

### An item is missing from a category

Its line failed to load. The startup log and `/adminshop doctor` name the file and the key — usually a
material that does not exist on this version, a slot outside the menu's rows, or a missing price.

Two items in one slot is also possible: both load, one is invisible, and the doctor says which pair.

### I turned stock on and nothing is limited

Working as intended. An item with no `max` is unlimited even while tracking is on, so that switching the
feature on does not close every item you had not yet given a number to. Give one a `max`.

`/adminshop doctor` says exactly this if it is your situation.

### The price shows 0 on an item with variants

It should not — it should say "from" and the cheapest choice, via `variant-price-lore`. If you have
blanked that key it falls back to `price-lore`, which renders the product's own price, and a product with
variants deliberately has none.

### Players say a purchase took money and gave nothing

Check `/adminshop failures`. Anything that failed after payment is recorded there whether or not the
refund worked, and a row with `refunded = 0` is one an admin needs to settle by hand.

If it is a `take-command` product, that is the known gap: those cannot be refunded. See
[Currencies](/plugins/oberonshop/features/currencies/#command-currencies).

### Can a player buy more than fits in their inventory?

No. The whole result — every item of a bundle, every stack a large order splits into — is measured before
any money moves, and the purchase is refused if it would not fit.

### Why can't I quick-buy the firework?

A product with variants has nothing to buy yet. Right-clicking opens the first choice.

### Middle click doesn't toggle favourites

It never will. `ClickType.MIDDLE` only fires in creative mode, so `favorites.toggle-click: MIDDLE` is
read as `DROP` rather than giving you a feature that silently does nothing for survival players.

### `%oshop_...%` prints itself

The placeholder could not be parsed or answered — deliberately, so a typo reads as a typo. Common causes:
a category id containing an underscore (not allowed, for exactly this reason), a product that does not
exist, a currency not in `economy.currencies`, or an offline `_of_` target. See
[Placeholders](/plugins/oberonshop/placeholders/).

### A sale is running that should have ended

Check the dates parsed. An unreadable bound switches the sale **off** and logs it — if yours is still
running, the dates were read fine and the window really does include now. Remember `from` and `to` are
read in `limits.timezone`.

### Reload said something needs a restart

Some settings decide what gets built at startup: the database backend, the command names, the search
input mode, whether stock and limits are enabled at all. Reload names them rather than reporting success
for an edit that could not have taken effect.

### Can I run this alongside PerfShop?

Not on the default settings — both register `/shop`. See
[Migrating from PerfShop](/plugins/oberonshop/migrating-from-perfshop/).

### Does it sell things for players?

No. OberonShop is purchase-only; selling is [OberonSell](https://github.com/dzusill/OberonSell)'s job.

### Is there a transaction history?

No, by design. Counters only: how often a product was bought, each player's recent products, their last
purchase. There is no per-purchase log to query, and `/adminshop failures` is an error ledger rather than
a history.

### Folia?

Yes. All scheduling goes through OberonCore's platform abstraction.
