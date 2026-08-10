---
title: "Social Spy & Logging"
description: "Who sees what, why spies never see their own conversations twice, and why the message log is off by default."
---

## Social spy

```
/socialspy
```

Anyone holding `oberonmsg.socialspy` sees other players' private messages as they happen:

```
SocialSpy » Alice → Bob: meet me at spawn
```

The setting is stored by UUID, so it survives a rename and a restart. The old script kept it in a variable keyed by
player and lost both.

### Spies do not see their own conversations twice

The two people actually in the conversation are excluded from the spy broadcast. A staff member with spy on who
messages somebody gets their own sender line — and nothing else.

Without that, every message you sent would arrive twice, which reads like a bug.

### It is not a permission to be invisible

The people being spied on are told nothing, but nothing hides the spy either — anyone who can read the permission
list can see who holds `oberonmsg.socialspy`. Treat it as a staff tool, not a secret.

## The message log

```yaml
Log:
  Enabled: false
```

**Off by default, deliberately.** Recording what players say to each other in private is a decision a server owner
should make knowingly and be able to tell their players about — not something a plugin turns on for them.

Turn it on and every delivered message is written to the database:

```
/oberonmsg log
/oberonmsg log 50
```

```
Last 3 private message(s):
» 2026-08-10 14:22 | Alice → Bob: meet me at spawn
» 2026-08-10 14:21 | Bob → Alice: where are you
» 2026-08-10 14:19 | Carol → Dave: got the diamonds
```

### What is stored

Sender and recipient UUIDs, their names at the time, the message, and when. Names alongside UUIDs so the log stays
readable after a rename. Messages longer than 512 characters are truncated.

Only **delivered** messages are logged. A message refused for any reason never happened as far as the log is
concerned.

### It never blocks a message

Writing is asynchronous and fire-and-forget. If the database is unreachable, the failure is logged to the console and
the message is delivered anyway.

### Retention

There is none — rows accumulate. On a busy server that is a lot of rows over a year; if that matters, prune it
directly:

```sql
DELETE FROM oberonmsg_log WHERE created_at < <epoch millis>;
```

Safe while the server is up; nothing caches the log in memory.

### Turning it off later

Set `Enabled: false` and reload. Existing rows stay — drop the table yourself if you want them gone.
