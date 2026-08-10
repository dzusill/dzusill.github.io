---
title: "Reloading"
description: "What /oberonmsg reload applies immediately, and the one section that needs a restart."
---

```
/oberonmsg reload
```

Re-reads `config.yml` and `messages.yml`.

```
Reloaded. Reply timeout: 300s.
```

## Applies immediately

- All three message formats
- The reply timeout — including on conversations already in progress
- Both sounds
- The whole vanish ladder
- Whether the message log is written
- Every message in `messages.yml`

## Needs a restart

**The `Commands` section.** Names, aliases, permissions and `Enabled` are written into the server's command map at
startup, and Bukkit has no clean way to withdraw a command.

That includes switching one off to make room for EssentialsX.

**`Ignore.Hide-Public-Chat`** and **`Vanish.Filter-Tab-Completion`**, in one direction. Their listeners are only
registered at startup when the setting is on; turning one on with a reload does not create the listener. Turning one
*off* takes effect immediately, because the handler checks the config each time.

**`database.yml`.** The backend is chosen at startup.

## What a reload does *not* touch

- **Who has `/msgtoggle` or `/socialspy` on.** Those are player choices, not config.
- **Ignore lists.** Same.
- **Reply targets**, except that a shorter timeout may expire some of them immediately.

## Server reload

`/reload` and `/reload confirm` are not supported, for this plugin or for DzusillCore. Commands are registered into
the server's command map at startup; a full server reload leaves them in an inconsistent state. Restart properly.
