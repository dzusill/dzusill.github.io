---
title: "Installation"
description: "An older config.yml is stamped with the current schema version once, and says so:"
---

1. Install **DzusillCore** (the DzusillCore framework jar) into `plugins/`. It is a hard dependency.
2. Optionally install **PlaceholderAPI**, if you want your announcements to resolve its placeholders.
3. Drop `DAnnounce.jar` into `plugins/`.
4. Restart the server. (`/reload` is not supported — commands and their aliases are claimed at enable time.)
5. Check the console:

```
  DAnnounce v1.0.0
  Powered by DzusillCore
```

An older `config.yml` is stamped with the current schema version once, and says so:

```
[DAnnounce] Stamped config.yml as schema version 3.
```

If `config.yml` is invalid the plugin **refuses to enable** rather than starting with half a set of announcements:

```
[DAnnounce] Invalid config.yml: chat-announcements.store: click.text needs a click.command to run
```

Every problem found in one pass is reported together.

6. Verify in-game:

```
/announcements list
/announcements next
/announcements preview discord
```

## Files it creates

```
plugins/DAnnounce/
├── config.yml     # announcements, schedules, world filter, sound, MOTD
├── messages.yml   # the command's own output
└── state.yml      # rotation cursors, one-time completion, player opt-outs
```

### `state.yml`

| Key | Holds |
|---|---|
| `completed-one-time` | Ids of `ONCE` announcements that have already fired |
| `rotation-cursors` | Where each `rotate` announcement is in its list |
| `last-random` | The last variant each `random` announcement picked, so it does not repeat immediately |
| `muted-players` | UUIDs who ran `/announcements` to switch messages off |
| `muted-sounds` | UUIDs who ran `/announcements toggle sound` |

Writes are debounced (about five seconds) and performed off the main thread, with an atomic file replace and a synchronous flush on shutdown. A hard crash loses at most that window. An unreadable UUID in the file is logged and skipped rather than failing the load.

To let a `ONCE` announcement fire again, stop the server and remove its id from `completed-one-time`.

## What ships in the box

The bundled `config.yml` is a worked example configuration: eleven chat announcements (`discord`, `info`, `reports`, `store`, `settings`, `apply`, `media`, `duels`, `bounty`, `coinflip`, `invest`), each with a title, one body line and a clickable command. The rotation fires every 900 seconds at random above two players, with `BLOCK_NOTE_BLOCK_CHIME` as the global sound and the MOTD switched off.

The bottom of the file also carries a large block of **commented-out preset announcements** you can uncomment and paste into `chat-announcements`.

## Updating the jar

Stop the server, replace the jar, start it again.

`announcements`, `chat-announcements`, `bossbar-announcements` and `motd` are **ignored sections**: on update, new keys are merged into every other part of `config.yml`, but those four are left exactly as you wrote them. An announcement you deleted stays deleted, and no bundled example is merged back in.
