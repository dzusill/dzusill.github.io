---
title: "messages.yml"
description: "Every line the plugin sends. All of it is MiniMessage — hex colours, gradients, hover and click all work."
---

Every line the plugin sends. All of it is [MiniMessage](https://docs.advntr.dev/minimessage/format.html) — hex colours, gradients, hover and click all work.

## Prefix

```yaml
prefix: "<dark_gray>[<red>KillTracker</red>]</dark_gray> "
```

`<prefix>` inside any message expands to this. Set it to `""` for no prefix at all.

## Placeholders inside messages

Named tokens use `%name%`. Each message supports a different set:

| Message | Tokens |
|---|---|
| `kill-counted` | `%kills%` `%remaining%` `%next%` `%next_rank%` `%progress%` |
| `kill-counted-max` | `%kills%` |
| `kill-suppressed` | `%victim%` `%time%` |
| `milestone-reached` | `%milestone%` `%rank%` `%kills%` `%player%` |
| `milestone-broadcast` | `%player%` `%milestone%` `%rank%` `%kills%` |
| `stats-header` | `%player%` |
| `stats-kills` | `%kills%` `%lifetime%` `%deaths%` |
| `stats-rank` | `%rank%` |
| `stats-progress` | `%progress%` `%next_rank%` `%remaining%` |
| `killtop-entry` | `%position%` `%player%` `%kills%` `%rank%` |
| `admin-set` | `%player%` `%kills%` |
| `admin-add` | `%player%` `%amount%` `%kills%` |
| `admin-reset` | `%player%` |
| `player-not-found` | `%name%` |
| `invalid-number` | `%input%` |

An unknown token is left as-is, so a typo shows up in game rather than silently vanishing. A missing **key** renders as the key name itself — same idea.

## Kill messages

```yaml
kill-counted: "<prefix><gray>Kill counted <dark_gray>-</dark_gray> <white>%kills%</white> total. <dark_gray>(<gray>%remaining% to <white>%next%</white></gray>)</dark_gray></gray>"
kill-counted-max: "<prefix><gray>Kill counted <dark_gray>-</dark_gray> <white>%kills%</white> total.</gray>"
kill-suppressed: "<prefix><yellow>You already killed <white>%victim%</white> recently, so this kill did not count. <gray>(<white>%time%</white> left)</gray></yellow>"
```

`kill-counted-max` is used once a player is past the last milestone, where "3 to 25" would be meaningless.

## Milestones

```yaml
milestone-reached: "<prefix><gold>Milestone reached: <yellow>%milestone% kills</yellow> <dark_gray>-</dark_gray> you are now <yellow>%rank%</yellow>!</gold>"
milestone-broadcast: "<prefix><gold>%player%</gold> <yellow>reached <white>%milestone%</white> kills and is now <white>%rank%</white>!</yellow>"
```

## Stats and leaderboard

```yaml
stats-header: "..."
stats-kills: "<gray>Kills: <white>%kills%</white> <dark_gray>(lifetime <gray>%lifetime%</gray>, deaths <gray>%deaths%</gray>)</dark_gray>"
stats-rank: "<gray>Rank: <white>%rank%</white>"
stats-progress: "<gray>Progress: <white>%progress%</white> <dark_gray>-></dark_gray> <white>%next_rank%</white> ..."
stats-progress-max: "<gray>Progress: <green>all milestones reached</green>"

killtop-empty: "<prefix><gray>No kills recorded yet.</gray>"
killtop-header: "..."
killtop-entry: "<gray>%position%. <white>%player%</white> <dark_gray>-</dark_gray> <red>%kills%</red> kills <dark_gray>(<gray>%rank%</gray>)</dark_gray>"
```

## Framework messages

These come from DzusillCore's command layer and are worth keeping in your server's voice:

```yaml
no-permission: "..."
players-only: "..."
console-only: "..."
unknown-command: "..."
invalid-usage: "..."
invalid-number: "..."
player-not-found: "..."
reload-success: "..."
reload-failed: "..."
command-error: "..."
```

## Lists

`admin-usage` is a list — every entry is sent as its own line:

```yaml
admin-usage:
  - "<prefix><gray>/killtracker info [player] ...</gray>"
  - "<prefix><gray>/killtracker set <player> <amount> ...</gray>"
```

Add or remove lines freely.

## Silencing a message

Set it to `""`. Nothing is sent, and no error is logged.

## Reloading

```
/killtracker reload
```

Messages are re-read immediately. No restart.
