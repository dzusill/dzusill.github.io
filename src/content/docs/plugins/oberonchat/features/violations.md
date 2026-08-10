---
title: "Violations & Punishment"
description: "Offences are recorded and staff are alerted; automatic punishment ships switched off and is four uncommented lines away when you want it."
---

> **Nothing is punished automatically out of the box.** `Violations.Thresholds` ships empty on purpose — offences are
> recorded, staff are alerted, and a human decides. The machinery is there, commented out, for when you want it.

Every offence adds its **weight** to the player's running total, which is what `/oberonchat history` and the
placeholders read. Reaching a configured threshold runs its commands once — but there are no configured thresholds
until you add one.

## Weights

Set per word in `filter.yml`, defaulting to `Word-Filter.Default-Weight`:

```yaml
Words:
  - word: idiot
    action: WARN
    weight: 0        # tracked and alerted, but never escalates
  - word: nigger
    action: BLOCK
    weight: 5        # two of these and they are gone
```

The spam and caps checks have their own weights in `config.yml`.

A weight of `0` means the offence is still recorded and still alerts staff — it just never contributes to a punishment. That is the right setting for mild stuff you want visibility on without a hair trigger.

## Decay

```yaml
Violations:
  Decay-Seconds: 3600
```

An offence stops counting after this long. Somebody who swears once a week is never treated like somebody who swears ten times a minute.

Decay is the only thing that lowers a total. There is no "good behaviour" credit.

## Thresholds — empty by default

```yaml
  Thresholds: {}
```

Nothing fires. To switch punishment on, replace that with steps:

```yaml
  Thresholds:
    3:
      Commands:
        - "mute %player% 10m Chat filter: %reason%"
      Broadcast: false
    6:
      Commands:
        - "kick %player% Watch your language."
      Broadcast: true
```

The shipped `config.yml` has exactly that, commented out under the empty map — uncomment and reload.

> **Do not reach for `Violations.Enabled: false` to stop punishment.** That switch also stops offences being
> *recorded*, which costs you `/oberonchat history`, the running totals and the placeholders. Leave it on and keep
> `Thresholds` empty; that is what "record but never punish" means.

| Placeholder | Is |
|---|---|
| `%player%` | the offender's name |
| `%total%` | their running total |
| `%threshold%` | the step that fired |
| `%reason%` | what tripped, e.g. `word:idiot` or `spam:flood` |
| `%message%` | the offending text |

Commands run from the console, on the main thread. Use whatever your punishment plugin provides — OberonChat has no opinion about which.

> `%message%` is player-written text going into a console command, so it is stripped of control characters and colour codes and capped at 64 characters before substitution. Even so, prefer `%reason%` in commands where you can: it is a short fixed identifier, and it reads better in a mute reason than whatever the player actually typed.

### Fire once, not once per message

The harshest threshold the total has reached fires, and only if it is above whatever already fired inside this window. Without that guard, every further message at the same total would re-mute the player.

Deleting a threshold removes it for good — `Violations.Thresholds` is never merged back from the defaults.

## History

```yaml
Violations:
  Persist: true
```

Offences are written to the database, which does two things:

1. `/oberonchat history <player>` has something to show.
2. Totals are restored when a player joins, so **reconnecting is not a way to shed an in-progress escalation**.

On restore, everything already earned counts as already punished — re-running a mute the player has served just because they logged back in would be its own bug report.

With `Persist: false`, or the database off, totals live in memory only and reset on restart.

## Commands

```
/oberonchat history <player>     # their recent offences
/oberonchat clear <player>       # wipe their total and stored history
```

`clear` is the appeal button. It removes the running total *and* the stored rows.

## Staff alerts — the main event

With punishment off, this is how anything reaches your team.

```yaml
Staff-Alerts:
  Enabled: true
  On-Actions: [ BLOCK, CENSOR, WARN, NOTIFY ]
  Console: true
```

Anyone holding `oberonchat.alerts` sees flagged messages as they happen:

```
Filter » Steve was flagged for "you idiot" (word:idiot)
```

The offender never sees the alert, and never sees that other staff saw it.

**All four actions are in the list** because alerts are the only signal — a `WARN` word nobody hears about might as
well not be on the word list. Drop `WARN` if it turns out too noisy on your server.

### Restyling it

The message is `staff.alert` in `messages.yml` and takes `%player%` `%message%` `%reason%` `%source%` `%outcome%`.
It is parsed as MiniMessage, so it can be made actionable:

```yaml
staff:
  alert: "<click:run_command:'/tp %player%'><hover:show_text:'Click to teleport'><#C21807>%player%</#C21807> <gray>was flagged for</gray> <white>\"%message%\"</white></hover></click>"
```

### Silencing your own

```
/oberonchat alerts
```

Needs only `oberonchat.alerts`, not the admin permission. The choice is stored per player, so a quiet shift survives
a relog — and nobody has to have their permission revoked and re-granted to get one.
