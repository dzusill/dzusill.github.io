---
title: "Action Log"
description: "An optional record of who teleported to whom, when, and where they ended up — the answer to 'how did that player get in there'."
---

```yaml
Teleport:
  Log-Actions: true
```

Every teleport this plugin performs is recorded: who did it, what they did, to whom, and the coordinates they ended up at.

## Why it exists

"How did that player get into the vault" is a question staff teams actually have to answer, and nothing else on a normal server can. Chat logs do not show it. The console does not show it. A player who teleported somewhere they should not have leaves no trace at all unless something records it.

## Reading it

```
/oberonstaff log
/oberonstaff log 25
```

Newest first, default 10, maximum 100.

```
Last 3 staff teleport(s):
» 2026-08-10 14:22 | Alice tphere Bob | world 128 64 -302
» 2026-08-10 14:19 | Alice tp Bob | world_nether 44 31 88
» 2026-08-10 13:58 | Console back Carol | world 0 70 0
```

| Action | Was |
|---|---|
| `tp` | the actor went to the target |
| `tp-other` | the actor moved one player to another |
| `tphere` | the actor brought the target to them |
| `back` | the player returned to their previous location |

Coordinates are where the **target** ended up.

## What is stored

```sql
CREATE TABLE IF NOT EXISTS oberonstaff_actions (
    id          BIGINT      NOT NULL AUTO_INCREMENT,
    actor_uuid  VARCHAR(36),
    actor       VARCHAR(32) NOT NULL,
    action      VARCHAR(32) NOT NULL,
    target_uuid VARCHAR(36) NOT NULL,
    target      VARCHAR(32) NOT NULL,
    world       VARCHAR(64) NOT NULL,
    x           INT         NOT NULL,
    y           INT         NOT NULL,
    z           INT         NOT NULL,
    created_at  BIGINT      NOT NULL,
    PRIMARY KEY (id)
);
```

Names are stored alongside UUIDs so the log stays readable after a rename. `actor_uuid` is null when the console did it.

Rows are indexed by time and by both participants, so a query about one player stays fast as the table grows.

## Turning it off

```yaml
Teleport:
  Log-Actions: false
```

Or turn the database off entirely in `database.yml`. Either way `/oberonstaff log` says so rather than showing an empty list:

```
The action log is off — enable Teleport.Log-Actions and the database.
```

## It never blocks a teleport

Writing is asynchronous and fire-and-forget. If the database is unreachable or the disk is full, the failure is logged to the console once and the teleport happens anyway.

A full disk should not stop staff working.

## Retention

There is none — rows accumulate. At staff-teleport volumes that is a few thousand rows a year, which is nothing.

If you want to prune it, do so directly:

```sql
DELETE FROM oberonstaff_actions WHERE created_at < <epoch millis>;
```

Safe to run while the server is up; nothing caches the log in memory.
