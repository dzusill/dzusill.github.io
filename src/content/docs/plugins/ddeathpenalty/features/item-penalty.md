---
title: "Item Penalty"
description: "Decide what happens to a player's inventory when they die."
---

Decide what happens to a player's inventory when they die.

```yaml
items:
  mode: VANILLA
  random-count: 1
```

| `mode` | Effect |
|---|---|
| `VANILLA` | Normal Minecraft drops — the whole inventory drops at the death spot. |
| `KEEP` | Keep the full inventory — nothing drops (like keep-inventory). |
| `CLEAR` | Destroy everything — the inventory is wiped, nothing drops. |
| `RANDOM_DROP` | Keep the inventory but **drop** `random-count` random stacks. |
| `RANDOM_DELETE` | Keep the inventory but **destroy** `random-count` random stacks. |

| Key | Default | Description |
|---|---|---|
| `mode` | `VANILLA` | One of the modes above. |
| `random-count` | `1` | How many random stacks the `RANDOM_*` modes affect. |

## Choosing a mode

- **Hardcore / factions:** `VANILLA` (full drop) or `CLEAR` (total loss).
- **Soft penalty:** `KEEP` (inventory safe — money/XP does the punishing) or `RANDOM_DELETE` (lose a couple of stacks).
- **Risk-on-death without total wipe:** `RANDOM_DROP` makes a few stacks drop for others to grab.

### Example

```yaml
# keep gear, but lose 2 random stacks to the ground
items:
  mode: RANDOM_DROP
  random-count: 2
```

> The item mode combines with every other penalty — e.g. `KEEP` items while still taking [money](/plugins/ddeathpenalty/features/money-penalty/) and [XP](/plugins/ddeathpenalty/features/xp-penalty/).
