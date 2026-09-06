---
title: "Ticket chat"
description: "Every reply belongs to its ticket. There is no separate DM to lose, no staff channel to scroll back"
---

Every reply belongs to its ticket. There is no separate DM to lose, no staff channel to scroll back
through — open the ticket and the whole conversation is there, in order, with who said what.

That is the difference between handing a case over and starting it again.

## Reading and replying

Staff open the thread from the ticket detail screen, or with `dtickets.ticket.reply` from the
command. Players see the same thread on their own ticket.

```yaml
Tickets:
  Thread:
    Page-Size: 8
    Gui-Lines: 10
```

`Page-Size` is how many messages a page of the chat command shows; `Gui-Lines` is how many fit on the
detail screen before it pages.

## Prefixes

```yaml
Tickets:
  Thread:
    Show-Prefixes: true
    Prefix-Placeholder: "%luckperms_prefix%"
    Max-Prefix-Length: 32
```

Rank prefixes are rendered in the thread so a player can see at a glance that an admin answered
rather than a helper. The prefix comes from PlaceholderAPI, so any placeholder your permission plugin
exposes works — LuckPerms is only the default. `Max-Prefix-Length` truncates the extravagant ones so
one rank cannot push the message off the screen.

With PlaceholderAPI absent, prefixes are simply omitted.

## Followers

A ticket notifies the people following it. Who follows is decided automatically:

```yaml
Tickets:
  Watchers:
    Auto-Follow-Own: true
    Auto-Follow-Staff-On-Claim: true
    Auto-Follow-Staff-On-Reply: true
    Allow-Player-Follow: false
    Max-Followers-Per-Ticket: 20
```

- the player who opened it follows it
- a staffer who claims it follows it
- a staffer who replies to it follows it

`Allow-Player-Follow` is off by default: letting any player subscribe to any ticket turns your desk
into a spectator sport. Turn it on only if your tickets are not private.

`Max-Followers-Per-Ticket` caps a merged report that has collected dozens of reporters from
broadcasting to all of them.

## Staff notes

A note is a message only staff can read, added with `dtickets.ticket.note`. Use it for the things
that belong on the case but not in front of the player — *"third time this week"*, *"waiting on the
other party"*.

## Transcripts

```yaml
Tickets:
  Transcripts:
    Enabled: false
    Folder: "transcripts"
```

Off by default. Turn it on and each ticket is written to a file under that folder when it closes, so
the conversation survives the `Retention-Days` cleanup that eventually deletes the ticket itself.
