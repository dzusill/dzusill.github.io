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
| `Ticket-Hub` | `/ticket` | 5 |
| `Category-Picker` | **New ticket** | 3 |
| `Ticket-Detail` | clicking a ticket | 5 |
| `Confirm` | closing a ticket | 3 |

---

## Anatomy of a menu

```yaml
Admin-Queue:
  Rows: 6
  Title: "<#5DADE2>Tickets <dark_gray>· <gray><scope>"

  # Where tickets are drawn. Everything else is decoration.
  # Leave this out to use every slot above the bottom row.
  Content-Slots: [ 10,11,12,13,14,15,16, 19,20,21,22,23,24,25, 28,29,30,31,32,33,34 ]

  Filler:
    Material: GRAY_STAINED_GLASS_PANE
    Name: " "

  Buttons:
    Scope-Filter:
      Slot: 47
      Material: HOPPER
      Name: "<white>Showing: <aqua><scope>"
      Lore:
        - "<gray>Click to cycle"
        - "<dark_gray>open → claimed → closed → all"
```

Titles, names and lore are **MiniMessage**: `<red>`, `<gradient:#a:#b>`, `<bold>`, hex.

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

### Hiding a button by permission

```yaml
    Statistics:
      Slot: 46
      Material: BOOK
      Name: "<gold>Staff statistics"
      Permission: "oberonstaff.ticket.stats"
```

Anyone without the node does not see the item at all — the same rule the command tree applies to subcommands, rather than showing a button that then refuses.

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
| Missing `Content-Slots` | Every slot above the bottom row |

None of these stop a menu opening. A typo in a layout file should be a cosmetic bug, never an unopenable GUI.

---

## See also

- [Ticket Desk](/plugins/oberonstaff/features/tickets/)
- [Configuration](/plugins/oberonstaff/configuration/config/) — categories and their icons
- [Reloading](/plugins/oberonstaff/configuration/reloading/)
