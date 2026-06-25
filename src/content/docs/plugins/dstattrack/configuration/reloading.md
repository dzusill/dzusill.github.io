---
title: "Reloading"
description: "dStattrack reads config.yml and messages.yml at startup. There is no /dstattrack reload subcommand, so to apply changes:"
---

dStattrack reads `config.yml` and `messages.yml` at **startup**. There is no `/dstattrack reload` subcommand, so to apply changes:

1. Edit `config.yml` and/or `messages.yml`.
2. **Restart the server** (or use a plugin manager that fully reloads dStattrack).

## What changes affect

| Change | Effect |
|---|---|
| `price` | New price applies to future `add` actions after restart. |
| `stattrackItems` / `items` | Changes which materials are eligible / which group they track. |
| `lore` templates | New items, and already-stattracked items, pick up the new lore **the next time their counter changes** (a kill, `/dstattrack set`, etc.). |
| `sounds`, `gui` | Apply after restart. |
| `messages.yml` | Apply after restart. |

> Editing a lore template does not retroactively rewrite items that are sitting in chests — their lore is rebuilt only when that specific item is next updated. Use `/dstattrack set <category> <value>` on an item to force a rebuild.
