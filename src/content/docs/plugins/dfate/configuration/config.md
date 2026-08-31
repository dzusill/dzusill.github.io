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
  Confirm-Lifesteal: true
  Allow-Opt-In-Later: true
  Send-Welcome: true
  Broadcast: true
  Notify-On-Close: true
  Max-Reask-Attempts: 3
  Notify:
    Chat: true
    Action-Bar: true
    Title: false
```

| Key | Default | Meaning |
|---|---|---|
| `Enabled` | `true` | Master switch. `false` = nobody is asked and nobody is locked; modes already chosen are still enforced. |
| `Ask-Existing-Players` | `true` | Ask players who joined before dFate was installed. `false` files them as normal, silently. |
| `Delay-Ticks` | `20` | Ticks between the join and the screen. Not cosmetic — a dialog sent while the client loads terrain is dropped. |
| `Reask-Seconds` | `10` | How often the screen is put back in front of a player who still has not chosen. |
| `Confirm-Hardcore` | `true` | Show a second "are you certain?" screen before hardcore is committed. |
| `Confirm-Lifesteal` | `true` | The same for lifesteal, with its own wording naming the heart count. |
| `Allow-Opt-In-Later` | `true` | Let a normal player run `/fate choose hardcore`. Always one-way. |
| `Send-Welcome` | `true` | Send the multi-line `choice-welcome` in chat alongside the screen. Chat always arrives; a dialog that fails to render leaves nothing behind. |
| `Broadcast` | `true` | Announce each choice to the server. |
| `Notify-On-Close` | `true` | When the screen goes away unanswered, tell the player in chat how to reopen it (`/fate`). |
| `Max-Reask-Attempts` | `3` | How many times to push the screen back before giving up on it. The join screen is not counted. `0` never retries. |
| `Notify.Chat` | `true` | Send the "you must choose" reminder to chat. |
| `Notify.Action-Bar` | `true` | Send it to the action bar. |
| `Notify.Title` | `false` | Send it as a title. |

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
    Clear-Leftover-Invulnerability: true
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
| `Invulnerable` | `true` | Immune to damage while the screen is up, by cancelling damage — never by the `invulnerable` entity flag, which is saved to player data and could leave a player immortal after a crash. |
| `Clear-Leftover-Invulnerability` | `true` | Clear that flag from a joining player who is not being locked, cleaning up after the older implementation. Survival and adventure only; every clear is logged. |
| `Allowed-Commands` | `fate`, `dfate` | Without the leading slash. **An empty list means no commands at all.** |
| `Reminder-Cooldown-Seconds` | `3` | Seconds between two "you must choose first" reminders. |

## Lifesteal

```yaml
Lifesteal:
  Enabled: true
  Starting-Hearts: 10
  Maximum-Hearts: 20
  Hearts-Lost-Per-Death: 1
  Escalating-Loss: false
  Maximum-Loss-Per-Death: 3
  Ban-At-Hearts: 0
  Restore-Hearts-On-Ban: true
  Enforce-Interval-Ticks: 40
  Announce-Loss: true
  Broadcast-Loss: false
```

| Key | Default | Meaning |
|---|---|---|
| `Enabled` | `true` | Offer lifesteal as a third option. `false` returns the screen to Hardcore / Normal. |
| `Starting-Hearts` | `10` | Hearts a run starts with, and returns to after a ban. 10 is vanilla full health. |
| `Maximum-Hearts` | `20` | Ceiling, so an admin grant cannot push someone past a sane maximum. |
| `Hearts-Lost-Per-Death` | `1` | Hearts one death costs. |
| `Escalating-Loss` | `false` | `true` makes each death cost more than the last. Ten hearts then last about four deaths. |
| `Maximum-Loss-Per-Death` | `3` | Cap on that escalation, as a multiple of the base. Ignored when escalation is off. |
| `Ban-At-Hearts` | `0` | Hearts at or below which the ban fires. |
| `Restore-Hearts-On-Ban` | `true` | Give a banned player a full bar back. `false` is permanent elimination. |
| `Enforce-Interval-Ticks` | `40` | How often the reduced bar is re-asserted. `0` disables — not recommended. |
| `Announce-Loss` | `true` | Tell the player they lost a heart. |
| `Broadcast-Loss` | `false` | Tell the whole server. Off by default; on a busy server this is a lot of chat. |

### Lifesteal.Steal

```yaml
Lifesteal:
  Steal:
    Enabled: true
    Hearts-Per-Kill: 1
    Daily-Cap: 5
    Daily-Cap-Window-Hours: 24
    Pair-Cooldown-Seconds: 1800
    Same-IP-Blocks: true
    Announce: true
    Broadcast: false
```

| Key | Default | Meaning |
|---|---|---|
| `Enabled` | `true` | A lifesteal killer gains hearts from kills. |
| `Hearts-Per-Kill` | `1` | Hearts one kill is worth, capped by `Maximum-Hearts`. |
| `Daily-Cap` | `5` | Hearts one killer may gain per window, whatever the kill count. `0` removes it. |
| `Daily-Cap-Window-Hours` | `24` | Window length, anchored to the killer's first gain — not to midnight. |
| `Pair-Cooldown-Seconds` | `1800` | The same killer→victim pair pays at most once per window. Directional. |
| `Same-IP-Blocks` | `true` | No payout when killer and victim share a connection. |
| `Announce` | `true` | Tell the killer what they gained, and why a kill paid nothing. |
| `Broadcast` | `false` | Tell the whole server. Off by default — this fires on every PvP kill. |

> **Only the killer's mode matters.** Killing a normal-mode player pays out even though they lose nothing, so hearts are created rather than moved. These three brakes are the only thing bounding the supply; the daily cap is the one that stops farming across many different victims.

Full detail in [Lifesteal](/plugins/dfate/features/lifesteal/).

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
  Log-Outcomes: false
  Commands: []
```

| Key | Default | Meaning |
|---|---|---|
| `Broadcast` | `true` | Announce a hardcore death server-wide. |
| `Title` | `true` | Show the dying player a title before they are disconnected. |
| `Sound` | `entity.wither.spawn` | Namespaced sound key. Empty disables it. A bad key is logged, not thrown — it never aborts the ban. |
| `Sound-Global` | `true` | `true` = everyone hears it, `false` = only the player who died. |
| `Commands` | `[]` | Console commands run before the ban. Placeholders `%player%` `%uuid%` `%world%` `%cause%` `%duration%` `%deaths%` `%reason%`. |
| `Log-Outcomes` | `false` | One console line per at-risk death: what it cost, or which filter spared it. Turn on to diagnose "he died and nothing happened", then off again. |

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
    LIFESTEAL: Lifesteal
    NORMAL: Normal
    UNCHOSEN: Unchosen
  Tags:
    HARDCORE: '<dark_red>[Hardcore]</dark_red> '
    LIFESTEAL: '<red>[❤ %hearts%]</red> '
    NORMAL: '<green>[Normal]</green> '
    UNCHOSEN: ''
```

**`Mode-Names`** are the names shown by `%dfate_mode%`, `/fate` and every admin message. Change them to rename the modes across the whole plugin without touching anything else.

**`Tags`** are the badges behind `%dfate_tag%` — the placeholder you put in a TAB prefix, a scoreboard line or a chat format. Written as MiniMessage; `%dfate_tag%` converts them to colour codes so TAB and friends render them, while `%dfate_tag_mini%` returns them untouched.

`UNCHOSEN` is empty by default, so a player who has not answered the screen carries no badge at all. Fill it in if you would rather mark them.

Tags substitute `%hearts%`, `%max_hearts%`, `%mode%` and `%deaths%`, which is how the lifesteal badge carries a live heart count. See [Placeholders](/plugins/dfate/placeholders/).

## Debug

```yaml
Debug: false
```

Logs why a hardcore death was spared. See [Exemptions](/plugins/dfate/features/exemptions/#finding-out-why-nothing-happened).
