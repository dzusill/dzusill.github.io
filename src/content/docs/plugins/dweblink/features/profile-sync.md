---
title: "Profile & Rank Sync"
description: "Pushes each player's current username, LuckPerms primary group and prefix to the website, so their forum posts and profile show the rank they actually hold…"
---

Pushes each player's current username, LuckPerms primary group and prefix to the website, so their forum posts and profile show the rank they actually hold in game — including the colours.

---

## When a push happens

| Trigger | Behaviour |
|---|---|
| Player joins | after `join-delay-ticks`, throttled by `min-interval-seconds` |
| `/verify` succeeds | immediately, so a fresh link is never blank |
| LuckPerms rank changes | after `rank-change-settle-ticks`, **bypassing** the join throttle |

The rank-change trigger is the interesting one. Without it, a player promoted to VIP keeps showing their old rank on the site until their next login. With it, the site updates within a second or two.

---

## Configuration

```yaml
profile-sync:
  enabled: true
  join-delay-ticks: 40
  min-interval-seconds: 300
  on-rank-change: true
  rank-change-settle-ticks: 10
  rank-change-coalesce-seconds: 2
```

| Key | Meaning |
|---|---|
| `enabled` | master switch for join + `/verify` pushes |
| `join-delay-ticks` | wait after join before reading LuckPerms — it needs a moment to load the user record (20 ticks = 1s) |
| `min-interval-seconds` | minimum gap between automatic pushes for the same player |
| `on-rank-change` | push the instant LuckPerms recalculates a rank (online players only) |
| `rank-change-settle-ticks` | wait after the change, so a multi-command promotion finishes before it is read |
| `rank-change-coalesce-seconds` | swallow the burst of recalculation events one rank change emits, so one command produces one push |

## Why the delays exist

Three separate races, three separate knobs:

- **Join delay** — reading LuckPerms the instant a player joins often returns a half-loaded user.
- **Settle ticks** — a promotion is frequently several commands (`parent remove`, `parent add`, `meta set`). Reading between them captures a state that never really existed.
- **Coalescing** — LuckPerms emits many recalculation events for one logical change. Without coalescing you would send five identical HTTP requests.

## Without LuckPerms

Sync still runs, but only the up-to-date **username** is pushed. No rank, no prefix. Nothing errors.

## Turning it off

Set `enabled: false` to stop join and `/verify` pushes entirely, or keep those and set `on-rank-change: false` to drop only the live rank updates.

## Next

- [config.yml](/plugins/dweblink/configuration/config/)
