---
title: "config.yml"
description: "Every setting, in file order. All user-facing text lives in messages.yml instead — including the dialog's title, body and button labels."
---

Every setting, in file order. All user-facing text lives in [messages.yml](/plugins/dfate/configuration/messages/) instead — including the dialog's title, body and button labels.

## Choice

```yaml
Choice:
  Enabled: true
  Ask-Existing-Players: true
  Delay-Ticks: 20
  Reask-Seconds: 10
  Confirm-Hardcore: true
  Allow-Opt-In-Later: true
  Broadcast: true
```

| Key | Default | Meaning |
|---|---|---|
| `Enabled` | `true` | Master switch. `false` = nobody is asked and nobody is locked; modes already chosen are still enforced. |
| `Ask-Existing-Players` | `true` | Ask players who joined before dFate was installed. `false` files them as normal, silently. |
| `Delay-Ticks` | `20` | Ticks between the join and the screen. Not cosmetic — a dialog sent while the client loads terrain is dropped. |
| `Reask-Seconds` | `10` | How often the screen is put back in front of a player who still has not chosen. |
| `Confirm-Hardcore` | `true` | Show a second "are you certain?" screen before hardcore is committed. |
| `Allow-Opt-In-Later` | `true` | Let a normal player run `/fate choose hardcore`. Always one-way. |
| `Broadcast` | `true` | Announce each choice to the server. |

## Choice.Lock

```yaml
Choice:
  Lock:
    Enabled: true
    Freeze-Movement: true
    Block-Chat: true
    Block-Commands: true
    Block-Interaction: true
    Invulnerable: true
    Allowed-Commands:
      - fate
      - dfate
    Reminder-Cooldown-Seconds: 3
```

| Key | Default | Meaning |
|---|---|---|
| `Enabled` | `true` | Hold a player still until they have chosen. `false` lets an unchosen player walk away and play. |
| `Freeze-Movement` | `true` | Block position changes. Looking around still works. |
| `Block-Chat` | `true` | Cancel chat messages. |
| `Block-Commands` | `true` | Cancel every command outside `Allowed-Commands`. |
| `Block-Interaction` | `true` | Cancel interact, block break/place, item drop, inventory open. |
| `Invulnerable` | `true` | Immune to damage while the screen is up. The previous flag is restored on release. |
| `Allowed-Commands` | `fate`, `dfate` | Without the leading slash. **An empty list means no commands at all.** |
| `Reminder-Cooldown-Seconds` | `3` | Seconds between two "you must choose first" reminders. |

## Ban

```yaml
Ban:
  Enabled: true
  Duration: 24h
  Command: 'tempban %player% %duration% %reason%'
  Unban-Command: 'unban %player%'
  Reason: 'Died in hardcore mode'
  Delay-Ticks: 40
  Fallback-To-Vanilla: true
  Unban-On-Set-Normal: true
```

| Key | Default | Meaning |
|---|---|---|
| `Enabled` | `true` | `false` = hardcore deaths announce but never ban. |
| `Duration` | `24h` | Units `s` `m` `h` `d` `w`, composable (`1d12h`). A bare number is seconds. Used verbatim as `%duration%` **and** parsed for the fallback and the kick text. |
| `Command` | AdvancedBan syntax | Console command. Placeholders `%player%` `%uuid%` `%duration%` `%reason%`. A leading `/` is stripped. |
| `Unban-Command` | `unban %player%` | Run when an admin moves someone back to normal. |
| `Reason` | `Died in hardcore mode` | Substituted as `%reason%`, and shown on the kick screen. |
| `Delay-Ticks` | `40` | Ticks between the death and the ban, so the title and broadcast are seen before the disconnect. `0` bans immediately. |
| `Fallback-To-Vanilla` | `true` | Use the server's own profile ban list when `Command` names something no plugin provides. |
| `Unban-On-Set-Normal` | `true` | `/fate set <player> normal` also clears their ban. |

## Death

```yaml
Death:
  Broadcast: true
  Title: true
  Sound: entity.wither.spawn
  Sound-Global: true
  Commands: []
```

| Key | Default | Meaning |
|---|---|---|
| `Broadcast` | `true` | Announce a hardcore death server-wide. |
| `Title` | `true` | Show the dying player a title before they are disconnected. |
| `Sound` | `entity.wither.spawn` | Namespaced sound key. Empty disables it. A bad key is logged, not thrown — it never aborts the ban. |
| `Sound-Global` | `true` | `true` = everyone hears it, `false` = only the player who died. |
| `Commands` | `[]` | Console commands run before the ban. Placeholders `%player%` `%uuid%` `%world%` `%cause%` `%duration%` `%deaths%` `%reason%`. |

## Death.Filters

```yaml
Death:
  Filters:
    Honour-Bypass-Permission: true
    Worlds:
      Mode: BLACKLIST
      List: []
    Ignored-Causes: []
    Grace-Period-Seconds: 0
```

| Key | Default | Meaning |
|---|---|---|
| `Honour-Bypass-Permission` | `true` | Whether `dfate.bypass` spares a death. |
| `Worlds.Mode` | `BLACKLIST` | `BLACKLIST` = everywhere except the list. `WHITELIST` = only the list. |
| `Worlds.List` | `[]` | Empty always means everywhere. Case-insensitive. |
| `Ignored-Causes` | `[]` | `EntityDamageEvent.DamageCause` names, case-insensitive. |
| `Grace-Period-Seconds` | `0` | Seconds after choosing hardcore in which a death is forgiven. `0` disables. |

Full detail in [Exemptions](/plugins/dfate/features/exemptions/).

## Display

```yaml
Display:
  Mode-Names:
    HARDCORE: Hardcore
    NORMAL: Normal
    UNCHOSEN: Unchosen
```

The names shown by `%dfate_mode%`, `/fate` and every admin message. Change them to rename the modes across the whole plugin without touching anything else.

## Debug

```yaml
Debug: false
```

Logs why a hardcore death was spared. See [Exemptions](/plugins/dfate/features/exemptions/#finding-out-why-nothing-happened).
