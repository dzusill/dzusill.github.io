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
│  ▪ Lifesteal — 10 hearts. Every death   │
│    costs one; run out and you are out.  │
│  ▪ Normal — the ordinary game.          │
│                                         │
│            [ Hardcore ]                 │
│            [ Lifesteal ]                │
│            [ Normal ]                   │
└─────────────────────────────────────────┘
```

With [Lifesteal](/plugins/dfate/features/lifesteal/) switched off, the screen drops back to two buttons side by side. That is not cosmetic — the two- and three-option screens are different dialog types, and only one of them core's own chat fallback can render. See [Dialogs & Fallback](/plugins/dfate/features/dialogs-and-fallback/).

Every word of that — title, body, both labels and both hover tooltips — comes from `messages.yml`. See [messages.yml](/plugins/dfate/configuration/messages/).

## The welcome in chat

Alongside the screen, the player gets a multi-line greeting in chat naming all three modes and the command that opens the screen:

```
──────────────────────────────────────────
  CHOOSE YOUR FATE

  Welcome, Steve. Before you begin, pick how you
  want to play. This choice is made once and is permanent.

  ▪ Hardcore  - one life. Die and you are locked out for 24h.
  ▪ Lifesteal - start with 10 hearts, lose one per death.
  ▪ Normal    - the ordinary game. Die as often as you like.

  The screen is open now. Lost it? Run /fate
──────────────────────────────────────────
```

```yaml
Choice:
  Send-Welcome: true
```

Not a duplicate of the screen. **Chat is the one surface that always arrives** — a dialog that fails to render leaves nothing behind at all, and this is where the command to get it back is guaranteed to reach the player.

It is sent on every join while they still owe an answer, not only their very first connection. Someone who reconnects unchosen is in exactly the same position as someone seeing it for the first time, and tracking "have they been greeted" would mean persisting a flag whose only job is to withhold the instructions from the player who still needs them.

The text is `choice-welcome` in `messages.yml` — a **list**, so each entry is its own chat line and an empty string is a blank line. It does not adapt to your config: if you disable lifesteal, remove its line here too.

## The second screen

Picking hardcore or lifesteal does not commit anything yet. A confirmation follows:

> **Are you certain?**
> You are about to choose **Hardcore**. From this moment, a single death locks your account for 24h. You *cannot* undo this yourself.
>
> `[ I accept my fate ]` `[ Take me back ]`

Declining puts the original choice screen back. Nothing is stored until the confirmation is accepted.

```yaml
Choice:
  Confirm-Hardcore: true
  Confirm-Lifesteal: true
```

Turning one off commits that mode on the first click. Not recommended — neither choice can be undone by the player, so the second screen is what stops a misclick from becoming a support ticket. Lifesteal gets its own wording, naming the heart count rather than instant death.

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

A normal player can move to a harder mode on purpose:

```
/fate choose hardcore
/fate choose lifesteal
```

It always shows the confirmation screen first, and it is strictly one-way — `/fate choose normal` is refused. Nothing a player can run ever takes them back down.

```yaml
Choice:
  Allow-Opt-In-Later: true
```

Set to `false` to remove the route entirely.

## Related

- [The Lock](/plugins/dfate/features/the-lock/) — what "cannot play until they answer" actually enforces
- [Dialogs & Fallback](/plugins/dfate/features/dialogs-and-fallback/) — what old clients see instead
