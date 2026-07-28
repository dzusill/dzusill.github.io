---
title: "Quick Start"
description: "Five minutes from install to a working rank ladder."
---

Five minutes from install to a working rank ladder.

## 1. Decide your ladder

Pick the kill counts and the rank each one grants. A common PvP ladder:

| Kills | Rank |
|---|---|
| 5 | Bandit |
| 10 | Raider |
| 25 | Slayer |
| 50 | Warlord |
| 100 | Legend |

## 2. Write it into `config.yml`

```yaml
Milestones:
  Enabled: true
  Default-Rank: "Rookie"
  Backfill: false
  Broadcast: true
  Tiers:
    '5':
      Rank: "Bandit"
      Commands:
        - "lp user %player% parent set bandit"
    '10':
      Rank: "Raider"
      Commands:
        - "lp user %player% parent set raider"
        - "give %player% diamond 5"
    '25':
      Rank: "Slayer"
      Commands:
        - "lp user %player% parent set slayer"
        - "eco give %player% 5000"
    '50':
      Rank: "Warlord"
      Broadcast: true
      Commands:
        - "lp user %player% parent set warlord"
```

Swap `lp user ... parent set ...` for whatever your permissions plugin uses. Tokens available in every command: `%player%`, `%uuid%`, `%kills%`, `%milestone%`, `%rank%`.

## 3. Set the anti-farm window

```yaml
Anti-Farm:
  Enabled: true
  Cooldown-Seconds: 600     # 10 minutes before killing the same player counts again
Same-IP:
  Block: true               # block the classic alt-account farm
```

10 minutes is a sane default for a public PvP server. Arena servers where fast repeated fights are the point should lower it; grindy survival servers should raise it.

## 4. Reload and test

```
/killtracker reload
/killtracker add YourName 5
```

The tier-5 commands run immediately and the console shows them. Check the result:

```
/killtracker info YourName
```

## 5. Put it on the scoreboard

If PlaceholderAPI is installed:

```
%killtracker_kills%              12
%killtracker_rank%               Raider
%killtracker_progress%           2/15
%killtracker_kills_remaining%    13
%killtracker_next_rank%          Slayer
```

A typical TAB or scoreboard line:

```
&7Rank: &f%killtracker_rank%   &7(&f%killtracker_progress%&7 to &f%killtracker_next_rank%&7)
```

Full list: [Placeholders](/plugins/dkilltracker/placeholders/).

## 6. Undo the test

```
/killtracker reset YourName
```

That wipes the kills **and** the milestone watermark, so the rewards can fire again for real.

> Careful with `/killtracker add` on live players — it fires the real milestone commands. Use `/killtracker set` when you just want to change a number without paying anyone out.
