---
title: "The /sus list"
description: "/sus opens a list of player heads: everyone flagged inside the current time window. A head shows the player's flags in that window, their last check and how…"
---

`/sus` opens a list of player heads: everyone flagged inside the current **time window**. A head shows the player's flags in that window, their last check and how long ago it fired, the anti-cheat, their risk and score, whether they are online, their ping and their platform (**Java** or **Bedrock**). Its name is coloured by risk.

## Clicking a head

The default bindings live in `gui/main.yml` under `clicks`. You can change any of them, or set one to `NONE`.

| Click | Default |
| --- | --- |
| Left | Teleport to the player (vanished first) |
| Right | Actions menu |
| Shift + left | Profile |
| Shift + right | Spectate |
| Q (drop) | Flag history |

The available actions are `TELEPORT`, `ACTIONS`, `PROFILE`, `HISTORY`, `SPECTATE`, `FREEZE` (toggles) and `NONE`. Middle-click only works in creative mode, which is why Q is used instead. Profile and history need `oberonsentry.view`, on top of `oberonsentry.open`.

## Window, sort, search

- **Clock button:** cycles the window through `list.windows` (1h, 6h, 24h, 7d by default). Right-click goes back.
- **Sort:** newest flag, most flags in the window, score, risk, or name.
- **Search:** type part of a name in a text box on screen (clients 1.21.6 and newer; older and Bedrock clients type it in chat, or set `list.search-input: CHAT`). Empty search shows everyone again. Right-click clears it.
- **Online / everyone:** shows only players who are online right now, or everyone. Set the default with `list.online-only-by-default`.
- **Alerts:** turns your own silent alerts on or off, the same as `/sus alerts`.

Sort, window, filters and search stay while you move between the menus. Every time `/sus` is opened by command they start again from the defaults in `config.yml` (`list.reset-filters-on-open`), so a changed default applies at once.

## Filters

The filter menu narrows the list:

| Filter | Shows |
| --- | --- |
| Risk | At least this risk level |
| Category | Flagged in combat, movement, player, client or other within the window |
| Check | Flagged by one specific check within the window (picked from the checks seen) |
| Status | Default (open, under review, resolved and players without a case), only active, only open, only under review, resolved, dismissed, no case, or everything |
| Unassigned | Only cases nobody has taken |

**Reset** puts everything back. Every staff member has their own window, sort and filters.

## Dismissed players

When a case is dismissed as a false positive, the player disappears from the default list. If they are flagged again after that, they come back.

## Bedrock players

Players who join through Geyser and Floodgate are recognised by their Floodgate UUID (`00000000-0000-0000-…`), and also through Floodgate's API when it is installed, which catches linked accounts. They are **marked, not excluded**: "Bedrock" on their head, in the profile (`{platform}`) and in every Discord embed. Vulcan checks Bedrock clients differently, so read their flags with that in mind.

## Live updates

Open lists redraw when new flags arrive, at most once per `list.refresh-debounce` (1 s). The menus only read a snapshot; all scoring runs on a separate thread, so a flag storm never touches the main thread.

## After a restart

Flag counts for the largest window, the last flag of every player and check, the scores, open cases and frozen players are all rebuilt from the database. The list looks the same after a restart as it did before.
