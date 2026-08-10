---
title: "Vanish & AFK"
description: "The vanish ladder applied to messaging and tab completion, the AFK note, and why both go through real APIs rather than PlaceholderAPI strings."
---

## Check they took first

```
/oberonmsg status
```

```
Vanish: PremiumVanish (enabled: yes), AFK: EssentialsX
```

**`none` for either means that integration is doing nothing** — and it looks exactly like it working until somebody
vanishes or goes away.

## Vanish

Works with **PremiumVanish** and **SuperVanish**, which share an API, reached by reflection so there is nothing extra
to install.

A vanished player above the sender's level:

- cannot be messaged — the sender is told **"This player is not online"**, the same as for a genuinely offline player
- does not appear in tab completion, for **any** command on the server

### The same message, on purpose

A separate "you cannot see them" would confirm that somebody invisible is online, which is the one thing vanish
exists to prevent. `message.not-online` and `player-not-found` in `messages.yml` are the same text — keep them that
way when you restyle.

### The ladder

```yaml
Vanish:
  Levels:
    - Target: "pv.see.level6"
      Required: "pv.see.level100"
    - Target: "pv.see.level5"
      Required: "pv.see.level5"
  Fallback-Required: "pv.see"
```

*A vanished player holding `Target` can only be seen by somebody holding `Required`.* Highest rung first; the first
rung the vanished player holds decides, outright. That is what lets senior staff hide from junior staff.

Identical to [OberonStaff's ladder](/plugins/oberonstaff/features/vanish/) — keep them in step if you run both.

### Tab completion is filtered server-wide

```yaml
Vanish:
  Filter-Tab-Completion: true
```

Every command on the server, not just this plugin's. A staff member hidden from the player list but suggested the
moment somebody types `/msg ` is not hidden at all.

The listener is not registered when this is off, or when vanish is disabled — turning it **on** therefore needs a
restart.

### Why not the placeholder

The old script read `%premiumvanish_isvanished%` and compared it to `"Yes"`. That fails silently — by deciding
**nobody is vanished** — if the expansion is missing, renamed, or ever returns a localised value.

## AFK

When the recipient is away, the sender gets a note under their own line:

```
This player is away and might not reply.
```

Read from EssentialsX's own API, for the same reason: the old script asked PlaceholderAPI for `%essentials_afk%` and
compared it to `"yes"`.

The message is delivered either way. Without EssentialsX there is simply no note, and nothing else changes.

## Other plugins

Essentials vanish and CMI vanish are not detected. If you use one, tell us — the hook is small and isolated.
