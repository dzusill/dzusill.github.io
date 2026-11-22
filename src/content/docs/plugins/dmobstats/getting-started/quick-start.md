---
title: "Quick Start"
description: "Make zombies tougher in 2 minutes. Remember that only zombies that spawn after this will be affected."
---

Make zombies tougher in 2 minutes. Remember that only zombies that spawn **after** this will be affected.

## In the GUI

1. `/dms gui zombie` (needs `dmobstats.gui`; editing needs `dmobstats.edit`).
2. Click **Attributes**, then **max_health**.
3. Set Minimum to `22` and Maximum to `28` (click = +1, right-click = -1, shift = +/-10, **Q** = type the exact value in chat).
4. Click **Save**. A backup is made first.
5. Back in the mob menu click **Enabled** (the toggle is saved right away).
6. `/dms spawn zombie` and `/dms inspect` (look at it): you see the health that was rolled next to the vanilla value.

## In the file

Edit `plugins/dMobStats/mobs/zombie.yml`:

```yaml
enabled: true
attributes:
  max_health: { min: 22, max: 28 }       # vanilla 20.0
```

Then `/dms validate` to check the file and `/dms reload` to load it. Existing zombies are not changed.

## Try a whole preset instead

```
/dms preset list
/dms preset apply hard
```

The second command shows what the preset would change and asks you to confirm within 60 seconds (click the message or add `confirm`). It backs up every mob file first. See [Presets](/plugins/dmobstats/features/presets/).

## Before going live

- Decide which spawn reasons you want modified (`spawn-reasons` in [config.yml](/plugins/dmobstats/configuration/config/)). Spawners and spawn eggs are off by default.
- Restrict worlds with `worlds.mode` / `worlds.list` if needed.
- Run `/dms validate`.
