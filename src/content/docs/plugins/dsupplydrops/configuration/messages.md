---
title: "messages.yml"
description: "Every line of player-facing text. Nothing the plugin says is written in code."
---

Every line of player-facing text. Nothing the plugin says is written in code.

## Format

MiniMessage: `<gray>`, `<#C21807>`, `<bold>`, `<gradient:#C21807:#F11800>`. Legacy `&` codes and bare
hex also work, and can be mixed in one line.

`<prefix>` expands to the prefix at the top of the file. Placeholders work as either `%name%` or
`{name}`; the tokens each message understands are listed in a comment above it.

## Sections

| Section | Covers |
|---|---|
| top-level keys | The framework's own replies: no permission, invalid usage, reload results |
| `drop.*` | The event itself — inbound, landed, unlocked, first open, emptied, expired, locked, protected |
| `title.*` | On-screen titles and subtitles for the three announcements |
| `action-bar.*` | Action-bar lines, when `notifications.action-bar` is on |
| `bossbar.locked` | The countdown bar's text |
| `hologram.locked` / `hologram.open` | The floating text above the crate, as a list of lines |
| `command.*` | Every command reply |

## The `-located` variants

Three messages have a pair:

```yaml
drop:
  inbound: "..."
  inbound-located: "... at {x}, {z} in {world} ..."
```

The `-located` version is used when `notifications.reveal-coordinates` is on. Turning coordinates off
switches to the plain one — so a server running a hidden hunt does not need to rewrite the text, and
cannot accidentally leak the position through a message it forgot to edit.

## Common tokens

| Token | Where |
|---|---|
| `{tier}` | Everywhere — the tier's `display-name`, already coloured |
| `{tier_colour}` | The tier's `colour` as an opening tag, e.g. `<#F11800>` |
| `{tier_name}` | The tier's name with all formatting stripped |
| `{time}` | Formatted countdown, e.g. `2m 30s` |
| `{seconds}` | The same as a bare number |
| `{world}`, `{x}`, `{y}`, `{z}` | The crate's position |
| `{player}` | The first player to open the crate |

## Carrying the tier's colour into the sentence

Put `{tier_colour}` after `{tier}` and the tier's colour continues into the words that follow, until
the next colour tag takes over:

```yaml
inbound: "<prefix><white>A {tier}{tier_colour} supply drop is inbound — impact in <#00F986>{seconds}s."
```

`Stellar` renders in its gradient, then **supply drop is inbound** continues in the tier's solid
colour, and `{seconds}` switches to green.

**Why `{tier}` alone cannot do this.** A `display-name` written as a gradient closes its own tag:

```yaml
display-name: "<gradient:#22D3EE:#1FBED6>Stellar</gradient>"
```

The styling stops dead at the last letter of the name, so anything after it falls back to plain. An
unclosed name like `<#AAAAAA><bold>Common` *would* bleed on its own — which is exactly why this used
to look inconsistent between tiers. `{tier_colour}` makes it the same either way.

It uses the tier's solid `colour` rather than re-opening the gradient, deliberately: a gradient
stretched across a whole sentence reads worse than one on the name alone.

### Titles

The same token colours the on-screen headline, so a legendary drop reads differently from a common
one at a glance:

```yaml
title:
  inbound: "{tier_colour}<bold>SUPPLY DROP"
```

Swap it for a fixed tag like `<#C21807>` to go back to one brand colour for every tier.

## Unknown placeholders are reported

A placeholder a message never receives is not an error — it reaches the player as the literal text
`{distance}`. So every template is checked against what its message actually supplies, and anything
unknown is named on startup:

```
[WARN] messages.yml: drop.landed uses {distance}, which nothing fills in for that message —
       it will reach players as literal text. Available here: time, z, y, x, tier, tier_name,
       seconds, world, tier_colour
```

`{distance}` is the usual one: it is real, but only for `action-bar.nearby-locked`,
`action-bar.nearby-open` and `command.locate` — the three messages that have both a crate and a
player to measure between.

The message still sends. This only reports, in case the token is deliberate.

## Hologram lines

`hologram.locked` and `hologram.open` are **lists**. Each entry is one line of the floating label, and
the plugin swaps between the two lists when the crate unlocks.

Keep them short. A hologram is read at a glance from thirty blocks away, usually while running.

## Silencing something

Set a message to an empty string to hide it. An empty title and subtitle together skip the title
entirely rather than flashing a blank one.
