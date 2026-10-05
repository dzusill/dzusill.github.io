---
title: "PvP kills: lightning, money and experience"
description: "When a player dies and another player is responsible, a PvP kill happens. In this order:"
---

When a player dies and another player is responsible, a **PvP kill** happens. In this order:

1. `PvpKillEvent` is fired for other plugins.
2. The killer is untagged, per `combat.untag-on-kill`. This also empties the action bar, so the money message that follows is
   not painted over by a stale countdown.
3. If the kill is allowed to reward (no [duel](/plugins/oberoncombat/features/duels/) veto) and the [kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/) does not
   object: the lightning, the money and the experience, **each on its own**. A lightning effect that fails never costs the
   killer the money.

A combat-log death is **not** a kill: the enemy gets no lightning and no money from a player who simply left. A death
by `/kill` is nobody's kill either.

## Lightning

```yaml
kill-effects:
  lightning: true
```

A strike at the victim's death spot. It is purely visual: no damage to players, no fire, no mob conversion. Off in places
excluded for `kill-effect`.

## Money steal

```yaml
money-steal:
  enabled: true
  economy: auto              # auto | vault | excellenteconomy
  currency: money            # the ExcellentEconomy currency id
  percent: 5.0
  decimals: 2
  rounding: floor            # floor | half-up | ceiling
  format:
    style: full              # full: $1,234.56   short: $1.2K
    pattern: "#,##0.00"
    prefix: "$"
    suffix: ""
  anti-farm:
    enabled: false
    per-pair-cooldown: 10m
```

The killer receives `percent` percent of the **victim's balance at the moment of death**, on **every** kill: no cap, no
cooldown by default.

### Which economy is paid

| `money-steal.economy` | Pays |
|---|---|
| `auto` (default) | what PvPManager did: Vault when it is installed; ExcellentEconomy's `money-steal.currency` only when there is no Vault |
| `vault` | always Vault |
| `excellenteconomy` | always that ExcellentEconomy currency |

**Which one is yours:** Vault is the economy behind EssentialsX's `/eco`, `/pay` and `/bal`, **unless** ExcellentEconomy's own
`Integration.Vault.Enabled` is on, in which case it is ExcellentEconomy. If your players' money is in ExcellentEconomy while Vault answers
with EssentialsX, set `economy: excellenteconomy`. Test with the money you use: `/eco give` fills EssentialsX balances, not ExcellentEconomy's.
The console says at startup what is paid and `/oberoncombat status` shows `Money steal pays through:`; a reload picks a change up.

- The victim is charged first and the killer paid second. If the payment fails the victim is **refunded**, so money is
  never created or lost between the two.
- `rounding: floor` means a fraction of a cent is never invented.
- `anti-farm` withholds the money (only the money) when the same killer kills the same victim again within
  `per-pair-cooldown`. For a limit that also runs commands, use the [kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/).
- Nothing is stolen when the chosen economy is not there; the console says so (and lists ExcellentEconomy's currencies if the name is wrong).
- `oberoncombat.exempt.moneysteal` protects a victim. Excluded places (`money-steal`) protect both sides.

### The two messages

| Message | To | When | Tokens |
|---|---|---|---|
| `kill-money-gained` | the killer | at once, with a sound | `%amount%`, `%amount_raw%`, `%percent%`, `%victim%`, `%balance%` |
| `kill-money-lost` | the victim | **after they respawn** (or at their next join if they leave first) | `%amount%`, `%amount_raw%`, `%percent%`, `%killer%`, `%balance%` |

The victim's notice waits because nobody reads an action bar on the death screen.

## Experience steal

```yaml
exp-steal:
  enabled: false
  percent: 0
```

When on, the killer receives `percent` percent of the victim's **experience points** (computed from the victim's level and bar
with vanilla's formulas, not the unreliable running score), and the victim's own experience drop shrinks by what was taken.

- Nothing is taken from a victim who keeps their levels (`keepLevel`, a keep-inventory style rule).
- `oberoncombat.exempt.expsteal` protects a victim; excluded places (`exp-steal`) protect both sides.
- Messages: `exp-won` (killer, at once; `%exp%`, `%victim%`) and `exp-stolen` (victim, after respawn; `%exp%`, `%killer%`).

## OberonKills

OberonKills prints the death message. For a combat-log death it reads the player metadata `oberoncombat_combat_log` during
the death event and uses its own combat-log line. Install OberonKills 1.6.0 or newer.
