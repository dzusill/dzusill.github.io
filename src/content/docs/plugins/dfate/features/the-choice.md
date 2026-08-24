---
title: "The Choice"
description: "The first time a player joins without a stored mode, dFate shows them a screen with two buttons and does not let them play until one is pressed."
---

The first time a player joins without a stored mode, dFate shows them a screen with two buttons and does not let them play until one is pressed.

## What the player sees

```
┌─────────────────────────────────────────┐
│           Choose your fate              │
│                                         │
│  Welcome, Steve.                        │
│                                         │
│  This choice is made once and cannot    │
│  be taken back.                         │
│                                         │
│  ▪ Hardcore — one life. Die and your    │
│    account is locked for 24h.           │
│  ▪ Normal — the ordinary game.          │
│                                         │
│   [ Hardcore ]        [ Normal ]        │
└─────────────────────────────────────────┘
```

Every word of that — title, body, both labels and both hover tooltips — comes from `messages.yml`. See [messages.yml](/plugins/dfate/configuration/messages/).

## The second screen

Picking hardcore does not commit anything yet. A confirmation follows:

> **Are you certain?**
> You are about to choose **Hardcore**. From this moment, a single death locks your account for 24h. You *cannot* undo this yourself.
>
> `[ I accept my fate ]` `[ Take me back ]`

Declining puts the original choice screen back. Nothing is stored until the confirmation is accepted.

```yaml
Choice:
  Confirm-Hardcore: true
```

Turning it off commits hardcore on the first click. Not recommended — the choice cannot be undone by the player, so the second screen is what stops a misclick from becoming a support ticket.

## When it appears

```yaml
Choice:
  Delay-Ticks: 20
```

One second after the join, not inside the join event itself. This is not cosmetic: a dialog packet sent while the client is still loading terrain is dropped by the client, and the player would land in the world with nothing on screen. The freeze, however, is applied on the *first* tick — otherwise there is a window in which an unchosen player can walk away, and on a busy join that window is exactly when they do.

## Who gets asked

| Situation | Asked? |
|---|---|
| Brand new player | Yes |
| Player who joined before dFate was installed | Yes, unless `Ask-Existing-Players: false` |
| Player with a stored mode | Never again |
| `Choice.Enabled: false` | Nobody, ever — existing modes are still enforced |

With `Ask-Existing-Players: false`, returning players are filed as normal without a word. They can still step up later with `/fate choose hardcore`.

## Announcing it

```yaml
Choice:
  Broadcast: true
```

```
⚔ Steve has sworn themselves to Hardcore.
```

Normal picks get their own, quieter line. Both are in `messages.yml`; set `Broadcast: false` to silence them.

## Opting in later

A normal player can move to hardcore on purpose:

```
/fate choose hardcore
```

It always shows the confirmation screen first, and it is strictly one-way — `/fate choose normal` is refused. Nothing a player can run ever takes them out of hardcore.

```yaml
Choice:
  Allow-Opt-In-Later: true
```

Set to `false` to remove the route entirely.

## Related

- [The Lock](/plugins/dfate/features/the-lock/) — what "cannot play until they answer" actually enforces
- [Dialogs & Fallback](/plugins/dfate/features/dialogs-and-fallback/) — what old clients see instead
