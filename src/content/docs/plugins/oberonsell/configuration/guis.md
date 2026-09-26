---
title: "GUIs"
description: "Six files under gui/. All but one share a shape: a title, and an items section of named icons."
---

Six files under `gui/`. All but one share a shape: a `title`, and an `items` section of named icons.
`sell-top.yml` is its own thing and is documented at the bottom.

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

`sound` names an entry in [sounds.yml](/plugins/oberonsell/configuration/sounds/). `customModelData: -1` means none.

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

Sort labels come from [messages.yml](/plugins/oberonsell/configuration/messages/) (`sort_worth.*`). Filter labels are the categories' own
display names, so a category you add appears here automatically.

Items fill the five rows above the bottom row. Move `back`, `next` or `refresh` anywhere and the configured
slot is what's used — move `refresh` off slot 49 and a close button takes its place there.

Per-item lore:

```yaml
price-lore: "&fPrice: #00F986{price} &7each"

show-stack: true
stack-lore: "&7Full stack (&f{stack}&7): #00F986{stackPrice}"

show-category: true
category-lore: "&7Category: &f{category}"
```

| Key | Tokens | |
|---|---|---|
| `price-lore` | `{price}` | the worth of **one** of the item |
| `show-stack` / `stack-lore` | `{stack}`, `{stackPrice}` | what a full stack fetches. Skipped for unstackable items |
| `show-category` / `category-lore` | `{category}` | which sell category the item is in |

This list prices a single item while an inventory tooltip prices the whole stack, which is why the shipped
`price-lore` says "each" — the two are the same price and should not look like different numbers.

Entries whose key names a **block with no item form** are not shown here at all: there is no item to draw.
See [Migration health](/plugins/oberonsell/configuration/prices/#migration-health).

### The search icon

Left-click asks for text; right-click clears it immediately. The search stays while the GUI is open, so
paging and sorting keep it, but closing the GUI clears it for the next visit. It **narrows** the category
filter rather than replacing it — searching "ore" with
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

Whether the prompt is a sign or the chat box is [`search.input` in config.yml](/plugins/oberonsell/configuration/config/#search). Both
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

## gui/sellall-confirm.yml — sell-all confirmation

What `/sellall` and `/sell all` show before selling anything, while
[`sell-all.confirm.enabled`](/plugins/oberonsell/configuration/config/#sell-all) is `true`. Nothing is sold until `confirm` is clicked;
`cancel`, or closing the menu, sells nothing. See [Selling](/plugins/oberonsell/features/selling/#the-confirmation).

```yaml
title: "ᴄᴏɴғɪʀᴍ sᴇʟʟ ᴀʟʟ"
rows: 3
fill-material: "BLACK_STAINED_GLASS_PANE"
open-sound: sellall-open
close-sound: sellall-cancel

top-items:
  count: 5
  line: "&8▪ &f{amount}x {item} &7- #00F986{price}"
  more: "&7...and {more} more"

items:
  summary:
    name: "#00F986sᴇʟʟ ᴀʟʟ"
    lore:
      - "&7You get: #00F986{price}"
      - "&7Items: &f{amount} &7({items} kinds)"
      - "&7Multiplier: &f{multiplier}"
      - ""
      - "&7Most valuable:"
      - "{topItems}"
    material: "CHEST"
    slot: 13
  confirm:
    material: "LIME_STAINED_GLASS_PANE"
    slot: 15
    sound: sellall-confirm
  cancel:
    material: "RED_STAINED_GLASS_PANE"
    slot: 11
    sound: sellall-cancel
```

Three rows: cancel, summary and confirm across the middle, glass everywhere else.

| Icon | Does |
|---|---|
| `summary` | shows the sale. Not a button — clicking it does nothing |
| `confirm` | sells, then closes the menu. Plays its `sound` |
| `cancel` | closes the menu and sells nothing. Plays its `sound` |

Any other entry is placed as a decorative icon, and can quote the sale too.

Every icon's `name` and `lore` take these tokens:

| Token | |
|---|---|
| `{price}` | what the sale pays, the player's multipliers included |
| `{amount}` | how many items it takes |
| `{items}` | how many different kinds of item |
| `{multiplier}` | the sale's multipliers overall — payout over list price, e.g. `1.5x` |
| `{topItems}` | on a lore line of its own: one line per kind, most valuable first |

`{topItems}` is not replaced inside a line — the line holding it is repeated once per kind, drawn from
`top-items`:

| Key | Default | |
|---|---|---|
| `top-items.count` | `5` | how many kinds are listed; `0` lists none |
| `top-items.line` | `&8▪ &f{amount}x {item} &7- #00F986{price}` | one kind: its `{item}` name, `{amount}` and `{price}` |
| `top-items.more` | `&7...and {more} more` | added when more kinds are sold than listed; blank for none |

| Sound key | Default | Played when |
|---|---|---|
| `open-sound` | `sellall-open` | the menu opens |
| `close-sound` | `sellall-cancel` | the menu is closed without a click on it — Escape, or another menu opening over it |

The title takes no tokens: it is drawn once, as the menu opens, and could not follow the figures if they
changed.

**The summary is what the next click sells.** If the player's inventory changes while the menu is open, a
click on `confirm` redraws every icon with the new figures, sends `sellall.changed` and sells nothing; the
next click sells at what is on screen. Which slots are counted is [`sell-all.slots`](/plugins/oberonsell/configuration/config/#sell-all).

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

See [Sell History](/plugins/oberonsell/features/sell-history/).

---

## gui/multipliers.yml — multiplier overview

The category icons live in each [`sell/<id>.yml`](/plugins/oberonsell/configuration/sell-categories/) — their slot, material, title and
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

## gui/sell-top.yml — sell leaderboard

A different shape from the other four: no `items` section, no paging. One player head per rank, drawn from
the persisted player records.

```yaml
rows: 6
title: "<#C21807>💲 <b><gradient:#C21807:#F11800>Sell Top</gradient></b>"
top-limit: 45

grid-filler:
  item: "BLACK_STAINED_GLASS_PANE"
  name: " "

bottom-row:
  filler-item: "GRAY_STAINED_GLASS_PANE"
  filler-name: " "

entry:
  material: "PLAYER_HEAD"
  name: "<#C21807>#{rank} {player}"
  lore:
    - "<#AAAAAA>Amount: <#C21807>{items}"
    - "<#AAAAAA>Money Earned: <#00FC00>${money}"
```

`top-limit` is clamped to `(rows − 1) × 9`, so the bottom row always stays chrome. Tokens on `entry.name`
and `entry.lore`: `{rank}`, `{player}`, `{items}`, `{money}`. A `PLAYER_HEAD` icon is textured with that
player's own head.

See [Sell Leaderboard](/plugins/oberonsell/features/sell-leaderboard/).

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
