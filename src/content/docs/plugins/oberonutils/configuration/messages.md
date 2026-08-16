---
title: "Messages & Sounds"
description: "Every message has a text, a delivery channel and a sound — set per category, overridable per message."
---

`messages.yml` holds every piece of player-facing text, and decides where each one goes.

## The four channels

| Channel | Where it appears |
|---|---|
| `CHAT` | Chat only |
| `ACTION_BAR` | The bar above the hotbar only |
| `BOTH` | Both at once |
| `NONE` | Nothing is sent — the sound, if any, still plays |

You set the channel in two places: **`Categories`** covers a whole group of messages, and
**`Overrides`** pins one specific message.

That is the whole idea. Moving every error onto the action bar is a single line. Keeping one of them
in chat anyway is a single line more.

## The categories

Every message belongs to one of four groups:

| Category | Covers |
|---|---|
| `ERROR` | No permission, player not found, teleport cancelled, on cooldown |
| `TELEPORT` | Arrival messages and the countdown |
| `TOGGLE` | Night vision on / off |
| `INFO` | Ping results, admin confirmations, key-all replies |

```yaml
Presentation:
  Categories:
    ERROR:
      Channel: BOTH
      Sound: {Name: entity.villager.no, Volume: 1.0, Pitch: 1.0}

    TELEPORT:
      Channel: BOTH
      Sound: {Name: entity.enderman.teleport, Volume: 1.0, Pitch: 1.0}

    TOGGLE:
      Channel: ACTION_BAR
      Sound: {Name: entity.experience_orb.pickup, Volume: 1.0, Pitch: 1.0}

    INFO:
      Channel: BOTH
      Sound: {Name: entity.experience_orb.pickup, Volume: 1.0, Pitch: 1.0}
```

## Overriding one message

```yaml
Presentation:
  Overrides:
    teleport.countdown:
      Channel: ACTION_BAR
      Sound: {Name: entity.enderman.teleport, Volume: 1.0, Pitch: 1.0}

    warp.koth-cooldown:
      Channel: ACTION_BAR
      Sound: {Name: block.note_block.bass, Volume: 1.0, Pitch: 0.5}

    spawn.set:
      Channel: CHAT
      Sound: {Name: ""}
```

The key is the message's path in this file — `warp.koth-cooldown` is the `koth-cooldown:` entry
under `warp:`.

Anything not listed under `Overrides` uses its category.

## Usage lines, one per command

Each command has its own usage message, so they can be worded, coloured, routed and sounded
independently:

```yaml
usage:
  warp: "<red>Usage: <white>/warp <name>"
  setwarp: "<red>Usage: <white>/setwarp <name>"
  delwarp: "<red>Usage: <white>/delwarp <name>"
  spawn: "<red>Usage: <white>/spawn [player]"
  kill: "<red>Usage: <white>/kill [player]"
  nightvision: "<red>Usage: <white>/nightvision [player]"
  ping: "<red>Usage: <white>/ping [player]"
  kothcooldown: "<red>Usage: <white>/kothcooldown [player]"
  keyall: "<red>Usage: <white>/keyall <time|next|force|reset>"
  oberonutils: "<red>Usage: <white>/oberonutils <reload|migrate|hooks>"
```

They are ordinary messages, so one can be moved without disturbing the others:

```yaml
Presentation:
  Overrides:
    usage.warp:
      Channel: ACTION_BAR
      Sound: {Name: block.note_block.bass, Volume: 1.0, Pitch: 0.5}
```

Delete a key and that command falls back to the shared `general.usage`, with `%usage%` filled in —
so a command always says something, even if you strip the section out entirely.

All ten are in the `ERROR` category, so by default they inherit the error channel and sound.

`usage.warp` is only reached when `teleport.no-args-action` is `USAGE`; the default sends `/warp`
with no arguments to the warps menu instead. See
[config.yml](/plugins/oberonutils/configuration/config/).

## Sounds

```yaml
Sound: {Name: entity.villager.no, Volume: 1.0, Pitch: 1.0}
```

- **`Name`** takes either form: `entity.villager.no` or `ENTITY_VILLAGER_NO`.
- **Blank name** means silence. Useful for `NONE` + a sound, or a message with no sound at all.
- **`Volume`** above 1.0 does not get louder — it makes the sound audible from further away.
- **`Pitch`** runs 0.5 to 2.0.

An unknown sound name is ignored rather than throwing, so a typo costs you the sound and nothing else.

## The prefix

```yaml
prefix: "<gray>[<gradient:#C21807:#F11800>Oberon</gradient><gray>] "
```

`<prefix>` expands to it inside any message. It is added automatically in **chat** but **not** on
the action bar — the bar is one short line, and a tag on every one of them eats the room the message
itself needs.

## Colours

MiniMessage throughout.

```yaml
warp:
  teleported: "<#A7A7A7>You teleported to <#C21807><warp>"
```

For a gradient, one tag rather than a hex code per character:

```yaml
nightvision:
  enabled: "<gradient:#C21807:#F11800><b>Night Vision</b></gradient> <dark_gray>» <green>Enabled"
```

Useful tags: `<red>`, `<gray>`, `<#RRGGBB>`, `<gradient:#A:#B>`, `<b>`, `<i>`, `<u>`,
`<rainbow>`, `<hover:show_text:'...'>`, `<click:run_command:'/warp hub'>`.

## Placeholders

| Token | Expands to |
|---|---|
| `<prefix>` | The prefix above |
| `<player>` | The command sender |
| `<target>` | The other player |
| `<time>` | A duration or countdown value |
| `<warp>` | The warp's display name |
| `<spawn>` | The spawn display name |
| `<ping>` | Latency in ms |
| `<dots>` | A run of dots that grows as a countdown runs down |
| `<usage>` | The command's usage line |

Not every token is available in every message — one that has no value is left as-is rather than
blanked, which makes a typo obvious in game.

## Applying changes

```
/oberonutils reload
```
