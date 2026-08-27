---
title: "Reloading"
description: "Requires dannounce.admin. In one pass it:"
---

```
/announcements reload
```

Requires `dannounce.admin`. In one pass it:

1. re-reads `config.yml` from disk,
2. stamps the schema version if the file is older than this build,
3. validates the **whole** candidate configuration,
4. re-reads `messages.yml` and the `Presentation` block,
5. cancels the scheduler task, swaps in the new announcements, and starts a fresh task.

```
Reloaded 1 announcements.
```

The count is announcements, not entries — one rotating channel of eleven entries counts as one. That is the same unit `/announcements list` uses for its top-level rows.

## A failed reload changes nothing

Validation happens before anything is replaced. If the candidate is bad, the running announcements and their schedules are untouched:

```
Reload refused; the active configuration was kept: chat-announcements.store: click.text needs a click.command to run
```

Every problem found in the pass is reported together, separated by `; `, so one reload tells you everything wrong with the file rather than one thing at a time.

## Countdowns are carried forward

An announcement keeps its existing next-fire instant across a reload when **all** of the following hold:

- it existed before and was enabled,
- it is still enabled,
- its schedule is unchanged,
- `timezone` is unchanged.

Anything else is recalculated from now, which means its initial delay starts again.

Recalculating everything on every reload was the old behaviour and it had a nasty failure mode: an owner reloading more often than the interval never saw the announcement fire at all, because the countdown restarted each time. That is exactly what happens while you are editing and reloading to test a change.

Changing `timezone` drops every carried instant, because each one was calculated against a wall clock that no longer applies.

## What a reload does not do

| Not reloaded | Why | What to do instead |
|---|---|---|
| Command aliases | Bukkit builds its command map once, at enable | Restart the server — see [Known Limitations](/plugins/dannounce/limitations/#command-aliases-need-a-restart) |
| `state.yml` | It is runtime state, not configuration | Stop the server and edit it, if you must |
| A fired `ONCE` announcement | Its completion is recorded, not derived from the config | Remove its id from `completed-one-time` while the server is stopped |
| Rotation position | The cursor lives in `state.yml` | Nothing — it is meant to survive |
| Player mutes | Also `state.yml` | Nothing |
| The PlaceholderAPI hook | Registered at enable | Restart if PlaceholderAPI was installed after DAnnounce started |

## Renaming an id

`state.yml` is keyed by announcement id. Renaming an announcement therefore:

- resets its rotation cursor to the start of its list,
- **un-completes** it if it is a `ONCE` that had already fired — it will fire again,
- orphans its `dannounce.receive.<old-id>` permission node,
- breaks `join.announcement` if it pointed at the old name, which refuses the config.

Rename deliberately, or not at all once something is in production.

## Server reload

`/reload` (the Bukkit one) is not supported. Commands and their aliases are claimed at enable, the engine owns a repeating task, and the state store owns a debounced write. Restart instead.

## Checking a change landed

```
/announcements list
```

lists the announcements actually in memory, with their mode and state, and the entry ids under each one. After editing `config.yml`, this is where you confirm the change took — a new entry that does not appear here was read as a channel setting or refused.

```
/announcements next
```

confirms the schedule the engine is actually running, in the configured time zone.

```
/announcements preview <id>
```

renders it to you alone, which is the fastest way to check MiniMessage, placeholders and a click line without waiting for the interval.
