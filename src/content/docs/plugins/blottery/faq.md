---
title: "FAQ & Troubleshooting"
description: "Usually the database. bLottery requires MySQL and does not have a file-based fallback — running a lottery that cannot record a payout is worse than not…"
---

### The plugin will not enable.

Usually the database. bLottery requires MySQL and does not have a file-based fallback — running a lottery that cannot record a payout is worse than not running one. Check `database.yml` and the console for the JDBC error.

Second most common: Vault or an economy plugin missing.

### Rounds keep ending with no winner.

Two reasons appear in `/lot history`:

- **`NO_TICKETS`** — nobody bought. Usually `ticketPrice` is too high for your economy.
- **`TOO_FEW_PLAYERS`** — fewer than `minPlayers` took part. Lower `minPlayers`, or lengthen `lossTime` so more players are online during a round.

### Can I set `minPlayers: 1`?

You can, and you should not on a live server. A single participant wins their own money back minus tax — a guaranteed loss dressed up as a lottery. Use it for testing only.

### A player won while offline and never got paid.

The payout is queued in the database and paid on their next join. Check they have actually rejoined since the draw. If they have and were not paid, capture the console output around their login — that is where the payout attempt is logged.

### More tickets should mean a guaranteed win, right?

No — that would not be a lottery. Each ticket is one entry in a weighted draw. Ten tickets means ten entries out of the total, and the GUI shows the resulting percentage.

### Is it rigged?

The draw is weighted random, server-side, using only ticket counts. Nothing else about a player is an input. To check a specific claim, compare a player's `winCount` in `/lot top` against their share of tickets bought over the same period — short runs are noisy, longer ones converge.

There is also deliberately **no command** to set the pot or pick a winner. The absence is the point.

### A player has two rank permissions — do the caps add?

No. The cap is the **highest** tier they hold. `blottery.iron` (2) plus `blottery.emerald` (5) gives 5, not 7.

### How do I change ticket price mid-round?

Let the round finish, or run `/lot reset` to refund everyone, then edit `settings.yml` and restart. Changing the price under a round that already sold tickets means players paid different amounts for the same draw.

### There is no reload command.

Correct. A round is live state — an open timer, tickets already paid for, a pot. Edit the file and restart; the round is persisted and resumes with its tickets and pot intact.

### Reminders are too noisy / too quiet.

`remindsTime` is a plain list of seconds before the draw. Add or remove entries. An empty list disables them. `announce.enable: false` keeps chat reminders but drops the on-screen title.

### Does it work on Folia?

Yes — but use **VaultUnlocked** rather than the original Vault. The old Vault API is not region-thread-safe.

### Can several servers share one lottery?

Yes. Point them at the same database: shared round, pot, history and leaderboard. A player can buy on one server and be paid on another.

### What is the tax for?

`taxesPercent` removes currency from the economy permanently. It is one of the few money sinks players opt into voluntarily. Set it to `0` for a pure pass-through pot.

### How is this different from dLottery?

Same core idea, tuned for **BasicLand.cz** — its economy, its rank tiers and its ticket caps. [dLottery](https://dzusill.github.io/plugins/dlottery/) is the general-purpose version.

## Next

- [Credits](/plugins/blottery/credits/)
