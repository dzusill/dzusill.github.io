---
title: "OberonKills"
description: "Death messages that name the weapon and the item properly — bow, crossbow, trident and the mace smash each get their own line, and Netherite Sword is spelled Netherite Sword."
---

**OberonKills** exists for the two details AxKills misses.

**Item names came out as `netherite_sword`.** They come out as **Netherite Sword** here — and as *Netheritschwert*
for a player on a German client, because the default mode sends the item's translation key and lets each client
render it. An item somebody named *Widowmaker* in an anvil shows as **Widowmaker**; most plugins get that wrong.

**Every ranged kill read the same.** Bow, crossbow, trident and mace each get their own message. So does the **mace
smash** — the move the weapon exists for.

---

## What it does

- 🗡️ **Weapon-aware** — `sword` `axe` `bow` `crossbow` `trident` `mace` `mace-smash` `item` `unarmed`, each its own key.
- 🏷️ **Proper item names** — translation keys by default; custom anvil names always win.
- 📚 **Three message sets** — PvP, mob and environmental deaths, styled separately.
- 🎲 **Random variants** — list several lines under a key and one is picked per death.
- 📏 **Distance** — `<distance>` in bow, crossbow and trident kills.
- 🔍 **Hover** — the killer's actual item, enchantments and all.
- 🎖️ **Rank prefixes** — optional.
- 👀 **Preview** — check your wording without asking anyone to die.

---

## The one command to remember

```
/oberonkills preview pvp mace-smash
```

The alternative to checking your wording is asking somebody to die, repeatedly, once per weapon.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper, Purpur or Folia **1.21.x** |
| Java | **21** |
| DzusillCore | **1.5.0** or newer — required |

No database, no optional integrations. Nothing here needs to survive a restart.

See [Requirements](/plugins/oberonkills/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/oberonkills/getting-started/installation/)
- [Quick Start](/plugins/oberonkills/getting-started/quick-start/)
- [Weapons & causes](/plugins/oberonkills/features/weapons/)
- [Item names](/plugins/oberonkills/features/item-names/)
- [Writing messages](/plugins/oberonkills/features/message-sets/)
- [Commands & Permissions](/plugins/oberonkills/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/oberonkills/faq/)
