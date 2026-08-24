---
title: "Quick Start"
description: "Five things worth doing on day one, in the order they matter."
---

Five things worth doing on day one, in the order they matter.

## 1. Set the ban length

```yaml
Ban:
  Duration: 24h
```

Understood units: `s`, `m`, `h`, `d`, `w`. They compose — `1d12h`, `90m`, `1w`. A bare number is seconds.

This one string is handed to your ban plugin verbatim **and** parsed for the fallback ban list and the "you may return in X" kick text, so there is only ever one number to change.

## 2. Decide what hardcore costs beyond the ban

```yaml
Death:
  Broadcast: true
  Title: true
  Sound: entity.wither.spawn
  Sound-Global: true
  Commands:
    - 'broadcast &4%player% has fallen after %deaths% run(s).'
    - 'eco take %player% 5000'
```

`Death.Commands` runs as console before the ban. Placeholders: `%player%`, `%uuid%`, `%world%`, `%cause%`, `%duration%`, `%deaths%`, `%reason%`.

## 3. Protect your staff

```yaml
Death:
  Filters:
    Honour-Bypass-Permission: true
```

Then grant `dfate.bypass` to whoever tests things in survival. It is deliberately **outside** the `dfate.*` wildcard, so `dfate.*` on your admin group does not quietly exempt them from the mode they are moderating.

## 4. Exempt the places death does not mean anything

```yaml
Death:
  Filters:
    Worlds:
      Mode: BLACKLIST
      List:
        - lobby
        - creative
    Ignored-Causes:
      - VOID
      - SUICIDE
```

An empty world list means "everywhere". Set `Mode: WHITELIST` to flip it and name only the worlds where hardcore applies.

## 5. Give new hardcore players a moment

```yaml
Death:
  Filters:
    Grace-Period-Seconds: 300
```

Five minutes in which a hardcore death is forgiven. Measured from the moment they chose, not from first join — so a mode an admin assigns gets the same runway. `0` disables it.

---

## Testing the whole loop in one minute

```yaml
Ban:
  Duration: 30s
  Delay-Ticks: 40
```

Join on a test account, pick hardcore, confirm, then `/kill`. You should see the broadcast and title, then get disconnected two seconds later with the ban screen. Rejoin after 30 seconds and check:

```
/fate
```

You are still **Hardcore**. That is the point — surviving the ban does not buy the mode back.

> If `/kill` does not ban you, check `Death.Filters.Ignored-Causes` — `KILL` and `SUICIDE` are the two causes people most often add and then forget about.
