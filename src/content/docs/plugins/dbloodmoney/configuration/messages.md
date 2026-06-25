---
title: "messages.yml"
description: "Every player-facing message lives in plugins/dBloodMoney/messages.yml. All text is MiniMessage, so you get full hex colours, gradients, hover and click…"
---

Every player-facing message lives in `plugins/dBloodMoney/messages.yml`. All text is **MiniMessage**, so you get full hex colours, gradients, hover and click without legacy `&` codes.

## The prefix

```yaml
prefix: "<dark_red>[<red>dBloodMoney</red>]</dark_red> "
```

`<prefix>` inside any message is replaced with this value. Change it once here to rebrand every message.

## Placeholders

Messages use `%name%` tokens that dBloodMoney fills in. Each message supports a specific set:

| Message key | Placeholders | Shown when |
|---|---|---|
| `kill-reward` | `%victim%`, `%amount%` | Killer is paid. |
| `kill-lost` | `%killer%`, `%amount%` | Victim loses money. |
| `kill-title` | `%amount%` | Title flashed to the killer. |
| `no-economy` | — | No Vault economy is present. |
| `combat-tag-enter` | — | A player enters combat. |
| `combat-tag-leave` | — | A player leaves combat. |
| `combat-log-punished` | `%player%` | A tagged player logs out. |
| `plugin-info` | `%version%`, `%edition%` | `/dbm info`. |
| `admin-usage` | — | `/dbm` with no arguments (a list). |
| `bounty-placed` | `%amount%`, `%target%` | You place a bounty. |
| `bounty-claimed` | `%amount%`, `%victim%` | You kill a bounty target. |
| `bounty-broadcast` | `%player%`, `%amount%`, `%target%` | New bounty announced. |
| `bounty-too-low` / `bounty-too-high` | `%amount%` | Bounty outside limits. |
| `bounty-list-entry` | `%rank%`, `%target%`, `%amount%` | Each `/bounty list` row. |
| `streak-title` | `%streak%` | Streak milestone title. |
| `streak-broadcast` | `%player%`, `%streak%` | Streak milestone announced. |
| `killtop-entry` | `%rank%`, `%player%`, `%kills%`, `%earned%` | Each `/killtop` row. |

> Some keys (`admin-usage`) are **lists** — every line is sent in order. Keep them as YAML lists.

## Example

```yaml
kill-reward: "<prefix><green>You killed <gold>%victim%</gold> and looted <gold>%amount%</gold>!</green>"
kill-lost: "<prefix><red><gold>%killer%</gold> killed you and looted <gold>%amount%</gold>.</red>"
```

Rebrand with a gradient:

```yaml
prefix: "<gradient:#ff0040:#8b0000>[BloodMoney]</gradient> "
```

## Built-in framework messages

The top of the file also defines DzusillCore's standard keys — `no-permission`, `player-not-found`, `invalid-number`, `command-error`, and so on. Keep them present; edit the wording freely.

> **Missing a key?** If you delete a key, the plugin shows the raw key name in-game (e.g. `kill-reward`) so the gap is obvious. Add it back to fix.

After editing, run `/dbm reload`.
