---
title: "FAQ & Troubleshooting"
description: "Money penalties need Vault + an economy plugin. Without them, the money penalty is skipped (other penalties still apply). Also check money.enabled and that…"
---

### Money isn't being taken

Money penalties need [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin. Without them, the money penalty is skipped (other penalties still apply). Also check `money.enabled` and that the player's balance is above `money.min`.

### XP isn't being reset

Only the **reset** modes clear XP — `lose-levels: 0` (wipe) or `N` (drop N levels); `lose-levels: -1` just drops vanilla orbs. If you use [`only-if-no-money: true`](/plugins/ddeathpenalty/features/xp-penalty/#money-first-fallback), XP is reset **only when the player had no money to take** — a player with a balance keeps their XP by design (money is the penalty instead). To always reset XP regardless of balance, set `only-if-no-money: false`.

### OPs aren't being penalised

By default OPs **are** penalised. If they're not, check you haven't set `settings.ignore-ops: true`, or granted them `deathpenalty.exempt`/`deathpenalty.ignore` (e.g. via a `*` permission).

### A VIP group's penalty is wrong, or a discount won't apply

- **No effect at all:** the player must have the `deathpenalty.group.<name>` node. Being in a LuckPerms group of the same name is **not** enough — grant the node to that group (`/lp group vip permission set deathpenalty.group.vip true`). Don't test as an OP; OPs match the first group automatically.
- **Discount ignored (FIXED or low amount):** `min`/`max` are inherited per-key, so a group that only lowers `amount` is still floored by the `default` `min`. Set `min: 0` (and `max: -1` if capped) in the discount group too.
- **Wrong group applied:** if the player matches several groups, the **first** in file order wins.

See [Penalty Profiles](/plugins/ddeathpenalty/features/penalty-profiles/).

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
