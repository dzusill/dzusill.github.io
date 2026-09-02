---
title: "Tiers"
description: "Every item in the pool belongs to a tier. The tier decides how often that item shows up, how many of it get"
---

Every item in the pool belongs to a **tier**. The tier decides how often that item shows up, how many of it get
listed, how far its price may drift, and how likely it is to arrive enchanted.

Tiers live in [tiers.yml](/plugins/dauctionfeed/configuration/tiers/).

## The shipped ladder

| Tier | Weight | Price multiplier | Amount | Snap | Enchant chance |
|---|---|---|---|---|---|
| Common | 40 | 0.85 – 1.15× | 16 – 64 | 16 | — |
| Uncommon | 27 | 0.85 – 1.20× | 8 – 48 | 8 | 10% |
| Rare | 18 | 0.90 – 1.40× | 4 – 32 | 4 | 30% |
| Epic | 10 | 0.95 – 1.70× | 2 – 16 | 2 | 55% |
| Legendary | 5 | 1.00 – 2.00× | 1 – 8 | 1 | 85% |

Tier names are free-form. Add, rename or delete them as you like — just keep `items.yml` pointing at tiers that
exist. An item naming a tier that no longer does is re-homed onto `fallback-tier` rather than dropped, so renaming
a tier degrades the pool's shape instead of silently deleting a slice of it.

## How one listing is rolled

1. **Pick a tier** — weighted by `weight`. Weights are relative; they do not have to add up to anything.
2. **Pick an item** — at random from that tier's items in `items.yml`, weighted by each item's own `weight`.
3. **Pick an amount** — random inside `amount.min`–`amount.max`, then snapped.
4. **Roll enchantments** — if the tier's `enchant.chance` fires and the item can hold any.
5. **Price it** — see [How a Price Is Built](/plugins/dauctionfeed/features/pricing/).

## Weights

```yaml
legendary:
  weight: 5
```

Relative chance of the tier being picked. `weight: 0` switches a tier off without deleting it, which is the clean
way to retire one temporarily.

{% hint style="info" %}
If **every** tier has a weight of zero, nothing can be rolled and a restock refuses with
`no tier in tiers.yml has a weight above zero`. That is deliberate — silently favouring whichever tier happens to
be first would be worse.
{% endhint %}

## Amounts and snapping

```yaml
amount:
  min: 16
  max: 64
  snap-to: 16
```

`snap-to` is why a listing reads **32x Diamond** rather than 37x Diamond. The rolled amount is rounded to the
nearest multiple, then clamped back inside `min`–`max`, so a snap can never push an amount past the bounds you
configured. Set `snap-to: 1` to allow any amount.

Two things override the tier's amount:

- **Enchanted gear is always listed singly.** Enchanted items do not stack.
- **The item's own stack size is the real ceiling.** A potion or a tool in a 16–64 tier is still listed one at a
  time, because a listing is one `ItemStack`.

## Price multipliers

```yaml
price-multiplier:
  min: 0.90
  max: 1.40
```

Rolled per listing and applied to the item's unit price from the pool. Higher tiers deliberately get a wider band:
a legendary item that sometimes lands at 2× is what makes finding a good one feel like something.

Whatever this rolls, the [price floor](/plugins/dauctionfeed/features/price-floor/) still applies over the top.

## Enchantment rolls

```yaml
epic:
  enchant:
    chance: 0.55
    count: { min: 2, max: 3 }
    level-percent: { min: 0.7, max: 1.0 }
```

- `chance` — probability from 0 to 1 that an **enchantable** item is enchanted at all. A stack of diamonds in the
  legendary tier stays a stack of diamonds.
- `count` — how many enchantments to apply. Drawn without replacement and checked against everything already
  picked, so a roll never produces a Silk Touch *and* Fortune pickaxe.
- `level-percent` — a fraction of **each enchantment's own maximum level**, so one setting works across all of
  them: `1.0` gives Sharpness V and Mending I. Always rounds up to at least level 1.

Which enchantments may be rolled at all, and the price bonus for them, are global — see
[tiers.yml](/plugins/dauctionfeed/configuration/tiers/#enchantments).

## The fallback tier

```yaml
fallback-tier: common
```

Where an item lands when its `tier` names something that no longer exists. If the named fallback is missing too,
the first configured tier is used, so a typo here cannot leave the plugin with no way to price an item.

## Seeing the effect

```
/auctionfeed reload
/auctionfeed preview 20
```

The preview prints each listing's tier, so you can watch a weight change move the mix.
