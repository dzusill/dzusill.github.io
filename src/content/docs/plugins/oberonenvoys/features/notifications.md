---
title: "Notifications"
description: "Four channels, each switchable independently. All the text lives in"
---

Four channels, each switchable independently. All the text lives in
[messages.yml](/plugins/oberonenvoys/configuration/messages/).

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

Only players holding `oberonenvoys.notify` receive any of it. That node is deliberately separate
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
`ACTION_BAR` therefore uses its `action-bar.*` message rather than the `drop.*` one — every one of
the six events has its own, and none ever borrows its chat line. That matters if you type your brand
into each chat line by hand instead of using `<prefix>`: it stays in chat and never reaches the
action bar.

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
| Sound | The `announce`, `land` and `unlock` [aliases](/plugins/oberonenvoys/configuration/sounds/) |

Announcement sounds play at each listener's own position rather than at the crate — a sound everyone
is meant to hear must not fade with distance from a drop nobody has reached yet.

First-open, emptied and expired have a chat line and an action-bar line, no title and no sound:

| Event | Chat | Action bar | Extra token |
|---|---|---|---|
| first-open | `drop.first-open` | `action-bar.first-open` | `{player}` |
| emptied | `drop.emptied` | `action-bar.emptied` | — |
| expired | `drop.expired` | `action-bar.expired` | — |

## The proximity action bar

A live countdown for players close enough to be running for the crate.

```yaml
  proximity-bar:
    enabled: true
    radius: 150
    skip-regions: [ ]
```

```yaml
# messages.yml
action-bar:
  nearby-locked: "{tier} <dark_gray>» <#00A3FB>{distance}m <dark_gray>| <white>opens in <#00F986>{time}"
  nearby-open: "{tier} <dark_gray>» <#00A3FB>{distance}m <dark_gray>| <#00F986><bold>OPEN <#7E7E7E>({time} left)"
```

Tokens: `{tier}`, `{distance}` in blocks, `{time}` / `{time_long}` / `{seconds}`, plus `{world}`,
`{x}`, `{y}`, `{z}`.

This is the half the boss bar cannot cover. The bar carries the server-wide countdown to everyone;
this carries what only the people nearby need — how far away the crate is and how long they have
left. It is redrawn every `refresh-ticks` ticks (every tick by default).

A player standing between two crates sees **one** line, for the nearest. Two drops fighting over the
same row would make both unreadable.

**Other action bars.** Because the line is redrawn every tick, it wipes any other action-bar text a
player in range would be reading — an AFK zone's countdown, another plugin's bar. List the regions
where that matters under `skip-regions` (WorldGuard region ids, case-insensitive) and their players
never get this line; the one-off announcements (inbound, landed, …) are unaffected. Without
WorldGuard the list does nothing.

```yaml
  proximity-bar:
    skip-regions: [ "afk" ]
```

Set `radius` to roughly how far out a player can still act on the information. Beyond a couple of
hundred blocks a distance readout stops being a decision and starts being noise.

## The boss bar

```yaml
bossbar:
  enabled: true
  color: RED
  style: SEGMENTED_10
  keep-while-open: true
```

By default one bar per crate (see [shared bars](#shared-bars)), from the moment it lands until it is gone. While the crate is locked it counts down
to the unlock, with the text from `bossbar.locked`. When it opens the bar stays up on `bossbar.open`
and drains over `phases.despawn-seconds`, until the crate is looted empty or recovered — players are
still running for it, and the bar is where they read the coordinates. Both lines carry the tier, the
time and the coordinates as shipped.

`keep-while-open: false` takes the bar down the moment the crate opens, as builds before 2.1 did.
Players who join mid-countdown are picked up on the next tick.

### Shared bars

With `schedule.drops-per-cycle` above 1, one bar per crate stacks up on screen. `group-by` lets
crates share a bar instead:

```yaml
bossbar:
  group-by: ALL        # DROP | TIER | ALL
  group:
    display: CYCLE     # CYCLE | JOIN
    cycle-seconds: 4
    join-max: 3
    order: UNLOCK      # UNLOCK | LANDED
    progress: SHOWN    # SHOWN | FIRST | FULL
```

| `group-by` | Bars |
|---|---|
| `DROP` | One per crate — the default, and how it always worked |
| `TIER` | One per tier: every crate of the same tier shares it |
| `ALL` | One for every crate on the server |

A bar holding a single crate shows that crate's own `bossbar.locked` / `bossbar.open` line, so
`TIER` and `ALL` look exactly like `DROP` while only one envoy is out.

A shared bar shows its crates in one of two ways:

- **`CYCLE`** keeps the count on the bar and moves the crate detail — locked or open, time,
  coordinates — on to the next crate every `cycle-seconds`. It never runs off the bar, however many
  crates there are. Text: `bossbar.group.title`.
- **`JOIN`** writes every crate on one line, separated by `bossbar.group.separator`. Past
  `join-max` the rest collapse into `bossbar.group.overflow` ("+2 more"). The client clips a long
  title, so keep `join-max` low. Text: `bossbar.group.title-join`.

`order` decides which crate comes first: `UNLOCK` puts the one whose countdown ends soonest first
(the unlock while locked, the despawn once open), `LANDED` the oldest. `progress` decides how full a
shared bar is: `SHOWN` follows the crate currently on it, `FIRST` always the first in order (it
drains steadily instead of jumping), `FULL` leaves it full and lets the text carry the timers.

Every option can be changed with `/envoy reload` while crates are out; the bars rearrange on the
next tick.

### Hiding the bars

`/envoy bossbar` hides the envoy boss bars for the player who runs it, and shows them again the next
time. `/envoy bossbar off` and `/envoy bossbar on` set it directly. The choice is stored on the player
and survives restarts.

`bossbar.toggle.enabled: false` turns the command off and shows the bars to everyone again. Choices
already made are kept, and apply again if the toggle is turned back on.

### Stacked or cycling, per player

Shared bars are not everyone's taste, so each player can pick for themselves:

- `/envoy bossbar stack` — one bar per envoy, the way the bars looked before they were shared
  (`group-by: DROP`, just for that player).
- `/envoy bossbar cycle` — shared bars that cycle through the envoys. It keeps your `group-by` if it
  already shares bars; on a `DROP` server it shares one bar across every envoy.

A player who never picks sees what `group-by` and `group.display` say. Picking either also shows the
bars again if the player had hidden them. The choice is stored on the player and survives restarts.

`bossbar.toggle.layouts: false` turns both off and puts everyone back on your layout; choices already
made are kept. It is separate from `toggle.enabled`, so you can allow one without the other.

## Hiding coordinates

```yaml
  reveal-coordinates: false
```

Switches every announcement to its variant without a position, and hides coordinates from
`/envoy active` for non-staff. The beam, the boss bar, the proximity action bar and
`/envoy locate` still work, so the drop is a hunt rather than a guess. The boss bar lines carry
`{x}` and `{z}` as shipped — take them out of `bossbar.locked` and `bossbar.open` as well.

## Turning it down

| You want | Change |
|---|---|
| No chat spam, keep the show | `chat: false` |
| Nothing on screen but the bar | `title: false`, `action-bar: false` |
| Silence | `sound: false`, or `enabled: false` in `sounds.yml` |
| Nothing at all for a rank | Revoke `oberonenvoys.notify` |

The beam, hologram and crate are world state and stay visible regardless — they are not
notifications.

## Discord

The same stages can also be posted to a Discord channel through a webhook: spawn, land, unlock and
looted, each naming the envoy type. It is separate from everything above, so it does not depend on
`oberonenvoys.notify` or the chat and action-bar switches. See [discord.yml](/plugins/oberonenvoys/configuration/discord/).
