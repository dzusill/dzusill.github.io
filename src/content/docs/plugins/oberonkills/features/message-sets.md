---
title: "Writing Messages"
description: "The three sets, single lines versus variants, the default fallback, every tag, and what happens to a death you have not written wording for."
---

## Three sets

```yaml
Messages:
  Pvp: { … }          # killed by another player
  Mob: { … }          # killed by a mob
  Environment: { … }  # fall, lava, drowning, the void
```

Three rather than one flat list, because they read differently and servers style them differently: a PvP kill is an
event, a mob kill is routine, and drowning is a footnote.

## One line or several

A key takes either:

```yaml
    drowning: "<victim> drowned"
```

or a list, from which one is picked at random per death:

```yaml
    sword:
      - "<victim> was slain by <killer>"
      - "<victim> fell to <killer>'s <item>"
```

The single-string form exists so the common case does not need list syntax.

## `default` catches the rest

Every set may have a `default` key. Anything the set does not name specifically falls back to it:

```yaml
  Environment:
    fall: [ "<victim> hit the ground too hard" ]
    lava: [ "<victim> tried to swim in lava" ]
    default: [ "<victim> died" ]
```

So you write wording for the causes you care about and one line for everything else. There are dozens of damage
causes; you do not want to name them all.

## Nothing configured at all

If a death reaches neither a specific key nor a `default`:

```yaml
Keep-Vanilla-When-Unconfigured: true
```

| | |
|---|---|
| `true` (default) | the vanilla Minecraft message is used |
| `false` | nothing is said at all |

`false` is what a server that only wants PvP announcements asks for: give `Pvp` its messages, leave `Mob` and
`Environment` out entirely, and mob and environmental deaths go unremarked.

## Every tag

| Tag | Filled with | Available in |
|---|---|---|
| `<victim>` | who died | all |
| `<killer>` | who killed them | Pvp, Mob |
| `<mob>` | the mob | Mob |
| `<item>` | the weapon, named properly | Pvp |
| `<distance>` | blocks | Pvp — `bow`, `crossbow`, `trident` only |
| `<cause>` | the raw key | all |
| `<killer_rank>` | rank prefix | Pvp |
| `<victim_rank>` | rank prefix | all |

A tag with nothing to fill it renders as nothing rather than as an error, so a format is never broken by a death that
does not carry that value.

## Formatting

Plain MiniMessage. Colours, gradients, bold, hover, click — anything you would put in a chat message:

```yaml
      - "<gradient:#C21807:#F11800><victim></gradient> <gray>was slain by</gray> <#C21807><killer></#C21807>"
```

## Names are not parsed

`<victim>` and `<killer>` are inserted as literal text. A death message goes to the **whole server**, and a name is
the one thing an outside plugin — a nickname plugin, say — can influence. Somebody called `<red>Steve` shows as
`<red>Steve`, not as a red Steve.

Rank prefixes **are** parsed, because those come from your config rather than from a player.

## Nothing is merged back

`Messages` and `Ranks` are never merged back from the defaults. A message you delete stays deleted, and the shipped
set is a starting point rather than a fixture.

## Check it

```
/oberonkills preview <category> <key>
```

```
/oberonkills preview pvp mace-smash
/oberonkills preview mob creeper
/oberonkills preview environment lava
```

Renders with stand-in names. If it says nothing is configured, the key has neither an entry nor a `default` — which
is also worth knowing.

## Every mob line uses `<mob>`

The shipped `Mob` messages say `was blown up by a <mob>` rather than writing "creeper" into the sentence. Two
reasons, and the second is the one that bites:

- A name-tagged creeper called *Kevin* should say Kevin, and a hard-coded sentence never will.
- Only `<mob>` is capitalised and translated. Spelling the mob out gives you a lower-case English word next to
  properly-cased names — which is exactly how it was first reported.
