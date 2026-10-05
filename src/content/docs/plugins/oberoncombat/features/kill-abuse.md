---
title: "Kill-abuse guard"
description: "Stops one player farming another. After max-kills kills of the same victim within time-limit, the next kill pays"
---

Stops one player farming another. After `max-kills` kills of the **same victim** within `time-limit`, the next kill pays
**nothing** and your commands run.

```yaml
kill-abuse:
  enabled: false
  max-kills: 5
  time-limit: 5m
  warn-before: true
  commands: ["!CONSOLE tempban {player} 10m Farming {victim}"]
```

- Every kill counts, whatever it would have paid. Kills outside `time-limit` are forgotten.
- With `max-kills: 5` the first five kills pay normally; with `warn-before` the **fifth** warns the killer
  (`kill-abuse-warning`, `%victim%`); the **sixth** pays no money, no experience, no lightning, and runs `commands`.
- `commands` use `{player}` (the killer) and `{victim}`, and the same `!CONSOLE` / `!PLAYER` rules as
  [commands on events](/plugins/oberoncombat/features/event-commands/).
- Kills in a [duel](/plugins/oberoncombat/features/duels/) do not count.
- `oberoncombat.exempt.killabuse` exempts a killer; excluded places (`kill-abuse`) switch it off.

This is separate from `money-steal.anti-farm`, which only withholds money for a while and says nothing. Use that for a
quiet limit and this for a loud one.
