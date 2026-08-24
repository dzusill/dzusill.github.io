---
title: "The Lock"
description: "The choice screen sets canclosewithescape = false. That stops the escape key and nothing else — a client can still lose the dialog by disconnecting, and…"
---

The choice screen sets `can_close_with_escape = false`. That stops the escape key and nothing else — a client can still lose the dialog by disconnecting, and nothing stops a player from simply never pressing a button.

The lock is what makes "you must choose" true rather than merely intended. Without it, an unchosen player could stand in the world indefinitely, outside every rule the plugin enforces.

## What is held

```yaml
Choice:
  Lock:
    Enabled: true
    Freeze-Movement: true
    Block-Chat: true
    Block-Commands: true
    Block-Interaction: true
    Invulnerable: true
    Allowed-Commands:
      - fate
      - dfate
    Reminder-Cooldown-Seconds: 3
```

| Setting | What it blocks |
|---|---|
| `Freeze-Movement` | Position changes. Looking around still works — pinning the camera would fight the mouse while they read. |
| `Block-Chat` | Chat messages. |
| `Block-Commands` | Every command except those in `Allowed-Commands`. |
| `Block-Interaction` | Right/left click, block break, block place, item drop, opening containers. |
| `Invulnerable` | Damage. See below. |

Turning off `Choice.Lock.Enabled` makes every one of these fall straight through — the screen still appears, but the player can walk off and ignore it.

## Why invulnerable

On by default, and worth keeping. Being killed by a zombie while reading a screen you cannot close is a poor welcome. On a hardcore pick it is worse than poor: it would ban an account that had not finished being created.

dFate remembers the player's **previous** invulnerability flag rather than assuming `false`, so releasing the lock cannot strip protection another plugin had granted. The flag is also restored when a locked player disconnects — it lives in player data, so leaving it set would send them back into the world permanently immune.

## Reminders

Trying to move, chat, interact or run a blocked command produces:

> Choose your fate first — the screen is waiting for you.

A held movement key fires every tick, so the reminder is rate-limited by `Reminder-Cooldown-Seconds` (default 3). Without that, the reminder would bury the screen it points at.

## Allowed commands

```yaml
Allowed-Commands:
  - fate
  - dfate
```

Written without the leading slash. **An empty list means no commands at all** — nothing is silently substituted, so the one key you emptied on purpose is not the one key you cannot change.

`/fate` is on the list so a locked player can still read their status. Running it while unchosen replies in chat rather than opening a status dialog, because a second screen would replace the choice screen they are supposed to be answering.

## Getting the screen back

```yaml
Choice:
  Reask-Seconds: 10
```

Every 10 seconds, dFate looks at every locked player and puts the screen back in front of anyone whose dialog is gone — closed by a disconnect, or expired by DzusillCore's token sweep. A player whose screen is still open is left alone, so this never stacks two dialogs.

This sweep, not the escape flag, is what actually enforces the choice.

## Release

The lock lifts when:

- the player answers,
- an admin sets their mode with `/fate set`,
- they disconnect (the invulnerability flag is restored first),
- or the plugin disables — every locked player is released, so a reload never leaves someone frozen by a plugin that is no longer running.
