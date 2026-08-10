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
| `WARN` | sent as typed | yes | no |
| `NOTIFY` | sent as typed | **no** | yes |

`NOTIFY` is the interesting one: the player has no idea they tripped anything, which is what you want for advertising or grooming patterns you would rather watch than tip off.

## 4. Set up a punishment

`config.yml`, under `Violations.Thresholds`:

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

## 5. When it fires too much or too little

| Symptom | Turn this |
|---|---|
| Innocent words flagged | Add them to `Whitelist` in `filter.yml` |
| A short word flags everything | Give it `match: LITERAL` |
| `f u c k` gets through | Give that word `match: CONTAINS` |
| Players bypass with weird characters | Check `Word-Filter.Normalization` is all `true` |
| Too many false positives overall | Raise `Minimum-Contains-Length` from `4` |

Details on the [word filter page](/plugins/oberonchat/features/word-filter/).

## 6. Make sure staff see it

```
/lp group mod permission set oberonchat.alerts true
```

Without that node, nobody sees the alerts and `NOTIFY` rules are shouting into an empty room.
