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

## Where it is drawn

The same question, on any of three surfaces. One key picks it, server-wide:

```yaml
Choice:
  Screen: AUTO
```

| | What the player gets | When to pick it |
|---|---|---|
| `AUTO` | The dialog, dropping to the chat buttons on a client that cannot draw one | The default. Right for almost every server. |
| `DIALOG` | The dialog and nothing else | When you want to **find out** that your client mix does not match your assumption. |
| `CHAT` | Clickable `[ Hardcore ] [ Lifesteal ] [ Normal ]` | No client requirement at all. The one to switch to when the others misbehave. |
| `GUI` | A chest menu, laid out in `gui.yml` | When you want it to look like the rest of your server's menus. |

An unrecognised value falls back to `AUTO`. A typo here must not be the reason nobody can choose.

**The confirmation always follows the picker.** Pick in a chest menu and the second screen is a chest menu; pick in chat and it is two clickable words. Being asked "are you certain?" somewhere other than where you just clicked reads as a second, unrelated question.

### `CHAT`

```
──────────────────────────────────────────
  CHOOSE YOUR FATE

  Welcome, Steve. Pick how you want to play.
  This choice is made once and is permanent.

  [ Hardcore ]  - one life. Locked out for 24h.
  [ Lifesteal ] - 10 hearts, one lost per death.
  [ Normal ]    - the ordinary game.

  Click a name above to choose.
──────────────────────────────────────────
```

Each button is a click that runs `/fate choose <mode>` — a command that already accepts a first choice. No prompt, no token, no expiry, nothing to lose on the way back. That is what makes this the most robust of the three, and worth remembering when the other two are behaving strangely.

Only the modes actually on offer get a line. With lifesteal switched off, its button is not printed — a button for a mode the server does not have is a button that refuses to work.

The confirmation for an irreversible mode is two more clickable words, running `/fate confirm` and `/fate decline`. Neither takes the mode as an argument, so typing `/fate confirm` out of the blue confirms nothing.

### `GUI`

A chest menu, entirely described by `gui.yml`: title, rows, and the material, slot, name and lore of each mode. Same placeholders as the dialog text.

A mode that is not offered has its slot left empty rather than shown and refused. Nothing configures that — it happens on its own.

Closing the menu while you still owe an answer **reopens it on the next tick**. That is this surface's version of `can_close_with_escape=false`, which a chest inventory has no equivalent of, and escape is the first thing a player does with a menu they did not expect. It counts against `Max-Reask-Attempts` like any other reopen, so a player who genuinely cannot use it is not trapped in a loop.

One thing worth knowing if you are reading the code: [the lock](/plugins/dfate/features/the-lock/) cancels inventory opens for unchosen players, and a locked player is exactly who this menu is for. dFate exempts its own two menus by holder, so the block still applies to every chest, furnace and shulker.

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
  or pick straight away with /fate choose <normal/lifesteal/hardcore>
──────────────────────────────────────────
```

Both are clickable — `/fate` runs, the second is suggested into the chat box so the mode can be filled in.

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

## Choosing by command

A player who has not chosen yet can skip the screen entirely:

```
/fate choose normal
/fate choose lifesteal
/fate choose hardcore
```

All three are open on a first choice, `normal` included — the one-way rule and `Allow-Opt-In-Later` exist to stop someone walking a decision back, and there is no decision yet. An irreversible mode still confirms first; deciding by command makes a permanent choice no less permanent.

This is the path that always works. A dialog can fail to render on an old client or an unusual setup, and the chat welcome carries this line precisely so there is a way in when it does.

## Opting in later

A player who has already chosen can move to a harder mode on purpose:

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
