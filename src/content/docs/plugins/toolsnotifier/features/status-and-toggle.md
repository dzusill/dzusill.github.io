---
title: "Status & Toggle"
description: "Two player commands available in every edition."
---

Two player commands available in every edition.

## `/tn status`

Lists every damageable item in the player's inventory, off-hand and armor, with its remaining/max durability, percentage, and a colour for its level:

```
------ ToolsNotifier Status ------
Diamond Pickaxe — 412/1561 (26.4%)    (yellow = warn)
Netherite Helmet — 30/407 (7.4%)      (red = critical)
Iron Sword — 250/250 (100.0%)         (green = fine)
```

Items with no durability (blocks, food) are skipped. Requires `toolsnotifier.status` (default: everyone).

## `/tn toggle`

Mutes or un-mutes the player's **own** notifications:

```
/tn toggle
ToolsNotifier » Notifications disabled.
```

The state is stored on the player (in their persistent data), so it survives relogs. While muted, no channels fire for that player — but `/tn status` still works. Requires `toolsnotifier.toggle` (default: everyone).

> On the PRO edition, players get finer control than on/off through the [Preferences GUI](/plugins/toolsnotifier/features/preferences-gui/), where they can mute individual channels rather than everything at once.
