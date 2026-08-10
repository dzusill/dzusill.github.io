---
title: "Reloading"
description: "What /oberonmob reload applies immediately, and the one change that needs a restart."
---

```
/oberonmob reload
```

Re-reads `config.yml` and `messages.yml`. The reply tells you both how many toggles are active and whether a restart is needed:

```
Reloaded. 2 toggle(s) active. Restart needed for command changes: no
```

## Applies immediately

- Radius, mode, `Cancel-When-Others-Nearby`, `Prevent-Targeting`
- Entity lists, exclusions and group tokens — re-expanded from scratch
- Spawn reasons
- `Default-Disabled`
- Hide-mode refresh interval — the sweep is restarted with the new one
- Every message and the feedback channels

Online players are re-read as part of the reload: a toggle may have changed its default, its mode or its radius under them, so their state is rebuilt from storage rather than carried over.

## Needs a restart

**Adding or removing a toggle.** Its command is written into the server's command map at startup, and Bukkit has no clean way to withdraw one.

**Renaming a command, changing its aliases or its permission** — same reason.

The reload message says `Restart needed for command changes: yes` when it notices the set of toggles changed. Everything it *could* apply, it already did — the restart is only for the commands.

**`database.yml`.** The backend is chosen at startup.

## What a reload does *not* touch

Nothing, in practice. Player choices are reloaded from storage, so a reload is safe to run on a live server.

The one visible effect: in hide mode, a reload restarts the sweep, so there can be up to one `Refresh-Ticks` interval before hidden mobs are re-hidden. Two seconds at the default.

## Server reload

`/reload` and `/reload confirm` are not supported, for this plugin or for DzusillCore. Commands are registered into the server's command map at startup; a full server reload leaves them in an inconsistent state. Restart properly.
