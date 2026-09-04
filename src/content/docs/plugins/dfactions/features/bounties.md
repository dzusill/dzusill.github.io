---
title: "Faction Bounties"
description: "A public market where anyone can put money on a faction's head. The pool is visible to the whole"
---

A public market where anyone can put money on a faction's head. The pool is visible to the whole
server and grows as more players contribute, and it pays out when that faction is actually beaten —
not when one of its members dies in a random fight.

Bounties ship **switched off**. Turn them on with `factions.bounties.enabled: true`. They need a
Vault economy provider; without one the feature disables itself and every command answers
"economy unavailable".

## How a bounty works

1. **Someone funds it.** `/f bounty add <faction> <amount>`, or click a faction in `/f bounty`. The
   money leaves the funder's account immediately.
2. **The pool grows.** Any number of players can add to the same pool. Every contribution is recorded
   individually, which is what makes both the "who funded this" display and refunds possible.
3. **It settles.** Exactly one of four things happens to every pool:

| Outcome | When | Where the money goes |
|---|---|---|
| Claimed | The target loses a war | The winning faction's bank |
| Refunded | The target disbands, the bounty expires, or a season ends | Back to every contributor |
| Transferred | The target merges into another faction | Follows the surviving faction |
| Burned | Staff clear it, or `on-season-end: BURN` | Removed from the economy |

## The 24-hour holding period

A contribution cannot be paid to a war winner until it has sat in the pool for
`restrictions.holding-period-hours` — 24 by default.

This closes the "safe deposit box" exploit: without it, a faction could park cash in a rival's pool,
arrange to win the war, and use the bounty as a raid-proof vault. Money in a bounty has to be money
genuinely at risk.

**The clock runs per contribution, not per pool.** That matters in both directions:

- Topping a pool up never re-locks money that has already been at risk.
- A last-minute top-up cannot be cashed out immediately.

One consequence is worth knowing before it surprises you: **if you beat a faction whose bounty money
is all still inside its holding window, you get nothing.** The pool is left untouched and waits for
the next challenger. The plugin says so explicitly rather than staying silent.

## Beating a bountied faction

The payout trigger is losing a declared war. A draw or a cancelled war pays nothing.

A bounty that paid out on any member kill would be trivially farmed — set a bounty on a friend, kill
them on an alt, and the money launders itself clean. Tying it to a war result means the condition is
something the plugin already tracks independently and cannot be staged in five minutes.

An optional per-kill mode exists (`per-kill.enabled`, off by default) that drains a percentage of the
cleared pool on each kill of a bountied faction's member. It is guarded by a per-pair cooldown, a
per-kill cap, and skips same-faction kills.

### Dissolving to escape

A heavily bountied faction can always dissolve itself rather than fight. When it does, **every
contributor is refunded their exact share** — nobody loses money, and the escaping faction gains
nothing: it has erased its own claims, bank and beacon to avoid a fight.

This holds even mid-war. dFactions records the surviving opponent as the war winner when a belligerent
disbands, but a bounty deliberately disagrees: dissolving is an escape, not a defeat, so the funders
are refunded and the besieger collects nothing.

Refunds reach offline players. If the economy provider is unavailable at that moment, the refund is
queued and retried the next time the player logs in.

## Who can be bountied

Blocked by default, each switchable in `restrictions`:

| Blocked | Why |
|---|---|
| Your own faction | Otherwise a faction funds a bounty on itself, has an ally "beat" it, and launders the money back |
| Allies and truce partners | Prevents arranged defeats between friendly factions |
| Safezone / warzone | These cannot be defeated, so the pool would hang forever |
| Shielded factions | New contributions are blocked while the shield holds; an existing pool stays live |
| Factions with no members | An abandoned faction cannot lose a war, so the pool could never pay out |

A relation counts if **either** side records it — requiring both to agree would let two factions
arrange a defeat by having only one of them drop the alliance first.

### Funding from an enemy beacon

Right-clicking another faction's beacon starts a funding prompt for that faction — an enemy HQ being
the natural place to put money on their head (`interface.beacon-funding`, on by default). Members
clicking their own beacon still get the faction menu, and the beacon stays locked either way.

A player with **no faction** is refused outright here and simply gets the usual "only members can use
the beacon" message: with no faction of their own they have no enemies, so a bounty prompt on a
stranger's block is noise rather than an offer. This entry point only; funding from the browser and
from `/f bounty add` still follows `access.allow-factionless`.

## Commands

| Command | Who | Purpose |
|---|---|---|
| `/f bounty` | Players | Open the bounty browser |
| `/f bounty add <faction> <amount>` | Players | Fund a bounty |
| `/f bounty info <faction>` | Players | Pool, claimable share, funders, expiry |
| `/f bounty top` | Players | The richest pools on the server |
| `/fbounty` | Players | Standalone alias for the above (aliases `/fbounties`, `/factionbounty`) |
| `/fa bounty add\|remove\|reset <faction> [amount]` | Staff | Adjust a pool without charging or paying anyone |
| `/fa bounty history` | Staff | The full audit trail |

Permissions: `factions.cmd.bounty`, `.add`, `.info`, `.top`, and `factions.admin.bounty`.

The standalone command is registered at runtime, not from `plugin.yml`, so it is fully configurable:

```yaml
factions:
  bounties:
    command:
      enabled: true
      name: fbounty
      aliases: [fbounties, factionbounty]
```

It defaults to `/fbounty` precisely so it cannot shadow the `/bounty` a separate player-bounty plugin
ships. Set `name: bounty` to claim the short name yourself, or `enabled: false` to register nothing
at all — `/f bounty` keeps working either way.

## Interface

Three screens, all defined in `gui.yml` and editable without touching code: the **browser**
(`gui.menus.bounties`), the **confirmation screen** (`bountyconfirm`) and the **staff history**
(`bountyhistory`).

Unlike the other menus, these are config-driven all the way down — material, slot, name and every
lore line, list entries included. The browser sorts by highest, lowest, recently set or last topped
up, searches by faction name, and repaints itself when a pool changes.

## Staff tools

`/fa bounty add|remove|reset` are **adjustments, not transactions**: no player is charged by an add
and none is paid by a remove or reset. Every one is written to the history with the staff member's
name.

The history is the audit trail for refund disputes and suspected collusion. It caches faction names
at write time, so it stays readable after a faction has been deleted — which is exactly the disband
case a dispute is usually about.

## Settings

Everything lives under `factions.bounties` in `config.yml`, grouped as `access`, `money`,
`restrictions`, `payout`, `per-kill`, `expiry`, `lifecycle`, `interface`, `input` and
`announcements`. Two worth calling out:

- **`money.source`** — `WALLET` (the player pays) or `FACTION_BANK` (the faction pays, as an official
  act). Bank funding needs a rank at or above `access.bank-funding-min-priority`, officer by default.
  Bank-funded money refunds to the bank, not to the officer who spent it.
- **`lifecycle.on-season-end`** — defaults to `REFUND`. A dFactions season rollover rolls stat tables
  and takes no money off anyone, so burning would make bounties the one place a reset destroys player
  funds. Set it to `BURN` if you want the money sink.

## Integrations

All optional; the feature works fully without any of them except the economy.

| Integration | What it adds |
|---|---|
| Vault | Required for money to move |
| PlaceholderAPI | The full bounty family — own faction, any named faction, the board, server totals, the viewer as a funder, where they are standing, the config values and the latest log line. The same keys work in `gui.yml` lore and the message files as `{key}`. See the [placeholder reference](/plugins/dfactions/placeholders/#bounties). |
| dDialogs | A `faction_bounties` data source a dialog can list |
| Discord | Bounty set, claimed and refunded pushed to the bridge |

## For developers

Three Bukkit events, in `me.dzusill.dfactions.event`:

- `FactionBountySetEvent` — **cancellable**, fired before the money is taken. Cancelling leaves the
  funder uncharged.
- `FactionBountyClaimEvent` — informational, fired after a payout. May fire more than once for the
  same faction when only part of a pool had cleared its holding period.
- `FactionBountyRefundEvent` — informational, fired after a refund. `getReason()` distinguishes a
  disband from expiry, a season end, a merge or a staff reset.
