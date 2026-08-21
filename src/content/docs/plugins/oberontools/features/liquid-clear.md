---
title: "Liquid Clear"
description: "behavior: LIQUIDCLEAR builds a sponge in bucket form. Right-click a liquid and a bounded cube around it drains, nearest block first, over as many ticks as…"
---

`behavior: LIQUID_CLEAR` builds a sponge in bucket form. Right-click a liquid and a bounded cube around it drains, nearest block first, over as many ticks as the budget needs.

```yaml
    liquid-clear:
      radius: 1
      max-radius: 3
      max-blocks: 0
      clear-waterlogged-blocks: true
      materials: [WATER, LAVA]
      sound: item.bucket.empty
      volume: 0.9
      pitch: 1.0
```

| Key | Default | |
|---|---|---|
| `radius` | `1` | The cube everyone gets. `1` is 3×3×3. Range 0–8. |
| `max-radius` | same as `radius` | Ceiling a permission may raise `radius` to. Must be ≥ `radius` and ≤ 8. |
| `max-blocks` | `0` | Hard cap per use. `0` derives it from the effective radius. Range 0, or 1–4913. |
| `clear-waterlogged-blocks` | `true` | Also un-waterlog stairs, slabs, fences and the like inside the cube. |
| `materials` | *required* | Liquid materials to remove. Must not be empty. |
| `sound` | `item.bucket.empty` | Played to the user on activation. Empty plays nothing. |
| `volume` | `0.9` | Must not be negative. |
| `pitch` | `1.0` | Must be between 0.5 and 2.0. |

`radius`, `max-radius` and `max-blocks` are covered in full in [Radius Tiers](/plugins/oberontools/features/radius-tiers/).

> **`sound` is a resource key, not a Bukkit constant.** The value is passed to the client as written — lower-cased and trimmed, but not translated. Use `item.bucket.empty`, not `ITEM_BUCKET_EMPTY`. A name the client does not know plays nothing, silently. (This differs from OberonAnnounce, which does resolve constant names.)

## What happens on right-click

1. The player right-clicks a block with the tool in **either** hand.
2. The interaction is cancelled immediately, before anything else is checked. This is what stops vanilla from filling the tool into a plain `WATER_BUCKET`.
3. Off-hand clicks stop there. Only the main hand activates the ability.
4. The centre is the clicked block if it is a configured liquid; otherwise the plugin ray-traces up to **6 blocks** through fluids to find one.
5. Access is checked: the definition must be enabled, the player must hold `use-permission`, the world must be allowed, and the item must not have expired.
6. The cube is planned, submitted to the queue, one use is spent, and the sound plays.

If nothing in range matches, `tool.liquid-none` is sent and no use is spent.

## Planning the cube

Every offset inside the cube is generated, sorted by squared distance from the centre, and walked in that order until the block cap is reached:

- Blocks in **unloaded chunks are skipped**, never loaded.
- Only blocks that match `materials`, or waterlogged blocks when `clear-waterlogged-blocks` is on, are queued.
- Sorting nearest-first means a cap that bites removes the blocks closest to the click, which is what a player expects.

## Applying it

Each queued block is handled one at a time, one per slot of the tick budget:

- A block whose type is in `materials` is set to air with no physics update, so a large drain does not trigger a cascade of neighbour updates as it goes.
- A waterlogged block has its `waterlogged` flag cleared instead of being destroyed. Stairs stay stairs.
- A block that changed since planning — somebody else broke it, or lava flowed in — is simply skipped.

Each one first fires a `BlockBreakEvent` (unless `processing.fire-protection-events` is off), so a region plugin can veto individual blocks. See [The Job Queue](/plugins/oberontools/features/job-queue/#protection-events).

When the queue drains, the user is told how many blocks actually changed:

```
Cleared 84 liquid blocks.
```

That number is the count of blocks that really changed, not the number planned — blocks a protection plugin refused are not counted.

## It can never become a real bucket

Three separate guards keep the tool from turning into a filled vanilla bucket, which would be a duplication route in its own right (fill it, drop the liquid somewhere else, keep the tool):

1. `PlayerInteractEvent` is cancelled for the tool **before** the hand check, so an off-hand click cannot fall through to vanilla.
2. `PlayerBucketFillEvent` is cancelled while a liquid tool is in either hand.
3. `PlayerBucketEmptyEvent` is cancelled the same way, so a tool that slipped through an older build cannot place liquid either.

The bucket-event guards check the player's hands rather than the event's item, because the event reports the *resulting* stack — which carries none of the tool's persistent data and could never be recognised.

## Tuning it

**A utility bucket for staff:**

```yaml
    liquid-clear:
      radius: 3
      max-radius: 3
      max-blocks: 0
      materials: [WATER, LAVA]
```

**A cheap consumable for survival players, capped by work rather than reach:**

```yaml
    liquid-clear:
      radius: 2
      max-radius: 2
      max-blocks: 60        # 5x5x5 reach, but never more than 60 blocks of work
      clear-waterlogged-blocks: false
      materials: [WATER]
```

**Lava only, for a nether build server:**

```yaml
    liquid-clear:
      radius: 1
      max-radius: 2
      materials: [LAVA]
      sound: block.lava.extinguish
```
