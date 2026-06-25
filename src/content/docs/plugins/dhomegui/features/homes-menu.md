---
title: "The Homes Menu"
description: "/homes opens the paginated homes GUI — the main way players browse and manage their homes."
---

`/homes` opens the paginated homes GUI — the main way players browse and manage their homes.

## Layout

The list height is configurable with `GUI.Rows` (3–6, default 6 = 54 slots). Homes fill the inner area; the bottom row holds the action buttons:

| Button | Action |
|---|---|
| **Create Home** | Set a home at your current location (prompts for a name). |
| **Sort** | Cycle the [sort mode](#sorting). |
| **Filter by World** | Cycle through worlds to show only that world's homes. |
| **Filter by Category** | Show only homes of a chosen [type](/plugins/dhomegui/features/home-editor/). |
| **Search** | Left-click to type a name query; right-click to clear it. |
| **Close** | Close the menu. |

Each home shows its world, coordinates, type, last-visited and created dates, access level and any status badges (default ★ / pinned ✦) in its lore.

## Interacting with a home

| Action | Result |
|---|---|
| **Left-click** | Teleport (see [Teleporting](/plugins/dhomegui/features/teleporting/)). |
| **Right-click** | Open the [home editor](/plugins/dhomegui/features/home-editor/). |
| **Shift-click** | Pin / unpin (pinned homes sort first). |

## Sorting

The **Sort** button cycles through sort modes (e.g. by name, by creation date, by last visited). Pinned homes always float to the top regardless of sort.

## Filtering & search

- **Filter by World** narrows the list to one world.
- **Filter by Category** narrows to one home type.
- **Search** opens a chat (or anvil) prompt — type part of a name to filter.

All three combine, and a **No homes found!** placeholder appears when nothing matches.

## Theme & filler

dHomeGUI ships a light-blue theme. The decorative border is `GUI.Filler` (`Border: true` for an edge frame, `false` to fill every empty slot). Titles, lore and icons all live in [config.yml](/plugins/dhomegui/configuration/config/). After editing, run `/dhomeadmin reload` and reopen the menu.
