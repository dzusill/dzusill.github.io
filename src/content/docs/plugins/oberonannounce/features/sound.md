---
title: "Sound"
description: "One sound is configured once and played with every announcement."
---

One sound is configured once and played with every announcement.

```yaml
sound:
  enabled: true
  type: BLOCK_NOTE_BLOCK_CHIME
  volume: 1.0
  pitch: 1.0
```

| Key | Default | |
|---|---|---|
| `enabled` | `false` | The block does nothing until this is `true`. |
| `type` | — | The sound. Required when `enabled` is `true`. |
| `name` | — | An accepted spelling of `type`, used by the per-variant form. |
| `volume` | `1.0` | Clamped to zero or above. |
| `pitch` | `1.0` | Clamped to zero or above. |

An enabled block with no `type` refuses the config: `sound: enabled sound requires a name`.

The sound is played at the receiving player's own location, so `volume` is about how loud it is for them, not about how far it carries.

## `type` is a registry key

This is the part that goes wrong, and it goes wrong silently.

Minecraft identifies a sound by a resource key: `block.note_block.chime`. Bukkit exposes the same sound as a Java constant: `BLOCK_NOTE_BLOCK_CHIME`. Both are accepted here.

| You write | What is sent to the client |
|---|---|
| `block.note_block.chime` | `block.note_block.chime` — used as written, lower-cased |
| `minecraft:block.note_block.chime` | the same, namespace kept |
| `BLOCK_NOTE_BLOCK_CHIME` | looked up in the server's sound registry, which answers `minecraft:block.note_block.chime` |

The two forms are not a simple case change. `BLOCK_NOTE_BLOCK_CHIME` cannot say which of its underscores were dots — `block.note_block.chime` has both — so a constant is resolved by walking the registry and comparing, not by replacing characters. Each distinct spelling is looked up once and remembered.

> **A name the registry does not recognise is passed through unchanged, lower-cased, and plays nothing.** There is no error and no console warning, because an unrecognised key is also how a resource-pack sound is played, and refusing those would be worse. This has cost a live server its announcement chime once already.

If your sound is silent, that is the first thing to check. Type the key form (`block.note_block.chime`) rather than the constant, compare it against the vanilla sound list, and confirm the case: `Block.Note_Block.Chime` is fine, `block.noteblock.chime` is not — it is a valid-looking name for a sound that does not exist.

A resource-pack sound is written the way the pack declares it, namespace and all:

```yaml
sound:
  enabled: true
  type: mypack:ui.announce
```

## Overriding it for one announcement

Any entry may carry its own `sound:` block, which replaces the global one for that entry only:

```yaml
chat-announcements:
  restart:
    title: "<red><b>Restart"
    lines:
      - "<gray>The server restarts in five minutes."
    sound:
      enabled: true
      type: BLOCK_ANVIL_LAND
      volume: 0.6
      pitch: 1.2
```

The global block is a **fallback**, not a base. An entry whose own block is enabled keeps every value from it; an entry with no block, or a block that is not enabled, gets the global one whole. There is no partial merge — you cannot override only the pitch.

Turning the sound off for one entry alone is therefore not possible through the entry: an entry with `sound.enabled: false` falls back to the global sound. Switch the global block off and give a sound to the entries that should have one instead.

## Players can switch it off

```
/announcements toggle sound
```

Toggles the sound and nothing else — the messages keep arriving. The choice is stored in `state.yml` under `muted-sounds` and survives a restart.

> `oberonannounce.bypass-toggle` does **not** override this. It keeps a staff account receiving announcements they have muted; it has no effect on the sound preference, which is checked separately at delivery.

See [Player Toggles](/plugins/oberonannounce/features/player-toggles/).

## Command feedback sounds

The `sound:` block is announcement content. It has nothing to do with the `Presentation` block, which is how the command's own replies are delivered and can carry sounds of its own — see [messages.yml](/plugins/oberonannounce/configuration/messages/).
