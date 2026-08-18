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

## Titles

Every one of the eight menus has its own `Title`, and all eight are written out in the shipped file:

```yaml
Admin-Queue:
  Title: "<#5DADE2>Tickets <dark_gray>· <gray><scope>"
  Report-Title: "<red>Reports <dark_gray>· <gray><scope>"
```

`/tickets` and `/reports` are the **same menu section**, so without `Report-Title` they would share one name and renaming one would rename both. Delete that line to call them the same thing.

The [dialog wizard](/plugins/oberonstaff/configuration/config/#how-the-wizard-asks) has its own title and submit button, in [`messages.yml`](/plugins/oberonstaff/configuration/messages/#the-wizard) rather than here — it is not an inventory.

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

## Border

```yaml
Admin-Queue:
  Rows: 6
  Border: true
```

Keeps the outer ring clear of content so the filler reads as a frame around it. Content starts on the **second row, second column** — slot 10 — and stops one column short of each edge.

On the six-row queue that works out to `10-16, 19-25, 28-34`, which is exactly the `Content-Slots` list this file used to carry by hand. Turning it on changes nothing about where tickets are drawn; it just stops you having to write the list.

| | |
|---|---|
| `Border: true` | *(default)* three rows of seven on a six-row queue |
| `Border: false` | content uses the full width |

Two things worth knowing:

- **`Content-Slots` still wins.** A hand-written list is an instruction. The shipped file has its list commented out so `Border` applies on a fresh install — an existing `menus.yml` keeps whatever it already says, so delete that line to switch over.
- **A menu too short to have an interior ignores it.** The three-row Punish menu with its reserved bottom row would inset to nothing, and a menu that opens empty is worse than one without a frame.

`Border: true` with `Filler` deleted gives an empty ring, not a frame — the frame *is* the filler.

## Hide-Attributes

```yaml
Punish:
  Hide-Attributes: true
```

Hides the vanilla tooltip lines — attack damage, attribute modifiers, the enchantment list. A Diamond Sword used as a Punish button was advertising "+7 Attack Damage" underneath the punishment it runs; those lines describe an item nobody is going to hold, and they push the lore that matters off the bottom of the tooltip.

On by default. Set it false per menu if you want vanilla tooltips back.

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

A section under `Buttons` with a name no menu looks up is read and then never placed — the keys are a fixed set, not something you can invent.

**`Admin-Queue` and `Ticket-Hub`**

| Key | |
|---|---|
| `Scope-Filter` `Category-Filter` `Sort` | both menus |
| `Claim-Filter` | `Admin-Queue` only — a player's own queue has no "whose" question |
| `New-Ticket` | `Ticket-Hub` only |
| `Refresh` | re-reads the queue |
| `Empty` | drawn when the filters match nothing |
| `Loading` | drawn while the query is in flight |

**`Ticket-Detail`** — every control, staff and player alike:

```
Claim  Unclaim  Priority  Teleport  Reply  Punish  Close  Reopen
Write-Message  Close-Own  Rate
Answers  Conversation  Who-And-When  Evidence  Loading  Back
```

**Others:** `Confirm` / `Cancel` / `Question` on the confirm screen, and `Back` on `Punish`, `Stats`, `Category-Picker` and `Notifications`.

Which of these actually appear is still decided by permission and by the ticket's own state — `Reopen` only on a closed ticket, `Punish` only on a report, `Rate` only to the owner of a closed one.

`Ticket-Hub`'s filters ship **unwritten** — the built-in wording already reads correctly. Adding a `Scope-Filter` block there styles the player queue on its own; it inherits nothing from `Admin-Queue`.

### Every field falls back on its own

A block you do not write keeps the appearance the plugin ships with. A field you leave out of a block you *do* write falls back the same way:

```yaml
    Close:
      Material: BARRIER      # ← only this
```

keeps the shipped name and lore. Writing one line must not silently blank two others — that is what stops people editing a layout file at all.

Leaving `Material` out entirely on `Close`, `Reopen`, `Close-Own`, `Confirm` or `Cancel` falls back to [`Action-Icons`](#shared-action-colours), so recolouring every yes/no across the desk stays one edit.

### Turning a button off

```yaml
    Rate:
      Enabled: false
```

Not `Slot: -1`. A missing slot and a deliberately removed button are different intentions, and both parse to the same negative number — reading one as the other would make a block that sets only a `Name` silently vanish.

### Hiding a button by permission

```yaml
    Punish:
      Permission: "oberonstaff.report.punish"
```

Anyone without the node does not see the item at all — the same rule the command tree applies to subcommands, rather than showing a button that then refuses. Ships blank, meaning no gate.

### Panels

The four read-only items in `Ticket-Detail` build their lore from the ticket, so they cannot simply take a `Lore:` list. Every line they say is under `Panels` instead:

```yaml
Ticket-Detail:
  Panels:
    Answers:
      Name: "<#5DADE2>What they told us"
      Question: "<gray>%prompt%"
      Answer: "  <white>%answer%"
      Empty: "<dark_gray>No answers recorded."
    Conversation:
      Name: "<#5DADE2>Conversation <gray>(%count%)"
      Empty: "<dark_gray>Nothing said yet."
      Hidden: "<dark_gray>… %count% earlier line(s) not shown"
      Footer: [ "", "<yellow>Click <dark_gray>» <gray>read the whole conversation in chat" ]
    Who-And-When:
      Owner: "<gray>Opened by <white>%player%"
      Target: "<gray>Reported: <red>%target%"
      Opened: "<gray>Opened <white>%age%"
      First-Reply: "<gray>First reply after <white>%time%"
      No-Reply: "<red>No staff reply yet"
      Rating: "<gray>Rating: %stars%"
    Evidence:
      Entry: "  <white>%value%"
      Headers:
        Location: "<gray>Where:"
        Anticheat: "<red>Anticheat flags:"
```

:::note[The conversation lines are not here]
They come from `thread.view.player` / `staff` / `note` / `system` in [`messages.yml`](/plugins/oberonstaff/configuration/messages/) — the **same** formats the chat view uses, so one edit restyles both.

The menu used to keep its own copy. Editing `messages.yml` restyled the conversation in chat and left the menu saying something else: the same conversation reading two different ways depending on where you opened it.
:::

Evidence headings are configurable; the **grouping** is not. A report backed by seven Killaura flags is a different thing from one backed by none, and that has to be visible before anybody teleports anywhere.

### The leaderboard row

```yaml
Stats:
  Row:
    Name: "<gray>%rank%. <white>%staff%"
    Lore:
      - "<gray>Handled: <white>%handled%"
      - "<gray>First reply: <white>%response%"
      - "<gray>Time to close: <white>%close%"
      - "<gray>Rating: <white>%rating% <yellow>★"
      - ""
      - "<gray>Reopened: <white>%reopened% <dark_gray>(%reopen_rate%)"
```

Reorder, rename or drop any line. `%reopened%` ships beside `%reopen_rate%` on purpose: 3 out of 200 and 3 out of 5 are very different, and only the rate says which. Keeping the count and dropping the rate is how a leaderboard starts rewarding closing tickets rather than solving them.

### Punishment lore

The icon and name of a punishment come from `Reports.Punishments.Actions` in [`config.yml`](/plugins/oberonstaff/configuration/config/); this is the lore under it:

```yaml
Punish:
  Action-Item:
    Lore:
      - "<dark_gray>Runs as console:"
      - "<gray>/%command%"
      - ""
      - "%closes%"
      - "<yellow>Click <dark_gray>» <gray>confirm"
    Closes: "<yellow>Also closes report #%id%"
    Leaves-Open: "<dark_gray>Leaves the report open"
    Confirm: "<red>/%command%"
```

`%command%` is the exact console command that will run, escaped and **never trimmed**. Staff have to see precisely what they are about to dispatch — that is the one line in this file worth leaving alone.

### Notification switches

One block per switch, keyed by the **same short name** `/ticket notifications` takes — so the word you edit here is the word a player types there:

```yaml
Notifications:
  Off-Material: GRAY_DYE
  State:
    Enabled: "<green>On"
    Disabled: "<red>Off"
    Turn-On: "<yellow>Click <dark_gray>» <gray>turn on"
    Turn-Off: "<yellow>Click <dark_gray>» <gray>turn off"
  Buttons:
    reply:
      Material: WRITABLE_BOOK
      Name: "<green>Replies"
      Help: "Somebody answers a ticket you follow."
```

`Enabled` / `Disabled`, not `On` / `Off`: a bare `On:` or `Off:` as a YAML **key** parses as a boolean, so the key becomes `true` and nothing ever finds it.

### Click sounds

```yaml
    Refresh:
      Sound:
        Enabled: true
        Name: "ui.button.click"
        Volume: 0.5
        Pitch: 1.2
```

Per button rather than one sound for the whole desk: a filter cycling and a ticket closing are not the same event. Either spelling works (`ui.button.click` or `UI_BUTTON_CLICK`), and a name this server does not have is silent rather than an error.

`Enabled: false` is a decision, not an absence — it silences that one button instead of falling back to anything.

### Refresh, not Close

The queue's bottom-middle slot is a **Refresh** button with a name tag icon. The framework draws a Close button there by default; Escape already closes a menu, and a staff member watching a busy queue re-reads it far more often than they close it.

Configure it like any other button, or `Enabled: false` to get the framework's Close back.

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

`<priority>`, `<status>` and `<claimed_by>` arrive **with their own colour already on them** — they are whole `Display` values from [`config.yml`](/plugins/oberonstaff/configuration/config/#tickets), not bare words. Do not put a colour tag in front of one; it would be overridden and the rung would lose the colour its owner gave it. `<priority_color>` is the leading tag of that same value, for colouring the rest of the line to match.

### Click hints

The lines under a ticket's lore telling you what each click does:

```yaml
  Ticket-Item:
    Hints:
      Open: "<yellow>Left <dark_gray>» <gray>open"
      Claim: "<yellow>Shift-left <dark_gray>» <gray>claim"
      Unclaim: "<yellow>Shift-left <dark_gray>» <gray>unclaim"
      Priority: "<yellow>Right <dark_gray>» <gray>cycle priority"
      Close: "<yellow>Shift-right <dark_gray>» <gray>close"
      Teleport: "<yellow>Drop (Q) <dark_gray>» <gray>teleport there"
```

Blank a line to drop that hint for everybody. **Which hints a viewer sees is still decided by permission** — a rank without close never reads the close hint, whatever this says. The text is yours; the gate is not.

`Claim` and `Unclaim` are two entries rather than one with a `%action%`, because the two words are not always a suffix swap in other languages.

### Right-click steps back

Every cycling filter goes forward on left-click and **backward on right-click**. With four values, getting from the last one to the one before it used to mean three more clicks and a full reload each time.

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
