---
title: "Reloading"
description: "Apply changes to config.yml and messages.yml without a full restart:"
---

Apply changes to `config.yml` and `messages.yml` without a full restart:

```
/warp reload
```

or equivalently:

```
/warpadmin reload
```

Both require `warpgui.reload`. The reload re-reads the config and messages and reloads the warp store.

## What reloads live vs. needs a restart

| Change | Live with `/warp reload`? |
|---|---|
| `config.yml` values (warmup, prices, toggles, GUI text, categories) | ✅ |
| `messages.yml` text & sounds | ✅ |
| `database.yml` (switching storage backends) | ❌ — restart the server |

> Switching between flat-file and database storage, or changing connection details, requires a **restart** — the storage backend is wired up at startup.
