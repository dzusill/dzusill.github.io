---
title: "FAQ & Troubleshooting"
description: "The plugin won't enable — Unknown/missing dependency: OberonCore."
---

## Setup

**The plugin won't enable — `Unknown/missing dependency: OberonCore`.**
The DzusillCore framework jar is missing from `plugins/`. It is a separate download and it is a hard dependency.

**The plugin won't enable — `Invalid config.yml: …`.**
Validation is all-or-nothing on purpose. The message names the exact path and problem. Every problem found in the pass is listed together, so fix them all and start again.

**Does it work on Folia?**
No. `folia-supported: false`. The job queue is one global queue on one repeating task, which Folia's regionised scheduler does not allow.

**Does it work on Spigot?**
No. It targets `api-version: '26.2'` and uses Paper's runtime command registration, Adventure text and MiniMessage.

**Do I need WorldGuard?**
No. It is a soft dependency only, so it loads first if present. OberonTools calls nothing in it — protection works because every secondary block fires a normal `BlockBreakEvent`.

---

## Tools not working

**Right-clicking water does nothing.**
Work down this list:

1. Is it actually the tool? Run `/oberontools inspect` while holding it. "You are not holding a configured Oberon tool" means the item has no `tool_id` — it is a look-alike, or its definition was renamed or removed.
2. Is the definition `enabled: true`?
3. Does the player hold the tool's `use-permission`? If you set a custom node, remember it registers with `default: op`.
4. Is the world blacklisted, or missing from a non-empty whitelist?
5. Has the item expired? `inspect` shows `status: Expired`.
6. Is the block actually a configured material? `materials: [WATER, LAVA]` does not include powder snow or waterlogged-only blocks unless `clear-waterlogged-blocks` is on.

**"No configured liquid was found in range."**
The clicked block was not a configured liquid, and the 6-block ray trace found none either. No use was spent.

**My axe says "not part of a recognized natural tree" on a normal tree.**
Usually one of:

- The trunk is smaller than `minimum-logs` (default 2).
- `require-natural-leaves: true` and there is no matching non-persistent leaf within ±2 blocks of any log — common on a trunk whose crown was already harvested.
- `natural-leaves-only: true` and the leaves are player-placed, so they are persistent and do not count.

**I can't break logs at all while holding the axe.**
That is the access rule. A `TIMBER` tool whose `use-permission` the player lacks, whose world is not allowed, whose definition is disabled, or whose deadline has passed cancels the log break itself. An expired `REMOVE` axe is also destroyed immediately. See [Timber](/plugins/oberontools/features/timber/#when-the-break-itself-is-cancelled).

**"The connected structure exceeds the safe log limit."**
The connected same-family group is over `max-logs` and `abort-when-log-limit-reached: true`, so nothing extra was broken. Raise `max-logs`, or set the abort flag to `false` to fell the first `max-logs` blocks anyway.

**A wooden wall or house counts as a tree.**
Only if it passes `minimum-logs`, has natural leaves nearby (with the default `require-natural-leaves: true`), and stays under `max-logs`. Keep `require-natural-leaves: true` and `abort-when-log-limit-reached: true` — together they are what makes builds safe.

**The tool turned into a water bucket.**
It cannot in this build. `PlayerInteractEvent` is cancelled before the hand check, and both `PlayerBucketFillEvent` and `PlayerBucketEmptyEvent` are cancelled while a liquid tool is in either hand. If you have a filled bucket from an older build, it is a plain vanilla item now — delete it.

---

## Permissions and radius

**My donator rank still gets 3×3×3 (or 3×3 on a pickaxe).**
Have them run `/oberontools inspect` and read the `radius` line — it reports what the check actually returned.

1. Is `max-radius` above `radius`? If they are equal the tool is not upgradable and no nodes exist.
2. Is the node exactly `oberontools.radius.<tool-id>.<n>`, with the tool's lower-cased id?
3. Is `n` at or below `max-radius`? A node above the ceiling is never registered and never consulted.

**Do the tiers work on the pickaxe and shovel, or only the bucket?**
Both. `LIQUID_CLEAR` and `AREA_MINE` share one permission scan; the number resolves to a cube for the bucket and a square for the mining tools. Only `TIMBER` has no tiers.

**My drain bucket worked once and then stopped forever.**
Fixed. The one-click-per-tick guard used to read the world's *day* clock, which stops dead while `doDaylightCycle` is off — so after the first click every later one compared equal to that frozen value and was silently cancelled. It now reads the server's own tick counter, which always advances. If you are on an older build, restarting the server bought you exactly one more working click; update instead.

**The radius nodes don't tab-complete in LuckPerms.**
They are registered at enable and on every reload, for upgradable tools only. If the tool has `radius == max-radius`, there is nothing to register. Otherwise check the plugin actually enabled.

**I granted tier 3 but denied tier 2 and the player got tier 1.**
That would be the failure mode if the scan walked upwards — it does not. It walks down from `max-radius` and stops at the first node held, so a denied middle tier cannot mask a higher one. If you are seeing tier 1, the tier 3 node is not actually resolving; check it with your permission plugin's own lookup.

**I made a custom `use-permission` and now nobody can use the tool.**
A permission name OberonTools has never seen is registered with `default: op`. Grant it explicitly to the groups that should have it.

---

## Expiry

**I changed `expires-after` and nothing happened to existing tools.**
Working as designed. The deadline is stamped onto each item when it is created, so editing the config never shortens or extends tools already in circulation. Hand out a fresh copy with the duration you want:
```
/oberontools give Steve sponge_bucket 1 30d
```

**An expired tool with `expired-policy: REMOVE` is still in the inventory.**
Deletion happens when an eligible slot is refreshed. Periodic passes skip both held hands to prevent re-equip animation; switch away, open an inventory, attempt to use the expired tool, or run `/oberontools refresh`. With `HOTBAR`, a tool buried in the backpack survives until it is moved; use `INVENTORY` to clear those too.

**The countdown in the lore isn't moving.**
Held countdowns deliberately freeze to stop the tool bobbing every time its lore changes. Switch to another slot or open an inventory to refresh it. Otherwise check that the scope covers the slot; permanent tools have no stamp and are skipped entirely.

**The dates are in the wrong time zone.**
`%expires_at%` and `/oberontools inspect` both render in the **server's** default time zone. There is no time-zone key in this plugin.

---

## Recipes

**The recipe doesn't show in the recipe book.**
`recipe.enabled: true`, and the tool itself `enabled: true`. A disabled tool's recipe is not registered.

**The result slot goes empty for some players.**
That is `craft-permission` being enforced in `PrepareItemCraftEvent`. Grant the node, or blank the key to remove the check.

**A reload wiped my recipes.**
It should not — registration is atomic, and a refusal rolls the whole set back to the previous one. Check the reload message: `Reload refused; active tools and recipes were kept: …` means nothing changed at all.

**Two tools want the same shape.**
Bukkit will register both and the outcome is undefined. Give them distinguishable shapes.

---

## Performance

**Does felling a jungle giant lag the server?**
No. Every job shares one budget of `max-block-attempts-per-tick` (96 by default) and gets one block per turn, round-robin. A bigger tree takes more ticks, not a bigger tick.

**Should I raise `max-block-attempts-per-tick`?**
Only with a profiler. It is the one number that sets your worst tick, and raising it makes large jobs finish sooner *and* the worst tick proportionally worse.

**Does a bigger radius cost more per tick?**
No — deliberately. The per-tick budget does not scale with radius. A 343-block drain is the same per-tick cost as a 27-block one, for longer. See [Radius Tiers](/plugins/oberontools/features/radius-tiers/#the-tick-budget-does-not-scale-with-radius).

**Does it load chunks?**
No. Both planners skip blocks in unloaded chunks rather than loading them, so a pool or a trunk that crosses into an unloaded chunk is processed up to the boundary.

**Should I turn off `fire-protection-events`?**
Only on a server with no protection or logging plugins at all. It is the expensive part of a block operation, but turning it off disables every protection plugin for secondary blocks in one move. The block the player broke themselves is still protected either way; only the extra blocks become unprotected.

---

## Items and duplication

**Can a player duplicate drops by dropping the tool mid-job?**
No. The exact instance is frozen for the duration of the job and cannot be dropped, clicked, dragged, hotbar-swapped or moved to the off hand. Death, quit and world change cancel the job outright.

**Two players drained the same pool. Did they both get paid?**
No. Every block a job intends to touch is claimed, and a second job silently skips claimed blocks.

**Can a renamed vanilla item trigger an ability?**
No. Recognition reads a hidden `tool_id` in the item's persistent data and never the display name or lore. Anvil-renaming a bucket does nothing.

**A player edited the lore with an item editor and it still works.**
Correct, and expected. The tag is what matters, not the text. Run `/oberontools refresh` to put the configured lore back.

**I renamed a tool id and every copy stopped working.**
Existing items still carry the old id, which no definition answers to any more, so they are no longer recognised as tools. Rename it back, or accept the loss and re-issue. Decide on ids before handing tools out.

**Do tools stack?**
No. Every tool is forced to a maximum stack size of 1, so two of them can never merge and share one use counter.

---

## Other

**`debug: true` prints nothing.**
Correct. The key is parsed and stored, but nothing in this build reads it.

**How do I make a tool that never runs out?**
```yaml
    item:
      max-uses: -1
      expires-after: PERMANENT
```

**How do I retire a tool?**
`enabled: false` keeps the definition loaded (so existing items still resolve and can be inspected) but refuses every use and unregisters the recipe. Be aware that a disabled `TIMBER` tool also blocks its holder from breaking logs — see [Timber](/plugins/oberontools/features/timber/#when-the-break-itself-is-cancelled). Deleting the entry outright orphans every copy instead.
