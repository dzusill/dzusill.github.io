---
title: "Statistics and the leaderboard"
description: "Every claim is recorded, which turns a transient event into something players compete over across"
---

Every claim is recorded, which turns a transient event into something players compete over across
weeks rather than only in the moment.

## What is counted

| Counted as | When |
|---|---|
| A **claim** | You are the first player to open a crate after it unlocks |
| **Items** | You take anything out of a crate, first opener or not |

The split matters. On an open crate several people loot at once, so items measure who actually walked
away with the contents, while claims measure who got there first. Somebody who wins the race and then
loses the fight shows up in one column and not the other.

Items are counted by comparing the crate's contents one tick after each click, rather than by reading
the click itself. A click is not a reliable description of what moved — shift-click takes a whole
stack, a hotbar swap moves two ways at once, a drag scatters one stack across slots, and a cursor drop
puts something back. Comparing totals is the only version that is right for all of them.

## In game

```
/supplydrop top      the leaderboard menu
/supplydrop stats    your own totals
```

The menu is styled from `gui/top.yml` and shows the viewer's own row in the bottom row, ranked or
not.

## Where the data lives

Totals are authoritative in memory and persisted asynchronously. Every read — the menu, a placeholder
on a scoreboard refreshing twice a second — is answered from a map, so showing statistics can never
wait on a database, and a database hiccup can never stall a tick.

The whole table is one row per player per tier, so it is small enough to hold in memory and is read
once at startup.

## Turning it off

Two independent switches:

```yaml
# config.yml
stats:
  enabled: false
```

```yaml
# database.yml
enabled: false
```

`stats.enabled: false` stops recording entirely. Turning off the database keeps the counting for the
session but does not persist it across a restart. In both cases the drops themselves are completely
unaffected — nothing in the event lifecycle depends on storage being there.

## Placeholders

See [Placeholders](/plugins/oberonsupplydrops/reference/placeholders/) for the full list.
