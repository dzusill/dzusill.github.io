---
title: "FAQ & Troubleshooting"
description: "Vault and/or an economy plugin (EssentialsX, CMI, …) isn't installed or loaded. Applying a stattrack charges money, so it needs both. See Requirements."
---

### "Economy (Vault) is not available."

Vault and/or an economy plugin (EssentialsX, CMI, …) isn't installed or loaded. Applying a stattrack charges money, so it needs both. See [Requirements](/plugins/dstattrack/getting-started/requirements/).

### Counters aren't going up

Check all of these:

- You're **holding the item in your main hand** when the kill/break/catch happens.
- The item actually has a stattrack — run `/dstattrack check`.
- The item's type matches its group (a pickaxe won't track kills).
- For blocks: the break wasn't cancelled by protection (cancelled breaks don't count).
- **NBTAPI is installed** — without it, counters can't be stored or read.

### Nothing happens when I break crops with a hoe

Make sure you're on the updated config — `hoe` and `shears` were added to the `breakBlocks` group for 1.21.1. Older configs may not list them; add them under `items.breakBlocks` and `stattrackItems`.

### Brushing suspicious sand/gravel isn't tracked

Correct — archaeology brushing has no stable block-break event, so it is intentionally not tracked.

### Can I change the lore colours / wording?

Yes — edit the `lore` templates in [config.yml](/plugins/dstattrack/configuration/config/). They're MiniMessage. Already-stattracked items update the next time their counter changes. See [Lore & Display](/plugins/dstattrack/features/lore-and-display/).

### Does removing a stattrack refund the price?

No. `/dstattrack remove` strips the counters and lore but does not return the money.

### Do the stats follow the item?

Yes. They're stored in the item's NBT, so they travel with it through drops, trades, chests and `/give`-style copies.

### Is there a reload command?

No — edit the config and restart. See [Reloading](/plugins/dstattrack/configuration/reloading/).
