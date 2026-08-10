---
title: "config.yml"
description: "Every switch, threshold, weight and punishment tier, section by section, with what each one actually changes."
---

`plugins/OberonChat/config.yml`. Reload with `/oberonchat reload` — except `Sources`, which needs a restart.

## Top level

```yaml
Debug: false
Chat-Event: AUTO
```

| Key | Default | What it does |
|---|---|---|
| `Debug` | `false` | Extra console logging for working out why something was or wasn't caught. |
| `Chat-Event` | `AUTO` | `AUTO` uses the modern event on Paper, the legacy one elsewhere. `MODERN` / `LEGACY` force it. Only one is ever listened to. |

Set `LEGACY` if chat filtering does nothing and your chat plugin is an older one that fires only the deprecated event.

## Sources

Which inputs are read. **Restart required** — these decide which listeners are registered.

```yaml
Sources:
  Chat: true
  Commands:
    Enabled: true
    List: [ msg, tell, r, me, nick, ... ]
    Check-Unlisted: false
  Signs: true
  Books: true
  Anvil: true
```

> **`Check-Unlisted` should stay off.** It reads the arguments of every command on the server, and that includes `/login` and `/register`. Add commands to `List` instead.

Full explanation on [What gets checked](/plugins/oberonchat/features/what-gets-checked/).

## Word-Filter

```yaml
Word-Filter:
  Enabled: true
  Default-Action: BLOCK
  Default-Weight: 1
  Censor-Character: "*"
  Minimum-Contains-Length: 4
  Normalization:
    Strip-Diacritics: true
    Map-Homoglyphs: true
    Map-Leetspeak: true
    Strip-Separators: true
    Collapse-Repeats: true
```

| Key | Default | What it does |
|---|---|---|
| `Default-Action` | `BLOCK` | Used by any `filter.yml` entry that doesn't set its own. |
| `Default-Weight` | `1` | Same, for violation points. |
| `Censor-Character` | `*` | What censored text is replaced with. First character only. |
| `Minimum-Contains-Length` | `4` | Entries shorter than this default to `LITERAL` matching. **Raise this if you get false positives.** |

The `Normalization` steps are explained on [The Word Filter](/plugins/oberonchat/features/word-filter/). Turning one off closes fewer bypasses and produces fewer false positives.

## Caps

```yaml
Caps:
  Enabled: true
  Threshold-Percent: 50
  Minimum-Length: 6
  Ignore-Player-Names: true
  Action: BLOCK
  Weight: 1
```

| Key | Default | What it does |
|---|---|---|
| `Threshold-Percent` | `50` | Highest allowed share of upper-case letters. Exactly at it passes. |
| `Minimum-Length` | `6` | Shorter messages are never checked, so `OK` and `GG` stay legal. |
| `Ignore-Player-Names` | `true` | Skip words that are an online player's name. |
| `Action` | `BLOCK` | `BLOCK`, `LOWERCASE` or `WARN`. |

## Spam

Four independent checks, chat only. See [Anti-Spam & Caps](/plugins/oberonchat/features/anti-spam/).

```yaml
Spam:
  Cooldown:   { Enabled: true, Seconds: 2.0,  Weight: 1 }
  Duplicate:  { Enabled: true, Similarity-Percent: 90, Window-Seconds: 30, History-Size: 3, Weight: 1 }
  Flood:      { Enabled: true, Max-Messages: 5, Window-Seconds: 5, Weight: 2 }
  Length:     { Enabled: true, Max-Characters: 256, Weight: 1 }
```

*(Written expanded in the shipped file; the flow style above is only for brevity here.)*

## Staff-Alerts

```yaml
Staff-Alerts:
  Enabled: true
  On-Actions: [ BLOCK, CENSOR, NOTIFY ]
  Console: true
```

Who sees them: anyone with `oberonchat.alerts`. `On-Actions` decides which actions are worth interrupting for.

## Violations

```yaml
Violations:
  Enabled: true
  Decay-Seconds: 3600
  Persist: true
  Thresholds:
    3:
      Commands: [ "mute %player% 10m Chat filter: %reason%" ]
      Broadcast: false
```

Covered in full on [Violations & Punishment](/plugins/oberonchat/features/violations/).

> `Thresholds` is never merged back from the defaults. A tier you delete stays deleted.

## Feedback

How the player is told their message was stopped.

```yaml
Feedback:
  Chat-Message: true
  Action-Bar: true
  Sound:
    Enabled: true
    Name: "entity.villager.no"
    Volume: 1.0
    Pitch: 1.0
```

All three are independent — servers disagree about which is least annoying. `Name` is any namespaced sound key, e.g. `block.note_block.bass`.
