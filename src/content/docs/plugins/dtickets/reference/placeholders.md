---
title: "Placeholders"
description: "Requires PlaceholderAPI. Without it the expansion is not registered and these render as"
---

Requires **PlaceholderAPI**. Without it the expansion is not registered and these render as
themselves.

The expansion identifier is `dtickets`.

## Counts

| Placeholder | Returns |
|---|---|
| `%dtickets_tickets_open%` | tickets currently open, server-wide |
| `%dtickets_tickets_unclaimed%` | open tickets nobody has claimed |
| `%dtickets_tickets_mine%` | tickets claimed by the viewing player |
| `%dtickets_reports_open%` | reports currently open |
| `%dtickets_vanished%` | whether the viewing player is vanished |

`tickets_unclaimed` is the one worth putting on a staff scoreboard. `tickets_open` includes tickets
somebody is already handling; unclaimed is the number that means *nobody has looked at this yet*.

## Prefixed families

Both `tickets_` and `reports_` accept further suffixes beyond the counts above, resolved at request
time. If a suffix is not recognised the placeholder returns empty rather than an error, so a typo
shows up as a blank rather than as `%dtickets_…%` on your scoreboard.

## Where they work

- scoreboards and tab lists, through whatever plugin renders them
- inside `messages.yml` and `menus.yml`
- anywhere else PlaceholderAPI resolves

## Inside ticket chat

Rank prefixes in the thread come from PlaceholderAPI too, but they are configured separately:

```yaml
Tickets:
  Thread:
    Prefix-Placeholder: "%luckperms_prefix%"
```

That is any placeholder your permission plugin exposes — LuckPerms is the default, not a requirement.
See [Ticket chat](/plugins/dtickets/features/ticket-chat/#prefixes).

## A staff tab-list example

```
Open: %dtickets_tickets_open%  |  Unclaimed: %dtickets_tickets_unclaimed%  |  Mine: %dtickets_tickets_mine%
```

Counts are live. On a busy desk, put them somewhere staff already look rather than relying on the
`New-Ticket` notification — the number staying high is the signal, not the individual pings.
