---
title: "Dialog types"
description: "The four shapes a dialog can be, what each can hold, and how to pick one."
---

Every dialog declares a `type`. The type decides **how many buttons it has and where they go** — nothing else. Body text, inputs, icons and placeholders work the same in all four.

Pick by counting your buttons:

| Buttons | Type | Use it for |
|---|---|---|
| exactly 1 | [`notice`](#notice) | a rules page, an announcement, a stat card, a leaderboard |
| exactly 2 | [`confirmation`](#confirmation) | "are you sure?" |
| any number | [`multi_action`](#multi_action) | menus, forms, lists — most things |
| a link list | [`server_links`](#server_links) | the server's own link list |

If you are unsure, use `multi_action`. It is the general case.

## notice

**One button. That is the rule, and the dialog is rejected if you give it more.**

```yaml
type: notice
title: "<gold><b>Server rules</b></gold>"

body:
  - type: text
    text: "<gray>Playing here means you accept these."
    width: 320
  - type: text
    text: ""
  - type: text
    text: "<yellow><b>1. Be decent</b>"
    width: 320

ok-button:
  label: "<gray>Back"
  actions: ["[back]"]
```

The single button lives under **`ok-button`**.

Use it whenever the screen is something to *read*. Rules, changelogs, a player's stat card, a top-10. The one button is the way out, and it should almost always be `[back]` rather than `[close]` if the player arrived from a menu.

:::tip[Long text belongs here]
A `notice` is the natural home for a wall of text, because there is nothing to click by mistake. Break it into several `- type: text` entries with blank ones between; a single giant paragraph is much harder to read.
:::

## confirmation

**Exactly two buttons, named by role rather than position.**

```yaml
type: confirmation
title: ""
pause: true

body:
  - type: text
    text: "<white>Are you sure you want to delete your base?"
    width: 320

confirm-button:
  label: "<red>Delete it"
  actions:
    - "[player] base delete"
    - "[close]"

deny-button:
  label: "<gray>Keep it"
  actions: ["[back]"]
```

`confirm-button` renders on the left, `deny-button` on the right.

They are named rather than numbered on purpose: `buttons[0]` and `buttons[1]` rely on you remembering the order, and getting a confirmation backwards is the worst possible bug.

**Wording matters more than the mechanics.** "Are you sure?" tells the player nothing. Name the consequence — "Are you sure you want to randomly teleport with another player?" — so the answer is obvious without remembering which menu they came from.

Colour by outcome, never by which one is the affirmative: green means "this proceeds", red means "nothing happens".

`pause: true` freezes a singleplayer world behind the screen. On a server it does nothing, but it costs nothing either.

## multi_action

**Any number of buttons in a grid, plus one optional footer.** This is the workhorse.

```yaml
type: multi_action
title: "<gold><b>Server menu</b></gold>"
columns: 2

body:
  - type: text
    text: "<gray>Welcome back, <white>%player_name%</white>."
    width: 300

buttons:
  - label: "<item:iron_sword> <white>Factions"
    tooltip: "<gray>Manage your faction"
    width: 150
    actions: ["[dialog] factions"]

  - label: "<item:gold_ingot> <white>Economy"
    width: 150
    actions: ["[dialog] economy"]

exit-button:
  label: "<gray>Close"
  width: 100
  actions: ["[close]"]
```

### columns

`columns: 2` fills **left, right, left, right** — so buttons 1 and 2 are the top row, not the left-hand column. Group each pair so the two halves of a row belong together.

`columns: 1` gives full-width rows, which is what a settings screen wants. `columns: 4` or `6` suits a grid of slots.

### exit-button vs footer-buttons

`exit-button` is the **centred cell below the grid**. Vanilla gives you exactly one, and it is the only centred position available — which makes it useful for a seventh button that would otherwise sit alone in a row.

`footer-buttons` is a list. The first becomes the exit button; any others join the grid. Useful when you want search and filter controls that always render, even when a dynamic list comes back empty.

### What else it can hold

Everything: `body`, `inputs`, `dynamic-list`, `dynamic-body`. A `multi_action` with only inputs and one submit button is a form; with a `dynamic-list` it is a player picker; with `dynamic-body` it is a leaderboard with buttons underneath.

## server_links

**Renders the server's own link list** — the same one vanilla shows in the pause menu, populated by the server, not by your file.

```yaml
type: server_links
title: "<aqua>Our links"
columns: 1

exit-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

You do not list the links; the server does. Your file only controls the title, the column count and the exit button.

Most servers never need this. To put your own URL on a button, use `url:` on a normal button in a `multi_action` instead:

```yaml
  - label: "<aqua>Website"
    width: 100
    url: "https://example.com/"
```

That is a real link button — the client opens it directly, with no round trip to the server.

## What no type can do

Worth knowing before you design around it:

- **React.** Nothing on screen updates without reopening the dialog.
- **Filter as you type.** A field's contents only reach the server when a button is pressed.
- **Paginate.** Page two is another file, or the same file reopened with a stored filter.
- **Branch.** There are no if-statements. A placeholder that returns a pre-coloured, pre-worded value is how you get one.
- **Show another player's placeholders.** They always resolve against whoever is looking.

## Choosing, in one line each

- Something to **read** → `notice`
- A **yes/no** → `confirmation`
- **Anything else** → `multi_action`
