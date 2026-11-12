---
title: "Commands"
description: "The command name and aliases are commands.main in config.yml (default /ffa). Everything has tab"
---

The command name and aliases are `commands.main` in config.yml (default `/ffa`). Everything has tab
completion.

| Command | What | Permission |
|---|---|---|
| `/ffa` | The main menu: stats, daily first kills, passes, claim storage | `oberonffa.use` |
| `/ffa pass <id>` | One pass's menu | `oberonffa.use` |
| `/ffa claim` | The claim storage (outside the arena) | `oberonffa.use` |
| `/ffa stats [player]` | Current streak, kills and best streak per period | `oberonffa.stats` / `oberonffa.stats.others` |
| `/ffa top <kills\|streak\|current> [period] [page]` | Leaderboards in chat (period defaults to weekly) | `oberonffa.top` |
| `/ffa help` | The commands you can use | `oberonffa.use` |
| `/ffa admin reload` | Reload every file (not the command name) | `oberonffa.admin` |
| `/ffa admin reset <player> [period]` | Wipe a player's statistics, all or one period | `oberonffa.admin` |
| `/ffa admin setstreak <player> <n>` | Set a streak and pay its milestone (testing) | `oberonffa.admin` |
| `/ffa admin rollover <period> [--pay]` | Run the end of the current period now (testing): pass auto-claims. With `--pay` also the top payouts — which then pay the running period early and use its places up. The date does not change; nothing is paid twice | `oberonffa.admin` |
| `/ffa admin reward capture <name>` | Save the held item for `item: { saved: <name> }` | `oberonffa.admin` |
