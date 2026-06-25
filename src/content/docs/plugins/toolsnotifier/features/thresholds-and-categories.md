---
title: "Thresholds & Categories"
description: "How low is \"low\"? ToolsNotifier resolves the threshold for each item with a three-tier lookup — the most specific match wins."
---

How low is "low"? ToolsNotifier resolves the threshold for each item with a **three-tier lookup** — the most specific match wins.

```
ItemOverrides.<MATERIAL>   ▸  beats
Categories.<CATEGORY>      ▸  beats
NotifyIfBelowPercentage    (global fallback)
```

## The global fallback

```yaml
Settings:
  NotifyIfBelowPercentage: 90    # warn at or below 90%
  CriticalIfBelowPercentage: 10  # critical at or below 10%
```

Used when neither an override nor a category applies.

## Categories

Every damageable item falls into exactly one category:

| Category | Matches |
|---|---|
| **Elytra** | The elytra (exact). |
| **Armor** | Helmets, chestplates, leggings, boots. |
| **Tools** | Everything else damageable (swords, pickaxes, bows, shears, flint & steel, fishing rods, …). |

```yaml
Settings:
  Categories:
    Tools:  { Enabled: true, Percentage: 90, CriticalPercentage: 10 }
    Armor:  { Enabled: true, Percentage: 50, CriticalPercentage: 10 }
    Elytra: { Enabled: true, Percentage: 20, CriticalPercentage: 5 }
```

| Key | Meaning |
|---|---|
| `Enabled` | `false` silences the whole category. |
| `Percentage` | Warn at or below this %. |
| `CriticalPercentage` | Escalate to Critical at or below this %. |

## Per-item overrides

Need a different rule for one material? `ItemOverrides` beats the category:

```yaml
Settings:
  ItemOverrides:
    DIAMOND_PICKAXE:
      Enabled: true
      Percentage: 50      # diamond pickaxes warn at 50% instead of the Tools 90%
    ELYTRA:
      Enabled: false      # never notify about elytra
```

| Key | Meaning |
|---|---|
| `Enabled` | `false` disables notifications for that exact item. |
| `Percentage` / `CriticalPercentage` | Custom thresholds; omit either to inherit the category/global value. |

Keys are uppercase [Bukkit Material](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html) names.

## Worked example

With the defaults above, a `DIAMOND_PICKAXE` uses its **override** (warn ≤ 50%), a `NETHERITE_HELMET` uses the **Armor** category (warn ≤ 50%), and a `FISHING_ROD` (no override, Tools category) warns ≤ 90%.
