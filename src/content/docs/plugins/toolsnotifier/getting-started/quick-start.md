---
title: "Quick Start"
description: "Take a tool, damage it past the warn threshold (90% for tools by default), and you'll get a Warn notification. Keep using it past 10% and it escalates to…"
---

## 1. See it work

Take a tool, damage it past the warn threshold (90% for tools by default), and you'll get a **Warn** notification. Keep using it past 10% and it escalates to **Critical**.

## 2. Check your gear

```
/tn status
```

Lists every damageable item you're carrying with its remaining durability and a colour for its level (green = fine, yellow = warn, red = critical).

## 3. Mute yourself (optional)

```
/tn toggle
```

Turns your own notifications off (and on again). Your choice is remembered.

## 4. Tune thresholds

In [config.yml](/plugins/toolsnotifier/configuration/config/), set when each category warns:

```yaml
Settings:
  Categories:
    Tools:  { Enabled: true, Percentage: 90, CriticalPercentage: 10 }
    Armor:  { Enabled: true, Percentage: 50, CriticalPercentage: 10 }
    Elytra: { Enabled: true, Percentage: 20, CriticalPercentage: 5 }
```

Want a special rule for one item? Use an [override](/plugins/toolsnotifier/features/thresholds-and-categories/):

```yaml
Settings:
  ItemOverrides:
    DIAMOND_PICKAXE: { Enabled: true, Percentage: 50 }
    ELYTRA:          { Enabled: false }
```

Apply with `/tn reload`.

## 5. PRO extras

On the PRO edition:

```
/tn settings    # players pick which channels they receive
/tn admin       # staff inspect any online player's gear
```

Plus a periodic [inventory scan](/plugins/toolsnotifier/features/inventory-scan/) that warns about low items even when they're not in your hand.
