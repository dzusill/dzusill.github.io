---
title: "Credits"
description: "dGems is developed and maintained by dzusill."
---

**dGems** is developed and maintained by **dzusill**.

---

## Built on

- [DzusillCore](https://dzusill.github.io/plugins/dzusillcore/) — modules, config merging, MiniMessage messages, command framework, GUI menus and Folia-aware scheduling.
- [Paper](https://papermc.io/) — server API.
- [PlaceholderAPI](https://www.spigotmc.org/resources/6245/) — optional, balance placeholders.
- MySQL / PostgreSQL — the ledger and every balance.

## Design notes

dGems is written as money-adjacent software, which drives most of its unusual choices:

- **no flat-file mode** — the guarantees need SQL transactions
- **an append-only ledger** — balances must be reconstructible
- **a separate audit log** — the ledger says what, the audit says who
- **idempotent external grants** — webstores retry
- **a bypass permission that is `false` even for op** — unlimited transfer is opt-in

## Licence

See the `LICENSE` file shipped with the plugin.

## Support

When reporting an issue, include:

- server version and platform
- dGems and DzusillCore versions
- database engine and version
- `/gems admin verify` output if balances are involved
- the relevant `/gems admin audit` lines
- console output around the failure, with the webhook URL and database password redacted
