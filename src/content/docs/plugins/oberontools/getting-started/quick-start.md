---
title: "Quick Start"
description: "Ten minutes from install to a donator-tier bucket."
---

Ten minutes from install to a donator-tier bucket.

## 1. See what shipped

```
/oberontools list
```

```
Configured tools
 • sponge_bucket [liquid_clear] — enabled
 • lumber_axe [timber] — enabled
```

Those two ids are what every command, permission node and recipe key refers to.

## 2. Hand one out and look at it

```
/oberontools give Steve sponge_bucket
/oberontools inspect
```

```
sponge_bucket
 • instance: 5f1c…-…-…
 • uses: 250/250
 • expires: 2026-08-27 14:03
 • remaining: 6d 23h 59m 58s
 • status: Active
 • radius: 3x3x3 (27 blocks max)
```

`instance` is the per-item id used by the [anti-duplication lock](/plugins/oberontools/features/anti-duplication/). `expires` was stamped onto **this item** when it was created — see [Expiry](/plugins/oberontools/features/expiry/).

## 3. Use them

- **sponge_bucket** — right-click a water or lava block. Everything liquid inside the cube around it drains, nearest block first.
- **lumber_axe** — break one natural log. The connected tree and its leaves come down over the next few ticks.

## 4. Give a donator rank a bigger bucket

The shipped `sponge_bucket` has `radius: 1` and `max-radius: 3`, so tiers 2 and 3 exist and are registered with the server. Grant one:

```
lp group donator permission set oberontools.radius.sponge_bucket.2 true
```

That group's 3×3×3 becomes 5×5×5 (125 blocks). Nobody else is affected, and no second item is needed. Full rules in [Radius Tiers](/plugins/oberontools/features/radius-tiers/).

## 5. Make your own tool

Copy an existing block under `tools:`, rename the key, change the item:

```yaml
tools:
  drainer:
    enabled: true
    behavior: LIQUID_CLEAR
    use-permission: oberontools.use
    craft-permission: oberontools.craft
    worlds:
      whitelist: []
      blacklist: [ "spawn" ]
    item:
      material: BUCKET
      name: "<blue>Drainer</blue>"
      lore:
        - "<gray>Right-click a liquid.</gray>"
        - "<dark_gray>Uses: <white>%uses%</white>/<white>%max_uses%</white></dark_gray>"
      max-uses: 50
      expires-after: 12h
      expired-policy: REMOVE
    recipe:
      enabled: false
    liquid-clear:
      radius: 1
      max-radius: 1
      max-blocks: 0
      materials: [ WATER ]
      sound: item.bucket.empty
```

```
/oberontools reload
/oberontools give Steve drainer
```

A reload that fails validation changes nothing — the old tools and recipes stay live and the error is printed. Every key is listed in [Defining a Tool](/plugins/oberontools/features/defining-a-tool/).

## 6. Check the tick budget

The shipped budget is 96 block attempts per tick, shared by **every** job on the server:

```yaml
processing:
  max-block-attempts-per-tick: 96
  max-active-jobs-per-player: 1
```

Leave it alone unless you have measured a reason. Raising it makes big jobs finish sooner *and* makes the worst tick worse. See [The Job Queue](/plugins/oberontools/features/job-queue/).

Next: [Defining a Tool](/plugins/oberontools/features/defining-a-tool/).
