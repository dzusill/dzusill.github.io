---
title: "The GUI"
description: "/f gui (or right-clicking the Beacon HQ) opens the graphical faction menu — a"
---

`/f gui` (or right-clicking the [Beacon HQ](/plugins/dfactions/features/beacon/)) opens the graphical faction menu — a
chest-style interface that surfaces most of the plugin without typing commands.

## Menu sections

| Icon | Section | What it does |
|---|---|---|
| 🌟 Nether Star | **Overview** | Name, level, prestige, XP (current / next), claims (used / max), members, land, bank |
| 👤 Player heads | **Members** | Live member list — left-click **promote**, right-click **demote** |
| ⏰ Clock | **Statistics** | Kills, deaths, K/D, wars won/lost |
| 📦 Ender Chest | **Storage** | Open the faction team chest |
| 🟨 Gold Ingot | **Bank** | Balance and deposit/withdraw entry point |
| 🧰 Chest | **Resources** | The XP deposit chest (`/f resources`) |
| 📖 Book | **Activity log** | Recent audit events with "time ago" timestamps |
| ⚙️ Settings | **Settings** | Rename, description, open/close, transfer, disband |

The **Members** panel renders real player heads and routes clicks through the existing
promote/demote services, so role rules are respected. The **Activity log** reads the faction audit
trail.

Beyond the main menu, the plugin builds several **dynamic menus**:

- **Top factions** (`/f top`) — a leaderboard of faction **leader heads** showing faction name, total
  money, kills and deaths.
- **Territory map** (`/f map`) — a live chunk grid centered on you; **edge arrows** (north at the top,
  south at the bottom, west/east on the sides) pan the view, and clicking a chunk claims or unclaims it.
- **Bank** and **Invites** menus handle deposits/withdrawals and pending invites.

Opening the team chest from the **Storage** button no longer prints a chat line — the inventory
opening is feedback enough.

## Customizing the GUI

Menus are defined in `gui.yml` — title, size, a border-filler material, and item entries with a
`slot`, `material`, `name`, `lore` and `action`:

```yaml
gui:
  menus:
    main:
      title: "<dark_green>Faction Menu"
      size: 45
      border-material: GRAY_STAINED_GLASS_PANE
      items:
        overview:
          slot: 13
          material: NETHER_STAR
          name: "<green>{faction_name}"
          lore:
            - "<gray>Level: <white>{level}"
            - "<gray>Prestige: <white>{prestige}"
          action: REFRESH
```

Actions: `RUN_COMMAND`, `OPEN_MENU`, `REFRESH`, `CLOSE`. Dynamic content (member heads, deposit
slots, the activity feed) is populated by the plugin; you control layout, materials and text.

> GUI placeholders (`{faction_name}`, `{level}`, `{prestige}`, `{xp}`, …) are filled by the GUI
> manager and don't require PlaceholderAPI.
