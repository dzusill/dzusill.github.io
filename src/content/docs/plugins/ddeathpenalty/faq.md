---
title: "FAQ & Troubleshooting"
description: "Money penalties need Vault + an economy plugin. Without them, the money penalty is skipped (other penalties still apply). Also check money.enabled and that…"
---

### Money isn't being taken

Money penalties need [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin. Without them, the money penalty is skipped (other penalties still apply). Also check `money.enabled` and that the player's balance is above `money.min`.

### OPs aren't being penalised

By default OPs **are** penalised. If they're not, check you haven't set `settings.ignore-ops: true`, or granted them `deathpenalty.exempt`/`deathpenalty.ignore` (e.g. via a `*` permission).

### A VIP gets the wrong penalty

Group matching uses `deathpenalty.group.<name>` and the **first** group in file order wins. Make sure the player has the right `deathpenalty.group.*` node and that more-specific groups are listed first in `config.yml`. See [Penalty Profiles](/plugins/ddeathpenalty/features/penalty-profiles/).

### How do I make a safe zone?

Per region: `/rg flag <region> death-penalty deny` (needs WorldGuard). Per world: set `worlds.<world>.enabled: false`. Per player: grant `deathpenalty.exempt` (optionally per-world). See [Exemptions](/plugins/ddeathpenalty/features/exemptions/) and [WorldGuard](/plugins/ddeathpenalty/features/worldguard/).

### Difference between `exempt` and `ignore`?

`exempt` = no penalty but the player still gets the exempt message and the death is counted. `ignore` = the plugin acts as if it isn't installed for that player (no message, no stats). See [Exemptions](/plugins/ddeathpenalty/features/exemptions/).

### Can players keep their items but still be punished?

Yes — set `items.mode: KEEP` and rely on the [money](/plugins/ddeathpenalty/features/money-penalty/), [XP](/plugins/ddeathpenalty/features/xp-penalty/) or [respawn](/plugins/ddeathpenalty/features/respawn-effects/) penalties.

### The lost money just disappears — can someone pick it up?

Enable the `money-item` drop so the loss falls as a physical item at the death spot. See [Extra Penalties](/plugins/ddeathpenalty/features/extra-penalties/).

### dDeathPenalty won't enable

Install [DzusillCore](https://github.com/dzusill/DzusillCore) **1.1.0+** — it's a hard dependency.

### My WorldGuard flag doesn't exist

The `death-penalty` flag is registered at server load. If WorldGuard was installed after dDeathPenalty, restart the server so the flag registers. See [WorldGuard Regions](/plugins/ddeathpenalty/features/worldguard/).
