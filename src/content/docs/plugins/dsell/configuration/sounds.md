---
title: "Sounds"
description: "sounds.yml maps a name to a sound, a volume and a pitch. The GUI files refer to sounds by name"
---

`sounds.yml` maps a **name** to a sound, a volume and a pitch. The GUI files refer to sounds by name
(`sound: click`), so you can restyle audio without touching them.

```yaml
enabled: true

sounds:
  click:
    sound: ui.button.click
    volume: 0.6
    pitch: 1.4
  sell:
    sound: entity.experience_orb.pickup
    volume: 0.7
    pitch: 1.2
```

| Name | Played when |
|---|---|
| `click` | any GUI button |
| `open` | a menu opens |
| `xp` | the sell GUI closes with a successful sale |
| `sell` | any successful sale |
| `rank_up` | a category tier is unlocked |
| `error` | nothing sellable, a blacklisted world, an expired axe |
| `category_click` | a category is clicked on the multiplier page |

## Sound names

Plain resource keys, not the Bukkit `Sound` enum — so `entity.player.levelup`, not `ENTITY_PLAYER_LEVELUP`.
Any sound the server knows works, **including resource-pack sounds**:

```yaml
  rank_up:
    sound: myserver.fanfare
    volume: 1.0
    pitch: 1.0
```

## Silencing one event

Leave its `sound` blank:

```yaml
  error:
    sound: ""
```

Nothing plays, and nothing else changes.

## Silencing everything

```yaml
enabled: false
```

## Adding your own

Any GUI icon can name a sound, including your own decorative ones. Add the entry here and reference it:

```yaml
# sounds.yml
sounds:
  my_sound:
    sound: block.note_block.pling
    volume: 1.0
    pitch: 2.0
```

```yaml
# gui/worth.yml
items:
  refresh:
    sound: my_sound
```

Changes take effect on `/dsell reload` — the sound table is read live rather than cached at startup.
