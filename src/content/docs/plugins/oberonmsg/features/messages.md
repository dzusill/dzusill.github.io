---
title: "Sending Messages"
description: "One command with aliases instead of seven copies, every refusal path and what it says, the reply timeout, and why player text can no longer colour somebody else's chat."
---

## One command, many names

`/msg`, `/message`, `/tell`, `/whisper`, `/w`, `/t`, `/dm`, `/pm` are **aliases of one command**. The old script had
them as seven separate commands with the body copied into each, and they had already drifted — `/whisper` said
"toggled private messages off" where `/msg` said "has private messages disabled", and `/reply` played a different
sound from `/r`.

Now a change lands everywhere at once.

## Every way a message can be refused

Checked in this order:

| Reason | The sender is told |
|---|---|
| Messaging yourself | "You can't message yourself." |
| Recipient offline **or vanished above your level** | "This player is not online." |
| No text after the name | "This message can't be empty." |
| Recipient has `/msgtoggle` on | "This player has private messages disabled." |
| **You** are ignoring them | "You are ignoring this player. Use /unignore … first." |
| **They** are ignoring you | "You can't message this player." |

Two of those orderings are deliberate:

**Visibility is checked before anything that could leak it.** An offline recipient must not produce "has messages
disabled" — that would confirm a setting on somebody the sender is not supposed to know is there. Offline and
vanished give the same answer for the same reason.

**Your own ignore list is reported before theirs.** "You are ignoring them" is actionable — un-ignore and try again.
"You can't message this player" is not, and it is worded so it does not confirm that they ignored you.

## `/reply`

```yaml
Reply:
  Timeout-Seconds: 300
```

Both sides of a conversation get a reply target, so the recipient can `/r` without messaging first.

The old script cleared these on quit **and on join**, so logging out mid-conversation and back in lost it. They
expire on a timer instead. `0` means never expire.

A reply target that has aged out gives "You have nobody to reply to"; one whose player has logged off gives "This
player is not online".

## Player text cannot colour your chat

The Skript pasted the message into a string that was then colour-parsed. Typing `&c` changed the colour of the line
for whoever received it — **including the social spy copy a staff member saw**.

All three values — sender name, target name and message — now go in as literal text the parser never looks inside.
Typing `<red>hello` shows, exactly:

```
<red>hello
```

Names go the same way, because nickname plugins can put almost anything in one.

## AFK

When the recipient is away, the sender gets a note under their own line:

```
This player is away and might not reply.
```

Read from EssentialsX's own API. The old script asked PlaceholderAPI for `%essentials_afk%` and compared it to
`"yes"` — which needs PlaceholderAPI installed to answer a question Essentials can answer directly, and fails
silently if the expansion is missing or the casing ever changes.

The message is delivered either way; the note is a courtesy.

## Sounds

```yaml
Sounds:
  Receive: { Enabled: true, Name: "entity.puffer_fish.blow_up" }
  Afk:     { Enabled: true, Name: "block.note_block.bass" }
```

The first plays to the recipient, the second to the sender when the recipient is away. Both are any namespaced sound
key.
