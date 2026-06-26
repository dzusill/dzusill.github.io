---
title: "Sounds"
description: "dRotatingShop plays a sound for each GUI interaction, purchase, error and warning. They're all configurable in the sounds section of config.yml, and reload…"
---

dRotatingShop plays a sound for each GUI interaction, purchase, error and warning. They're all configurable in the `sounds` section of [config.yml](/plugins/drotatingshop/configuration/config/), and reload with `/dshop reload`.

```yaml
sounds:
  enabled: true
  open:        { sound: "block.chest.open",             volume: 0.6, pitch: 1.2 }
  click:       { sound: "ui.button.click",              volume: 0.5, pitch: 1.0 }
  purchase:    { sound: "entity.experience_orb.pickup", volume: 0.8, pitch: 1.0 }
  fail-money:  { sound: "block.note_block.bass",         volume: 0.7, pitch: 0.7 }
  fail-stock:  { sound: "block.note_block.bass",         volume: 0.7, pitch: 0.6 }
  fail-limit:  { sound: "block.note_block.bass",         volume: 0.7, pitch: 0.8 }
  warning:     { sound: "block.note_block.pling",        volume: 0.7, pitch: 0.5 }
  error:       { sound: "entity.villager.no",            volume: 0.8, pitch: 1.0 }
```

## Events

| Event | Plays when |
|---|---|
| `open` | A player clicks an item and the [buy menu](/plugins/drotatingshop/features/the-buy-menu/) opens. |
| `click` | A `+/-` stepper or the back button is clicked. |
| `purchase` | A purchase succeeds. |
| `fail-money` | Not enough money for the total. |
| `fail-stock` | The item is sold out. |
| `fail-limit` | The per-rotation purchase limit is reached. |
| `warning` | Inventory was full and items dropped at the player's feet. |
| `error` | The economy is unavailable. |

## Fields

| Field | Description |
|---|---|
| `enabled` | Master toggle. `false` silences **every** sound. |
| `sound` | Any Minecraft sound key (e.g. `ui.button.click`). Leave it **blank** (`""`) to mute just that one event. |
| `volume` | `0.0`–`1.0+`. Also affects how far the sound carries. |
| `pitch` | `0.5`–`2.0`. Higher = higher-pitched. |

Browse sound keys on the [Minecraft Wiki](https://minecraft.wiki/w/Sounds.json) (drop the `minecraft:` namespace — e.g. `entity.experience_orb.pickup`).

> Sounds play only to the buying player, at their location.
