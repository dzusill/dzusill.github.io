---
title: "Punishments"
description: "Closing a report and issuing the punishment are the same decision, so they should be the same motion."
---

Closing a report and issuing the punishment are the same decision, so they should be the same motion.
The punish menu puts your own commands on the report's detail screen.

**It is off by default.** Nothing runs commands until you turn it on.

```yaml
Reports:
  Punishments:
    Enabled: false
    Close-On-Punish: true
    Actions:
      - Name: "<red>Ban — Cheating"
        Icon: NETHERITE_SWORD
        Command: "ban %target% Cheating [#%ticket%]"
      - Name: "<gold>Tempban 7d — Griefing"
        Icon: TNT
        Command: "tempban %target% 7d Griefing [#%ticket%]"
      - Name: "<yellow>Mute 24h — Chat abuse"
        Icon: PAPER
        Command: "mute %target% 24h Chat abuse [#%ticket%]"
      - Name: "<gray>Warn"
        Icon: BOOK
        Command: "warn %target% %reason%"
```

## How an action works

Each entry is a button in the punish menu:

| Key | What it is |
|---|---|
| `Name` | the button label, in MiniMessage |
| `Icon` | the material shown |
| `Command` | what runs from the console when it is clicked |

Three placeholders are substituted into the command:

| Placeholder | Becomes |
|---|---|
| `%target%` | the reported player |
| `%ticket%` | the ticket number |
| `%reason%` | the reason recorded on the report |

The shipped examples put `[#%ticket%]` in the punishment reason on purpose. Months later, a ban appeal
quoting that number leads straight back to the report, the evidence and the conversation that produced
it.

## Any punishment plugin

There is no hard binding to LiteBans. The action list runs console commands, so whatever your
punishment plugin registers works — LiteBans, AdvancedBan, LibertyBans, vanilla `/ban`. LiteBans is
listed as a `softdepend` only because it is the common case.

Because these are plain commands, **check them before you enable the menu**. A typo in a `Command:`
line is a punishment that silently does nothing, or worse, one that does the wrong thing to the wrong
account.

## Close on punish

```yaml
Close-On-Punish: true
```

The report closes itself once an action runs, which is almost always what you want — the case is
resolved. Set it to `false` if your workflow keeps reports open until a second staffer reviews them.

## Permission

The punish menu is gated on `dtickets.report.punish`, separate from `dtickets.report.admin`. Junior
staff can work the report queue — read, claim, reply, close — without being able to issue bans.
