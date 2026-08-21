---
title: "Reloading"
description: "Requires oberontools.admin. In one pass it:"
---

```
/oberontools reload
```

Requires `oberontools.admin`. In one pass it:

1. re-reads `config.yml` and validates the **whole** candidate,
2. rebuilds and re-registers every recipe,
3. swaps in the new tool definitions,
4. applies the new `processing` settings to the job queue and the protection service,
5. restarts the expiry countdown task with the new interval and scope,
6. re-publishes the [radius permission nodes](/plugins/oberontools/features/radius-tiers/#they-tab-complete),
7. re-reads `messages.yml` and the `Presentation` block.

```
Reloaded 2 custom tools and recipes.
```

## A failed reload changes nothing

Validation happens before anything is replaced. If the candidate is bad, the live configuration is untouched:

```
Reload refused; active tools and recipes were kept: tools.drainer: liquid-clear.materials must not be empty
```

Recipe registration is atomic in the same way. If Bukkit refuses one recipe, every recipe from that attempt is removed and the previous set is restored, so you never end up with half a tool set registered.

## What a reload does not do

| Not changed | Why | What to do instead |
|---|---|---|
| The expiry stamped on existing tools | It was written onto each item when it was created | `/oberontools give <player> <tool> 1 <duration>` for a fresh copy |
| The uses left on existing tools | Also per item | `/oberontools give`, or let them run out |
| Name, lore or model on tools already held | Items are only rewritten when they are touched | `/oberontools refresh` while holding one; the countdown pass rewrites lore on its own |
| Jobs already queued | They were authorised under the old settings and finish on those terms | Wait, or restart |
| Anything about a **renamed** tool id | Existing items still carry the old id and no longer resolve | Do not rename ids once tools are in circulation |

## Refreshing one item

```
/oberontools refresh
```

Rewrites the held tool from the current config: display name, lore, material, model data, glint, unbreakable flag. It preserves the item's remaining uses (clamped into `1 … max-uses`), its instance id and its stamped expiry.

It is also the one place an expired `REMOVE`-policy tool is deleted on demand rather than waiting for the countdown pass.

## Server reload

`/reload` (the Bukkit one) is not supported. Recipes and permission nodes are registered at enable time, and the queue owns a repeating task. Restart instead.

## Checking a change landed

```
/oberontools list
```

lists the definitions actually in memory, with their behaviour and enabled state.

```
/oberontools inspect
```

prints what a specific item resolves to right now, including the radius that player's permissions actually grant.
