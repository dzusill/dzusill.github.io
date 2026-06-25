---
title: "Sounds"
description: "dStattrack plays a sound for each kind of feedback. They're all configurable under sounds in config.yml."
---

dStattrack plays a sound for each kind of feedback. They're all configurable under `sounds` in [config.yml](/plugins/dstattrack/configuration/config/).

```yaml
sounds:
  error: BLOCK_ANVIL_PLACE/0.5/1.0
  success: ENTITY_PLAYER_LEVELUP/1.0/1.0
  removed: BLOCK_ANVIL_USE/0.5/1.0
  alreadyHas: BLOCK_NOTE_BLOCK_HAT/1.0/2.0
```

## Format

Each value is `SOUND_NAME/volume/pitch`:

- **SOUND_NAME** — any valid [Bukkit Sound](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Sound.html) enum name.
- **volume** — float; `1.0` is normal.
- **pitch** — float; `0.5`–`2.0`, where `2.0` is high.

## When each sound plays

| Key | Plays when |
|---|---|
| `success` | A stattrack is applied successfully. |
| `removed` | A stattrack is removed. |
| `alreadyHas` | The player tries to apply to an item that already has one. |
| `error` | Any other failure — not holding an item, not trackable, can't afford it. |

> A misconfigured sound spec (bad name or missing parts) is **silently ignored** rather than breaking the action — but the rest of the feedback still happens. Set a value to a valid sound or remove the line to disable a cue.
