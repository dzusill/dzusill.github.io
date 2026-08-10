---
title: "Adding Your Own Toggle"
description: "A toggle is a config entry, not code. Add /creepers, /raids or /animals by editing one file — with worked examples."
---

Every toggle — including the two that ship — is an entry under `Toggles` in `config.yml`. There is nothing special about `mobs` and `phantoms` beyond being the two that come with it.

## The shape

```yaml
Toggles:
  creepers:                                    # the key: config, database, messages
    Enabled: true
    Command: creeper                           # /creeper
    Aliases: [ creepers ]                      # /creepers too
    Permission: "oberonmob.toggle.creepers"
    Radius: 128
    Mode: HIDE_ENTITY
    Cancel-When-Others-Nearby: false
    Default-Disabled: false
    Prevent-Targeting: true
    Entities:
      - CREEPER
    Spawn-Reasons:
      - NATURAL
```

Restart. `/creeper` now exists.

## Every field

| Field | Default | What it does |
|---|---|---|
| `Enabled` | `true` | Register this toggle at all. |
| `Command` | the key | Command name, without the slash. |
| `Aliases` | none | Alternative names. |
| `Permission` | `oberonmob.toggle.<key>` | Who may use it. |
| `Radius` | `128` | How far from the player it reaches, in blocks. |
| `Mode` | `CANCEL_SPAWN` | `CANCEL_SPAWN` or `HIDE_ENTITY`. |
| `Cancel-When-Others-Nearby` | `false` | Cancel-spawn only: cancel even when somebody nearby still wants mobs. |
| `Default-Disabled` | `false` | Whether players start with it already off. |
| `Prevent-Targeting` | `true` | Hide mode only: also stop covered mobs hunting the player. |
| `Entities` | — | Names or [group tokens](/plugins/oberonmob/features/entity-groups/). Required. |
| `Excluded` | none | Removed after groups expand. |
| `Spawn-Reasons` | natural spawning | Which spawns may be cancelled. See [Spawn reasons](/plugins/oberonmob/features/spawn-reasons/). |

## Worked examples

### Phantoms off by default

Some servers want phantoms gone unless a player asks for them.

```yaml
  phantoms:
    Command: phantoms
    Default-Disabled: true
```

Every player joins with phantoms already off, and `/phantoms` turns them back on.

### A build-server animal toggle

Builders who don't want cows in their screenshots.

```yaml
  animals:
    Command: animals
    Permission: "oberonmob.toggle.animals"
    Radius: 64
    Mode: HIDE_ENTITY
    Entities:
      - "#ANIMAL"
    Prevent-Targeting: false
```

`HIDE_ENTITY` because animals nobody can see should still be there for everyone else — and `Prevent-Targeting: false` because animals don't hunt anyone anyway.

### Raid-free trading

```yaml
  raids:
    Command: raidfree
    Radius: 96
    Mode: CANCEL_SPAWN
    Entities:
      - "#RAIDER"
    Spawn-Reasons:
      - RAID
      - PATROL
```

Only raid and patrol spawns, so a pillager outpost keeps working normally.

## Permissions for a new toggle

`plugin.yml` cannot declare a node for a toggle you invent — it is written before the config is read. Give it out in your permissions plugin:

```
/lp group default permission set oberonmob.toggle.creepers true
```

Without that, only ops can use the new command.

## Registering it

Adding or removing a toggle **needs a restart**. Its command is written into the server's command map at startup.

Everything else about an existing toggle — radius, mode, entity list, spawn reasons, defaults — applies on `/oberonmob reload`. The reload message tells you which case you are in:

```
Reloaded. 3 toggle(s) active. Restart needed for command changes: yes
```

## Deleting one

Remove the entry. `Toggles` is never merged back from the defaults, so it stays gone — including the two shipped ones, if you only want phantoms.

Stored player choices for a deleted toggle stay in the database and are ignored. Add the toggle back and they come back with it.
