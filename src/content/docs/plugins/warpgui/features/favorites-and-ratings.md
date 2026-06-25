---
title: "Favorites & Ratings"
description: "Two lightweight, per-player features that help good warps stand out. Both store their data in playerdata.yml (or the database)."
---

Two lightweight, per-player features that help good warps stand out. Both store their data in `playerdata.yml` (or the database).

## Favorites

Enable with `Settings.Favorites.Enabled`.

- **Shift-click** any warp in the All Warps menu to favourite or un-favourite it.
- Favourited warps get a star marker in their lore (`GUI.FavoriteLore`).
- The **Favourites** tab lists everything you've favourited for quick access.

Messages: *"Added `<warp>` to favourites."* / *"Removed `<warp>` from favourites."* Favourites are cleaned up automatically when a warp is deleted.

## Ratings

Enable with `Settings.Ratings.Enabled`.

- Open a warp's **Rate** menu (the sunflower button in the [edit menu](/plugins/warpgui/features/editing-warps/), or the Rate button on a warp).
- Click **1–5 stars** to rate it.
- A warp shows its **average rating** and the number of votes in its lore (`GUI.RatingLore`), e.g. `Rating: 4.6 (23)`.

Each player gets one vote per warp; rating again updates your vote. The average is exposed via the `%warpgui_…_rating%` [placeholder](/plugins/warpgui/placeholders/).

> Both features are optional. Disabling one hides its button/tab and stops new data being recorded, but existing data is kept.
