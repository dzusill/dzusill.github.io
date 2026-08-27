---
title: "History & Opt Out"
description: "Every announcement is stored: who sent it, their display name at the time, the platform, the link, the"
---

## History

Every announcement is stored: who sent it, their display name at the time, the platform, the link, the
normalised link, and when. It is the record you will want the day a link turns out to be a problem.

```
/dlive history            # everything, newest first
/dlive history Streamer   # one player
/dlive history * 2        # everyone, page two
```

Paged, with clickable next and previous. `dlive.admin` only.

Timestamps render in the timezone and format you set:

```yaml
history:
  page-size: 10
  retention-days: 0
  timezone: "Europe/Bratislava"
  time-format: "yyyy-MM-dd HH:mm"
```

### Retention

`retention-days: 0` keeps history forever. Any positive number purges entries older than that — once
on startup and then daily.

The purge only removes rows from the history table. A player's lifetime announcement count is a
separate counter and is **never** reduced by it, so `%dlive_announcement_count%` stays honest even on
a server that keeps thirty days of history.

## Player statistics

```
/dlive stats            # your own
/dlive stats Streamer   # somebody else's
```

Shows whether they are receiving announcements, their lifetime count, and their last announcement's
platform, link and time. A player who has never announced gets a clear *never* line rather than an
empty row.

## Opt out

```
/live toggle
```

Turns off receiving *other people's* announcements. The player's own announcements always reach them,
so nobody is left wondering whether their command worked.

The setting is stored per player and survives restarts. `dlive.toggle` defaults to `true`, so this
works for everybody without you granting anything.

Sound and action bar follow the same setting — an opted-out player gets none of the three.

`%dlive_receiving%` exposes the state if you want a toggle indicator in a menu or scoreboard.
