---
title: "Quick Start"
description: "A five-minute tour to confirm your install works and learn the core loop. Run these in-game."
---

A five-minute tour to confirm your install works and learn the core loop. Run these in-game.

## 1. Found a faction

```
/f create MyFaction
```

Creates your faction (charging the create cost if economy is set up). You're the leader.

## 2. Claim territory

Stand where you want your base and claim the chunk:

```
/f claim
```

Your claim capacity is set by **prestige** — a new faction can hold a small number of chunks and
grows as it levels and prestiges. See [Leveling & Prestige](/plugins/dfactions/features/progression/).

## 3. Set a home and invite members

```
/f sethome
/f invite Steve
```

Steve accepts with `/f join MyFaction` (if the faction is open) or via the invite.

## 4. Open the menu

```
/f gui
```

The graphical menu shows your overview, members, statistics, bank, storage and activity log. See
[The GUI](/plugins/dfactions/features/gui/).

## 5. Grow

- Deposit resources for XP: `/f resources`
- Check progress: `/f level`
- Bank some money: `/f bank deposit 1000`
- See the leaderboard: `/f top`

## Verify the install is healthy

If `/f create`, `/f claim` and `/f gui` all work, you're good to go. 🎉

From here:

- Tune everything in **[config.yml](/plugins/dfactions/configuration/config/)**.
- Learn every command in the **[Command reference](/plugins/dfactions/commands-and-permissions/)**.
- Turn on **[Wars & Shields](/plugins/dfactions/features/wars-and-shields/)**, **[Beacon HQ](/plugins/dfactions/features/beacon/)**
  and **[Supply Drops](/plugins/dfactions/features/supply-drops/)** for the full competitive experience.
