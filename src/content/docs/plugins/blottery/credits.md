---
title: "Credits"
description: "bLottery is developed and maintained by dzusill, built for BasicLand.cz."
---

**bLottery** is developed and maintained by **dzusill**, built for **BasicLand.cz**.

---

## Built on

- [DzusillCore](https://dzusill.github.io/plugins/dzusillcore/) — modules, config merging, MiniMessage messages, command framework, GUI menus and Folia-aware scheduling.
- [Paper](https://papermc.io/) — server API.
- [Vault](https://www.spigotmc.org/resources/34315/) — the economy. On Folia, **VaultUnlocked**.
- MySQL — rounds, tickets, payouts, history and stats.

## Related

[dLottery](https://dzusill.github.io/plugins/dlottery/) is the general-purpose lottery from the same codebase family. bLottery is the BasicLand.cz build: its economy, its rank tiers, its ticket caps.

## Design notes

- **weighted draw, not highest bidder** — every ticket is one entry
- **no operator override** — there is no command to set the pot or pick a winner
- **payouts in the database** — an offline winner is owed real money; that promise has to survive a crash
- **no reload command** — a live round is state, not configuration

## Licence

See the `LICENSE` file shipped with the plugin.

## Support

When reporting an issue, include:

- server version and platform
- bLottery and DzusillCore versions
- your economy plugin
- `settings.yml`
- `/lot status` and `/lot history` output
- console lines around the failure, with the database password redacted
