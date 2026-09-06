---
title: "Evidence"
description: "A report made ten minutes ago is worth far more than the same report written up an hour later, because"
---

A report made ten minutes ago is worth far more than the same report written up an hour later, because
the context is still there. dTickets captures that context at the moment the report is filed.

```yaml
Reports:
  Evidence:
    Enabled: true
    Location: true
    Nearby-Players-Radius: 32
    Chat-History-Lines: 15
```

## Location

Where the reporter was standing, including the world. Staff holding `dtickets.ticket.teleport` can go
straight there from the ticket detail screen rather than asking for coordinates.

## Nearby players

Everyone within `Nearby-Players-Radius` blocks at the moment of the report. Thirty-two blocks is a
sensible default: wide enough to catch who was actually involved, narrow enough that it does not list
the whole spawn.

Vanished staff are excluded according to your [vanish settings](/plugins/dtickets/features/vanish/).

## Chat history

The last `Chat-History-Lines` lines of public chat, captured with the report. Fifteen is usually
enough to show what a chat-abuse report is actually about without pasting a novel into the ticket.

## Anticheat flags

```yaml
Reports:
  Evidence:
    Anticheat:
      Enabled: true
      Window-Minutes: 10
      Max-Entries: 10
      Flag-Event-Classes:
        - "me.frep.vulcan.api.event.VulcanFlagEvent"
        - "me.frep.vulcan.api.event.PlayerFlagEvent"
      Command-Bridge: true
```

Anticheat flags raised against the target inside `Window-Minutes` are attached to the report, up to
`Max-Entries`. A report that says *"speed hacking"* alongside four Vulcan flags from the same two
minutes is a different thing from one that says it alone.

**`Flag-Event-Classes`** is a list of event class names, resolved by reflection. Vulcan's two events
ship configured; add your own anticheat's flag event and it works the same way, with no code change.
An event class that is not on the server is skipped silently, so listing several anticheats is safe.

**`Command-Bridge`** additionally picks up flags an anticheat announces as a console command rather
than an event — some publish only that way.

If no anticheat is present, the block simply produces nothing.

## Turning it off

`Evidence.Enabled: false` disables the whole capture. Reports still work; they just carry only what
the reporter typed. Worth considering if your server has privacy commitments about chat logging —
`Chat-History-Lines` in particular stores public chat inside the ticket record.
