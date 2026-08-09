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
| `search` | finds an item by name |

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
price-lore: "&fPrice: #00F986{price}"
show-category: true
category-lore: "&7Category: &f{category}"
```

### The search icon

Left-click asks for text; right-click clears it. The search **sticks** until it is cleared, so paging and
sorting keep it, and it **narrows** the category filter rather than replacing it — searching "ore" with
Blocks selected finds ore blocks, not every ore.

Both the name shown on the icon and the raw price key are searched, so `diamond sword`, `diamond_sword` and
`mmoitems` all find what you would expect — the last one being how you list everything one custom-item
plugin contributed.

```yaml
  search:
    name: "#00F986sᴇᴀʀᴄʜ"
    lore:
      - "&fClick to search for an item by name"
    material: "OAK_SIGN"
    slot: 47
    sound: click

    active_name: "#00F986sᴇᴀʀᴄʜ: &f{search}"
    active_lore:
      - "&7Showing &f{results} &7matching items"
      - ""
      - "&fLeft-click &7to search for something else"
      - "&fRight-click &7to clear"

    no_results: "&cNothing matches &f{search}&c."

    sign_lines:
      - ""
      - "^^^^^^^^^^^^^^^"
      - "Type an item name"
      - "above"
```

| Key | | |
|---|---|---|
| `active_name`, `active_lore` | replace `name` and `lore` while a search is active | `{search}`, `{results}` |
| `no_results` | added to the lore when nothing matched, so an empty page still says why | `{search}` |
| `sign_lines` | the four lines the sign editor opens with | |

Only the **first** sign line is read back — leave it blank for the player to type into and put the
instructions below it. Sign text is drawn by the client and takes legacy `&` codes only; the `#RRGGBB`
colours the rest of this file accepts do not work there.

Whether the prompt is a sign or the chat box is [`search.input` in config.yml](/plugins/ddonutworth/configuration/config/#search). Both
behave identically from here.

> Upgrading from a version without this button? A GUI file's `items` section is never merged, so a deleted
> icon stays deleted — which means yours has no `search` entry. The button still appears, at slot 47 with
> the defaults above. Paste the block into your file to change it.

---

## gui/sell.yml — drop items in to sell

```yaml
rows: 6
fill-material: "BLACK_STAINED_GLASS_PANE"
collect_slots: [0, 1, 2, ..., 44]
inventory_close_success_sound: xp
inventory_close_error_sound: error

items:
  close_and_sell:
    name: "#00F986ᴄʟᴏsᴇ ᴀɴᴅ sᴇʟʟ"
    material: "NETHER_STAR"
    slot: 49
    sound: click
```

Six rows: the top five hold items, the bottom is a glass row with a **Close and Sell** nether star in the
middle. Clicking it closes the menu, which is what settles the sale — pressing Escape does exactly the
same.

| Icon | Does | Tokens |
|---|---|---|
| `close_and_sell` | closes the menu and settles the sale | `{total}` |

`{total}` is what everything currently in the menu will pay, the player's multipliers included, and it
updates as items go in and out — so the figure on the button is the figure they get.

**Only `collect_slots` are sold.** The nether star and the glass panes sit outside that list, so they are
never counted, never priced and cannot be taken out — a player cannot sell the menu's own furniture. Any
icon you add must likewise sit outside `collect_slots`, or it goes in the till with everything else.

They also carry no worth lore of their own: this plugin's menus are decorated slot by slot, so only the
slots that hold real player items get a price line.

Want the whole menu usable instead? Add `45`–`53` to `collect_slots` and remove the `items` section;
Escape still sells.

Anything unsellable is handed straight back — into the inventory if there is room, dropped at the player's
feet if not.

Leave `collect_slots` out entirely and the whole menu is usable.

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
  - "&7Earned: #00F986{total}"
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
    - "&7Requires: &f{required}"
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
| `fill-bottom-row-only` | `worth.yml` | `true` (default) keeps the filler to the border under the items |

`fill-bottom-row-only` exists because the two things a filler is asked to do pull apart on a paginated
page. Left to fill everything, a search matching two items leaves those two sitting above four rows of
glass. Set it to `false` if that is what you want.

## A note on clicks

Menu actions use left-click and **drop (Q)**, never middle-click: middle-click in an inventory only fires
in creative mode, so a middle-click action would silently do nothing for ordinary players.
