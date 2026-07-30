---
title: "GUIs"
description: "Four files under gui/. They share a shape: a title, and an items section of named icons."
---

Four files under `gui/`. They share a shape: a `title`, and an `items` section of named icons.

Every icon takes the same keys:

```yaml
items:
  back:
    name: "#00F986ʙᴀᴄᴋ"
    lore:
      - "&fClick to go to the previous page"
    material: "ARROW"
    slot: 45
    customModelData: -1
    sound: click
```

`sound` names an entry in [sounds.yml](/plugins/ddonutworth/configuration/sounds/). `customModelData: -1` means none.

Colours accept legacy codes (`&f`), bare hex (`#00F986`) and MiniMessage tags (`<gray>`,
`<gradient:#ff0000:#00ff00>`) — mix them freely in one line.

**Any extra entry you add** to an `items` section is placed as a decorative icon, so you can drop in a
filler pane or an info book without touching code. Only the entries listed per file below are wired up.

---

## gui/worth.yml — item prices

`{currentPage}` and `{maxPages}` are filled in for the title.

| Icon | Does |
|---|---|
| `back`, `next` | paging |
| `refresh` | drops cached prices and repaints |
| `sort_worth` | cycles name / highest price / lowest price |
| `filter` | cycles "All" plus every sell category |

The two cycling icons list their options in the lore, active one highlighted:

```yaml
  sort_worth:
    selected_color: "#00F986"
    unselected_color: "&f"
    bullet_icon: "▪ "
```

Sort labels come from [messages.yml](/plugins/ddonutworth/configuration/messages/) (`sort_worth.*`). Filter labels are the categories' own
display names, so a category you add appears here automatically.

Items fill the five rows above the bottom row. Move `back`, `next` or `refresh` anywhere and the configured
slot is what's used — move `refresh` off slot 49 and a close button takes its place there.

Per-item lore:

```yaml
price-lore: "&fPrice: #00F986${price}"
show-category: true
category-lore: "&7Category: &f{category}"
```

---

## gui/sell.yml — drop items in to sell

```yaml
collect_slots: [0, 1, 2, ..., 35]
inventory_close_success_sound: xp
inventory_close_error_sound: error
fill-material: "BLACK_STAINED_GLASS_PANE"
```

`collect_slots` are the slots players may place items into; every other slot is chrome and gets the filler.
Closing the menu settles the sale in one payout.

Anything unsellable is handed straight back — into the inventory if there is room, dropped at the player's
feet if not.

Leave `collect_slots` out entirely and every slot above the bottom row is usable.

---

## gui/history.yml — sell history

| Icon | Does |
|---|---|
| `back`, `next` | paging |
| `sorting` | cycles most recent / highest / lowest / name |

`{currentSort}` in the `sorting` lore shows the active order.

```yaml
entry-lore:
  - "&7Sold: &f{amount}"
  - "&7Earned: #00F986${total}"
  - "&7When: &f{when}"
```

See [Sell History](/plugins/ddonutworth/features/sell-history/).

---

## gui/multipliers.yml — multiplier overview

The category icons live in each [`sell/<id>.yml`](/plugins/ddonutworth/configuration/sell-categories/) — their slot, material, title and
lore. This file carries the page's chrome plus the styling of tier icons on a progress page:

```yaml
tier:
  unlocked-name: "#00F986ᴛɪᴇʀ {tier}"
  unlocked-material: LIME_STAINED_GLASS_PANE
  unlocked-lore:
    - "&7Multiplier: #00F986{playerMultiplier}"
    - "#00F986✔ Unlocked"

  current-name: "&eᴛɪᴇʀ {tier}"
  current-material: YELLOW_STAINED_GLASS_PANE
  current-lore:
    - "&7Requires: &f${required}"
    - "&f{progressBar} {progressBarCompletedPercentage}"

  locked-name: "&cᴛɪᴇʀ {tier}"
  locked-material: RED_STAINED_GLASS_PANE
  locked-lore:
    - "&c✖ Locked"
```

`category_click` names the sound played when a category is clicked.

---

## Shared keys

| Key | Applies to | |
|---|---|---|
| `title` | all | MiniMessage or legacy; `{currentPage}` / `{maxPages}` where paginated |
| `rows` | all | 1–6, default 6 |
| `fill-material` | all | Material for leftover slots; blank for none |

## A note on clicks

Menu actions use left-click and **drop (Q)**, never middle-click: middle-click in an inventory only fires
in creative mode, so a middle-click action would silently do nothing for ordinary players.
