---
title: "History & Moderation"
description: "Browse global or player live history, inspect lifetime stats, and maintain static or persistent domain and exact-URL blocks."
---

## Stored history

Every successful announcement stores:

- event id,
- player UUID, account name and display name,
- platform id and display name,
- displayed and normalized URL,
- announcement time.

```text
/olive history
/olive history * 2
/olive history PlayerName 1
```

The result is newest-first and paginated. Navigation components are clickable. `history.page-size` controls the page size; `history.timezone` and `history.time-format` control displayed timestamps.

`history.retention-days: 0` keeps rows forever. A positive value is purged at startup and daily. Purging rows never decreases the player's lifetime announcement counter.

## Player stats

```text
/olive stats PlayerName
```

Shows receiving state, lifetime count, last platform, time and clickable last link. With no argument, an in-game administrator inspects themselves; the console must name a player.

## Static blocks

```yaml
blocked-domains:
  - unwanted.example
blocked-urls:
  - "https://twitch.tv/specific_channel"
```

A domain block covers the root and all subdomains. An exact URL is normalized before comparison.

## Runtime blocks

```text
/olive block domain unwanted.example
/olive block url https://kick.com/specific_channel
/olive blocked 1
/olive unblock domain unwanted.example
```

Runtime entries are written to `oberonlive_blocks` and survive restarts and reloads. `/olive blocked` combines config and database sources without showing the same exact entry twice.

A config block cannot be removed through `/olive unblock`; remove it from `config.yml` and run `/olive reload`. All blocklist command messages and paginated rows live in `messages.yml`.
