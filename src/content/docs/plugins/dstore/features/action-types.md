---
title: "Action Types"
description: "A fulfilment job carries a typed action. dStore routes each type to a dedicated executor — it never blindly runs a string the API sent."
---

A fulfilment job carries a typed action. dStore routes each type to a dedicated executor — it never blindly runs a string the API sent.

---

## Supported types

| Type | What it does | Needs |
|---|---|---|
| `CONSOLE_COMMAND` | Runs a command template from the console | `execution.console-commands-enabled` |
| `ENTITLEMENT_GRANT` | Adds a LuckPerms group or permission | LuckPerms |
| `ENTITLEMENT_REVOKE` | Removes a LuckPerms group or permission | LuckPerms |
| `ITEM_GRANT` | Gives an item stack to the player | player online |

Anything else is routed to the external-integration path, so another plugin can own a product type dStore does not know about. An unroutable type is reported as failed — never silently swallowed.

---

## Console commands

The website stores a **template**, which dStore renders with the purchase's values before running it:

```
crate give %player% vote 3
```

Rendering is done by the plugin, not the API, so the values that land in a command come from the job's typed fields rather than from free text. Commands run from the console with the server's own permissions.

Turn the whole type off with:

```yaml
execution:
  console-commands-enabled: false
```

Jobs of that type then fail rather than executing — visible on the website as undelivered, which is the honest outcome.

## Entitlements

Grant and revoke are the same executor with a flag. Both go through the LuckPerms API rather than `lp` console commands, so:

- they work while the player is offline
- they do not depend on command syntax staying stable
- failures come back as real errors, not a silent no-op

Without LuckPerms installed, both types fail.

## Items

Items are given on the main thread — on Folia, on the player's own region scheduler. The player must be online; otherwise the job stays queued.

`execution.main-thread-timeout-seconds` (default 10) bounds the wait. Exceeding it fails the job rather than blocking the tick.

## Ordering

Actions run one at a time, in the order the API returned them. A product that grants a rank *and* an item runs both in the order the website defined.

## Next

- [Updates](/plugins/dstore/features/updates/)
