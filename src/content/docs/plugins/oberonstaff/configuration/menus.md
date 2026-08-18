---
title: "menus.yml"
description: "Every ticket-desk menu — rows, title, the slot each button sits in, and the item it is drawn as. Delete a button and it is not placed."
---

`menus.yml` describes every menu the ticket desk opens. Nothing about them is hard-coded: change a size, move a control, swap an icon, or delete one entirely.

Reload with `/oberonstaff reload`. No restart.

---

## Slot numbers

Slots count from 0, left to right, top to bottom:

```
 0  1  2  3  4  5  6  7  8      ← row 1
 9 10 11 12 13 14 15 16 17      ← row 2
18 19 20 21 22 23 24 25 26      ← row 3
27 28 29 30 31 32 33 34 35      ← row 4
36 37 38 39 40 41 42 43 44      ← row 5
45 46 47 48 49 50 51 52 53      ← row 6
```

`Rows` must be 1–6. Anything else is **clamped** rather than passed on, because an inventory of another height cannot be opened at all — a typo would otherwise cost you the whole menu.

---

## The menus

| Section | Opened by | Default rows |
|---|---|---|
| `Admin-Queue` | `/tickets`, `/reports` | 6 |
| `Ticket-Hub` | `/ticket` — the player's own queue | 5 |
| `Category-Picker` | **New ticket** | 3 |
| `Ticket-Detail` | clicking a ticket | 5 |
| `Punish` | the **Punish** button on a report | 3 |
| `Confirm` | closing a ticket, issuing a punishment | 3 |
| `Notifications` | `/ticket notifications` | 4 |
| `Stats` | `/tickets stats` | 6 |

`Ticket-Hub` and `Admin-Queue` are the same menu with different sections — a player gets their own tickets and no staff controls. Styling one leaves the other alone.

---

## Shared action colours

The icon behind every "yes" and "no" button across the whole desk, read once so all of them match:

```yaml
Action-Icons:
  Positive: LIME_STAINED_GLASS_PANE
  Negative: RED_STAINED_GLASS_PANE
```

`Positive` is Confirm and Reopen; `Negative` is Cancel and Close (staff's and the player's own). Any material works — glass panes by default, because a solid block is a heavier visual than a menu action needs.

---

## Anatomy of a menu

```yaml
Admin-Queue:
  Rows: 6
  Title: "<#5DADE2>Tickets <dark_gray>· <gray><scope>"

  # Where tickets are drawn. Everything else is decoration.
  # Leave this out to use Alignment instead.
  Content-Slots: [ 10,11,12,13,14,15,16, 19,20,21,22,23,24,25, 28,29,30,31,32,33,34 ]

  Filler:
    Material: GRAY_STAINED_GLASS_PANE
    Name: " "

  Buttons:
    Scope-Filter:
      Slot: 47
      Material: HOPPER
      Name: "<white>Showing: <aqua>%label%"
```

Titles, names and lore are **MiniMessage**: `<red>`, `<gradient:#a:#b>`, `<bold>`, hex.

---

## Where icons sit

Menus without a hand-written `Content-Slots` arrange themselves:

```yaml
Category-Picker:
  Rows: 3
  Alignment: CENTER
```

| | |
|---|---|
| `CENTER` | centred both ways. Every row is centred on its own, so 11 icons give 9 across the top and 2 under the **middle** of them |
| `TOP` | centred left to right, packed down from the first row |
| `FILL` | every slot, left to right and top to bottom |

The shipped picker and Punish menu are `CENTER`; the stats leaderboard is `FILL`, because a leaderboard reads as a list and thirty heads centred would be a wall with ragged edges.

`Content-Slots` **wins over `Alignment`** when you write one — a hand-written list is an instruction, and computing over the top of it would make the setting a lie. Delete it to go back to `Alignment`.

Content never lands on a row a menu keeps for its own controls, whatever the alignment.

---

## Filter buttons

Each cycling filter lists every value it cycles through, one per line, with the active one drawn apart from the rest:

```
Showing: Open
  ▸ Open          ← active
    Claimed
    Closed
    All
```

```yaml
    Scope-Filter:
      Slot: 47
      Material: HOPPER
      Name: "<white>Showing: <aqua>%label%"
      Options:
        Active: "<aqua>▸ %label%"
        Inactive: "<white>  %label%"
      Labels:
        OPEN: "Open"
        CLAIMED: "Claimed"
        CLOSED: "Closed"
        ALL: "All"
      Lore:
        - ""
        - "<dark_gray>Click to cycle"
```

`%label%` is the resolved display name — `Open`, not `OPEN`. Applies to `Scope-Filter`, `Claim-Filter`, `Category-Filter` and `Sort`.

- Delete a `Labels` line to fall back to a readable version of the raw value (`WAITING` → `Waiting`), never to the bare slug.
- Delete the whole `Options` block to use the built-in style.
- Anything in `Lore` is appended **after** the list.

**Category labels come from the categories themselves** — each one's `Display:` in `config.yml` — rather than from a `Labels` map, because there is no fixed set of them and duplicating their names in a second file is how the two drift apart. Only the "everything" entry has a label here:

```yaml
    Category-Filter:
      Options:
        Active: "<bold>▸ %label%</bold>"
        Inactive: "  %label%"
      Labels:
        ALL: "All categories"
```

Note the category list has no colour of its own in `Active`/`Inactive`. Each category's label already carries the colour its owner gave it, so the active one is marked with **bold** and `▸` instead of being recoloured — otherwise a generic active colour would paint over the one thing that makes categories tellable apart.

### Title placeholders

| Placeholder | In |
|---|---|
| `<scope>` | `Admin-Queue` |
| `<filter>` | `Admin-Queue` |
| `<category>` | `Admin-Queue` |
| `<sort>` | `Admin-Queue` |
| `<id>` | `Ticket-Detail` |

---

## Deleting a control

A button that is not in the file **is not placed**. That is how you turn one off:

```yaml
Admin-Queue:
  Buttons:
    # Sort button removed — staff always see priority order.
    Scope-Filter:
      Slot: 47
      Material: HOPPER
      Name: "<white>Showing: <aqua><scope>"
```

The same applies to a whole section. Delete `Confirm` and the confirmation screen falls back to its shipped defaults; delete `Filler` and the menu simply has empty slots.

### The buttons that exist

Five names, and only these five. A section under `Buttons` with any other name is read and then never placed — the menus look up the controls they know about, so `Statistics:` or `Refresh:` invents nothing.

| Key | In |
|---|---|
| `Scope-Filter` | `Admin-Queue`, `Ticket-Hub` |
| `Claim-Filter` | `Admin-Queue` only |
| `Category-Filter` | `Admin-Queue`, `Ticket-Hub` |
| `Sort` | `Admin-Queue`, `Ticket-Hub` |
| `New-Ticket` | `Ticket-Hub` only |

`Ticket-Hub`'s filters ship **unwritten** — the built-in wording already reads correctly. Adding a `Scope-Filter` block there styles the player queue on its own; it inherits nothing from `Admin-Queue`.

### Hiding a button by permission

```yaml
    New-Ticket:
      Slot: 38
      Material: WRITABLE_BOOK
      Name: "<green>New ticket"
      Permission: "oberonstaff.ticket.create"
```

Anyone without the node does not see the item at all — the same rule the command tree applies to subcommands, rather than showing a button that then refuses.

Ships blank, meaning no gate. It is worth setting on `New-Ticket` if opening tickets is restricted on your server, so the button is not offered to players who will only be refused by the command behind it.

---

## How a ticket is drawn

Each queue has a `Ticket-Item` block:

```yaml
  Ticket-Item:
    # Blank uses the category's own Icon from config.yml.
    # Set a material to override every category at once.
    Material: ""
    Name: "<priority_color>#<id> <white><title>"
    Lore:
      - "<gray>Opened by <white><owner>"
      - "<gray>Category: <aqua><category>"
      - "<gray>Status: <aqua><status>"
      - "<gray>Priority: <priority_color><priority>"
      - "<gray>Claimed by: <claimed_by>"
      - "<gray>Last activity: <white><last_activity>"
    Stack-By-Priority: true
    Glow-When-Unclaimed: true
```

| Placeholder | Value |
|---|---|
| `<id>` | Ticket number |
| `<title>` | The reason answer, trimmed |
| `<owner>` | Who opened it |
| `<target>` | Reported player, `-` on a normal ticket |
| `<category>` | The category's `Display` |
| `<status>` | `OPEN` / `CLAIMED` / `CLOSED`, plus `STALE` or `LATE` |
| `<priority>` | `LOW` … `URGENT` |
| `<priority_color>` | The colour tag for that rung |
| `<claimed_by>` | Staff name, or `unclaimed` |
| `<last_activity>` | e.g. `3h ago` |
| `<age>` | How long since it was opened |
| `<reporters>` | Distinct reporters on a merged report |
| `<rating>` | `★★★★☆` once the player has rated it, or `not yet rated` |
| `<server>` | Which server it was opened on, for a shared database |

:::note[These stay in angle brackets]
Ticket-item placeholders are substituted by the plugin **before** the line reaches MiniMessage, so `<id>` here is correct and `%id%` would not work. `messages.yml` is the opposite way round — see [the note there](/plugins/oberonstaff/configuration/messages/#values-are-name-not-name). The two files are not interchangeable.
:::

**`Stack-By-Priority`** draws urgent tickets as taller stacks, so the queue reads from across the screen. **`Glow-When-Unclaimed`** makes anything nobody has picked up glint.

Per-category icons live in `config.yml`, not here:

```yaml
Tickets:
  Categories:
    player_report:
      Display: "<red>Player Report"
      Icon: DIAMOND_SWORD
```

---

## When you get it wrong

The file is the part you edit most, so it is built to fail small:

| Mistake | What happens |
|---|---|
| Unknown material name | That one icon falls back. Menu still opens |
| `Rows: 0` or `Rows: 9` | Clamped to 1 or 6 |
| Button with no `Slot` | Not placed |
| Missing menu section | Shipped defaults used |
| Missing `Content-Slots` | `Alignment` decides instead |
| Unknown `Alignment` | `CENTER` |
| More icons than the menu holds | The overflow is dropped; the menu still opens |
| Missing `Labels` entry | A readable version of the raw value |
| Two buttons on one `Slot` | The later one wins; the earlier is gone without a trace |

None of these stop a menu opening. A typo in a layout file should be a cosmetic bug, never an unopenable GUI.

:::caution[A shared slot is the one that bites]
Everything else on this list fails visibly. A collision does not — the button underneath simply is not there, and nothing says why.

Controls are drawn Status → Owner *or* New ticket → Category → Sort, and a later one overwrites an earlier one sharing its slot. In `Ticket-Hub` the row is **38** Status, **39** New ticket, **41** Category, **42** Sort; in `Admin-Queue` it is **47**, **48**, **50**, **51**.

An early build wrote `Ticket-Hub.New-Ticket.Slot: 38` — the Status filter's slot — so a player's queue drew New ticket over the top of it and had no status filter at all. The shipped file says `39`, but an update never overwrites a key your `menus.yml` already has, so **check that line if the file predates this page**:

```yaml
Ticket-Hub:
  Buttons:
    New-Ticket:
      Slot: 39
```
:::

---

## See also

- [Ticket Desk](/plugins/oberonstaff/features/tickets/)
- [Configuration](/plugins/oberonstaff/configuration/config/) — categories and their icons
- [Reloading](/plugins/oberonstaff/configuration/reloading/)
