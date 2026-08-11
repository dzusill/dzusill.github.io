---
title: "Pause menu button"
description: "Putting your menu on the Escape screen — how it works, why it needs a restart, and what direct-open costs."
---

dDialogs can add a button to the **pause screen** (Escape) and to the **quick-actions bar** (G).

```yaml
pause-menu:
  enabled: true
  button-name: "Menu"
  dialog: "menu"
  quick-actions: false
  direct-open: false
```

| Key | Meaning |
|---|---|
| `enabled` | off by default |
| `button-name` | the words on the pause-screen button |
| `dialog` | which dialog it leads to, by id |
| `quick-actions` | also add it to the G bar |
| `direct-open` | skip the extra click — see below |

## Why this one is different

The pause screen reads a vanilla tag listing **registered** dialogs. Registries can only be written while the server is starting, so there is no runtime API for it — dDialogs writes the same thing as a **datapack**, into the world folder.

Three consequences that explain everything else on this page:

- **Changes need a full restart.** `/ddialogs reload` cannot move the button.
- **It needs two restarts to appear after an edit.** The world reads datapacks at load; the plugin writes the new one *after* that, during enable. So a change written on one start is only served on the next. The console says so: *"It appears after the next full restart."*
- **The pack lives in `<world>/datapacks/ddialogs`** — it travels with the **world**, not the plugin.

## direct-open: false — the default

The button opens a small screen saying "Opens the full menu", with one button that opens the real thing.

One extra click, and **nothing is lost**: the real dialog is built per player, so placeholders, dynamic lists, leaderboards and sub-dialogs all work normally.

## direct-open: true — no extra click

Your menu appears immediately. The copy is baked at startup and shared by every player.

**What survives:**

- colours, gradients and inline `<item:>` / `<sprite:>` / `<head:>` icons
- tooltips, column count, button widths, your exit button's own wording
- every button — it runs the command it would have run, and a button that opens a sub-dialog opens the **live** one, placeholders and dynamic rows intact

**What cannot, because there is no player to build it for:**

- `%placeholders%` anywhere on that screen are removed
- a body line containing one is dropped rather than printed half-empty
- dynamic lists and leaderboards on that screen are empty

:::tip[How to choose]
`true` is right for a **menu of buttons**, even a decorated one — which is what most main menus are.

Keep `false` if the top screen itself shows player data: a balance, a rank, a "Welcome back, NAME".
:::

A "Welcome back, %player_name%." line simply disappears under `direct-open: true`, because baking it would produce "Welcome back, .". A static subtitle beside it comes through fine.

## Checking it worked

The datapack is plain JSON you can read:

```
<world>/datapacks/ddialogs/data/ddialogs/dialog/pause_menu.json
```

And the server lists it:

```
/datapack list
```

You should see `[file/ddialogs (world)]` among the enabled packs.

## Turning it off

Set `enabled: false` and restart. The pack is **deleted** rather than left disabled — a stale pack would keep a button pointing at a dialog that may no longer exist, and there would be no obvious way to connect the two.

## Troubleshooting

| What you see | Why |
|---|---|
| No button at all | `enabled: false`, or you have not done a full restart |
| The button shows an **old** version of the menu | The datapack was rewritten after the world loaded. Restart once more |
| `pause-menu.dialog is 'x', which is not a loaded dialog` | The id is wrong. `/ddialogs list` shows the real ones |
| Icons and colours missing under `direct-open: true` | You are on an older build — current versions bake them as text components |
| The menu is empty under `direct-open: true` | Its content is per player. Use `false` |
