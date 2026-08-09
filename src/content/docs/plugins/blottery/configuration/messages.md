---
title: "messages.yml"
description: "Every line the plugin sends, in MiniMessage — colours, gradients, hover text and click events all work."
---

Every line the plugin sends, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html) — colours, gradients, hover text and click events all work.

---

## What lives here

| Group | Covers |
|---|---|
| Prefix and shared | prefix, no-permission, players-only, invalid usage |
| Buying | success, not enough money, over cap, round closed |
| Round lifecycle | round opened, reminders, drawing, results |
| Winning | winner broadcast, personal win message, offline payout on join |
| No winner | too few players, no tickets |
| History and top | headers, entry lines, empty states |
| Admin | shuffle and reset confirmations |
| GUI | menu titles and item text |

## Multi-line messages

Any key may be a list; each entry renders as its own line:

```yaml
winner_broadcast:
  - "<gold>━━━━━━━━━━━━━━━━━━━━"
  - "<yellow>%player% <white>won <green>%amount%</green>!"
  - "<gray>Next round starts in a moment."
  - "<gold>━━━━━━━━━━━━━━━━━━━━"
```

## Making messages sell tickets

The single highest-value edit in the whole plugin is putting a clickable command in the reminder:

```yaml
reminder: "<gold>Lottery draws in <yellow>%seconds%s</yellow> — pot <green>%pot%</green> <click:run_command:/lot><white><u>[Open]</u></white></click>"
```

One click from "there is a lottery" to the buy screen. No config value moves sales like that does.

## Common placeholders

| Placeholder | Where |
|---|---|
| `%player%` | winner and purchase messages |
| `%amount%` | payouts |
| `%pot%` | reminders, status, GUI |
| `%tickets%` | purchase and status |
| `%price%` | purchase messages |
| `%seconds%` | reminders and countdowns |

Keep the placeholders a message ships with — removing one does not error, it just drops the information the line existed to carry.

## Applying changes

bLottery has no reload command — edit the file and restart. See [Reloading](/plugins/blottery/configuration/reloading/).

## Next

- [Reloading](/plugins/blottery/configuration/reloading/)
