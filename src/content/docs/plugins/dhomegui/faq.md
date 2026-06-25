---
title: "FAQ & Troubleshooting"
description: "That's the default (Settings.SetHome.DefaultLimit: 1). Grant a higher tier with dhomegui.homes.<n> (e.g. dhomegui.homes.5) or dhomegui.homes.unlimited. See…"
---

### Players can only set one home

That's the default (`Settings.SetHome.DefaultLimit: 1`). Grant a higher tier with `dhomegui.homes.<n>` (e.g. `dhomegui.homes.5`) or `dhomegui.homes.unlimited`. See [Home Limits](/plugins/dhomegui/features/home-limits/).

### "A home named … already exists"

Re-running `/sethome` on an existing name needs `dhomegui.sethome.overwrite` to move it. Otherwise pick a new name.

### `/home` says I have no default home

Set one in the [editor](/plugins/dhomegui/features/home-editor/) (**Set as Default**), or rely on `FirstHomeIsDefault` so your first home is the default. Until then, use `/home <name>`.

### Teleport keeps getting cancelled

The warmup cancels on movement and on damage (`Settings.Teleport.CancelOnMove` / `CancelOnDamage`). Stand still, set `WarmupSeconds: 0`, or grant `dhomegui.bypass.warmup`.

### "This home looks unsafe"

`CheckUnsafe` detected lava/void/etc. at the destination — run the command again to teleport anyway, or disable `Settings.Teleport.CheckUnsafe`.

### Can't set a home in the nether/end

Those need `dhomegui.world.nether` / `dhomegui.world.end` (both default on). Also check the world isn't in `Settings.Worlds.Disallowed`, and WorldGuard isn't blocking the spot.

### dHomeGUI won't enable

Install [DzusillCore](https://github.com/dzusill/DzusillCore) **1.1.0+** first — it's a hard dependency.

### Does it work on Folia?

Yes — Folia is auto-detected and fully supported. See [Folia Support](/plugins/dhomegui/features/folia/).

### How do I migrate from EssentialsX?

`/dhomeadmin import essentials` (EssentialsX must be installed). See [Admin Tools](/plugins/dhomegui/features/admin-tools/).

### Can homes be shared across servers?

Yes — enable MySQL/PostgreSQL in `database.yml` and point each server at the same database. See [Storage & Database](/plugins/dhomegui/configuration/storage/).

### How do players get more than their permission limit?

Enable [economy](/plugins/dhomegui/features/economy/) and let them **buy slots** from the GUI; purchased slots stack on top of their tier.
