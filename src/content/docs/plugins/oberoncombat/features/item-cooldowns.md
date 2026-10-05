---
title: "Item cooldowns"
description: "Moved here from OberonUtils. Any item can have a cooldown, applied only while tagged or always."
---

Moved here from OberonUtils. Any item can have a cooldown, applied only while tagged or always.

```yaml
item-cooldowns:
  only-when-tagged: true
  items:
    ender_pearl: 3s
    wind_charge: 1s
  trident:
    on-throw: true
    on-riptide: true
```

- **`only-when-tagged: true`**: the cooldown applies only while the player is in combat. `false`: always.
- **`items`**: material names and durations.
- Ender pearls and wind charges start their cooldown on the **real throw**, never on the click, so a click that did not
  throw (a wall, a full cooldown) costs nothing. The cooldown is raised above the one vanilla stamps, never skipped
  because one is already running.
- **`trident`**: `on-throw` and `on-riptide` apply a cooldown to the trident when it is thrown or used for riptide.
- The message `cooldown-item` (`%item%`, `%time%`) is shown on the action bar.
- Excluded places (`item-cooldowns`) switch them off.

While OberonCombat is installed, OberonUtils' whole `combat:` section is ignored. Copy its `combat.cooldowns` into
`item-cooldowns.items`.
