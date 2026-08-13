---
title: "config.yml"
description: "Commands, staff chat, ranks, the vanish ladder and teleport settings — section by section."
---

`plugins/OberonStaff/config.yml`. Reload with `/oberonstaff reload` — except the `Commands` section, which needs a restart.

## Commands

Every command's name, aliases and permission. **Restart required** — these are written into the server's command map at startup.

```yaml
Commands:
  staffchat:
    Enabled: true
    Name: staffchat
    Aliases: [ sc ]
    Permission: "oberonstaff.staffchat"
  tp:
    Enabled: true
    Name: tp
    Aliases: []
    Permission: "oberonstaff.teleport"
  tphere:
    Name: tphere
    Aliases: [ s ]
    Permission: "oberonstaff.teleport"
  # tpo, tpohere, tptoggle, back likewise
```

| Key | Does |
|---|---|
| `Enabled` | Register it at all. |
| `Name` | Command name, without the slash. |
| `Aliases` | Alternative names. |
| `Permission` | Who may run it. |
| `Take-Name-From-Other-Plugins` | Answer for this name even if another plugin registered it first. Off by default. |

Servers that already permission their staff with `teleport.use` and `staffchat.use` can keep those nodes by putting them in `Permission` — no re-permissioning needed.

### Command names

Command names collide. Vanilla owns `/tp`; EssentialsX owns `/tp`, `/back` and `/tphere`; a tpa plugin often keeps
`/tphere` as an alias. Whoever registered a name first keeps it.

The plugin says so at startup rather than leaving you to find out:

```
[OberonStaff] Another plugin already owns some of these command names:
[OberonStaff]   /tphere is owned by Essentials
[OberonStaff]   They still work when typed, but that plugin answers their tab completion.
```

That second line is the part worth reading. A name somebody else owns **still runs our command** — the label is
rewritten before dispatch — so the only visible symptom is that it will not tab-complete. That is a confusing
thing to debug from the outside.

`/oberonstaff status` lists who owns each name right now.

Three ways to settle it:

```yaml
  tphere:
    Take-Name-From-Other-Plugins: true   # ours wins
```

```yaml
  tphere:
    Name: staffhere                      # ours moves out of the way
```

```yaml
  tphere:
    Enabled: false                       # theirs wins, ours is not registered
```

Taking a name is off by default on purpose: two plugins on one name is your decision, not something to settle by
load order. Turn it on when you know the other plugin only uses the name as an alias and has its own command for
the real thing.

Vanilla names are different — those we take automatically, because vanilla `/tp` does not log, and a staff
teleport that no audit log records is not much of a staff teleport. Vanilla stays reachable as `/minecraft:tp`.

## Presentation

Where each kind of message is shown, and what it sounds like.

```yaml
Presentation:
  Categories:
    TOGGLE:    { Channel: ACTION_BAR, Sound: { Enabled: true, Name: "entity.experience_orb.pickup" } }
    TELEPORT:  { Channel: ACTION_BAR, Sound: { Enabled: false } }
    ERROR:     { Channel: BOTH,       Sound: { Enabled: true, Name: "entity.villager.no" } }
    INFO:      { Channel: CHAT }
  Overrides: {}
```

Four categories, four channels (`CHAT`, `ACTION_BAR`, `BOTH`, `NONE`), and per-key `Overrides` for the one message
that should not behave like the rest of its category.

Full explanation on [Action bar, chat & sounds](/plugins/oberonstaff/features/presentation/).

> This replaces `Staff-Chat.Toggle-Action-Bar`, which sent the chat line **and** repeated it above the hotbar with no
> way to ask for one. An old key left in your config is ignored, not an error.

## Staff-Chat

```yaml
Staff-Chat:
  Permission: "oberonstaff.staffchat"
  Format: "<#C21807><bold>Staff</bold></#C21807> <dark_gray>»</dark_gray> <rank><dark_gray>:</dark_gray> <red><message></red>"
  Log-To-Console: true
```

`Format` takes three MiniMessage tags: `<rank>`, `<message>` and `<player>`.

`<message>` is inserted as plain text and never parsed — see [Staff chat](/plugins/oberonstaff/features/staff-chat/).

## Ranks

```yaml
Ranks:
  - Permission: "group.owner"
    Display: "<gradient:#9B1306:#C21807><bold>Owner</bold></gradient> <#C21807>%player%</#C21807>"
  # …

Default-Rank: "<#808080><bold>Member</bold></#808080> <dark_gray>|</dark_gray> <#808080>%player%</#808080>"
```

**Highest rank first** — an owner usually inherits every lower group, and first match wins. Full explanation on [Ranks](/plugins/oberonstaff/features/ranks/).

> `Ranks` is never merged back from the defaults.

## Vanish

```yaml
Vanish:
  Enabled: true
  Filter-Tab-Completion: true
  Levels:
    - Target: "pv.see.level6"
      Required: "pv.see.level100"
    # …
  Fallback-Required: "pv.see"
```

| Key | Default | Does |
|---|---|---|
| `Enabled` | `true` | Respect vanish at all. |
| `Filter-Tab-Completion` | `true` | Strip players the sender cannot see from **every** command's suggestions. |
| `Levels` | PremiumVanish's own | The ladder, highest rung first. |
| `Fallback-Required` | `pv.see` | What a viewer needs to see a vanished player on no rung. |

Full explanation on [Vanish](/plugins/oberonstaff/features/vanish/).

> `Vanish.Levels` is never merged back from the defaults.

## Teleport

```yaml
Teleport:
  Override-Permission: "oberonstaff.teleport.override"
  Back:
    Enabled: true
    Record-Deaths: true
  Sound:
    Enabled: true
    Name: "entity.enderman.teleport"
    Volume: 1.0
    Pitch: 1.0
  Log-Actions: true
```

| Key | Default | Does |
|---|---|---|
| `Override-Permission` | `oberonstaff.teleport.override` | Reach players with `/tptoggle` on, without using `/tpo`. |
| `Back.Enabled` | `true` | Offer `/back`. |
| `Back.Record-Deaths` | `true` | Let `/back` return to where the player died. |
| `Sound.*` | enderman teleport | Confirmation sound. |
| `Log-Actions` | `true` | Record teleports — see [Action log](/plugins/oberonstaff/features/action-log/). |

## Debug

```yaml
Debug: false
```

Extra console logging.
