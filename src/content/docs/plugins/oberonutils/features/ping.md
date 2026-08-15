---
title: "Ping"
description: "/ping, with vanished players hidden through the vanish plugin's own API rather than a placeholder string."
---

```
/ping            your latency
/ping <player>   someone else's
```

## Vanished players stay vanished

A vanished player is reported as offline to anyone without `pv.see` — and is left out of tab
completion too.

Vanish state is read from PremiumVanish's or SuperVanish's own API. If neither can be reached, the
player is treated as **vanished**, not visible.

That direction is the point. Comparing the placeholder `%premiumvanish_isvanished%` to the literal
text `"Yes"` means any hiccup — PlaceholderAPI reloading, the expansion missing, the wording
changing — makes the comparison false, and a vanished staff member's ping is shown to whoever asked.
Which confirms they are online. The failure is silent and produces nothing in the log.

With no vanish plugin installed at all, nobody can be vanished, so nobody is hidden.

```yaml
ping:
  hide-vanished: true
  see-vanished-permission: pv.see
```

## Console works

`/ping <player>` runs from console. The Skript version assumed a player sender and produced nothing
useful there.

## Optional: colours by latency

```yaml
  colour-thresholds:
    - {below: 80,    colour: "<green>"}
    - {below: 150,   colour: "<yellow>"}
    - {below: 99999, colour: "<red>"}
```

Checked top to bottom, first match wins. Empty — the default — means one colour for everyone,
matching the original.

## Optional: smoothing

```yaml
  samples: 3
```

Averages the last three readings rather than showing one sample. A single reading jumps around
enough that two players with identical connections can see very different numbers a second apart.

`1` is the raw current value.

## Permissions

None by default — open to every player.

```yaml
  permission: oberonutils.ping
  permission-others: oberonutils.ping.others
```

Set either to gate it.
