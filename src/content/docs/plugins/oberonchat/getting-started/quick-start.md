---
title: "Quick Start"
description: "Add a word, test it without swearing in public, set up a punishment, and know which knob to turn when it over- or under-fires."
---

Five minutes, in the order you will actually want them.

## 1. Add a word

Open `plugins/OberonChat/filter.yml`. The short form is enough for most entries:

```yaml
Words:
  - muppet
```

That uses the defaults from `config.yml` — action `BLOCK`, weight `1`. The long form sets them per word:

```yaml
Words:
  - word: muppet
    action: CENSOR
    weight: 2
```

Then `/oberonchat reload`.

## 2. Test it without anyone swearing

```
/oberonchat check what a muppet
```

The reply names the rule that fired, what would happen, and the resulting text. This is the fastest way to check a rule does what you think — no second account, no public chat.

## 3. Pick what happens

| Action | Message | Player is told | Staff alerted |
|---|---|---|---|
| `BLOCK` | never sent | yes | yes |
| `CENSOR` | sent with `****` | yes | yes |
| `WARN` | sent as typed | yes | yes |
| `NOTIFY` | sent as typed | **no** | yes |

**The shipped word list uses `BLOCK` throughout** — a player who types something on it has their whole message
stopped, not starred out.

`NOTIFY` is the interesting one: the player has no idea they tripped anything, which is what you want for advertising or grooming patterns you would rather watch than tip off.

## 4. Make sure staff hear about it

**This is the important step.** Nothing is punished automatically, so alerts are how anything reaches your team:

```
/lp group mod permission set oberonchat.alerts true
```

They will see, in chat and in the console:

```
Filter » Steve was flagged for "you idiot" (word:idiot)
```

A staff member who wants a quiet shift runs `/oberonchat alerts` — their own switch, stored, no permission change
needed.

## 5. Optional — automatic punishment

Off by default. `config.yml` ships this, commented out under an empty `Thresholds: {}`:

```yaml
Violations:
  Decay-Seconds: 3600
  Thresholds:
    3:
      Commands:
        - "mute %player% 10m Chat filter: %reason%"
    6:
      Commands:
        - "kick %player% Watch your language."
      Broadcast: true
```

Every offence adds its word's **weight** to a running total. Reaching a threshold runs its commands **once**. The total decays — an offence stops counting after `Decay-Seconds`, so somebody who swears once a week is never treated like somebody who swears ten times a minute.

The commands are yours; use whatever your punishment plugin provides.

> Leave `Violations.Enabled: true` either way. It is what records offences for `/oberonchat history` — it does not
> punish anybody on its own.

## 6. When it fires too much or too little

| Symptom | Turn this |
|---|---|
| Innocent words flagged | Add them to `Whitelist` in `filter.yml` |
| A short word flags everything | Give it `match: LITERAL` |
| `f u c k` gets through | Give that word `match: CONTAINS` |
| Players bypass with weird characters | Check `Word-Filter.Normalization` is all `true` |
| Too many false positives overall | Raise `Minimum-Contains-Length` from `4` |

Details on the [word filter page](/plugins/oberonchat/features/word-filter/).

## 7. Decide how loudly each thing is announced

`Feedback` is per message, not one global setting:

```yaml
Feedback:
  Default:
    Chat: true
    Action-Bar: true
    Sound: { Enabled: true, Name: "entity.villager.no" }
  Overrides:
    filter:
      blocked:
        Title: true
        Title-Header: "<red><bold>Blocked"
        Sound: { Name: "entity.wither.spawn" }
    spam:
      cooldown:
        Chat: false
        Sound: { Enabled: false }
```

An override only names what it changes — the rest is inherited. A blocked slur gets a title and a heavier sound; a
spam cooldown drops to the action bar with no noise at all.

Full reference on [config.yml](/plugins/oberonchat/configuration/config/).

## 8. Restyle the alert

`messages.yml`, `staff.alert`. It takes `%player%` `%message%` `%reason%` `%source%` `%outcome%` and is parsed as
MiniMessage, so it can be made clickable:

```yaml
staff:
  alert: "<click:run_command:'/tp %player%'><hover:show_text:'Click to teleport'><#C21807>%player%</#C21807> <gray>was flagged for</gray> <white>\"%message%\"</white></hover></click>"
```
