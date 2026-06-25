---
title: "config.yml"
description: "The full settings file, at plugins/dBloodMoney/config.yml. Apply changes with /dbm reload (see Reloading for what needs a restart)."
---

The full settings file, at `plugins/dBloodMoney/config.yml`. Apply changes with `/dbm reload` (see [Reloading](/plugins/dbloodmoney/configuration/reloading/) for what needs a restart).

---

## Steal

The core kill-to-steal economy.

```yaml
Steal:
  Percent: 50.0
  Min-Victim-Balance: 10.0
  Max-Per-Kill: 0.0
  Server-Tax-Percent: 0.0
```

| Key | Default | Description |
|---|---|---|
| `Percent` | `50.0` | Percentage of the victim's balance the killer takes. |
| `Min-Victim-Balance` | `10.0` | If the victim has less than this, nothing is stolen. |
| `Max-Per-Kill` | `0.0` | Hard cap on a single steal. `0` = no cap. |
| `Server-Tax-Percent` | `0.0` | Cut the server skims off the killer's reward — a money sink. `0` = off. |

See [Kill Rewards](/plugins/dbloodmoney/features/kill-rewards/) for worked examples.

---

## Anti-Farm

Stops players farming kills off alts or friends.

```yaml
Anti-Farm:
  Enabled: true
  Cooldown-Seconds: 600
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `true` | Master toggle for the pair cooldown. |
| `Cooldown-Seconds` | `600` | How long before the **same killer** can be rewarded for killing the **same victim** again. |

> Changing `Cooldown-Seconds` takes effect on the next **restart**. See [Anti-Farm](/plugins/dbloodmoney/features/anti-farm/).

---

## Combat-Tag

Marks players as "in combat" while fighting, and punishes combat logging.

```yaml
Combat-Tag:
  Enabled: true
  Duration-Seconds: 15
  Punish-Combat-Log: true
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `true` | Turn combat tagging on/off. |
| `Duration-Seconds` | `15` | How long a player stays tagged after taking/dealing PvP damage. |
| `Punish-Combat-Log` | `true` | If a tagged player logs out, they are slain and their attacker is paid. |

See [Combat Tagging](/plugins/dbloodmoney/features/combat-tagging/).

---

## Same-IP

```yaml
Same-IP:
  Block: true
```

| Key | Default | Description |
|---|---|---|
| `Block` | `true` | Skip the reward when killer and victim share an IP address (basic alt detection). |

---

## Safezone

Where stealing is allowed.

```yaml
Safezone:
  Mode: BLACKLIST
  Worlds: []
```

| Key | Default | Description |
|---|---|---|
| `Mode` | `BLACKLIST` | `BLACKLIST` = stealing disabled in the listed worlds. `WHITELIST` = enabled **only** in the listed worlds. |
| `Worlds` | `[]` | World names the mode applies to. |

Example — disable in spawn and lobby:

```yaml
Safezone:
  Mode: BLACKLIST
  Worlds:
    - spawn
    - lobby
```

> Safezone changes take effect on the next **restart**. See [Safezones](/plugins/dbloodmoney/features/safezones/).

---

## Effects

Killer feedback on a successful steal.

```yaml
Effects:
  Killer-Sound: ENTITY_PLAYER_LEVELUP
  Title-Enabled: true
```

| Key | Default | Description |
|---|---|---|
| `Killer-Sound` | `ENTITY_PLAYER_LEVELUP` | Sound played to the killer. Use a valid [Bukkit Sound](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Sound.html) name, or `''` to disable. |
| `Title-Enabled` | `true` | Show the killer a title with the looted amount. |

---

## Pro

> Everything below is **PRO only**. The free edition ignores the entire `Pro:` section.

### Pro.Streak

```yaml
Pro:
  Streak:
    Enabled: true
    Tiers:
      '3': 1.25
      '5': 1.5
      '10': 2.0
    Title-Enabled: true
    Broadcast: true
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `true` | Toggle kill-streak multipliers. |
| `Tiers` | see above | `consecutive-kills: multiplier`. The **highest reached** tier applies. Quote the number keys. |
| `Title-Enabled` | `true` | Show a streak title at each milestone. |
| `Broadcast` | `true` | Announce milestone streaks to the server. |

See [Kill Streaks](/plugins/dbloodmoney/features/kill-streaks/).

### Pro.Bounty

```yaml
  Bounty:
    Enabled: true
    Min: 50.0
    Max: 1000000.0
    Allow-Self: false
    Broadcast: true
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `true` | Toggle the bounty system. |
| `Min` | `50.0` | Smallest bounty a player may place. |
| `Max` | `1000000.0` | Largest single bounty contribution. |
| `Allow-Self` | `false` | Allow placing a bounty on yourself. |
| `Broadcast` | `true` | Announce new bounties to the server. |

See [Bounties](/plugins/dbloodmoney/features/bounties/).

### Pro.Leaderboard

```yaml
  Leaderboard:
    Enabled: true
    Top-Size: 10
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `true` | Toggle the leaderboard. |
| `Top-Size` | `10` | Rows shown by `/killtop` (and used by `/bounty list`). |

See [Leaderboards](/plugins/dbloodmoney/features/leaderboards/).
