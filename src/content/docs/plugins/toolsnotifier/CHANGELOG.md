---
title: "Changelog"
description: "only when at least one worn armor piece is actually below the configured"
---

## [1.4] — 2026-06-15

### Bug fixes
- **Fixed boots notification at full durability.** Armor notifications now fire
  only when at least one worn armor piece is actually below the configured
  threshold. Previously the title, action bar, and cooldown were triggered
  unconditionally after the armor loop, causing boots (or any armor in slot 0)
  to send a notification on every hit even at 100 % durability.

### New features
- **Per-category durability thresholds.** `Settings.Categories` lets you set a
  different `Percentage` and `Enabled` flag for each category — `Tools`,
  `Armor`, and `Elytra` — independently of each other.
- **Per-material item overrides.** `Settings.ItemOverrides.<MATERIAL>` lets you
  override the threshold (or disable notifications entirely) for any specific
  item. Overrides beat the category setting, which beats the global fallback.
- **`/toolsnotifier reload` command.** Reloads `config.yml` from disk without a
  server restart. Requires the `toolsnotifier.reload` permission (default: op).
  Aliases: `/tn reload`, `/toolnotifier reload`.

### Improvements & refactoring
- Replaced deprecated `ItemStack.getDurability()` with the modern `Damageable`
  meta API. Values are now correct for all 1.21 items.
- Replaced deprecated `getItemInHand()` with `getInventory().getItemInMainHand()`.
- Cooldown keys are now stored by `UUID` instead of player name, preventing
  stale entries after a rename.
- Sound parsing has a try/catch with a descriptive console warning instead of a
  silent crash when the configured sound name is invalid.
- All eight listeners reordered null/AIR/durability checks to eliminate NPE
  crashes on edge-case events.
- Updated to Spigot/Paper API **1.21.4**, Java **21**.
- Added 46 automated unit and integration tests (MockBukkit + JUnit 5 + Mockito).

---

## [1.3] — initial refactor

- Full code refactor targeting Spigot 1.21 / Java 21.
- Removed dead code (`Data.java`).
- Added `Utils.capitalizeFully`, `getDamage`, `getRemainingDurability`,
  `isBelowThreshold` helpers.

---

## [1.2] — original release (DZUSILL)

- Initial public release.
- Chat, action bar, and title notifications.
- Configurable sound, cooldown, and ignore list.
- `toolsnotifier.notify` permission.
