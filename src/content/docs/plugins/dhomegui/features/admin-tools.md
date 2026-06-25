---
title: "Admin Tools"
description: "Staff manage everyone's homes through /dhomeadmin (aliases /ahomes, /homesadmin) and /adminhomes. Every action requires dhomegui.admin."
---

Staff manage everyone's homes through `/dhomeadmin` (aliases `/ahomes`, `/homesadmin`) and `/adminhomes`. Every action requires `dhomegui.admin`.

## Commands

| Command | Does |
|---|---|
| `/dhomeadmin reload` | Reload `config.yml` & `messages.yml`. |
| `/dhomeadmin players` | Open the **player browser** GUI (everyone with homes). |
| `/adminhomes <player>` | Open the admin view of a player's homes. |
| `/dhomeadmin view <player>` | Same as above, as a subcommand. |
| `/dhomeadmin tp <player> <home>` | Teleport yourself to a player's home. |
| `/dhomeadmin delete <player> <home>` | Delete one of a player's homes. |
| `/dhomeadmin deleteall <player>` | Delete **all** of a player's homes. |
| `/dhomeadmin count <player>` | Show how many homes a player has. |
| `/dhomeadmin import <essentials\|file>` | Import homes (see below). |
| `/dhomeadmin backup` | Export a JSON backup of all homes. |

## The admin GUIs

- **Player browser** (`/dhomeadmin players`) lists every player who has homes, with their home count, online status and last-seen — click a head to open their homes.
- **Admin home view** (`/adminhomes <player>`) shows that player's homes; left-click to teleport, right-click to delete.

## Importing

```
/dhomeadmin import essentials   # pull homes from EssentialsX
/dhomeadmin import file          # reload homes from the flat file
```

EssentialsX import needs EssentialsX installed; on success you'll see *"Imported `<n>` home(s)."*, otherwise *"Import failed — check the console."*

## Backups

`/dhomeadmin backup` writes a timestamped JSON export of all homes into the plugin folder — a quick safety net before migrations or mass edits.
