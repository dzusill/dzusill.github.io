---
title: "Notifications"
description: "Four channels, each switchable independently. All the text lives in"
---

Four channels, each switchable independently. All the text lives in
[messages.yml](/plugins/oberonsupplydrops/configuration/messages/).

```yaml
notifications:
  chat: true
  title: true
  action-bar: true
  sound: true
  reveal-coordinates: true
  proximity-bar:
    enabled: true
    radius: 150
```

Only players holding `oberonsupplydrops.notify` receive any of it. That node is deliberately separate
from the commands, so staff can mute drops without losing access to them.

## Routing one event somewhere else

The switches above are the default. `routing` overrides them for a single event:

```yaml
notifications:
  routing:
    inbound: ACTION_BAR
    landed: BOTH
    unlocked: CHAT
    first-open: CHAT
    emptied: NONE
    expired: NONE
```

| Value | Sends to |
|---|---|
| `CHAT` | Chat only |
| `ACTION_BAR` | Action bar only |
| `BOTH` | Both, each with its own text |
| `NONE` | Neither |

Six events can be routed: `inbound`, `landed`, `unlocked`, `first-open`, `emptied`, `expired`. Any
you leave out follows the `chat` and `action-bar` switches, so a server that never touches this
section behaves exactly as it did before the setting existed.

**Routing also picks the wording.** Chat and the action bar carry different text on purpose — a chat
line can afford a tier name and coordinates, an action bar is one short row. Sending an event to
`ACTION_BAR` therefore uses its `action-bar.*` message rather than the `drop.*` one. The three events
with no short wording of their own (`first-open`, `emptied`, `expired`) reuse their chat line.

`title` and `sound` are separate switches and are not affected by routing.

A value that is not one of the four is reported in the console with the key, the fallback used, and
the options — the announcement still goes out.

## The three announcements

Inbound, landed and unlocked. Each is sent to every enabled channel:

| Channel | Message keys |
|---|---|
| Chat | `drop.inbound`, `drop.landed`, `drop.unlocked` (and their `-located` variants) |
| Title | `title.inbound` + `title.inbound-subtitle`, and the same for landed and unlocked |
| Action bar | `action-bar.inbound`, `action-bar.landed`, `action-bar.unlocked` |
| Sound | The `announce`, `land` and `unlock` [aliases](/plugins/oberonsupplydrops/configuration/sounds/) |

Announcement sounds play at each listener's own position rather than at the crate — a sound everyone
is meant to hear must not fade with distance from a drop nobody has reached yet.

## The proximity action bar

A live countdown for players close enough to be running for the crate.

```yaml
  proximity-bar:
    enabled: true
    radius: 150
```

```yaml
# messages.yml
action-bar:
  nearby-locked: "{tier} <dark_gray>» <#00A3FB>{distance}m <dark_gray>| <white>opens in <#00F986>{time}"
  nearby-open: "{tier} <dark_gray>» <#00A3FB>{distance}m <dark_gray>| <#00F986><bold>OPEN <#7E7E7E>({time} left)"
```

Tokens: `{tier}`, `{distance}` in blocks, `{time}`, plus `{world}`, `{x}`, `{y}`, `{z}`.

This is the half the boss bar cannot cover. The bar carries the server-wide countdown to everyone;
this carries what only the people nearby need — how far away the crate is and how long they have
left. It refreshes twice a second, on the same tick that drives everything else.

A player standing between two crates sees **one** line, for the nearest. Two drops fighting over the
same row would make both unreadable.

Set `radius` to roughly how far out a player can still act on the information. Beyond a couple of
hundred blocks a distance readout stops being a decision and starts being noise.

## The boss bar

```yaml
bossbar:
  enabled: true
  color: RED
  style: SEGMENTED_10
```

Shown while a crate is locked, and removed the moment it opens — after that the countdown is over and
the bar has nothing left to say. Text comes from `bossbar.locked`. Players who join mid-countdown are
picked up on the next tick.

## Hiding coordinates

```yaml
  reveal-coordinates: false
```

Switches every announcement to its variant without a position, and hides coordinates from
`/supplydrop active` for non-staff. The beam, the boss bar, the proximity action bar and
`/supplydrop locate` still work, so the drop is a hunt rather than a guess.

## Turning it down

| You want | Change |
|---|---|
| No chat spam, keep the show | `chat: false` |
| Nothing on screen but the bar | `title: false`, `action-bar: false` |
| Silence | `sound: false`, or `enabled: false` in `sounds.yml` |
| Nothing at all for a rank | Revoke `oberonsupplydrops.notify` |

The beam, hologram and crate are world state and stay visible regardless — they are not
notifications.
