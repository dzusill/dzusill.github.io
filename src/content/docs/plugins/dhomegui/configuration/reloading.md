---
title: "Reloading"
description: "Apply changes to config.yml and messages.yml without restarting:"
---

Apply changes to `config.yml` and `messages.yml` without restarting:

```
/dhomeadmin reload
```

Requires `dhomegui.admin`. It re-reads the config and messages and reloads the home store. **Reopen any open menu** for GUI changes (titles, lore, `GUI.Rows`, filler) to show.

## What needs a restart

| Change | Live with reload? |
|---|---|
| `config.yml` values (teleport, worlds, economy, types, GUI text) | ✅ |
| `messages.yml` text & sounds | ✅ |
| `database.yml` (enabling/switching storage) | ❌ — restart the server |

> The storage backend (flat file vs MySQL/PostgreSQL) is wired at startup, so changing `database.yml` requires a full restart.
