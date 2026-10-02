---
title: "Notifications and formatting"
description: "Nothing a player sees, hears or clicks is hard-coded. There are four layers, from the most specific to"
---

Nothing a player sees, hears or clicks is hard-coded. There are four layers, from the most specific to
the most general.

## The zone notices

Seven events tell the player something about their zone. Each has its **own switches** for chat,
action bar, title and sound in `notifications` in [`config.yml`](/plugins/oberonafk/configuration/config/#notifications),
and four texts in `notice.<event>` in [`messages.yml`](/plugins/oberonafk/configuration/messages/#notice) (`chat`,
`action-bar`, `title`, `subtitle`).

| Event | When | Tokens |
|---|---|---|
| `enter` | Stepping into a zone | `{zone}` `{interval}` |
| `leave` | Stepping out of it | `{zone}` |
| `reward` | A reward was given | `{reward}` `{amount}` `{zone}` |
| `storage` | An item went to the claim storage | `{reward}` `{count}` |
| `storage-full` | The storage was full, so an item was not given | `{reward}` |
| `nothing` | The interval ended but the zone's `chance` said no | `{zone}` `{interval}` |
| `teleport` | `/afk` finished teleporting | `{zone}` |

A reward that partly overflowed shows both the `reward` and the `storage` notice. A reward the full
storage rejected shows `storage-full` instead of `reward` — saying "+16 Diamonds" for diamonds that
were not given would be a lie. A failed delivery says nothing to the player at all: it is the
server's problem, and is recorded for staff.

Leave any of the four texts empty (`""`) and that part is simply not sent.

## The countdown

While a player is collecting time, the action bar reads `Next AFK reward in 24:31`. The text is the
top-level `countdown` key in `messages.yml`; `countdown.enabled` in `config.yml` switches it off for
everyone, and `countdown: false` on a zone switches it off for that zone.

The countdown never covers a notice. After any other action-bar message (entering, a reward, items
stored) it waits `countdown.hold-seconds` (4 by default) so that message can be read. The remaining time
is also available to a scoreboard or tab list through [`%oberonafk_next%`](/plugins/oberonafk/reference/placeholders/).

## Every other message

Every key in `messages.yml` — command replies, errors, successes, help lines, labels — is routed by
`Presentation` in `config.yml`, which the core applies to all of them:

```yaml
Presentation:
  Categories:
    ERROR:               # every refusal and failure
      Channel: CHAT      # CHAT | ACTION_BAR | BOTH | NONE
      Sound:
        Enabled: true
        Name: ENTITY_VILLAGER_NO
    TELEPORT:            # the /afk warm-up countdown
      Channel: ACTION_BAR
    INFO:                # everything else: successes, lists, help, stats
      Channel: CHAT
  Overrides:             # one key, nested the way messages.yml is nested
    teleport:
      in-combat:
        Channel: ACTION_BAR
```

Categories style a whole kind at once; an override beats its category. `Sound.Name` takes either
`ENTITY_VILLAGER_NO` or `entity.villager.no`. A name this server does not know is silence, never an
error. Under `Overrides` you can change channel and sound independently — a partial override keeps the
rest from its category.

## Titles for any message

The core can route a message to chat or the action bar but has no title channel, so OberonAFK adds one.
Give any message key a title and subtitle under `titles` in `config.yml`, nested like `messages.yml`:

```yaml
titles:
  claim:
    claimed:
      title: "<#39B54A><b>CLAIMED</b>"
      subtitle: "<white>{amount}x {item}"
      stay: 40            # optional; fade-in / stay / fade-out in ticks
```

It is shown on top of wherever `Presentation` sends the message itself, with the same placeholders.

## Colours

Every text is MiniMessage — `<#C21807>`, `<gradient:#C21807:#F11800>`, `<bold>` — and legacy codes
(`&7`) and bare hex (`#C21807`) also work, mixed freely in one line. `<prefix>` expands to the `prefix`
key (empty by default) in chat and to nothing on the action bar.

## Time formatting

How every time is written is set in `time-format` in `config.yml`. Seconds are shown everywhere by
default.

Two styles exist: the live **countdown** (`24:31`, `1:00:00` from an hour on) and every other
**duration** — a zone's interval, time spent in zones, "ago" in stats, history and storage — which
reads `30m 0s`, `1h 30m 0s`, `45s`.

Each style is either a one-line template:

| Placeholder | Meaning |
|---|---|
| `{d}` `{h}` `{m}` `{s}` | Days, hours (0-23), minutes (0-59), seconds (0-59) |
| `{hh}` `{mm}` `{ss}` | The same, always two digits |
| `{total-h}` `{total-m}` `{total-s}` | The whole time in hours / minutes / seconds |

or, when `template` is empty, a list of **units** — days, hours, minutes, seconds — each with its own
`format` (`{value}` is the number) and `show` rule:

| `show` | Behaviour |
|---|---|
| `always` | Always written, zero included |
| `non-zero` | Only when it is not zero |
| `never` | Never; its time moves to the next smaller unit, so no days means `26h` |

Examples:

```yaml
time-format:
  duration:
    template: "{total-m} minutes {ss} seconds"     # 90 minutes 07 seconds
```

```yaml
time-format:
  duration:
    separator: ", "
    units:
      hours:   { format: "{value} hours",   show: non-zero }
      minutes: { format: "{value} minutes", show: non-zero }
      seconds: { format: "{value} seconds", show: always }
```

`/afk reload` applies a change at once.
