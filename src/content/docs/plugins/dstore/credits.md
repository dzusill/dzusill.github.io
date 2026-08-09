---
title: "Credits"
description: "dStore is developed and maintained by dzusill."
---

**dStore** is developed and maintained by **dzusill**.

---

## Built on

- [Paper](https://papermc.io/) — server API.
- [SQLite](https://sqlite.org/) — the receipt ledger.
- [LuckPerms](https://luckperms.net/) — optional, used for entitlement grant and revoke.

Deliberately **not** built on DzusillCore: dStore must keep delivering purchases even while the rest of the stack is being upgraded.

## Part of the Phalanx stack

| Plugin | Role |
|---|---|
| [dWebLink](https://dzusill.github.io/plugins/dweblink/) | account linking — website, email, Discord |
| [dPhalanx](https://dzusill.github.io/plugins/dphalanx/) | chat relay, tickets, reports, stats, remote console |
| **dStore** | webstore purchase fulfilment |

## Licence

See the `LICENSE` file shipped with the plugin.

## Support

When reporting an issue, include:

- server version and platform
- dStore version
- `/dstore status` output
- the job id from the website admin panel
- console lines around the failure, with `secret` redacted

Turning on `logging.debug` before reproducing makes the report far more useful.
