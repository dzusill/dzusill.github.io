---
title: "How Notifications Work"
description: "ToolsNotifier watches the items a player uses and fires a notification when durability drops low enough."
---

ToolsNotifier watches the items a player uses and fires a notification when durability drops low enough.

## The flow

```
Bukkit event → listener → "should notify?" → send notification
```

Every way an item loses durability is covered by a listener: breaking blocks, melee attacks, taking armor damage, fire/burning, fishing, flint & steel, shearing, shooting a bow and elytra flight. When one fires, ToolsNotifier:

1. **Skips** Creative-mode players, empty hands and non-damageable items.
2. Resolves the item's **enabled flag and threshold** (see [Thresholds & Categories](/plugins/toolsnotifier/features/thresholds-and-categories/)).
3. If the item is at or below the threshold, sends the notification through the configured [channels](/plugins/toolsnotifier/features/notification-channels/).

## Two levels

| Level | When | Default threshold |
|---|---|---|
| **Warn** | Durability ≤ the warn percentage | category-dependent |
| **Critical** | Durability ≤ the critical percentage | Tools/Armor 10%, Elytra 5% |

Critical uses its own, louder message set and sound. The critical percentage must be **lower** than the warn percentage.

## Unbreaking awareness

```yaml
Settings:
  UnbreakingAware: true
```

When on, the remaining durability is multiplied by `(Unbreaking level + 1)` before being compared to the threshold. An Unbreaking III tool effectively lasts ~4× longer, so without this it would warn far too early. Leave it on unless you want notifications based on the raw durability bar.

## Cooldown

```yaml
Settings:
  NotifyDelayInSeconds: 3
```

After a notification, a player won't get another for `NotifyDelayInSeconds`. The cooldown is **global per player** (across all items and channels), so rapid actions don't spam them.

## Ignoring items

```yaml
IgnoreItems:
  - NETHERITE_SWORD
```

Any material listed under `IgnoreItems` is never notified about, regardless of category or override.
