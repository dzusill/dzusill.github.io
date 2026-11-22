---
title: "World & Biome Overrides"
description: "A mob file can carry different values for one world or one biome:"
---

A mob file can carry different values for one world or one biome:

```yaml
overrides:
  worlds:
    world_nether:
      attributes:
        max_health: { min: 30, max: 40 }
  biomes:
    minecraft:deep_dark:
      effects:
        - { effect: darkness, chance: 1.0, duration: infinite }
```

An override uses the same keys as the base of the file (`attributes`, `special`, `damage`, `equipment`, `effects`, `drops`, `spawn`).

## Matching

- **World**: the world name, case-insensitive.
- **Biome**: the namespaced key of the biome **at the spawn location**. `deep_dark` is read as `minecraft:deep_dark`. Datapack and custom biomes work with their full key.

## Merge order

```
mob file (base)  ->  world override  ->  biome override
```

The later layer wins, **key by key**:

| Kind | Rule |
|---|---|
| Sections and nested maps | Merged recursively: an override that only sets `attributes.max_health` keeps every other attribute of the base. |
| A property value (every key directly under `attributes`, `special`, `damage`) | Replaced **whole**: `{ min: 30, max: 40 }` replaces the base range, it does not mix with the base's `max`. |
| Lists (`effects`, `equipment.<slot>.items`, `spawn.replace`, `drops.extra`) and scalars | Replaced. |
| `vanilla` in an override | Forces vanilla for that key in that layer, even if the base sets a value. |

If both a world and a biome override exist, the biome override is applied last, so it wins where they overlap.

A world or biome without an override simply uses the layers it has. Overrides are checked by `/dms validate`; problems are reported as `overrides.worlds.<world> > <key>`.

## In the GUI

Open a mob and click **Overrides**. You get the list of existing world and biome overrides and **Add a world override** / **Add a biome override** (pick from the loaded worlds or the biome list). An override opens the same menus as the base, with the title showing the scope, and writes into `overrides`. Values you have not set show as "inherited (value)". In an override, the Vanilla button means "use the base value again" and shift-click "force vanilla in this override". **Reset to vanilla** inside an override removes the whole override (after a confirmation and with a backup).

## Test an override

`/dms spawn zombie world_nether` or `/dms spawn zombie world minecraft:deep_dark` spawns a test mob resolved as if it were there. See [Inspect & Test Spawns](/plugins/dmobstats/features/inspect-and-test-spawns/).
