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
3. re-applies every online player's nick across all surfaces (chat format, tab name, nametag), so format and toggle changes take effect **live** — no restart needed.

## When a restart is needed instead

A reload covers config and language. Restart the server when you:

- **update the jar** itself, or
- change a setting that only takes effect on (re)spawn for already-spawned displays — most nametag-display tweaks apply on the next nametag refresh, which you can force with `/nick reset` then re-setting the nick.

> **Tip:** if you changed a surface from `false` to `true` and players already online don't update, `/dnicks reload` re-applies them; brand-new joins always pick up the latest config.
