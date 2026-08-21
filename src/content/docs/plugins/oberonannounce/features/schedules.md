---
title: "Schedules"
description: "A channel is always an interval: it fires every interval-seconds and that is the whole of it. Anything with a real calendar — a fixed moment, a time of day,…"
---

A channel is always an interval: it fires every `interval-seconds` and that is the whole of it. Anything with a real calendar — a fixed moment, a time of day, a day of the week — goes in the separate `announcements:` section, where each announcement carries its own schedule.

```yaml
announcements:
  reset:
    mode: ONCE
    schedule:
      at: "2026-09-01T18:00:00"
    variants:
      main:
        chat:
          - "<red>Season reset at 18:00. Log out safely.</red>"
```

## The four modes

| `mode` | Needs | Fires |
|---|---|---|
| `INTERVAL` | `schedule.every` | Every `every`, first after `initial-delay` |
| `ONCE` | `schedule.at` | Once, then never again |
| `DAILY` | `schedule.times` | At each of those times, every day |
| `WEEKLY` | `schedule.days` + `schedule.times` | At each time, on each of those days |

`ONE_TIME` is accepted as a spelling of `ONCE`. Names are case-insensitive and a `-` is read as a `_`.

> **`mode` means two different things depending on where the schedule kind is written.** Spell the kind in `mode:` and `selection:` chooses the variant. Spell it in `schedule.type:` instead, and the top-level `mode:` is read as the **variant selection** — because that is how it is spelled in the other layout the plugin accepts. Pick one and stay with it; mixing them silently swaps which key means what.

## `INTERVAL`

```yaml
announcements:
  tips:
    mode: INTERVAL
    schedule:
      every: 10m
      initial-delay: 2m
    variants:
      homes: { chat: [ "<gray>Set a home with /sethome.</gray>" ] }
```

| Key | Default | |
|---|---|---|
| `every` | *required* | Time between fires. Must be positive. |
| `initial-delay` | same as `every` | How long after start-up the first fire happens. `0s` fires on the next tick. |

Both take the same duration syntax:

| Written | Means |
|---|---|
| `30s` | thirty seconds |
| `10m` | ten minutes |
| `1h 30m` | ninety minutes |
| `1.5h` | the same, decimals are allowed |
| `2d`, `1w` | days, weeks |
| `500ms` | milliseconds |
| `PT30M` | ISO-8601, if you prefer it |

Anything else — `10 minutes`, `7x`, a negative value — refuses the config.

An interval is **elapsed time**, not a clock face. It never touches the calendar, so nothing about a time-zone change or a daylight-saving shift can move it.

## `ONCE`

```yaml
announcements:
  reset:
    mode: ONCE
    schedule:
      at: "2026-09-01T18:00:00"
```

> **Quote the timestamp.** `at: "2026-09-01T18:00:00"` with quotes. Unquoted, YAML resolves it into a timestamp of its own and assumes **UTC** when no offset is written — silently a different instant than your `timezone` implies. Once it has become a date object the two cases are indistinguishable, so the plugin refuses it rather than guessing:
>
> ```
> announcements.reset: schedule.at must be quoted, e.g. at: "2030-01-01T09:00:00"
> ```

Three forms of `at` are read, in this order:

| Written | Read as |
|---|---|
| `"2026-09-01T16:00:00Z"` | that exact instant, UTC |
| `"2026-09-01T18:00:00+02:00"` | that exact instant, at the offset given |
| `"2026-09-01T18:00:00"` | 18:00 **in your configured `timezone`** |

The plain form is the useful one — it means what a server owner reading it thinks it means, in the zone the rest of the file already uses.

A `ONCE` announcement records that it fired, in `state.yml` under `completed-one-time`, **before** delivery rather than after — a crash mid-broadcast cannot replay it on restart. It shows as `complete` in `/announcements list` and never fires again. To let it fire once more, stop the server and remove its id from that list.

### One whose time passed while the server was down

```yaml
scheduler:
  missed-one-time: SKIP
```

| Value | What happens |
|---|---|
| `SKIP` | Nothing is sent. The announcement is marked complete at start-up, so it will not surprise anybody later. |
| `SEND_ON_STARTUP` | It fires on the next tick after start-up. |

`FIRE_ON_START` is accepted as a spelling of `SEND_ON_STARTUP`. Anything else refuses the config with `scheduler.missed-one-time must be SKIP or SEND_ON_STARTUP`.

This applies to `ONCE` only. `DAILY` and `WEEKLY` simply calculate their next occurrence from the moment the server came back.

## `DAILY`

```yaml
announcements:
  restart-warning:
    mode: DAILY
    schedule:
      times:
        - "03:50"
        - "15:50"
```

`times` is a list of ISO local times — `03:50` or `03:50:00`. It must not be empty, duplicates are dropped and the list is sorted for you.

## `WEEKLY`

```yaml
announcements:
  event:
    mode: WEEKLY
    schedule:
      days: [ FRIDAY, SATURDAY ]
      times: [ "20:00" ]
```

`days` takes English weekday names, upper or lower case: `MONDAY` … `SUNDAY`. Both lists must be non-empty.

## Time zone

```yaml
timezone: Europe/Bratislava
```

An IANA zone id — `Europe/Bratislava`, `America/New_York` — not an abbreviation like `CET`. An invalid value refuses the config.

`DAILY` and `WEEKLY` occurrences are calculated as a local date plus a local time in that zone, and only then converted to an instant. That is what makes a `20:00` announcement stay at 20:00 across a daylight-saving change instead of drifting to 19:00 or 21:00 for half the year. A bare `ONCE` timestamp is resolved the same way.

The zone is also what `/announcements list` and `/announcements next` print times in.

## How the engine actually runs

```yaml
scheduler:
  tick-seconds: 1
```

One repeating task, every `tick-seconds`, asks each enabled announcement whether its next fire time has passed. Minimum one second; the value is a resolution, not a schedule, and there is no reason to change it.

### The next fire is anchored on the due instant

When something fires, its next occurrence is calculated from the instant it was **due**, not from the tick that noticed it.

A tick loop observes a due time up to one whole period late. Re-anchoring on "now" adds that remainder to every cycle, and it compounds: a ten-minute announcement anchored on the tick drifted by roughly two and a half minutes a day, which is several lost fires over a week. Anchoring on the due instant means the error never accumulates.

### Missed occurrences collapse

If the server was down, frozen, or lagging through several occurrences, the engine walks the schedule forward from the last due instant to the first one still in the future and delivers **once**. Players do not receive six announcements a tick apart because the server hung for an hour.

Walking forward is capped at 10 000 steps. Past that — a one-second interval left unattended for hours — the schedule is simply re-anchored on the current time.

## Reloading carries a countdown forward

`/announcements reload` keeps the existing next-fire instant for any announcement that was already enabled, is still enabled, and whose schedule is byte-for-byte the same. The `timezone` must be unchanged too; a different zone means every calculated instant has to be redone.

Recalculating instead would restart the initial delay on every reload, so an owner reloading more often than the interval would never see the announcement fire at all — which is exactly what happens during a debugging session. Anything whose schedule you actually edited starts its delay again, as it should.

## Seeing what is scheduled

```
/announcements list
/announcements next
/announcements next store
```

`next` with no id answers with the soonest announcement across the whole config. With an id it answers about that one — and an entry id works, reporting the schedule of the channel it belongs to, because the entry does not have one of its own.

```
Next: chat-announcements at 2026-08-20 14:31:07 CEST (12m 4s).
```

`list` marks each announcement `enabled`, `disabled`, `complete` (a `ONCE` that has fired) or `not scheduled` (enabled, but its schedule has no future occurrence).

See [Commands & Permissions](/plugins/oberonannounce/commands-and-permissions/).
