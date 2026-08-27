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

**It is a cancelled damage event, not the `invulnerable` flag.** That distinction is the whole design, and it was learned the hard way.

`setInvulnerable` writes to **player data**. The lock is **transient in-memory state**. Using the first for the second means anything that cuts between locking and unlocking — a crash, a hard restart, a force-unload, a version whose quit path forgot to restore it — leaves the flag set with nothing able to notice. And because a player who already has a mode is never locked again, the restore path is never reached: they simply stop taking damage from mobs and players, permanently, and no amount of rejoining fixes it.

Cancelling `EntityDamageEvent` instead means transient state gets a transient mechanism. Nothing is written to player data, so if the plugin stops running or the player stops being locked, the protection ceases to exist on its own. It also cannot fight another plugin's invulnerability, because it never touches the flag.

### Cleaning up after the old behaviour

```yaml
Choice:
  Lock:
    Clear-Leftover-Invulnerability: true
```

A player who was left immortal by an older build is never locked again, so nothing would ever clear it. On join, a player who is **not** being locked and is carrying the flag has it cleared — but only in survival or adventure (creative and spectator are invulnerable by design), and every clear is logged:

```
[dFate] Cleared a leftover invulnerability flag on Steve — an older build's choice lock
        could leave it set.
```

Turn it off if something else on your server sets that flag deliberately, such as a vanish plugin or a lobby guard.

`/fate diag <player>` reports both `locked by choice` and `invulnerable flag`, and flags the combination that should never occur.

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

Two things bring it back, and they cover different gaps.

**Immediately, in chat.** The moment the screen goes away unanswered, the player is told how to reopen it:

> You closed the screen without choosing. Run **/fate** to open it again.

The command is clickable. `/fate` is on the allow-list, so it works while locked, and running it repeatedly cannot stack dialogs — an already-open screen is left alone.

```yaml
Choice:
  Notify-On-Close: true
```

The message is `choice-closed` in `messages.yml`, and `%command%` resolves to the command name so a rename cannot leave the text pointing at something that no longer exists.

It fires only for a player who is still online and still unchosen. The same internal path runs when an admin settles the mode with `/fate set` and when the player disconnects — neither should produce a "you closed it" message.

**As a backstop, on a timer — but not forever.**

```yaml
Choice:
  Reask-Seconds: 10
  Max-Reask-Attempts: 3
```

Every 10 seconds, dFate looks at every locked player and puts the screen back in front of anyone whose dialog is gone. A player whose screen is still open is left alone, and is not nagged either — reminding someone who is looking at the screen is just noise.

After three retries it stops pushing the screen. A dialog that never draws on a client looks exactly like one the player dismissed, so retrying forever would mean a client that cannot render dialogs gets the same failed screen every ten seconds for as long as it stays connected. The reminders keep going; by then the player has been told the command, and the command always works.

`Max-Reask-Attempts: 0` disables retrying entirely and relies on the reminder and the command alone. The first screen on joining is not counted — these are three attempts *after* it.

The player stays locked either way. Retries running out is not permission to play.

## Reminders

Each retry, and every sweep after they run out, sends a reminder on whichever channels are switched on:

```yaml
Choice:
  Notify:
    Chat: true
    Action-Bar: true
    Title: false
```

Any combination; turn all three on to be certain it is seen. They fail differently, which is why all three are switches rather than a decision made for you:

| Channel | Strength | Weakness |
|---|---|---|
| Chat | Room for a clickable command | Scrolls away on a busy server; invisible to a player with chat hidden |
| Action bar | Always on screen | One short line, easy to not read |
| Title | Impossible to miss | Impossible to ignore politely |

The text lives in `messages.yml` under `choice-reminder`, `choice-reminder-actionbar`, `choice-reminder-title` and `choice-reminder-subtitle` — four keys because a chat sentence does not fit an action bar, and a title has no room for a command (its subtitle carries that).

## Release

The lock lifts when:

- the player answers,
- an admin sets their mode with `/fate set`,
- they disconnect (the invulnerability flag is restored first),
- or the plugin disables — every locked player is released, so a reload never leaves someone frozen by a plugin that is no longer running.
