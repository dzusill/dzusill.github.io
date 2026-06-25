---
title: "Quick Start"
description: "Stand somewhere and run:"
---

## 1. Set a home

Stand somewhere and run:

```
/sethome base
```

Your first home automatically becomes your **default** (`Settings.SetHome.FirstHomeIsDefault`), so plain `/home` will bring you here.

## 2. Open the menu

```
/homes
```

The homes GUI shows your homes, paginated. Along the bottom: **Create Home**, **Sort**, **Filter by World**, **Filter by Category**, **Search** and **Close**.

- **Left-click** a home to teleport.
- **Right-click** a home to open its editor.
- **Shift-click** to pin (pinned homes show first).

## 3. Customise a home

Right-click a home to open the [editor](/plugins/dhomegui/features/home-editor/):

- **Teleport**, **Rename**, **Change Icon** (held item), **Edit Description**
- **Set Type** (Base / Farm / Mine / Shop / …), **Set as Default**, **Pin**
- **Visibility** (Private ↔ Whitelist) and **Whitelist** management
- **Delete** (with confirmation)

## 4. Teleport

`/home base` or left-click in the GUI. A short **warmup** plays first (default 3s) and cancels if you move or take damage. If the spot looks unsafe, you'll be asked to confirm. Use `/back` to return to where you were.

## 5. More homes

Raise limits with `dhomegui.homes.<n>` permissions, or — if [economy](/plugins/dhomegui/features/economy/) is on — let players **buy extra slots** from the GUI.

## Admin essentials

```
/adminhomes <player>            # browse a player's homes
/dhomeadmin view <player>       # same, as a subcommand
/dhomeadmin delete <player> <home>
/dhomeadmin import essentials    # migrate Essentials homes
/dhomeadmin backup               # JSON backup
/dhomeadmin reload
```
