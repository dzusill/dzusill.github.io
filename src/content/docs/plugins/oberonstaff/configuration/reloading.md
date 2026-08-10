---
title: "Reloading"
description: "What /oberonstaff reload applies immediately, and the one section that needs a restart."
---

```
/oberonstaff reload
```

Re-reads `config.yml` and `messages.yml`. The reply says how many rank formats loaded:

```
Reloaded. 7 rank format(s) active.
```

If that number is lower than you expect, an entry in `Ranks` is missing its `Permission` or `Display` and was skipped.

## Applies immediately

- Every rank format and the default
- The staff chat format, permission and console logging
- The whole vanish ladder and `Fallback-Required`
- Teleport override permission, `/back` settings, sounds
- Whether the action log is written
- Every message

## Needs a restart

**The `Commands` section.** Names, aliases, permissions and `Enabled` are written into the server's command map at startup, and Bukkit has no clean way to withdraw a command.

That includes switching one off to make room for EssentialsX — edit, then restart.

**`Vanish.Filter-Tab-Completion`** and **`Vanish.Enabled`**, in one direction. The tab-completion listener is only registered at startup when both are on; turning them on with a reload does not create it. Turning them *off* takes effect immediately, because the listener checks the config each time.

**`database.yml`.** The backend is chosen at startup.

## What a reload does *not* touch

- **Who currently has staff chat mode or `/tptoggle` on.** Those are player choices, not config.
- **`/back` locations.** They live in memory and survive a reload.

## Server reload

`/reload` and `/reload confirm` are not supported, for this plugin or for DzusillCore. Commands are registered into the server's command map at startup; a full server reload leaves them in an inconsistent state. Restart properly.
