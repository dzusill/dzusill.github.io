---
title: "Hardcore Death"
description: "A hardcore player dies. Here is everything that happens, in order."
---

A hardcore player dies. Here is everything that happens, in order.

```
PlayerDeathEvent (MONITOR)
  └─ exemption filters            mode · bypass · world · cause · grace
     ├─ spared → nothing at all, not even the counter
     └─ banned
        ├─ hardcore death counter +1, written to storage immediately
        ├─ broadcast · title · sound
        ├─ Death.Commands (console)
        └─ after Ban.Delay-Ticks:
           ├─ Ban.Command dispatched      (or the server's ban list)
           └─ kick, if still connected
```

## The ban

```yaml
Ban:
  Enabled: true
  Duration: 24h
  Command: 'tempban %player% %duration% %reason%'
  Reason: 'Died in hardcore mode'
  Delay-Ticks: 40
  Fallback-To-Vanilla: true
```

The default is AdvancedBan's syntax. LiteBans and CMI take the same shape. Placeholders: `%player%`, `%uuid%`, `%duration%`, `%reason%`. A leading `/` is accepted and stripped.

**No compile-time dependency on any ban plugin.** dFate never links an AdvancedBan class — it dispatches a console command, which is why it works with whatever you already run.

### Why the delay

`Ban.Delay-Ticks: 40` (two seconds) is not decoration. The ban plugin disconnects the account the instant its command runs. Ban first and the death title and the broadcast are drawn at a client that has already gone — the player sees a kick screen and never learns what hit them. Two seconds is enough to read it. Set `0` to ban immediately.

### When the ban plugin is missing

dFate checks the command's first word against the live command map before dispatching. If nothing provides it:

```
[dFate] SEVERE: No plugin on this server provides /tempban — check Ban.Command in config.yml.
        Falling back to the server's own ban list.
```

and the ban is written to the server's own **profile** ban list instead, for the same duration. Profile rather than name: a name ban follows whoever owns the name today, and a fate belongs to an account.

```yaml
Ban:
  Fallback-To-Vanilla: false
```

Turning it off is supported but think twice. With it off, removing your ban plugin turns every hardcore death into a silent no-op — players die and simply carry on, and only a `SEVERE` line in the log says why.

> The fallback also needs `Ban.Duration` to parse. A typo like `24hh` is refused rather than guessed at, and the fallback is skipped with a `SEVERE` line — banning someone for a length nobody configured is worse than not banning them.

## The announcement

```yaml
Death:
  Broadcast: true
  Title: true
  Sound: entity.wither.spawn
  Sound-Global: true
```

```
☠ Steve's run is over. (LAVA, death #1) Locked out for 24h.
```

The title goes to the dying player; the broadcast and (with `Sound-Global: true`) the sound go to everyone. All text lives in `messages.yml`.

## Your own commands

```yaml
Death:
  Commands:
    - 'broadcast &4%player% has fallen.'
    - 'lp user %player% parent remove hardcore'
    - 'eco reset %player%'
```

Run as console, before the ban, in file order. Placeholders: `%player%`, `%uuid%`, `%world%`, `%cause%`, `%duration%`, `%deaths%`, `%reason%`.

## After the ban expires

**The player is still hardcore.** They come back, they die again, they are banned again. Nothing about surviving a ban buys the mode back.

The `%dfate_deaths%` counter keeps climbing across bans, so `death #3` in the broadcast is a real number and not a per-session one.

If you want a player out of hardcore, that is an admin decision:

```
/fate set Steve normal
```

which also clears their current ban when `Ban.Unban-On-Set-Normal: true` (the default).

## What is *not* touched

dFate does not wipe inventories, reset player data, clear exp or move anyone to spawn. Death drops exactly what vanilla drops. If you want more, put it in `Death.Commands` — that is what it is for.

## Related

- [Exemptions](/plugins/dfate/features/exemptions/) — every way a hardcore death is forgiven
- [Lifesteal](/plugins/dfate/features/lifesteal/) — the same ending, spread over a run of deaths
- [Commands & Permissions](/plugins/dfate/commands-and-permissions/) — the admin override
