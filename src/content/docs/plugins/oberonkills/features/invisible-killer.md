---
title: "Invisible Killers"
description: "Kill somebody while invisible and the death message does not say who did it — except to staff."
---

Kill somebody while invisible and the server does not announce who did it. `<killer>` shows a stand-in instead —
scrambled text, a word, a fake name — and the victim is named as usual.

```
Steve was slain by ▒▒▒▒▒▒▒▒ with Netherite Sword
```

On by default.

## Setup

```yaml
Invisible-Killer:
  Enabled: true
  Invisibility: true      # the potion, or invisibility another plugin set
  Vanished: false         # count vanished staff too (PremiumVanish / SuperVanish)
  Name:                   # one line, or a list to pick from at random
    - "&k????????"
  Staff-Name: "<hidden> <gray>(<real>)</gray>"
  Staff-Permission: "oberonkills.seehidden"
  Hide-Item: false
```

| Key | Default | Does |
|---|---|---|
| `Enabled` | `true` | The whole feature. |
| `Invisibility` | `true` | An invisible killer is concealed — the potion, or the invisible flag another plugin set. |
| `Vanished` | `false` | A vanished killer is concealed too. Read from the `vanished` metadata PremiumVanish and SuperVanish set; neither needs to be installed. |
| `Name` | `&k????????` | What everybody sees instead of the killer's name. One line, or a list — one is picked per death. `&` codes and MiniMessage both work. |
| `Staff-Name` | `<hidden> <gray>(<real>)</gray>` | What staff see. `<hidden>` is the stand-in the death went out with, `<real>` the real name. |
| `Staff-Permission` | `oberonkills.seehidden` | Who counts as staff. Point it at a node your staff already hold if you like. |
| `Hide-Item` | `false` | Leave the weapon out of the message too. |

## Some stand-ins

```yaml
Name:
  - "&k????????"                          # scrambled, eight characters
```

```yaml
Name:
  - "Someone"                             # a plain word
```

```yaml
Name:                                     # a list of fake names, one per death
  - "A Ghost"
  - "The Shadow"
  - "Nobody"
```

## Why never the real name, even under `&k`

`&k` over the real name *looks* hidden, but it only scrambles how the name is drawn. The name itself still reaches
every client as text — the client's own chat log stores it, any mod can read it, and a Discord bridge posts it in plain
text. The scrambled characters also keep its length, which on a small server is often enough to guess.

So `Name` holds whatever you write, and the real name is never in the line players get. There is no placeholder for it
there on purpose.

## Staff see who it was

Holders of `Staff-Permission` get `Staff-Name` in place of the stand-in:

```
Steve was slain by ▒▒▒▒▒▒▒▒ (Alex) with Netherite Sword
```

The console gets the same line, so the log still says who it was. Set `Staff-Name: "<hidden>"` to tell staff no more
than anybody else.

`<killer_rank>` is empty in the line players get, because a rank holds the name and a prefix alone can give it away.
Staff see the real rank.

## When a kill counts as hidden

If the killer was invisible **when the blow landed** or **when the victim died**. Drinking milk between the shot and the
death does not give the name back, and turning invisible right after does not reveal it either.

A [combat log](/plugins/oberonkills/features/weapons/#combat-logging) whose enemy is invisible is concealed the same way.

## The weapon stays

The item is still named — a player who does not want to be known by their sword can rename it in an anvil, or name it
after somebody else's. `Hide-Item: true` leaves it out anyway.

## What changes for these kills only

The server can only broadcast one line, and staff are to be told more than players are, so a concealed kill is sent
to each player separately. For these kills — and only these:

- a **Discord bridge** (DiscordSRV and the like) gets nothing, since it reads the broadcast;
- the **victim's death screen** shows no message.

The message is sent last, after every other plugin has had its say: a death another plugin cancelled is not
announced, a message another plugin replaced stays theirs, and the `showDeathMessages` game rule is honoured.

If no message is configured for the death at all, it is silent rather than vanilla — the vanilla line names the
killer.

## Checking it

```
/oberonkills preview pvp sword hidden
```

Shows both versions: what everybody sees, then what staff see. No potion needed.
