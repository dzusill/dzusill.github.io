---
title: "Reloading"
description: "Requires dgems.admin.reload (default op)."
---

```
/gems admin reload
```

Requires `dgems.admin.reload` (default op).

---

## What reloads

- `config.yml` — currency format, transfer limits, shop settings, GUI titles, webhook settings
- `messages.yml` — every line

Open GUIs are not retitled retroactively; the next one a player opens uses the new settings.

## What does not reload

- **The database connection.** Changing `database.yml` needs a restart. The pool is opened once at startup and is deliberately not swapped while transactions may be in flight.
- **Shop items.** They live in the database, not in a file — edit them with `/gems admin items`, which takes effect immediately (bounded by `shop.item-cache-seconds`).
- **In-flight confirmations.** A player holding an open transfer or purchase confirmation keeps the terms it was created with.

## If a reload fails

The previous configuration stays active. A broken YAML file never leaves the plugin half-configured — fix the syntax error named in the console and reload again.

## Verify after a currency change

Changing `currency.format` affects every displayed amount. Check one of each afterwards:

```
/gems balance
/gems shop
/gems top
```

## Never use `/reload confirm`

Bukkit's global reload re-enables plugins in an uncontrolled order. For a plugin holding a connection pool and an append-only ledger, that is a bad trade for a few saved seconds. Use `/gems admin reload` for configuration and a real restart for anything else.

## Next

- [Commands & Permissions](/plugins/dgems/commands-and-permissions/)
