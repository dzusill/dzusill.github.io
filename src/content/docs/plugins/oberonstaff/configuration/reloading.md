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
- **The whole ticket desk**: categories, priorities, timings, canned replies, follower rules, notification defaults, punishment actions, report settings, and `This-Server-Only`
- `menus.yml` and `sounds.yml` — a menu picks up its new layout the next time it is opened

## Needs a restart

**The `Commands` section.** Names, aliases, permissions and `Enabled` are written into the server's command map at startup, and Bukkit has no clean way to withdraw a command.

That includes switching one off to make room for EssentialsX — edit, then restart.

**`Vanish.Filter-Tab-Completion`** and **`Vanish.Enabled`**, in one direction. The tab-completion listener is only registered at startup when both are on; turning them on with a reload does not create it. Turning them *off* takes effect immediately, because the listener checks the config each time.

**`database.yml`.** The backend is chosen at startup.

## What a reload does *not* touch

- **Who currently has staff chat mode or `/tptoggle` on.** Those are player choices, not config.
- **`/back` locations.** They live in memory and survive a reload.
- **Notification switches players set for themselves.** Changing a default under `Tickets.Notifications.Defaults` moves everybody who never opened `/ticket notifications`, and leaves alone everybody who did — which is what changing a default should mean.
- **A wizard somebody is halfway through.** They finish the questions they were asked, even if you just edited that category.
- **Open menus.** Close and reopen to see a new layout.

Deleting a ticket category and reloading removes it from the picker at once. Tickets already in it keep working — they show the raw category key rather than a display name, and staff can move them with `/tickets category`.

## Server reload

`/reload` and `/reload confirm` are not supported, for this plugin or for DzusillCore. Commands are registered into the server's command map at startup; a full server reload leaves them in an inconsistent state. Restart properly.
