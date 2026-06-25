---
title: "WorldGuard Regions"
description: "With WorldGuard 7 installed, dDeathPenalty registers a custom region flag so you can disable penalties inside specific regions — perfect for spawn, safe…"
---

With [WorldGuard 7](https://dev.bukkit.org/projects/worldguard) installed, dDeathPenalty registers a custom region flag so you can disable penalties inside specific regions — perfect for spawn, safe zones and arenas.

## The flag

```
death-penalty
```

It's a **StateFlag** that **defaults to ALLOW**, so penalties apply everywhere unless you explicitly deny it in a region.

## Disabling penalties in a region

```
/rg flag <region> death-penalty deny
```

Players who die inside that region keep everything. To re-enable:

```
/rg flag <region> death-penalty allow
```

(or `-rg flag <region> death-penalty` to clear it back to the default).

### Example — protect spawn

```
/rg flag spawn death-penalty deny
```

## How it loads

Custom WorldGuard flags must be registered during the server's `onLoad` phase, before WorldGuard finishes enabling. dDeathPenalty handles this automatically when WorldGuard is present. If another plugin already registered a `death-penalty` flag, dDeathPenalty reuses it.

> The region flag stacks with the other exemption methods: a death is penalised only if the [profile](/plugins/ddeathpenalty/features/penalty-profiles/) is enabled, the player isn't [exempt/ignored](/plugins/ddeathpenalty/features/exemptions/), **and** the region allows it.
