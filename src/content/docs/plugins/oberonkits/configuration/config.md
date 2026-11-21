---
title: "config.yml"
description: "Global settings, plus defaults: the template every profile in profiles.yml starts from. Everything except"
---

Global settings, plus `defaults`: the template every profile in `profiles.yml` starts from. Everything except
`commands` is re-read by `/okits reload`.

## debug

`debug: true` logs, for every trigger, why a player got a kit or why not (ignored game mode, kept inventory,
bypass permission...). Turn it on when a player says they got no kit.

## commands

```yaml
commands:
  select:                # the kit menu command
    name: kits
    aliases: [ffakits]
    take-over: true
  admin:
    name: okits
    aliases: [oberonkits]
```

Each command answers to its `name` and every entry in `aliases`, and to nothing else. A name that is not listed
is never claimed, so another plugin (or Essentials) keeps it.

| Key | Default | Meaning |
|---|---|---|
| `select.name` | `kits` | Main name of the kit menu command. `""` = the first alias is the main name |
| `select.aliases` | `[ffakits]` | Other names for it. `[]` = none |
| `select.take-over` | `true` | For a listed name another plugin also has (Essentials has `/kits`): `true` = OberonKits owns it, `false` = the other plugin keeps it |
| `admin.name` | `okits` | Main name of the admin command |
| `admin.aliases` | `[oberonkits]` | Other names for it. With no name and no alias it falls back to `okits` |

Names are matched without case and a leading `/`; a name with a space or `:` is ignored. With no name and no
alias for `select`, players have no kit menu command (kit worlds still open the menu on their own).

### Keeping /kits for another plugin

To use `/kits` for something else and open the kit menu with `/ffakits` only:

```yaml
commands:
  select:
    name: ffakits
    aliases: []
```

Change `name` rather than deleting it: a missing key is added back with its default (`kits`) on the next start.
The namespaced form `/oberonkits:ffakits` keeps working too.

Commands are registered through OberonCore at start-up, so a change needs a **server restart**. `/okits reload`
notices the change, logs it and says a restart is needed; until then the old names stay.

## essentials

| Key | Default | Meaning |
|---|---|---|
| `run-kit-commands` | `false` | Run kit lines that start with `/` |
| `give-kit-money` | `false` | Give kit lines that start with `$` |

## inventory-guard

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Check Multiverse-Inventories groups on start and reload |
| `action` | `disable-profile` | `disable-profile` or `warn-only` |

See [Inventory guard](/plugins/oberonkits/features/kit-worlds/#inventory-guard).

## admin-gui

| Key | Default | Meaning |
|---|---|---|
| `protected-worlds` | `[]` | Worlds (patterns allowed) the [admin GUI](/plugins/oberonkits/features/admin-gui/) may never make kit worlds. The main world, its nether and its end are always protected |

## kit-layouts

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Players may [arrange each kit](/plugins/oberonkits/features/kit-layouts/); kits are given in their order |

## error-feedback

Error messages (no Stardust, no permission, cooldown, no dropping...) also play a sound and can show on the
actionbar, without editing each message.

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Off = errors are plain messages again |
| `sound` | `entity.villager.no` | `{ name, volume, pitch }`; `name: ""` = no sound |
| `chat` | `true` | Error in chat |
| `actionbar` | `true` | Error on the actionbar too |
| `messages` | the error keys | `messages.yml` keys this applies to. A message switched off (`""`) stays off; a block message keeps its own `sound` and `actionbar` |

## bedrock

| Key | Default | Meaning |
|---|---|---|
| `forms` | `true` | Bedrock players (Floodgate) pick kits in a native form instead of the chest menu |
| `menu-delay-ticks` | `40` | With `forms: false`: how long the chest menu waits for a Bedrock client to load |

See [Bedrock players](/plugins/oberonkits/features/bedrock/).

## teleport-warmup

| Key | Default | Meaning |
|---|---|---|
| `time` | `30s` | How long teleport commands wait in a kit world. `0s` = off |
| `commands` | `[spawn, warp, warps, home, homes, tpa, tpaccept, tpyes, back, rtp]` | Command names without `/`; aliases and `plugin:name` count |
| `bypass-permission` | `oberonkits.warmup.bypass` | Teleports at once |

See [Teleporting out of a kit world](/plugins/oberonkits/features/kit-worlds/#teleporting-out-of-a-kit-world).

## ignore

Players OberonKits never resets or gives a kit to.

| Key | Default | Meaning |
|---|---|---|
| `gamemodes` | `[CREATIVE, SPECTATOR]` | Ignored game modes |
| `bypass-permission` | `oberonkits.bypass` | Players with it are ignored (staff) |
| `npc` | `true` | Ignore Citizens / FancyNpcs fake players |

## economy

Currencies a paid kit can use. See [Stardust kits](/plugins/oberonkits/features/stardust-kits/#currencies).

## defaults

Every key below can be overridden per profile; see [profiles.yml](/plugins/oberonkits/configuration/profiles/) for what each one does.

```yaml
defaults:
  enabled: true
  mode: choose
  triggers:
    enter:   { enabled: true, delay-ticks: 2 }
    respawn: { enabled: true, delay-ticks: 1 }
    join:    { enabled: true, delay-ticks: 20 }
  on-return: keep
  conditions:
    gamemodes: [SURVIVAL, ADVENTURE]
    permission: ""
    from-worlds: []
    except-from-worlds: []
  reset:
    inventory: true
    effects: true
    health: true
    food: true
    fire: true
    fall-distance: true
    xp: false
    set-gamemode: ""
  after-give:
    effects: []
    console-commands: []
    player-commands: []
    message: kit-received
  choose:
    open-on: [enter, respawn, join]
    remember-last: true
    skip-if-remembered: false
    timeout: 15s
    timeout-action: last
    close-action: reopen
    invulnerable-while-choosing: true
    allow-change: on-respawn
    change-cooldown: 0s
  random:
    include-paid: false
    avoid-repeat: false
  kit-items:
    prevent-drop: false
  death:
    drop-items: true
    drop-xp: true
    killer-xp:
      enabled: false
      type: bottles
      amount: 10-15
      xp-each: 3-11
      same-world-only: true
      last-damager-seconds: 15
      message: killer-xp
  regen:
    enabled: false
    every: 30m
    commands: []
    warnings: [60s, 10s]
    players: stay
    move-to: ""
    back-after: 5s
    skip-if-empty: false
```

Times are written `15s`, `30m`, `1h`, `1d`. A value that cannot be read falls back to its default, and the
console names the exact key.
