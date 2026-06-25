---
title: "FAQ & Troubleshooting"
description: "Check Settings.UnbreakingAware. When true (default), thresholds account for Unbreaking so a heavily-enchanted tool warns at the right real-world point. Turn…"
---

### My enchanted tools warn too early/late

Check `Settings.UnbreakingAware`. When `true` (default), thresholds account for Unbreaking so a heavily-enchanted tool warns at the right real-world point. Turn it off to compare against the raw durability bar instead. See [How Notifications Work](/plugins/toolsnotifier/features/how-notifications-work/).

### Armor spams notifications at full durability

That was a bug fixed in v1.4 — update to the latest version. Notifications now only fire when a piece is genuinely below its threshold.

### One item should have a different threshold

Add an entry under `Settings.ItemOverrides` with that item's uppercase material name. Overrides beat categories. See [Thresholds & Categories](/plugins/toolsnotifier/features/thresholds-and-categories/).

### How do I stop notifications for a specific item completely?

Either set `Enabled: false` in an `ItemOverrides.<MATERIAL>` block, or add the material to `IgnoreItems`.

### Boss bar colour won't change to my hex code

Minecraft only supports seven boss-bar colours (`PINK`, `BLUE`, `RED`, `GREEN`, `YELLOW`, `PURPLE`, `WHITE`) — hex isn't possible for the bar graphic. The bar **text** does support hex. See [Notification Channels](/plugins/toolsnotifier/features/notification-channels/).

### A player doesn't want notifications

They can run `/tn toggle` (all off), or on PRO use `/tn settings` to mute individual channels. To exclude a whole group, revoke `toolsnotifier.notify`.

### Do config changes need a restart?

No — run `/tn reload`. See [Reloading](/plugins/toolsnotifier/configuration/reloading/).

### What's the difference between free and PRO?

PRO adds the per-player [preferences GUI](/plugins/toolsnotifier/features/preferences-gui/), the periodic [inventory scan](/plugins/toolsnotifier/features/inventory-scan/), and the [admin monitor](/plugins/toolsnotifier/features/admin-monitoring/). Everything else is in both. See [Free vs PRO](/plugins/toolsnotifier/getting-started/free-vs-pro/).

### Does it work below 1.21?

`api-version` is 1.17, so it loads on 1.17+, but durability handling is tuned and tested for 1.21.
