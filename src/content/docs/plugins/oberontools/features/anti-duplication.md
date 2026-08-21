---
title: "Anti-Duplication"
description: "A tool ability that runs over several ticks has an obvious exploit: start the job, then get the item out of your inventory while the blocks keep breaking.…"
---

A tool ability that runs over several ticks has an obvious exploit: start the job, then get the item out of your inventory while the blocks keep breaking. The job carries on producing drops, and the tool is somewhere it can be traded, dropped or stashed.

OberonTools closes that by **freezing the exact item instance that is paying for the job** until the job drains.

## Instance ids

Every tool item gets a random UUID written into its persistent data when it is created, alongside its `tool_id` and its remaining uses. Two identical-looking buckets have different instance ids.

Locks are keyed by **owner plus instance id**, so a player holding three sponge buckets has only the one that is actually working frozen. The other two behave normally.

`/oberontools inspect` prints it:

```
 • instance: 5f1c…-…-…
```

## What is blocked while a job runs

| Action | Handler |
|---|---|
| Dropping it (`Q`, or from the inventory screen) | `PlayerDropItemEvent` |
| Clicking it in any inventory | `InventoryClickEvent` — the clicked slot |
| Moving it with a cursor that already holds it | `InventoryClickEvent` — the cursor |
| Number-key swapping it into or out of a hotbar slot | `InventoryClickEvent` — the hotbar target slot |
| Dragging it across slots | `InventoryDragEvent` |
| Swapping it to the off hand (`F`) | `PlayerSwapHandItemsEvent` |

Each one is cancelled and the player is told:

```
That tool is still working; wait for it to finish.
```

That message (`tool.locked`) is categorised as `TOGGLE`, which the shipped `Presentation` block routes to the **action bar** — a rapid burst of inventory clicks would otherwise fill chat.

All six handlers run at `LOWEST` priority with `ignoreCancelled = true`, so they decide before any inventory-management plugin gets involved.

## What cancels a job outright

Three events drop every queued job the player owns and release their locks:

| Event | Why |
|---|---|
| Death | The remaining drops would land at a body that is no longer there, and the tool may have been dropped by the death itself. |
| Quit | Nobody is left to charge, and the queue skips offline owners anyway. |
| World change | The remaining blocks are in a world the owner has left. |

After any of these the tool is unfrozen and usable again immediately. Work already done stays done; work not yet done is abandoned.

## Overlapping jobs cannot double-drop

Separately from the item lock, the queue **claims** every block a job intends to touch. A second job — the same player's next click, or another player's — silently skips blocks that are already claimed, and a claim is released the moment its block is processed.

So two players draining overlapping pools cannot both be paid for the same water block, and a job whose entire plan is already claimed is rejected as empty rather than queued to do nothing.

Every block operation also re-checks the world state before it acts. A log that is no longer that log, or a liquid that is no longer liquid, is skipped instead of being broken again.

## One job at a time

```yaml
processing:
  max-active-jobs-per-player: 1
```

The shipped value is `1`: a player must let a fell finish before starting another. Attempting a second one is refused with `tool.busy` and **costs no use**.

Raising it lets a player stack jobs. It does not make anything faster — the tick budget is shared server-wide either way — and it widens the window during which multiple instances are frozen. The valid range is 1–8; there is rarely a reason to move it off 1.

## What is deliberately not protected

- **Dying with the tool.** The job is cancelled, and the item follows your server's normal death rules. OberonTools does not keep it for you.
- **Giving the tool away between jobs.** Tools are ordinary items when idle. If you do not want them traded, that is a job for a soulbound plugin, not this one.
- **A tool that is disabled or expired mid-job.** The job was authorised when it was submitted and finishes on those terms. The next activation is refused.
