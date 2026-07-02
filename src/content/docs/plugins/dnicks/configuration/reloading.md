---
title: "Reloading"
description: "Requires dnicks.reload (op by default). It:"
---

```
/dnicks reload
```

Requires `dnicks.reload` (op by default). It:

1. re-reads `config.yml`,
2. reloads the language file and regenerates `messages.yml`,
3. re-applies every online player's nick across all owned surfaces (chat format, tab name, display name), so format and toggle changes take effect **live** — no restart needed.

The nametag above the head is owned by your nametag plugin, so its formatting changes are reloaded there (e.g. TAB `/tab reload`), not by `/dnicks reload`.

## When a restart is needed instead

A reload covers config and language. Restart the server when you **update the jar** itself.

> **Tip:** if you changed a surface from `false` to `true` and players already online don't update, `/dnicks reload` re-applies them; brand-new joins always pick up the latest config.
