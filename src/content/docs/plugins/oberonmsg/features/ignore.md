---
title: "Ignore Lists"
description: "Why /ignore adds rather than toggles, how public chat hiding works, and the staff bypass that stops a player silencing whoever is handling their report."
---

## `/ignore` adds. `/unignore` removes.

The old script's `/ignore` did whichever the current state was not. Two consequences:

- Running it twice quietly **un-ignored** somebody.
- Running it on a name you had already ignored looked identical to ignoring them for the first time.

Here they are separate, and each says which happened:

| Command | Result |
|---|---|
| `/ignore Steve` | "You are now ignoring Steve." |
| `/ignore Steve` again | "You were already ignoring Steve." |
| `/unignore Steve` | "You are no longer ignoring Steve." |
| `/unignore Steve` again | "You were not ignoring Steve." |

`/block` and `/unblock` are aliases of the two, so muscle memory from the old commands still works.

`/ignore` with no argument lists who you are ignoring.

## Keyed by UUID

The old script stored ignore lists as player objects compared by name. A rename on either side silently broke the
entry — either freeing somebody who had been ignored, or leaving a ghost that could never be un-ignored.

Both ends are UUIDs now, with the name stored alongside so the list stays readable:

```
You are ignoring 3 player(s):
» Steve
» Alex
» Herobrine
```

## Ignoring is one-way

Ignoring somebody stops **you** hearing from **them**. It does not stop them hearing from you — you are also stopped
from messaging them, but that is so you notice, not because it is mutual.

If you ignore somebody and then try to message them, you are told to un-ignore them first. Silently letting the
message through would be surprising; silently dropping it would be worse.

## Public chat

```yaml
Ignore:
  Hide-Public-Chat: true
```

On by default. Ignoring somebody who then keeps talking in public chat is not much of an ignore, and it is what
players expect the word to mean.

Turn it off and ignoring only affects private messages.

The recipient list is trimmed at the **highest** event priority, after other plugins have finished deciding who
should be in it — a chat plugin that rebuilds the set later would otherwise put the ignored player back.

## The staff bypass

```
/lp group mod permission set oberonmsg.ignore.bypass true
```

A player holding `oberonmsg.ignore.bypass`:

- cannot be added to anybody's ignore list
- has their public chat shown to everyone regardless

**This matters more than it looks.** Without it, a player under investigation can silence the staff member handling
their report with one command.

Trying to ignore an exempt player says "You can't ignore Steve" rather than pretending to work.

## It does not override your own list

Neither bypass touches *your own* ignore list. Being un-ignorable is about other people's lists; your own is your
decision, and overriding it would mean staff could never stop hearing from anyone.

## Storage

Ignore lists are written to the database and loaded when the player joins, so they survive restarts and renames.

A player who is offline has no list in memory — deliberate and safe, because their list only matters for messages
addressed to them and they cannot receive any.
