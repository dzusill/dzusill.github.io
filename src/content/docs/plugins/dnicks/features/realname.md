---
title: "Reverse Lookup (`/realname`)"
description: "Because players can rename themselves, staff need a way to find who's behind a nickname. /realname <nick> (alias /whoisnick) does the reverse of a nick:…"
---

Because players can rename themselves, staff need a way to find who's behind a nickname. `/realname <nick>` (alias `/whoisnick`) does the reverse of a nick: given the visible text, it returns the player.

```
/realname King
```

→ `King = Notch`

## How it works

- The lookup is **case-insensitive** and matches the *plain* (tag-stripped) nick.
- Online players are checked first via an in-memory index.
- On a miss, dNicks falls back to a best-effort scan of stored player files, so it can often resolve a nick of an offline player too.

## Permission

`dnicks.realname` — on by default. Set it to `op` if you want the lookup to be staff-only:

```
/lp group default permission set dnicks.realname false
```

## Uniqueness

If `nick.unique` is `true` in `config.yml`, two players can't share the same plain nick, so a lookup is always unambiguous.
