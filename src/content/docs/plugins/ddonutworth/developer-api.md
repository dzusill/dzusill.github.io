---
title: "Developer API"
description: "Since 1.0.2, dDonutWorth registers a small selling API in Bukkit's ServicesManager. Another plugin can use it"
---

Since **1.0.2**, dDonutWorth registers a small selling API in Bukkit's `ServicesManager`. Another plugin can use it
to pay exactly what `/sell` pays and to count its sales toward a player's sell history, sold total and category
progress. dSpawnerAddon uses it to sell spawner storage.

The API is the `me.dzusill.ddonutworth.api` package. It uses only JDK and Bukkit types, so you compile against the
dDonutWorth jar as a `provided` dependency and need nothing else from it.

```java
DonutWorthApi api = Bukkit.getServicesManager().load(DonutWorthApi.class);
if (api != null) {
    double worth = api.worth(item);          // what /worth shows: before multipliers, 0 = unsellable
    double quote = api.payout(player, item); // what /sell would pay this player, no side effects
    DonutWorthApi.Sale sale = api.sell(player, items);
    // give sale.leftovers() back to wherever you took the items from
}
```

| Method | Does |
|---|---|
| `worth(ItemStack)` | Worth of the whole stack before player multipliers. `0` when it cannot be sold. |
| `payout(Player, ItemStack)` | What `/sell` would pay this player for the stack, category multipliers included. Pays and records nothing. |
| `sell(Player, List<ItemStack>)` | Sells like `/sell`: refuses in a disabled game mode or without an economy, then makes one deposit, adds history entries, the sold total and category progress, and announces tier unlocks. |

Rules for `sell`:

- **Give back every leftover.** Items without a price come back as the same instances you passed in. A refused sale
  or a failed deposit returns every item, again the same instances. A full shulker box is sold for its contents and
  comes back emptied as a new instance.
- Your plugin sends its own "sold" message. `sell` plays the sell sound and announces tier unlocks, but does not
  print a summary.
- `sell` does not check `blacklisted-worlds`. That check belongs to the `/sell` command.
- Call it on the main thread (on Folia, the player's region thread).
- Look the service up each time you need it. A reload of dDonutWorth replaces it.

Add `dDonutWorth` to `softdepend` in your `plugin.yml` so it enables first.
