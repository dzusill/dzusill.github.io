---
title: "Reloading"
description: "What /oberonchat reload applies immediately, and the one section that needs a restart."
---

```
/oberonchat reload
```

Re-reads `config.yml`, `filter.yml` and `messages.yml` and swaps the new settings in. The reply says how many rules loaded:

```
Reloaded. 24 rule(s) active.
```

If that number is lower than you expect, check the console for `Skipping unusable filter entry`.

## Applies immediately

- The whole word list and whitelist
- Match modes, actions, weights, censor character
- Every normalisation step
- Caps threshold, minimum length, action
- All four anti-spam checks
- Violation decay, thresholds and punishment commands
- Staff alert settings
- Every message and the feedback channels

A reload builds a **new** word filter and swaps it in. A message being checked at that moment finishes against the old one, so a reload never lands mid-message.

## Needs a restart

**`Sources`.** These decide which listeners are registered with the server, and that happens once at startup:

```yaml
Sources:
  Chat: true
  Commands: { Enabled: true }
  Signs: true
  Books: true
  Anvil: true
```

Turning signs on with a reload does nothing; the listener does not exist yet. The upside of doing it this way is that a source you turned off costs nothing at runtime — not even an event call.

**`Chat-Event`** likewise, for the same reason.

**`database.yml`.** The backend is chosen at startup.

## What a reload does *not* touch

Running violation totals. Reloading is not an amnesty — use `/oberonchat clear <player>` for that.

## Server reload

`/reload` and `/reload confirm` are not supported, for this plugin or for DzusillCore. Commands are registered into the server's command map at startup; a full server reload leaves them in an inconsistent state. Restart properly.
