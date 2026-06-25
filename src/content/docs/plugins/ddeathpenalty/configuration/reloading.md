---
title: "Reloading"
description: "Apply changes to config.yml and messages.yml without restarting:"
---

Apply changes to `config.yml` and `messages.yml` without restarting:

```
/dp reload
```

(or `/deathpenalty reload`). Requires `deathpenalty.reload`. It re-reads the config and messages; new penalty profiles take effect on the **next death**.

| Change | Live with `/dp reload`? |
|---|---|
| `default` / `worlds` / `groups` profiles | ✅ |
| `settings` (stats interval, ignore-ops) | ✅ |
| `messages.yml` | ✅ |
| The WorldGuard flag registration | ❌ — set at server `onLoad` (restart if WorldGuard was added later) |

> Stats in `stats.yml` are unaffected by a reload — they keep accumulating.
