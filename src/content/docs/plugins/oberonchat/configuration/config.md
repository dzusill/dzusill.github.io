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
  On-Actions: [ BLOCK, CENSOR, WARN, NOTIFY ]
  Console: true
```

Who sees them: anyone with `oberonchat.alerts` who has not silenced their own with `/oberonchat alerts`.

**All four actions by default.** With automatic punishment shipped off, these alerts are the only thing that tells
staff anything — a `WARN` word nobody hears about might as well not be on the list. Drop `WARN` if it is too noisy.

## Violations

```yaml
Violations:
  Enabled: true
  Decay-Seconds: 3600
  Persist: true
  Thresholds: {}
```

**`Thresholds` ships empty — nothing is punished automatically.** Offences are still recorded, so
`/oberonchat history` and the placeholders work; staff read the alerts and decide.

The shipped file has a mute-and-kick example commented out under it. Uncomment and reload to switch punishment on.

> Do **not** use `Violations.Enabled: false` to stop punishment. That also stops offences being recorded, which
> costs you the history and the totals. Keep it on and leave `Thresholds` empty.

Covered in full on [Violations & Punishment](/plugins/oberonchat/features/violations/).

> `Thresholds` is never merged back from the defaults. A tier you delete stays deleted.

## Feedback

How the player is told, **per message**. A blocked slur and a spam cooldown are not the same event, and you will not
want them announced the same way.

```yaml
Feedback:
  Default:
    Chat: true
    Action-Bar: true
    Title: false
    Title-Header: ""
    Sound:
      Enabled: true
      Name: "entity.villager.no"
      Volume: 1.0
      Pitch: 1.0

  Title-Times:
    Fade-In: 5
    Stay: 40
    Fade-Out: 10

  Overrides:
    filter:
      blocked:
        Title: true
        Title-Header: "<red><bold>Blocked"
        Sound:
          Name: "entity.wither.spawn"
          Pitch: 1.4
    spam:
      cooldown:
        Chat: false
        Sound:
          Enabled: false
```

### Four channels

| Key | Does |
|---|---|
| `Chat` | the reason as a chat message |
| `Action-Bar` | the same text above the hotbar |
| `Title` | the same text on screen |
| `Sound` | any namespaced sound key, with volume and pitch |

With `Title-Header` set, the message becomes the **subtitle** underneath it — which is where a sentence belongs.
Left empty, the message takes the big line on its own, which suits a short one.

`Title-Times` is in ticks; 20 ticks is a second.

### Overrides inherit

**An override only names what it changes.** The `filter.blocked` example above adds a title and a different sound;
its chat message and action bar still come from `Default`. That is what makes the common case two lines rather than
eight.

Keys are nested exactly like `messages.yml`:

| Group | Entries |
|---|---|
| `filter` | `blocked` `censored` `warned` |
| `caps` | `blocked` `lowercased` `warned` |
| `spam` | `cooldown` `duplicate` `flood` `too-long` |

> Write them **nested**, not as `filter.blocked:`. A dot inside a config key is read by Bukkit as a path separator,
> so a dotted key silently never loads.

> `Feedback.Overrides` is never merged back from the defaults. An override you delete stays deleted.

### Upgrading from an older config

A config still using the flat `Feedback.Chat-Message` / `Action-Bar` / `Sound` form keeps working — it is read as the
`Default` profile, with no overrides. Nothing changes until you add a `Default:` block.
